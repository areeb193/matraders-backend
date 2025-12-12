"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { ArrowLeft, Search, Loader2, Package, Folder, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface Category {
  _id: string;
  name: string;
  description: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  stockQuantity: number;
  image?: string;
}

interface OrderItem {
  product: Product | { _id: string; name: string };
  quantity: number;
  priceAtTimeOfOrder: number;
}

interface Order {
  _id: string;
  customerName: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
}

interface SearchResults {
  products?: Product[];
  categories?: Category[];
  orders?: Order[];
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState<SearchResults | null>(null);
  const [counts, setCounts] = useState({ products: 0, categories: 0, orders: 0 });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query && searchType === 'all') {
      setError('Please enter a search query');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const params = new URLSearchParams();
      if (query) params.set('q', query);
      params.set('type', searchType);
      if (minPrice) params.set('minPrice', minPrice);
      if (maxPrice) params.set('maxPrice', maxPrice);

      const res = await fetch(`/api/search?${params.toString()}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Search failed');

      setResults(data.results);
      setCounts(data.count);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Search failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/backendadmin">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Search</h1>
      </div>

      {/* Search Form */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Products, Categories & Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="query">Search Query</Label>
                <Input
                  id="query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, description, customer..."
                />
              </div>
              <div>
                <Label htmlFor="type">Search In</Label>
                <select
                  id="type"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="w-full border rounded p-2 bg-white dark:bg-gray-800"
                >
                  <option value="all">All</option>
                  <option value="products">Products Only</option>
                  <option value="categories">Categories Only</option>
                  <option value="orders">Orders Only</option>
                </select>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label htmlFor="minPrice">Min Price</Label>
                  <Input
                    id="minPrice"
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="maxPrice">Max Price</Label>
                  <Input
                    id="maxPrice"
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="∞"
                  />
                </div>
              </div>
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Search className="h-4 w-4 mr-2" />
              )}
              Search
            </Button>
          </form>

          {error && (
            <div className="mt-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 p-3 rounded">
              {error}
            </div>
          )}

          {/* API Info */}
          <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-800 rounded text-xs">
            <strong>API Endpoint:</strong>
            <code className="block mt-1 font-mono">
              GET /api/search?q=query&type=all&minPrice=0&maxPrice=100
            </code>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded">
              <div className="flex items-center gap-2">
                <Folder className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">{counts.categories} Categories</span>
              </div>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-950 rounded">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-green-600" />
                <span className="font-semibold">{counts.products} Products</span>
              </div>
            </div>
            <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-orange-600" />
                <span className="font-semibold">{counts.orders} Orders</span>
              </div>
            </div>
          </div>

          {/* Categories Results */}
          {results.categories && results.categories.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Folder className="h-5 w-5" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {results.categories.map((cat) => (
                    <Link
                      key={cat._id}
                      href={`/backendadmin/categories/${cat._id}`}
                      className="block p-3 border rounded hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <p className="font-semibold">{cat.name}</p>
                      <p className="text-sm text-gray-500">{cat.description || 'No description'}</p>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Products Results */}
          {results.products && results.products.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.products.map((prod) => (
                    <Link
                      key={prod._id}
                      href={`/backendadmin/products/${prod._id}`}
                      className="block p-3 border rounded hover:shadow-md transition-shadow"
                    >
                      {prod.image && (
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-full h-32 object-cover rounded mb-2"
                        />
                      )}
                      <p className="font-semibold">{prod.name}</p>
                      <p className="text-green-600 font-mono">${prod.price.toFixed(2)}</p>
                      <p className="text-xs text-gray-500">
                        Category: {prod.category?.name || 'N/A'} | Stock: {prod.stockQuantity}
                      </p>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Orders Results */}
          {results.orders && results.orders.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {results.orders.map((order) => (
                    <Link
                      key={order._id}
                      href={`/backendadmin/orders/${order._id}`}
                      className="block p-3 border rounded hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{order.customerName}</p>
                          <p className="text-sm text-gray-500">
                            {order.items.length} item(s)
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-mono text-green-600">${order.totalAmount.toFixed(2)}</p>
                          <span className={`text-xs px-2 py-1 rounded ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* No Results */}
          {counts.products === 0 && counts.categories === 0 && counts.orders === 0 && (
            <Card>
              <CardContent className="py-12 text-center text-gray-500">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No results found for &quot;{query}&quot;</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
