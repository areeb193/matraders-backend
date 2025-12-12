"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Trash2, Edit, Plus, ArrowLeft, Loader2, Eye } from 'lucide-react';
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

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    customerName: '',
    status: 'Processing',
    productId: '',
    quantity: '1',
    priceAtOrder: '',
  });

  const fetchData = async () => {
    try {
      const [ordRes, prodRes] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/products'),
      ]);
      const [ords, prods] = await Promise.all([ordRes.json(), prodRes.json()]);
      if (Array.isArray(ords)) setOrders(ords);
      if (Array.isArray(prods)) setProducts(prods);
      setLoading(false);
    } catch {
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      if (isEditing && editId) {
        // Only update status and customer name when editing
        const res = await fetch(`/api/orders/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            customerName: formData.customerName, 
            status: formData.status 
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to update');
        setSuccess('Order updated successfully!');
      } else {
        // Create new order with items
        const qty = parseInt(formData.quantity);
        const price = parseFloat(formData.priceAtOrder);
        
        const payload = {
          customerName: formData.customerName,
          status: formData.status,
          items: [
            {
              product: formData.productId,
              quantity: qty,
              priceAtTimeOfOrder: price,
            },
          ],
          totalAmount: qty * price,
        };

        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to create');
        setSuccess(`Order created! ID: ${data._id}`);
      }
      
      setFormData({ customerName: '', status: 'Processing', productId: '', quantity: '1', priceAtOrder: '' });
      setIsEditing(false);
      setEditId(null);
      fetchData();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Operation failed';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (order: Order) => {
    setIsEditing(true);
    setEditId(order._id);
    setFormData({
      customerName: order.customerName,
      status: order.status,
      productId: '',
      quantity: '1',
      priceAtOrder: '',
    });
    setError('');
    setSuccess('');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this order?')) return;
    
    try {
      const res = await fetch(`/api/orders/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete');
      setSuccess('Order deleted successfully!');
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
    setFormData({ customerName: '', status: 'Processing', productId: '', quantity: '1', priceAtOrder: '' });
    setError('');
    setSuccess('');
  };

  const handleProductChange = (productId: string) => {
    const prod = products.find(p => p._id === productId);
    setFormData({
      ...formData,
      productId,
      priceAtOrder: prod ? prod.price.toString() : '',
    });
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
        <span className="ml-2">Loading orders...</span>
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
        <h1 className="text-3xl font-bold">Manage Orders</h1>
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

      {products.length === 0 && (
        <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-100 p-3 rounded mb-4">
          ⚠️ Please <Link href="/backendadmin/products" className="underline font-semibold">create products</Link> first before creating orders.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? 'Edit Order' : 'Create New Order'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="customerName">Customer Name *</Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  required
                  placeholder="e.g. Alice Johnson"
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
              
              {!isEditing && (
                <>
                  <div>
                    <Label htmlFor="productId">Product * (ID: {formData.productId.slice(-6) || '...'})</Label>
                    <select
                      id="productId"
                      value={formData.productId}
                      onChange={(e) => handleProductChange(e.target.value)}
                      required
                      className="w-full border rounded p-2 bg-white dark:bg-gray-800"
                    >
                      <option value="">Select product</option>
                      {products.map((prod) => (
                        <option key={prod._id} value={prod._id}>
                          {prod.name} - ${prod.price}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="priceAtOrder">Price at Order *</Label>
                    <Input
                      id="priceAtOrder"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.priceAtOrder}
                      onChange={(e) => setFormData({ ...formData, priceAtOrder: e.target.value })}
                      required
                    />
                  </div>
                  {formData.quantity && formData.priceAtOrder && (
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                      <strong>Total:</strong> ${(parseInt(formData.quantity) * parseFloat(formData.priceAtOrder)).toFixed(2)}
                    </div>
                  )}
                </>
              )}

              <div className="flex gap-2">
                <Button type="submit" className="flex-1" disabled={submitting || (!isEditing && products.length === 0)}>
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

            {/* Sample data hint */}
            <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-800 rounded text-xs">
              <strong>Sample Data:</strong>
              <pre className="mt-2 text-gray-600 dark:text-gray-300 overflow-x-auto">
{`{
  "customerName": "Alice Johnson",
  "status": "Processing",
  "items": [{
    "product": "<PRODUCT_ID>",
    "quantity": 1,
    "priceAtTimeOfOrder": 1499.99
  }],
  "totalAmount": 1499.99
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>All Orders ({orders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No orders yet. Create one!</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b bg-gray-50 dark:bg-gray-800">
                      <th className="text-left p-3 font-semibold">ID</th>
                      <th className="text-left p-3 font-semibold">Customer</th>
                      <th className="text-left p-3 font-semibold">Items</th>
                      <th className="text-left p-3 font-semibold">Total</th>
                      <th className="text-left p-3 font-semibold">Status</th>
                      <th className="text-left p-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="p-3 font-mono text-xs text-gray-500">
                          <Link href={`/backendadmin/orders/${order._id}`} className="hover:text-blue-600 hover:underline">
                            {order._id.slice(-6)}
                          </Link>
                        </td>
                        <td className="p-3 font-medium">
                          <Link href={`/backendadmin/orders/${order._id}`} className="hover:text-blue-600 hover:underline">
                            {order.customerName}
                          </Link>
                        </td>
                        <td className="p-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="text-sm">
                              {getProductName(item)} ×{item.quantity}
                            </div>
                          ))}
                        </td>
                        <td className="p-3 font-mono">${order.totalAmount.toFixed(2)}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Link href={`/backendadmin/orders/${order._id}`}>
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button size="sm" variant="outline" onClick={() => handleEdit(order)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDelete(order._id)}>
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
