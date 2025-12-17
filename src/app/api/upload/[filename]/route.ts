import { NextResponse } from 'next/server';
import { unlink, stat } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

// DELETE - Remove a specific uploaded file
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    
    // Prevent directory traversal attacks
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filepath = path.join(uploadDir, filename);

    if (!existsSync(filepath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    await unlink(filepath);

    return NextResponse.json({ message: `File ${filename} deleted successfully` });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Delete failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// GET - Get file info
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filepath = path.join(uploadDir, filename);

    if (!existsSync(filepath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const stats = await stat(filepath);

    return NextResponse.json({
      filename,
      url: `/uploads/${filename}`,
      size: stats.size,
      createdAt: stats.birthtime,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to get file info';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
