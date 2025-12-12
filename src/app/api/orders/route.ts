import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongoose';
import Order from '@/models/Order';
import Product from '@/models/Product';

function validateItems(items: any) {
  if (!Array.isArray(items) || items.length === 0) return false;
  for (const it of items) {
    if (!it.product || !mongoose.isValidObjectId(it.product)) return false;
    if (typeof it.quantity !== 'number' || typeof it.priceAtTimeOfOrder !== 'number') return false;
  }
  return true;
}

export async function GET() {
  await connectToDatabase();
  const orders = await Order.find().populate({ path: 'items.product', select: 'name price' });
  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  await connectToDatabase();
  try {
    const body = await req.json();
    const { items } = body;
    if (!validateItems(items)) return NextResponse.json({ error: 'Invalid items array' }, { status: 400 });
    // verify products exist
    for (const it of items) {
      const exists = await Product.findById(it.product);
      if (!exists) return NextResponse.json({ error: `Product not found: ${it.product}` }, { status: 400 });
    }
    const order = new Order(body);
    const saved = await order.save();
    const populated = await saved.populate({ path: 'items.product', select: 'name price' });
    return NextResponse.json(populated, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
