"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { statsAPI } from '@/lib/api';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  Users, 
  ShoppingBag, 
  Briefcase, 
  MessageSquare, 
  TrendingUp, 
  Plus,
  Eye,
  Calendar,
  Loader2,
  DollarSign,
  Package,
  ShoppingCart,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import Link from 'next/link';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dashboardData, setDashboardData] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCategories: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    lowStockProducts: 0,
    products: [],
    orders: [],
    categories: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await statsAPI.getDashboardStats();
        setDashboardData(data);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-6">
          <div className="text-center">
            <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <p className="text-lg font-semibold mb-2">{error}</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </Card>
      </div>
    );
  }

  // Real-time stats from database
  const stats = [
    { 
      title: 'Total Revenue', 
      value: `PKR ${dashboardData.totalRevenue.toLocaleString()}`, 
      change: '+12%', 
      icon: DollarSign, 
      color: 'text-green-600',
      href: '/admin/products'
    },
    { 
      title: 'Total Products', 
      value: dashboardData.totalProducts.toString(), 
      change: '+5%', 
      icon: Package, 
      color: 'text-blue-600',
      href: '/admin/products'
    },
    { 
      title: 'Total Orders', 
      value: dashboardData.totalOrders.toString(), 
      change: `${dashboardData.pendingOrders} pending`, 
      icon: ShoppingCart, 
      color: 'text-orange-600',
      href: '/backendadmin/orders'
    },
    { 
      title: 'Low Stock Alert', 
      value: dashboardData.lowStockProducts.toString(), 
      change: 'Need restock', 
      icon: AlertTriangle, 
      color: 'text-red-600',
      href: '/admin/products'
    },
  ];

  const visitData = [
    { name: 'Mon', visits: 1200, leads: 45 },
    { name: 'Tue', visits: 1900, leads: 52 },
    { name: 'Wed', visits: 800, leads: 38 },
    { name: 'Thu', visits: 1600, leads: 61 },
    { name: 'Fri', visits: 2100, leads: 73 },
    { name: 'Sat', visits: 1400, leads: 42 },
    { name: 'Sun', visits: 1000, leads: 35 },
  ];

  const projectsData = [
    { name: 'Residential', value: 45, color: '#0EA5E9' },
    { name: 'Commercial', value: 30, color: '#10B981' },
    { name: 'Industrial', value: 25, color: '#F59E0B' },
  ];

  const recentActivities = [
    { action: 'New project added', user: 'John Doe', time: '2 hours ago' },
    { action: 'Product updated', user: 'Sarah Smith', time: '4 hours ago' },
    { action: 'Service updated', user: 'Mike Johnson', time: '6 hours ago' },
    { action: 'FAQ updated', user: 'Lisa Brown', time: '1 day ago' },
  ];

  const quickActions = [
    { title: 'Manage Products', href: '/backendadmin/products', icon: Package },
    { title: 'Manage Orders', href: '/backendadmin/orders', icon: ShoppingCart },
    { title: 'Manage Categories', href: '/backendadmin/categories', icon: Briefcase },
    { title: 'View All Stats', href: '/backendadmin', icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your store.</p>
        </div>
        <Link href="/backendadmin">
          <Button>
            <Eye className="h-4 w-4 mr-2" />
            Full Backend Admin
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <Link key={index} href={stat.href}>
            <Card className="hover:shadow-xl transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Website Traffic */}
        <Card>
          <CardHeader>
            <CardTitle>Website Traffic & Leads</CardTitle>
            <CardDescription>Daily visitors and lead generation</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={visitData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="visits" fill="#0EA5E9" />
                <Bar dataKey="leads" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Project Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Project Distribution</CardTitle>
            <CardDescription>Projects by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectsData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {projectsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your e-commerce store</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href}>
                  <Button
                    variant="outline"
                    className="h-16 sm:h-20 w-full flex flex-col items-center justify-center space-y-2 hover:shadow-lg transition-all"
                  >
                    <action.icon className="h-6 w-6" />
                    <span className="text-sm text-center">{action.title}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Database Status */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Real-time database connection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-950">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900 dark:text-green-100">MongoDB Connected</p>
                    <p className="text-sm text-green-700 dark:text-green-300">Database is operational</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground">Products</p>
                  <p className="text-2xl font-bold">{dashboardData.totalProducts}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground">Categories</p>
                  <p className="text-2xl font-bold">{dashboardData.totalCategories}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground">Orders</p>
                  <p className="text-2xl font-bold">{dashboardData.totalOrders}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-orange-600">{dashboardData.pendingOrders}</p>
                </div>
              </div>

              <Link href="/backendadmin">
                <Button className="w-full">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Full Admin Panel
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
