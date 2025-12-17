import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongoose';
import Order from '@/models/Order';
import Product from '@/models/Product';

function validateItems(items: unknown): boolean {
  if (!Array.isArray(items) || items.length === 0) return false;
  for (const it of items) {
    if (!it.product || !mongoose.isValidObjectId(it.product)) return false;
    if (typeof it.quantity !== 'number' || typeof it.priceAtTimeOfOrder !== 'number') return false;
  }
  return true;
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 404 });
  await connectToDatabase();
  const order = await Order.findById(id).populate({ path: 'items.product', select: 'name price' });
  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  return NextResponse.json(order);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 404 });
  await connectToDatabase();
  try {
    const body = await req.json();
    if (body.items && !validateItems(body.items)) return NextResponse.json({ error: 'Invalid items array' }, { status: 400 });
    // if items provided, verify products exist
    if (body.items) {
      for (const it of body.items) {
        const exists = await Product.findById(it.product);
        if (!exists) return NextResponse.json({ error: `Product not found: ${it.product}` }, { status: 400 });
      }
    }
    const updated = await Order.findByIdAndUpdate(id, body, { new: true, runValidators: true }).populate({ path: 'items.product', select: 'name price' });
    if (!updated) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 404 });
  await connectToDatabase();
  const deleted = await Order.findByIdAndDelete(id);
  if (!deleted) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  return NextResponse.json({ message: 'Deleted Order' });
}
