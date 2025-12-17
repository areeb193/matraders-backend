import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongoose';
import Category from '@/models/Category';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 404 });
  await connectToDatabase();
  const category = await Category.findById(id);
  if (!category) return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  return NextResponse.json(category);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 404 });
  await connectToDatabase();
  try {
    const body = await req.json();
    const updated = await Category.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!updated) return NextResponse.json({ error: 'Category not found' }, { status: 404 });
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
  const deleted = await Category.findByIdAndDelete(id);
  if (!deleted) return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  return NextResponse.json({ message: 'Deleted Category' });
}
