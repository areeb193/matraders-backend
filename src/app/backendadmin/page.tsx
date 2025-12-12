"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { 
  Folder, 
  Package, 
  ShoppingCart,
  Database,
  ArrowRight,
  CheckCircle,
  XCircle,
  RefreshCw,
  Image,
  Search
} from 'lucide-react';
import Link from 'next/link';

export default function BackendAdminDashboard() {
  const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [counts, setCounts] = useState({ categories: 0, products: 0, orders: 0, files: 0 });

  const checkConnection = async () => {
    setDbStatus('checking');
    try {
      const [catRes, prodRes, ordRes, filesRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/products'),
        fetch('/api/orders'),
        fetch('/api/upload'),
      ]);
      
      if (catRes.ok && prodRes.ok && ordRes.ok) {
        const [cats, prods, ords, filesData] = await Promise.all([
          catRes.json(),
          prodRes.json(),
          ordRes.json(),
          filesRes.ok ? filesRes.json() : { files: [] },
        ]);
        setCounts({
          categories: Array.isArray(cats) ? cats.length : 0,
          products: Array.isArray(prods) ? prods.length : 0,
          orders: Array.isArray(ords) ? ords.length : 0,
          files: filesData.files?.length || 0,
        });
        setDbStatus('connected');
      } else {
        setDbStatus('error');
      }
    } catch {
      setDbStatus('error');
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const adminPages = [
    {
      title: 'Categories',
      description: 'Manage product categories (CRUD)',
      href: '/backendadmin/categories',
      icon: Folder,
      color: 'bg-blue-500',
      count: counts.categories,
    },
    {
      title: 'Products',
      description: 'Manage products with image upload (CRUD)',
      href: '/backendadmin/products',
      icon: Package,
      color: 'bg-green-500',
      count: counts.products,
    },
    {
      title: 'Orders',
      description: 'Manage orders with product references (CRUD)',
      href: '/backendadmin/orders',
      icon: ShoppingCart,
      color: 'bg-orange-500',
      count: counts.orders,
    },
    {
      title: 'Media Library',
      description: 'Upload and manage images/files',
      href: '/backendadmin/media',
      icon: Image,
      color: 'bg-purple-500',
      count: counts.files,
    },
    {
      title: 'Search',
      description: 'Search products, categories & orders',
      href: '/backendadmin/search',
      icon: Search,
      color: 'bg-pink-500',
      count: null,
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Backend Admin Dashboard</h1>
        <p className="text-gray-600">
          Manage your Categories, Products, and Orders (15 API endpoints)
        </p>
      </div>

      {/* API Status Card */}
      <Card className="mb-8 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            MongoDB Connection Status
            <Button variant="ghost" size="sm" onClick={checkConnection} className="ml-auto">
              <RefreshCw className={`h-4 w-4 ${dbStatus === 'checking' ? 'animate-spin' : ''}`} />
            </Button>
          </CardTitle>
          <CardDescription className="flex items-center gap-2">
            {dbStatus === 'checking' && <span className="text-yellow-600">Checking connection...</span>}
            {dbStatus === 'connected' && (
              <>
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-green-600">Connected to MongoDB Atlas</span>
              </>
            )}
            {dbStatus === 'error' && (
              <>
                <XCircle className="h-4 w-4 text-red-500" />
                <span className="text-red-600">Connection failed - check .env MONGO_URI</span>
              </>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 text-sm">
            <div className="p-3 bg-white dark:bg-gray-800 rounded border">
              <strong>Categories API:</strong>
              <code className="block text-xs mt-1 text-blue-600">/api/categories</code>
              <span className="text-xs text-gray-500">5 endpoints (CRUD)</span>
            </div>
            <div className="p-3 bg-white dark:bg-gray-800 rounded border">
              <strong>Products API:</strong>
              <code className="block text-xs mt-1 text-green-600">/api/products</code>
              <span className="text-xs text-gray-500">5 endpoints + image upload</span>
            </div>
            <div className="p-3 bg-white dark:bg-gray-800 rounded border">
              <strong>Orders API:</strong>
              <code className="block text-xs mt-1 text-orange-600">/api/orders</code>
              <span className="text-xs text-gray-500">5 endpoints (CRUD)</span>
            </div>
            <div className="p-3 bg-white dark:bg-gray-800 rounded border">
              <strong>Upload API:</strong>
              <code className="block text-xs mt-1 text-purple-600">/api/upload</code>
              <span className="text-xs text-gray-500">File upload routes</span>
            </div>
            <div className="p-3 bg-white dark:bg-gray-800 rounded border">
              <strong>Search API:</strong>
              <code className="block text-xs mt-1 text-pink-600">/api/search</code>
              <span className="text-xs text-gray-500">Search route</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Management Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {adminPages.map((page) => (
          <Card key={page.href} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className={`w-12 h-12 ${page.color} rounded-lg flex items-center justify-center mb-4`}>
                <page.icon className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="flex items-center justify-between text-lg">
                {page.title}
                {page.count !== null && (
                  <span className="text-sm font-normal bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {page.count}
                  </span>
                )}
              </CardTitle>
              <CardDescription className="text-xs">{page.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={page.href}>
                <Button className="w-full" size="sm">
                  {page.title === 'Search' ? 'Search' : `Manage`}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Instructions */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Testing Instructions (Assignment)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded">
            <strong>Step 1:</strong> Create Categories first (e.g., &quot;Electronics&quot;, &quot;Apparel&quot;)
          </div>
          <div className="p-3 bg-green-50 dark:bg-green-950 rounded">
            <strong>Step 2:</strong> Create Products (requires a Category ID from Step 1)
          </div>
          <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded">
            <strong>Step 3:</strong> Create Orders (requires Product IDs from Step 2)
          </div>
          <p className="text-gray-500 mt-4 border-t pt-4">
            <strong>Postman Testing:</strong> You can also test APIs directly at{' '}
            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">http://localhost:3000/api/categories</code>,{' '}
            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">/api/products</code>,{' '}
            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">/api/orders</code>
          </p>
        </CardContent>
      </Card>

      {/* API Endpoints Reference Table */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>All 15 API Endpoints Reference (Assignment)</CardTitle>
          <CardDescription>Total Endpoints: 15 (5 per model) - Use Postman to test</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border p-2 text-left">Route</th>
                  <th className="border p-2 text-left">Method</th>
                  <th className="border p-2 text-left">Purpose</th>
                  <th className="border p-2 text-left">Expected Status</th>
                  <th className="border p-2 text-left">Verification Point</th>
                </tr>
              </thead>
              <tbody>
                {/* Categories */}
                <tr className="bg-blue-50 dark:bg-blue-950">
                  <td className="border p-2 font-mono">/api/categories</td>
                  <td className="border p-2"><span className="bg-green-200 text-green-800 px-2 py-0.5 rounded text-xs">POST</span></td>
                  <td className="border p-2">Create Category</td>
                  <td className="border p-2">201 Created</td>
                  <td className="border p-2">Returns new Category with _id</td>
                </tr>
                <tr>
                  <td className="border p-2 font-mono">/api/categories/:id</td>
                  <td className="border p-2"><span className="bg-blue-200 text-blue-800 px-2 py-0.5 rounded text-xs">GET</span></td>
                  <td className="border p-2">Read One</td>
                  <td className="border p-2">200 OK</td>
                  <td className="border p-2">Returns the created category</td>
                </tr>
                <tr className="bg-blue-50 dark:bg-blue-950">
                  <td className="border p-2 font-mono">/api/categories</td>
                  <td className="border p-2"><span className="bg-blue-200 text-blue-800 px-2 py-0.5 rounded text-xs">GET</span></td>
                  <td className="border p-2">Read All</td>
                  <td className="border p-2">200 OK</td>
                  <td className="border p-2">Returns array of categories</td>
                </tr>
                <tr>
                  <td className="border p-2 font-mono">/api/categories/:id</td>
                  <td className="border p-2"><span className="bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded text-xs">PUT</span></td>
                  <td className="border p-2">Update Category</td>
                  <td className="border p-2">200 OK</td>
                  <td className="border p-2">Verifies update functionality</td>
                </tr>
                <tr className="bg-blue-50 dark:bg-blue-950">
                  <td className="border p-2 font-mono">/api/categories/:id</td>
                  <td className="border p-2"><span className="bg-red-200 text-red-800 px-2 py-0.5 rounded text-xs">DELETE</span></td>
                  <td className="border p-2">Delete Category</td>
                  <td className="border p-2">200 OK</td>
                  <td className="border p-2">Verifies delete functionality</td>
                </tr>

                {/* Products */}
                <tr className="bg-green-50 dark:bg-green-950">
                  <td className="border p-2 font-mono">/api/products</td>
                  <td className="border p-2"><span className="bg-green-200 text-green-800 px-2 py-0.5 rounded text-xs">POST</span></td>
                  <td className="border p-2">Create Product</td>
                  <td className="border p-2">201 Created</td>
                  <td className="border p-2">Body must have valid Category ID. Shows populated category</td>
                </tr>
                <tr>
                  <td className="border p-2 font-mono">/api/products</td>
                  <td className="border p-2"><span className="bg-blue-200 text-blue-800 px-2 py-0.5 rounded text-xs">GET</span></td>
                  <td className="border p-2">Read All</td>
                  <td className="border p-2">200 OK</td>
                  <td className="border p-2">Returns products with populated category names</td>
                </tr>
                <tr className="bg-green-50 dark:bg-green-950">
                  <td className="border p-2 font-mono">/api/products/:id</td>
                  <td className="border p-2"><span className="bg-blue-200 text-blue-800 px-2 py-0.5 rounded text-xs">GET</span></td>
                  <td className="border p-2">Read One</td>
                  <td className="border p-2">200 OK</td>
                  <td className="border p-2">Returns product with populated category</td>
                </tr>
                <tr>
                  <td className="border p-2 font-mono">/api/products/:id</td>
                  <td className="border p-2"><span className="bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded text-xs">PUT</span></td>
                  <td className="border p-2">Update Product</td>
                  <td className="border p-2">200 OK</td>
                  <td className="border p-2">{`Send { "price": 99.99 }. Verify update`}</td>
                </tr>
                <tr className="bg-green-50 dark:bg-green-950">
                  <td className="border p-2 font-mono">/api/products/:id</td>
                  <td className="border p-2"><span className="bg-red-200 text-red-800 px-2 py-0.5 rounded text-xs">DELETE</span></td>
                  <td className="border p-2">Delete Product</td>
                  <td className="border p-2">200 OK</td>
                  <td className="border p-2">GET same ID returns 404</td>
                </tr>

                {/* Orders */}
                <tr className="bg-orange-50 dark:bg-orange-950">
                  <td className="border p-2 font-mono">/api/orders</td>
                  <td className="border p-2"><span className="bg-green-200 text-green-800 px-2 py-0.5 rounded text-xs">POST</span></td>
                  <td className="border p-2">Create Order</td>
                  <td className="border p-2">201 Created</td>
                  <td className="border p-2">Body must have valid Product ID in items array</td>
                </tr>
                <tr>
                  <td className="border p-2 font-mono">/api/orders</td>
                  <td className="border p-2"><span className="bg-blue-200 text-blue-800 px-2 py-0.5 rounded text-xs">GET</span></td>
                  <td className="border p-2">Read All</td>
                  <td className="border p-2">200 OK</td>
                  <td className="border p-2">Returns orders with populated product names</td>
                </tr>
                <tr className="bg-orange-50 dark:bg-orange-950">
                  <td className="border p-2 font-mono">/api/orders/:id</td>
                  <td className="border p-2"><span className="bg-blue-200 text-blue-800 px-2 py-0.5 rounded text-xs">GET</span></td>
                  <td className="border p-2">Read One</td>
                  <td className="border p-2">200 OK</td>
                  <td className="border p-2">Returns specific order with populated products</td>
                </tr>
                <tr>
                  <td className="border p-2 font-mono">/api/orders/:id</td>
                  <td className="border p-2"><span className="bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded text-xs">PUT</span></td>
                  <td className="border p-2">Update Order</td>
                  <td className="border p-2">200 OK</td>
                  <td className="border p-2">{`Send { "status": "Shipped" }. Verify change`}</td>
                </tr>
                <tr className="bg-orange-50 dark:bg-orange-950">
                  <td className="border p-2 font-mono">/api/orders/:id</td>
                  <td className="border p-2"><span className="bg-red-200 text-red-800 px-2 py-0.5 rounded text-xs">DELETE</span></td>
                  <td className="border p-2">Delete Order</td>
                  <td className="border p-2">200 OK</td>
                  <td className="border p-2">GET same ID returns 404</td>
                </tr>

                {/* Error handling test */}
                <tr className="bg-red-50 dark:bg-red-950">
                  <td className="border p-2 font-mono">/api/categories/invalidID</td>
                  <td className="border p-2"><span className="bg-blue-200 text-blue-800 px-2 py-0.5 rounded text-xs">GET</span></td>
                  <td className="border p-2">Test 404</td>
                  <td className="border p-2">404 Not Found</td>
                  <td className="border p-2">Ensures correct handling of non-existent IDs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
