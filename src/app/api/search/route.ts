import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import Product from '@/models/Product';
import Category from '@/models/Category';
import Order from '@/models/Order';

// Search route - search across products, categories, and orders
export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || '';
    const type = searchParams.get('type') || 'all'; // all, products, categories, orders
    const limit = parseInt(searchParams.get('limit') || '10');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const category = searchParams.get('category');

    if (!query && type === 'all') {
      return NextResponse.json({ 
        error: 'Search query (q) is required for general search' 
      }, { status: 400 });
    }

    const results: {
      products?: unknown[];
      categories?: unknown[];
      orders?: unknown[];
    } = {};

    // Search Products
    if (type === 'all' || type === 'products') {
      const productQuery: Record<string, unknown> = {};
      
      if (query) {
        productQuery.$or = [
          { name: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
        ];
      }
      
      if (minPrice || maxPrice) {
        productQuery.price = {};
        if (minPrice) (productQuery.price as Record<string, number>).$gte = parseFloat(minPrice);
        if (maxPrice) (productQuery.price as Record<string, number>).$lte = parseFloat(maxPrice);
      }
      
      if (category) {
        productQuery.category = category;
      }

      results.products = await Product.find(productQuery)
        .populate('category')
        .limit(limit)
        .sort({ createdAt: -1 });
    }

    // Search Categories
    if (type === 'all' || type === 'categories') {
      const categoryQuery = query
        ? {
            $or: [
              { name: { $regex: query, $options: 'i' } },
              { description: { $regex: query, $options: 'i' } },
            ],
          }
        : {};

      results.categories = await Category.find(categoryQuery).limit(limit);
    }

    // Search Orders
    if (type === 'all' || type === 'orders') {
      const orderQuery = query
        ? { customerName: { $regex: query, $options: 'i' } }
        : {};

      results.orders = await Order.find(orderQuery)
        .populate({ path: 'items.product' })
        .limit(limit)
        .sort({ createdAt: -1 });
    }

    return NextResponse.json({
      query,
      type,
      results,
      count: {
        products: results.products?.length || 0,
        categories: results.categories?.length || 0,
        orders: results.orders?.length || 0,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Search failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
