import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongoose';
import Product from '@/models/Product';
import { unlink } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 404 });
  await connectToDatabase();
  const product = await Product.findById(id).populate('category');
  if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 404 });
  await connectToDatabase();
  try {
    const body = await req.json();
    if (body.category && !mongoose.isValidObjectId(body.category)) return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 });
    const updated = await Product.findByIdAndUpdate(id, body, { new: true, runValidators: true }).populate('category');
    if (!updated) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Update failed';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

// DELETE - Delete product with optional image cleanup
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 404 });
  
  await connectToDatabase();
  
  // Check for cleanup query param
  const { searchParams } = new URL(req.url);
  const cleanupImage = searchParams.get('cleanup') === 'true';

  // Find product first to get image path
  const product = await Product.findById(id);
  if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

  // Optional: Delete associated image file
  let imageDeleted = false;
  if (cleanupImage && product.image) {
    try {
      // Extract filename from URL path (e.g., /uploads/products/image.jpg)
      const imagePath = product.image.startsWith('/') 
        ? path.join(process.cwd(), 'public', product.image)
        : path.join(process.cwd(), 'public', 'uploads', 'products', product.image);

      if (existsSync(imagePath)) {
        await unlink(imagePath);
        imageDeleted = true;
      }
    } catch (err) {
      // Log but don't fail the delete operation
      console.error('Failed to delete image:', err);
    }
  }

  // Delete product from database
  await Product.findByIdAndDelete(id);

  return NextResponse.json({ 
    message: 'Deleted Product',
    imageCleanup: cleanupImage,
    imageDeleted,
  });
}
