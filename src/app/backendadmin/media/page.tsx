"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { ArrowLeft, Upload, Trash2, Loader2, ImageIcon, Copy, Check, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface UploadedFile {
  filename: string;
  url: string;
  size: number;
  createdAt?: string;
  type?: string;
}

export default function MediaPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const fetchFiles = useCallback(async () => {
    try {
      const res = await fetch('/api/upload');
      const data = await res.json();
      if (data.files) setFiles(data.files);
      setLoading(false);
    } catch {
      setError('Failed to fetch files');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFiles || selectedFiles.length === 0) {
      setError('Please select files to upload');
      return;
    }

    setError('');
    setSuccess('');
    setUploading(true);

    try {
      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('files', selectedFiles[i]);
      }

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      setSuccess(`${data.files.length} file(s) uploaded successfully!`);
      setSelectedFiles(null);
      // Reset file input
      const input = document.getElementById('fileInput') as HTMLInputElement;
      if (input) input.value = '';
      fetchFiles();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      setError(message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (filename: string) => {
    if (!confirm(`Delete ${filename}?`)) return;

    try {
      const res = await fetch(`/api/upload/${filename}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Delete failed');
      setSuccess(`${filename} deleted!`);
      fetchFiles();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Delete failed';
      setError(message);
    }
  };

  const copyToClipboard = async (url: string) => {
    await navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading media files...</span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/backendadmin">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Media Library</h1>
        <Button variant="ghost" size="sm" onClick={fetchFiles} className="ml-auto">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 p-3 rounded mb-4">
          {error}
          <button onClick={() => setError('')} className="float-right">×</button>
        </div>
      )}
      {success && (
        <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 p-3 rounded mb-4">
          {success}
          <button onClick={() => setSuccess('')} className="float-right">×</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Files
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <Label htmlFor="fileInput">Select Images</Label>
                <Input
                  id="fileInput"
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
                  onChange={(e) => setSelectedFiles(e.target.files)}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Allowed: jpeg, png, gif, webp, svg (max 5MB each)
                </p>
              </div>
              {selectedFiles && selectedFiles.length > 0 && (
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {selectedFiles.length} file(s) selected
                </div>
              )}
              <Button type="submit" className="w-full" disabled={uploading}>
                {uploading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4 mr-2" />
                )}
                Upload
              </Button>
            </form>

            {/* API Info */}
            <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-800 rounded text-xs">
              <strong>API Endpoints:</strong>
              <ul className="mt-2 space-y-1 font-mono">
                <li>POST /api/upload - Upload files</li>
                <li>GET /api/upload - List all files</li>
                <li>GET /api/upload/:filename - Get file info</li>
                <li>DELETE /api/upload/:filename - Delete file</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Files Grid */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Uploaded Files ({files.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {files.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No files uploaded yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {files.map((file) => (
                  <div
                    key={file.filename}
                    className="border rounded-lg p-2 hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded overflow-hidden mb-2">
                      <img
                        src={file.url}
                        alt={file.filename}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                      />
                    </div>
                    <p className="text-xs font-mono truncate" title={file.filename}>
                      {file.filename}
                    </p>
                    <p className="text-xs text-gray-500">{formatSize(file.size)}</p>
                    <div className="flex gap-1 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => copyToClipboard(file.url)}
                      >
                        {copiedUrl === file.url ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(file.filename)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
