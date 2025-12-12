import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

// File upload route - handles single and multiple file uploads
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const uploadedFiles: { filename: string; url: string; size: number; type: string }[] = [];

    for (const file of files) {
      // Validate file type (images only)
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
      if (!validTypes.includes(file.type)) {
        return NextResponse.json(
          { error: `Invalid file type: ${file.type}. Allowed: jpeg, png, gif, webp, svg` },
          { status: 400 }
        );
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        return NextResponse.json(
          { error: `File too large: ${file.name}. Max size: 5MB` },
          { status: 400 }
        );
      }

      // Generate unique filename
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 8);
      const ext = path.extname(file.name);
      const filename = `${timestamp}-${randomString}${ext}`;
      const filepath = path.join(uploadDir, filename);

      // Save file
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(filepath, buffer);

      uploadedFiles.push({
        filename,
        url: `/uploads/${filename}`,
        size: file.size,
        type: file.type,
      });
    }

    return NextResponse.json({
      message: 'Files uploaded successfully',
      files: uploadedFiles,
    }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Upload failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// GET - List uploaded files (media route)
export async function GET() {
  try {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    if (!existsSync(uploadDir)) {
      return NextResponse.json({ files: [] });
    }

    const fs = await import('fs/promises');
    const files = await fs.readdir(uploadDir);
    
    const fileList = await Promise.all(
      files.map(async (filename) => {
        const filepath = path.join(uploadDir, filename);
        const stats = await fs.stat(filepath);
        return {
          filename,
          url: `/uploads/${filename}`,
          size: stats.size,
          createdAt: stats.birthtime,
        };
      })
    );

    return NextResponse.json({ files: fileList });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to list files';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
