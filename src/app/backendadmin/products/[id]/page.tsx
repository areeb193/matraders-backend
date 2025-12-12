"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { ArrowLeft, Save, Trash2, Loader2, Calendar, Hash, Tag, Package } from 'lucide-react';
import Link from 'next/link';

interface Category {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: Category | string;
  stockQuantity: number;
  createdAt?: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [notFound, setNotFound] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stockQuantity: '',
  });

  const fetchData = useCallback(async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch(`/api/products/${id}`),
        fetch('/api/categories'),
      ]);

      if (prodRes.status === 404) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      if (!prodRes.ok) throw new Error('Failed to fetch product');

      const [prod, cats] = await Promise.all([prodRes.json(), catRes.json()]);
      
      setProduct(prod);
      if (Array.isArray(cats)) setCategories(cats);
      
      const catId = typeof prod.category === 'object' ? prod.category._id : prod.category;
      setFormData({
        name: prod.name,
        description: prod.description || '',
        price: prod.price.toString(),
        category: catId,
        stockQuantity: prod.stockQuantity.toString(),
      });
      setLoading(false);
    } catch {
      setError('Failed to fetch product');
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchData();
  }, [id, fetchData]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    const payload = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      stockQuantity: parseInt(formData.stockQuantity),
    };

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update');
      setProduct(data);
      setSuccess('Product updated successfully!');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Update failed';
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product? This cannot be undone.')) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete');
      router.push('/backendadmin/products');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Delete failed';
      setError(message);
    }
  };

  const getCategoryName = (cat: Category | string) => {
    if (typeof cat === 'object' && cat?.name) return cat.name;
    const found = categories.find(c => c._id === cat);
    return found?.name || 'Unknown';
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading product...</span>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <Card className="border-red-200 bg-red-50 dark:bg-red-950">
          <CardHeader>
            <CardTitle className="text-red-600">404 - Product Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">The product with ID <code className="bg-gray-200 px-2 py-1 rounded">{id}</code> does not exist.</p>
            <p className="text-sm text-gray-500 mb-4">
              API Response: <code>GET /api/products/{id}</code> → <span className="text-red-600">404 Not Found</span>
            </p>
            <Link href="/backendadmin/products">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Products
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/backendadmin/products">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Products
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Product Details</h1>
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
            <CardTitle>Product Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <Hash className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">MongoDB _id</p>
                <p className="font-mono text-sm">{product?._id}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <Package className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Product Name</p>
                <p className="text-lg font-semibold">{product?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <Tag className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Category (populated)</p>
                <p className="text-sm">
                  {product && getCategoryName(product.category)}
                  <span className="text-xs text-gray-400 ml-2">
                    (ID: {typeof product?.category === 'object' ? product.category._id : product?.category})
                  </span>
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-green-50 dark:bg-green-950 rounded">
                <p className="text-xs text-gray-500">Price</p>
                <p className="text-xl font-bold text-green-600">${product?.price.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded">
                <p className="text-xs text-gray-500">Stock</p>
                <p className="text-xl font-bold text-blue-600">{product?.stockQuantity}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <Calendar className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Created At</p>
                <p className="text-sm">
                  {product?.createdAt ? new Date(product.createdAt).toLocaleString() : 'N/A'}
                </p>
              </div>
            </div>

            {/* API Endpoint Info */}
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded text-xs">
              <p className="font-semibold mb-2">API Endpoints for this product:</p>
              <ul className="space-y-1 font-mono">
                <li>GET /api/products/{id}</li>
                <li>PUT /api/products/{id}</li>
                <li>DELETE /api/products/{id}</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Edit Form */}
        <Card>
          <CardHeader>
            <CardTitle>Edit Product</CardTitle>
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
              <div>
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  className="w-full border rounded p-2 bg-white dark:bg-gray-800"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="stockQuantity">Stock Quantity *</Label>
                <Input
                  id="stockQuantity"
                  type="number"
                  min="0"
                  value={formData.stockQuantity}
                  onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                  required
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
          <CardTitle>Raw JSON Response (with populated category)</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto text-sm">
            {JSON.stringify(product, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
