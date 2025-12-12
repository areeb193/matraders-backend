import { NextResponse } from 'next/server';

import { connectToDatabase } from '@/lib/mongoose';
import Category from '@/models/Category';

export async function GET() {
  await connectToDatabase();
  const categories = await Category.find();
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  await connectToDatabase();
  try {
    const body = await req.json();
    const category = new Category(body);
    const saved = await category.save();
    return NextResponse.json(saved, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
