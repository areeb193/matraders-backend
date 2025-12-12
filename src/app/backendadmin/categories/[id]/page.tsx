"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { ArrowLeft, Save, Trash2, Loader2, Calendar, Hash } from 'lucide-react';
import Link from 'next/link';

interface Category {
  _id: string;
  name: string;
  description: string;
  createdAt?: string;
}

export default function CategoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [notFound, setNotFound] = useState(false);

  const [formData, setFormData] = useState({ name: '', description: '' });

  const fetchCategory = useCallback(async () => {
    try {
      const res = await fetch(`/api/categories/${id}`);
      if (res.status === 404) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setCategory(data);
      setFormData({ name: data.name, description: data.description || '' });
      setLoading(false);
    } catch {
      setError('Failed to fetch category');
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchCategory();
  }, [id, fetchCategory]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update');
      setCategory(data);
      setSuccess('Category updated successfully!');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Update failed';
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this category? This cannot be undone.')) return;

    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete');
      router.push('/backendadmin/categories');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Delete failed';
      setError(message);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading category...</span>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <Card className="border-red-200 bg-red-50 dark:bg-red-950">
          <CardHeader>
            <CardTitle className="text-red-600">404 - Category Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">The category with ID <code className="bg-gray-200 px-2 py-1 rounded">{id}</code> does not exist.</p>
            <p className="text-sm text-gray-500 mb-4">
              API Response: <code>GET /api/categories/{id}</code> → <span className="text-red-600">404 Not Found</span>
            </p>
            <Link href="/backendadmin/categories">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Categories
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/backendadmin/categories">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Categories
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Category Details</h1>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 p-3 rounded mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 p-3 rounded mb-4">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Category Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <Hash className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">MongoDB _id</p>
                <p className="font-mono text-sm">{category?._id}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <Calendar className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Created At</p>
                <p className="text-sm">
                  {category?.createdAt ? new Date(category.createdAt).toLocaleString() : 'N/A'}
                </p>
              </div>
            </div>

            {/* API Endpoint Info */}
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded text-xs">
              <p className="font-semibold mb-2">API Endpoints for this category:</p>
              <ul className="space-y-1 font-mono">
                <li>GET /api/categories/{id}</li>
                <li>PUT /api/categories/{id}</li>
                <li>DELETE /api/categories/{id}</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Edit Form */}
        <Card>
          <CardHeader>
            <CardTitle>Edit Category</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1" disabled={saving}>
                  {saving ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save Changes
                </Button>
                <Button type="button" variant="destructive" onClick={handleDelete}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Raw JSON */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Raw JSON Response</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto text-sm">
            {JSON.stringify(category, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
