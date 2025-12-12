"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Settings, 
  Upload 
} from 'lucide-react';

const ServicesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const services = [
    {
      id: 1,
      title: 'Solar System Installation',
      description: 'Complete solar panel installation for residential and commercial properties',
      image: '/placeholder.svg',
      status: 'Active',
      category: 'Installation',
      price: 'Starting from PKR 150,000',
      featured: true
    },
    {
      id: 2,
      title: 'Net Metering Solutions',
      description: 'Help customers connect to the grid and sell excess energy back',
      image: '/placeholder.svg',
      status: 'Active',
      category: 'Grid Connection',
      price: 'PKR 25,000',
      featured: false
    },
    {
      id: 3,
      title: 'Solar Maintenance & Repair',
      description: 'Regular maintenance and repair services for existing solar systems',
      image: '/placeholder.svg',
      status: 'Active',
      category: 'Maintenance',
      price: 'PKR 5,000/visit',
      featured: true
    },
    {
      id: 4,
      title: 'Customized Solar Design',
      description: 'Professional solar system design based on your specific requirements',
      image: '/placeholder.svg',
      status: 'Inactive',
      category: 'Design',
      price: 'PKR 15,000',
      featured: false
    },
  ];

  const categories = ['All', 'Installation', 'Grid Connection', 'Maintenance', 'Design'];

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeColor = (status: string) => {
    return status === 'Active' ? 'default' : 'secondary';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Services Management</h1>
          <p className="text-muted-foreground">Manage your solar energy services</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-solar">
              <Plus className="h-4 w-4 mr-2" />
              Add New Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
              <DialogDescription>
                Create a new service offering for your customers.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Service Title" />
              <Textarea placeholder="Service Description" />
              <Input placeholder="Starting Price (e.g., PKR 50,000)" />
              <div className="flex items-center space-x-2">
                <Button variant="outline" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Service Image
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="featured" />
                <label htmlFor="featured" className="text-sm font-medium">
                  Feature this service
                </label>
              </div>
              <div className="flex space-x-2">
                <Button className="flex-1">Save Service</Button>
                <Button variant="outline" className="flex-1">Save as Draft</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Services</p>
                <p className="text-2xl font-bold">{services.length}</p>
              </div>
              <Settings className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Services</p>
                <p className="text-2xl font-bold">{services.filter(s => s.status === 'Active').length}</p>
              </div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Featured Services</p>
                <p className="text-2xl font-bold">{services.filter(s => s.featured).length}</p>
              </div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold">{categories.length - 1}</p>
              </div>
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Services</CardTitle>
          <CardDescription>Manage your service offerings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium">{service.title}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{service.category}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{service.price}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeColor(service.status)}>
                      {service.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {service.featured && (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        Featured
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServicesManagement;