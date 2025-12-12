"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Trash2, Edit, Plus, ArrowLeft, Loader2, Eye, ImageIcon } from 'lucide-react';
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
  image?: string;
  createdAt?: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [cleanupImage, setCleanupImage] = useState(true);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stockQuantity: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/categories'),
      ]);
      const [prods, cats] = await Promise.all([prodRes.json(), catRes.json()]);
      if (Array.isArray(prods)) setProducts(prods);
      if (Array.isArray(cats)) setCategories(cats);
      setLoading(false);
    } catch {
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      if (isEditing && editId) {
        // UPDATE - use JSON
        const payload = {
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          category: formData.category,
          stockQuantity: parseInt(formData.stockQuantity),
        };
        const res = await fetch(`/api/products/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to update');
        setSuccess('Product updated successfully!');
      } else {
        // CREATE - use FormData for image upload
        const formDataObj = new FormData();
        formDataObj.append('name', formData.name);
        formDataObj.append('description', formData.description);
        formDataObj.append('price', formData.price);
        formDataObj.append('category', formData.category);
        formDataObj.append('stockQuantity', formData.stockQuantity);
        if (imageFile) {
          formDataObj.append('image', imageFile);
        }

        const res = await fetch('/api/products', {
          method: 'POST',
          body: formDataObj,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to create');
        setSuccess(`Product created! ID: ${data._id}${data.image ? ' (with image)' : ''}`);
      }
      
      setFormData({ name: '', description: '', price: '', category: '', stockQuantity: '' });
      setImageFile(null);
      setImagePreview(null);
      setIsEditing(false);
      setEditId(null);
      // Reset file input
      const input = document.getElementById('productImage') as HTMLInputElement;
      if (input) input.value = '';
      fetchData();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Operation failed';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (product: Product) => {
    setIsEditing(true);
    setEditId(product._id);
    const catId = typeof product.category === 'object' ? product.category._id : product.category;
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      category: catId,
      stockQuantity: product.stockQuantity.toString(),
    });
    setError('');
    setSuccess('');
  };

  const handleDelete = async (id: string, productImage?: string) => {
    const hasImage = !!productImage;
    const message = hasImage && cleanupImage
      ? 'Delete this product AND its image file?'
      : 'Delete this product?';
    if (!confirm(message)) return;
    
    try {
      const url = cleanupImage && hasImage 
        ? `/api/products/${id}?cleanup=true` 
        : `/api/products/${id}`;
      const res = await fetch(url, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete');
      setSuccess(`Product deleted!${data.imageDeleted ? ' Image also removed.' : ''}`);
      setError('');
      fetchData();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to delete';
      setError(message);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({ name: '', description: '', price: '', category: '', stockQuantity: '' });
    setImageFile(null);
    setImagePreview(null);
    setError('');
    setSuccess('');
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
        <span className="ml-2">Loading products...</span>
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
        <h1 className="text-3xl font-bold">Manage Products</h1>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 p-3 rounded mb-4 flex justify-between items-center">
          {error}
          <button onClick={() => setError('')} className="text-red-500 hover:text-red-700">×</button>
        </div>
      )}
      {success && (
        <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 p-3 rounded mb-4 flex justify-between items-center">
          {success}
          <button onClick={() => setSuccess('')} className="text-green-500 hover:text-green-700">×</button>
        </div>
      )}

      {categories.length === 0 && (
        <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-100 p-3 rounded mb-4">
          ⚠️ Please <Link href="/backendadmin/categories" className="underline font-semibold">create a category</Link> first before adding products.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? 'Edit Product' : 'Add New Product'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="e.g. ZenBook Ultra 5"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Product description"
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
                  placeholder="1499.99"
                />
              </div>
              <div>
                <Label htmlFor="category">Category * (ID: {formData.category.slice(-6) || '...'})</Label>
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
                  placeholder="15"
                />
              </div>

              {/* Image Upload - only for new products */}
              {!isEditing && (
                <div>
                  <Label htmlFor="productImage">Product Image</Label>
                  <Input
                    id="productImage"
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    onChange={handleImageChange}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Max 5MB (jpeg, png, gif, webp)</p>
                  {imagePreview && (
                    <div className="mt-2 relative">
                      <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover rounded" />
                      <button
                        type="button"
                        onClick={() => { setImageFile(null); setImagePreview(null); }}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-2">
                <Button type="submit" className="flex-1" disabled={submitting || categories.length === 0}>
                  {submitting ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4 mr-2" />
                  )}
                  {isEditing ? 'Update' : 'Create'}
                </Button>
                {isEditing && (
                  <Button type="button" variant="outline" onClick={cancelEdit}>
                    Cancel
                  </Button>
                )}
              </div>
            </form>

            {/* Delete with cleanup toggle */}
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950 rounded">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={cleanupImage}
                  onChange={(e) => setCleanupImage(e.target.checked)}
                  className="rounded"
                />
                <span>Delete image file when deleting product</span>
              </label>
            </div>

            {/* Sample data hint */}
            <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-800 rounded text-xs">
              <strong>Sample Data (FormData with image):</strong>
              <pre className="mt-2 text-gray-600 dark:text-gray-300 overflow-x-auto">
{`FormData:
  name: "ZenBook Ultra 5"
  description: "Powerful ultrabook"
  price: 1499.99
  category: "<CATEGORY_ID>"
  stockQuantity: 15
  image: [File]`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>All Products ({products.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No products yet. Create one!</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b bg-gray-50 dark:bg-gray-800">
                      <th className="text-left p-3 font-semibold">Image</th>
                      <th className="text-left p-3 font-semibold">ID</th>
                      <th className="text-left p-3 font-semibold">Name</th>
                      <th className="text-left p-3 font-semibold">Category</th>
                      <th className="text-left p-3 font-semibold">Price</th>
                      <th className="text-left p-3 font-semibold">Stock</th>
                      <th className="text-left p-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((prod) => (
                      <tr key={prod._id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="p-3">
                          {prod.image ? (
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                              <ImageIcon className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </td>
                        <td className="p-3 font-mono text-xs text-gray-500">
                          <Link href={`/backendadmin/products/${prod._id}`} className="hover:text-blue-600 hover:underline">
                            {prod._id.slice(-6)}
                          </Link>
                        </td>
                        <td className="p-3 font-medium">
                          <Link href={`/backendadmin/products/${prod._id}`} className="hover:text-blue-600 hover:underline">
                            {prod.name}
                          </Link>
                        </td>
                        <td className="p-3">
                          <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100 px-2 py-1 rounded text-xs">
                            {getCategoryName(prod.category)}
                          </span>
                        </td>
                        <td className="p-3 font-mono">${prod.price.toFixed(2)}</td>
                        <td className="p-3">{prod.stockQuantity}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Link href={`/backendadmin/products/${prod._id}`}>
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button size="sm" variant="outline" onClick={() => handleEdit(prod)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDelete(prod._id, prod.image)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
