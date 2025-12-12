"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
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
  HelpCircle,
  GripVertical,
  Eye,
  EyeOff
} from 'lucide-react';

const FAQManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: 'How long does solar panel installation take?',
      answer: 'Typical residential installations take 1-3 days depending on system size. Commercial projects may take 1-2 weeks.',
      category: 'Installation',
      status: 'active',
      order: 1,
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      question: 'What is the warranty on solar panels?',
      answer: 'We provide 25-year performance warranty on solar panels and 10-year warranty on inverters and other components.',
      category: 'Warranty',
      status: 'active',
      order: 2,
      createdAt: '2024-01-14'
    },
    {
      id: 3,
      question: 'How much can I save on electricity bills?',
      answer: 'Savings typically range from 70-90% depending on your energy usage, system size, and local electricity rates.',
      category: 'Savings',
      status: 'active',
      order: 3,
      createdAt: '2024-01-13'
    },
    {
      id: 4,
      question: 'Do solar panels work during cloudy weather?',
      answer: 'Yes, solar panels still generate electricity on cloudy days, though at reduced efficiency (typically 10-25% of peak output).',
      category: 'Performance',
      status: 'draft',
      order: 4,
      createdAt: '2024-01-12'
    },
    {
      id: 5,
      question: 'What maintenance do solar panels require?',
      answer: 'Solar panels require minimal maintenance - mainly periodic cleaning and annual inspections. We provide maintenance services.',
      category: 'Maintenance',
      status: 'active',
      order: 5,
      createdAt: '2024-01-11'
    }
  ]);

  const categories = ['All', 'Installation', 'Warranty', 'Savings', 'Performance', 'Maintenance', 'Financing'];

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'draft': return 'secondary';
      case 'archived': return 'outline';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary">FAQ Management</h2>
          <p className="text-muted-foreground">Manage frequently asked questions for your website</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-energy text-primary-foreground shadow-energy">
              <Plus className="mr-2 h-4 w-4" />
              Add New FAQ
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New FAQ</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question">Question</Label>
                <Textarea 
                  id="question" 
                  placeholder="Enter the frequently asked question"
                  className="min-h-[80px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="answer">Answer</Label>
                <Textarea 
                  id="answer" 
                  placeholder="Enter the detailed answer"
                  className="min-h-[120px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select className="w-full p-2 border rounded-md">
                    {categories.slice(1).map(category => (
                      <option key={category} value={category.toLowerCase()}>{category}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-gradient-solar text-primary-foreground">Save FAQ</Button>
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
                <p className="text-sm font-medium text-muted-foreground">Total FAQs</p>
                <p className="text-2xl font-bold text-primary">{faqs.length}</p>
              </div>
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active FAQs</p>
                <p className="text-2xl font-bold text-success">
                  {faqs.filter(faq => faq.status === 'active').length}
                </p>
              </div>
              <Eye className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Draft FAQs</p>
                <p className="text-2xl font-bold text-secondary">
                  {faqs.filter(faq => faq.status === 'draft').length}
                </p>
              </div>
              <EyeOff className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold text-accent">{categories.length - 1}</p>
              </div>
              <HelpCircle className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>FAQ List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* FAQ Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10"></TableHead>
                  <TableHead>Question</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFAQs.map((faq) => (
                  <TableRow key={faq.id} className="hover:bg-muted/50">
                    <TableCell>
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                    </TableCell>
                    <TableCell>
                      <div className="max-w-md">
                        <p className="font-medium text-foreground truncate">{faq.question}</p>
                        <p className="text-sm text-muted-foreground truncate">{faq.answer}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{faq.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeColor(faq.status)}>
                        {faq.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(faq.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
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

          {filteredFAQs.length === 0 && (
            <div className="text-center py-8">
              <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No FAQs found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FAQManagement;