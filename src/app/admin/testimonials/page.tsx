"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Star,
  Upload,
  CheckCircle,
  Clock,
  X,
  Eye
} from 'lucide-react';

const TestimonialsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  // Mock data
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      customerName: 'Ahmed Hassan',
      location: 'DHA Lahore',
      rating: 5,
      review: 'Excellent service! MA Traders installed our 10kW system perfectly. Already saving 80% on electricity bills. Professional team and quality equipment.',
      projectType: 'Residential',
      systemSize: '10kW',
      status: 'approved',
      featured: true,
      submittedDate: '2024-01-20',
      approvedDate: '2024-01-21'
    },
    {
      id: 2,
      customerName: 'Ali Khan',
      location: 'Johar Town, Lahore',
      rating: 5,
      review: 'Professional team, quality equipment, and great after-sales support. Highly recommended for anyone looking for solar solutions.',
      projectType: 'Residential',
      systemSize: '7kW',
      status: 'approved',
      featured: false,
      submittedDate: '2024-01-18',
      approvedDate: '2024-01-19'
    },
    {
      id: 3,
      customerName: 'Muhammad Ali',
      location: 'Gulberg, Lahore',
      rating: 4,
      review: 'Best solar company in Lahore. Transparent pricing and excellent installation quality. Minor delay in delivery but overall satisfied.',
      projectType: 'Commercial',
      systemSize: '25kW',
      status: 'pending',
      featured: false,
      submittedDate: '2024-01-22'
    },
    {
      id: 4,
      customerName: 'Sarah Ahmed',
      location: 'Model Town, Karachi',
      rating: 5,
      review: 'Outstanding customer service from start to finish. The installation was completed in 2 days and the system is working perfectly.',
      projectType: 'Residential',
      systemSize: '12kW',
      status: 'approved',
      featured: true,
      submittedDate: '2024-01-15',
      approvedDate: '2024-01-16'
    },
    {
      id: 5,
      customerName: 'Omar Sheikh',
      location: 'F-7, Islamabad',
      rating: 3,
      review: 'Good quality panels but customer service could be improved. Installation took longer than expected.',
      projectType: 'Residential',
      systemSize: '8kW',
      status: 'rejected',
      featured: false,
      submittedDate: '2024-01-10',
      rejectedDate: '2024-01-12'
    }
  ]);

  const statuses = ['all', 'pending', 'approved', 'rejected'];

  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = testimonial.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.review.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || testimonial.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'approved': return 'default';
      case 'pending': return 'secondary';
      case 'rejected': return 'destructive';
      default: return 'outline';
    }
  };

  const getRatingStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-secondary fill-current' : 'text-muted-foreground'}`} 
      />
    ));
  };

  const updateTestimonialStatus = (id: number, newStatus: string) => {
    setTestimonials(prev => prev.map(testimonial => 
      testimonial.id === id 
        ? { ...testimonial, status: newStatus }
        : testimonial
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary">Testimonials Management</h2>
          <p className="text-muted-foreground">Manage customer reviews and testimonials</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-energy text-primary-foreground shadow-energy">
              <Plus className="mr-2 h-4 w-4" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Testimonial</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input id="customerName" placeholder="Ahmed Hassan" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="DHA Lahore" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="projectType">Project Type</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="industrial">Industrial</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="systemSize">System Size</Label>
                  <Input id="systemSize" placeholder="10kW" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Rating</Label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button key={star} variant="ghost" size="sm" className="p-1">
                      <Star className="h-5 w-5 text-muted-foreground hover:text-secondary" />
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="review">Review</Label>
                <Textarea 
                  id="review" 
                  placeholder="Customer's review and feedback"
                  className="min-h-[120px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Customer Photo</Label>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback>AH</AvatarFallback>
                  </Avatar>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photo
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-gradient-solar text-primary-foreground">Add Testimonial</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Reviews</p>
                <p className="text-2xl font-bold text-primary">{testimonials.length}</p>
              </div>
              <Star className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-success">
                  {testimonials.filter(t => t.status === 'approved').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-secondary">
                  {testimonials.filter(t => t.status === 'pending').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                <p className="text-2xl font-bold text-accent">
                  {(testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)}
                </p>
              </div>
              <Star className="h-8 w-8 text-accent fill-current" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Testimonials</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search testimonials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select 
              className="w-full sm:w-48 p-2 border rounded-md"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              {statuses.slice(1).map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Review</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTestimonials.map((testimonial) => (
                  <TableRow key={testimonial.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gradient-solar text-primary-foreground text-sm">
                            {testimonial.customerName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{testimonial.customerName}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        {getRatingStars(testimonial.rating)}
                        <span className="ml-2 text-sm text-muted-foreground">({testimonial.rating})</span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="text-sm line-clamp-2">{testimonial.review}</p>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="font-medium">{testimonial.projectType}</p>
                        <p className="text-muted-foreground">{testimonial.systemSize}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getStatusBadgeColor(testimonial.status)}>
                          {testimonial.status}
                        </Badge>
                        {testimonial.featured && (
                          <Badge variant="outline" className="text-xs">Featured</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(testimonial.submittedDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        {testimonial.status === 'pending' && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-success hover:text-success"
                              onClick={() => updateTestimonialStatus(testimonial.id, 'approved')}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-destructive hover:text-destructive"
                              onClick={() => updateTestimonialStatus(testimonial.id, 'rejected')}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
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
          </div>

          {filteredTestimonials.length === 0 && (
            <div className="text-center py-8">
              <Star className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No testimonials found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TestimonialsManagement;