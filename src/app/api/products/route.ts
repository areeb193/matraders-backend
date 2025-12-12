import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongoose';
import Product from '@/models/Product';
import Category from '@/models/Category';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

export async function GET() {
  await connectToDatabase();
  const products = await Product.find().populate('category');
  return NextResponse.json(products);
}

// POST - Create product (supports both JSON and FormData with image upload)
export async function POST(req: Request) {
  await connectToDatabase();
  try {
    const contentType = req.headers.get('content-type') || '';
    
    let body: Record<string, unknown>;
    let imageUrl = '';

    // Handle FormData (with image upload)
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      
      body = {
        name: formData.get('name') as string,
        description: formData.get('description') as string || '',
        price: parseFloat(formData.get('price') as string),
        category: formData.get('category') as string,
        stockQuantity: parseInt(formData.get('stockQuantity') as string) || 0,
      };

      // Handle image upload
      const imageFile = formData.get('image') as File | null;
      if (imageFile && imageFile.size > 0) {
        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(imageFile.type)) {
          return NextResponse.json(
            { error: 'Invalid image type. Allowed: jpeg, png, gif, webp' },
            { status: 400 }
          );
        }

        // Validate file size (max 5MB)
        if (imageFile.size > 5 * 1024 * 1024) {
          return NextResponse.json({ error: 'Image too large. Max: 5MB' }, { status: 400 });
        }

        // Create uploads directory
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'products');
        if (!existsSync(uploadDir)) {
          await mkdir(uploadDir, { recursive: true });
        }

        // Generate unique filename
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(2, 8);
        const ext = path.extname(imageFile.name);
        const filename = `product-${timestamp}-${randomStr}${ext}`;
        const filepath = path.join(uploadDir, filename);

        // Save file
        const bytes = await imageFile.arrayBuffer();
        await writeFile(filepath, Buffer.from(bytes));
        
        imageUrl = `/uploads/products/${filename}`;
      }
    } else {
      // Handle JSON request
      body = await req.json();
      imageUrl = (body.image as string) || '';
    }

    // Validate category
    if (!body.category || !mongoose.isValidObjectId(body.category as string)) {
      return NextResponse.json({ error: 'Invalid category id' }, { status: 400 });
    }
    const exists = await Category.findById(body.category);
    if (!exists) return NextResponse.json({ error: 'Category not found' }, { status: 400 });

    // Create product with image
    const product = new Product({
      ...body,
      image: imageUrl,
    });
    const saved = await product.save();
    const populated = await saved.populate('category');
    return NextResponse.json(populated, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create product';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
