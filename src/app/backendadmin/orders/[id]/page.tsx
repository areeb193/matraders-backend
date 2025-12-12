"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { ArrowLeft, Save, Trash2, Loader2, Calendar, Hash, User, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  price: number;
}

interface OrderItem {
  product: Product | string;
  quantity: number;
  priceAtTimeOfOrder: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  customerName: string;
  totalAmount: number;
  status: string;
  createdAt?: string;
}

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [notFound, setNotFound] = useState(false);

  const [formData, setFormData] = useState({
    customerName: '',
    status: 'Processing',
  });

  const fetchData = useCallback(async () => {
    try {
      const [ordRes, prodRes] = await Promise.all([
        fetch(`/api/orders/${id}`),
        fetch('/api/products'),
      ]);

      if (ordRes.status === 404) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      if (!ordRes.ok) throw new Error('Failed to fetch order');

      const [ord, prods] = await Promise.all([ordRes.json(), prodRes.json()]);
      
      setOrder(ord);
      if (Array.isArray(prods)) setProducts(prods);
      
      setFormData({
        customerName: ord.customerName,
        status: ord.status,
      });
      setLoading(false);
    } catch {
      setError('Failed to fetch order');
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

    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update');
      setOrder(data);
      setSuccess('Order updated successfully!');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Update failed';
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this order? This cannot be undone.')) return;

    try {
      const res = await fetch(`/api/orders/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete');
      router.push('/backendadmin/orders');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Delete failed';
      setError(message);
    }
  };

  const getProductName = (item: OrderItem) => {
    if (typeof item.product === 'object' && item.product?.name) return item.product.name;
    const found = products.find(p => p._id === item.product);
    return found?.name || 'Unknown';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100';
      case 'Shipped': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100';
      case 'Cancelled': return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100';
      default: return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-100';
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading order...</span>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <Card className="border-red-200 bg-red-50 dark:bg-red-950">
          <CardHeader>
            <CardTitle className="text-red-600">404 - Order Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">The order with ID <code className="bg-gray-200 px-2 py-1 rounded">{id}</code> does not exist.</p>
            <p className="text-sm text-gray-500 mb-4">
              API Response: <code>GET /api/orders/{id}</code> → <span className="text-red-600">404 Not Found</span>
            </p>
            <Link href="/backendadmin/orders">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Orders
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
        <Link href="/backendadmin/orders">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Orders
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Order Details</h1>
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
            <CardTitle>Order Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <Hash className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">MongoDB _id</p>
                <p className="font-mono text-sm">{order?._id}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <User className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Customer Name</p>
                <p className="text-lg font-semibold">{order?.customerName}</p>
              </div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <p className="text-xs text-gray-500 mb-2">Status</p>
              <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(order?.status || '')}`}>
                {order?.status}
              </span>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-950 rounded">
              <p className="text-xs text-gray-500">Total Amount</p>
              <p className="text-2xl font-bold text-green-600">${order?.totalAmount.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <Calendar className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Created At</p>
                <p className="text-sm">
                  {order?.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingCart className="h-4 w-4 text-gray-500" />
                <p className="text-xs text-gray-500">Order Items (populated products)</p>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-1">Product</th>
                    <th className="text-right py-1">Qty</th>
                    <th className="text-right py-1">Price</th>
                    <th className="text-right py-1">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order?.items.map((item, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="py-2">{getProductName(item)}</td>
                      <td className="text-right py-2">{item.quantity}</td>
                      <td className="text-right py-2">${item.priceAtTimeOfOrder.toFixed(2)}</td>
                      <td className="text-right py-2 font-medium">
                        ${(item.quantity * item.priceAtTimeOfOrder).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* API Endpoint Info */}
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded text-xs">
              <p className="font-semibold mb-2">API Endpoints for this order:</p>
              <ul className="space-y-1 font-mono">
                <li>GET /api/orders/{id}</li>
                <li>PUT /api/orders/{id}</li>
                <li>DELETE /api/orders/{id}</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Edit Form */}
        <Card>
          <CardHeader>
            <CardTitle>Edit Order</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <Label htmlFor="customerName">Customer Name *</Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="status">Status *</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  required
                  className="w-full border rounded p-2 bg-white dark:bg-gray-800"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
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

            {/* Assignment test hint */}
            <div className="mt-6 p-3 bg-yellow-50 dark:bg-yellow-950 rounded text-xs">
              <p className="font-semibold mb-2">Assignment Test:</p>
              <p>To test status update via Postman:</p>
              <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
{`PUT /api/orders/${id}
{
  "status": "Shipped"
}`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Raw JSON */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Raw JSON Response (with populated products)</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto text-sm">
            {JSON.stringify(order, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
