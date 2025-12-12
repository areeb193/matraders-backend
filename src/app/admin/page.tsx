"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  Calendar
} from 'lucide-react';

const Dashboard = () => {
  const [showPayloadIframe, setShowPayloadIframe] = useState(false);

  const openPayloadAdmin = () => {
    if (typeof window !== 'undefined') {
      window.open('http://localhost:4000/admin', '_blank', 'noopener,noreferrer');
    }
  };

  const togglePayloadIframe = () => {
    setShowPayloadIframe((p) => !p);
  };

  // Mock data
  const stats = [
    { title: 'Total Projects', value: '156', change: '+12%', icon: Briefcase, color: 'text-blue-600' },
    { title: 'Active Products', value: '89', change: '+5%', icon: ShoppingBag, color: 'text-green-600' },
    { title: 'Team Members', value: '24', change: '+2', icon: Users, color: 'text-purple-600' },
    { title: 'New Leads', value: '47', change: '+18%', icon: MessageSquare, color: 'text-orange-600' },
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
    { title: 'Add New Service', href: '/admin/services/new', icon: Plus },
    { title: 'Add New Product', href: '/admin/products/new', icon: Plus },
    { title: 'Add Team Member', href: '/admin/team/new', icon: Plus },
    { title: 'Add Project', href: '/admin/projects/new', icon: Plus },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
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
            <CardDescription>Frequently used actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-16 sm:h-20 flex flex-col items-center justify-center space-y-2 hover-scale"
                >
                  <action.icon className="h-6 w-6" />
                  <span className="text-sm text-center">{action.title}</span>
                </Button>
              ))}

              {/* Payload admin buttons: open in new tab or preview inline */}
              <div className="col-span-full flex gap-3 mt-2 sm:col-span-2">
                <Button onClick={openPayloadAdmin} className="w-full">
                  Open Payload Admin (new tab)
                </Button>
                <Button onClick={togglePayloadIframe} className="w-full">
                  {showPayloadIframe ? 'Hide' : 'Preview'} Payload Admin
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest system activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">by {activity.user}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4">
              <Eye className="h-4 w-4 mr-2" />
              View All Activities
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Inline iframe preview (shown when toggled) */}
      {showPayloadIframe && (
        <div className="w-full h-[70vh] bg-white rounded-lg overflow-hidden border">
          <iframe
            src="http://localhost:4000/admin"
            title="Payload Admin Preview"
            className="w-full h-full"
            frameBorder="0"
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;