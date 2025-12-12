"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  MapPin,
  Zap,
  DollarSign,
  Users
} from 'lucide-react';

const ProjectsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Green Valley Residential Complex',
      client: 'Green Valley Housing Society',
      location: 'Lahore, Punjab',
      capacity: '500kW',
      status: 'Completed',
      startDate: '2024-01-15',
      endDate: '2024-03-20',
      budget: 15000000,
      description: 'Large scale residential solar installation with 1500 panels',
      image: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Industrial Solar Farm',
      client: 'ABC Manufacturing Ltd',
      location: 'Faisalabad, Punjab',
      capacity: '2MW',
      status: 'In Progress',
      startDate: '2024-02-01',
      endDate: '2024-05-30',
      budget: 45000000,
      description: 'Industrial scale solar farm for manufacturing facility',
      image: '/placeholder.svg'
    },
    {
      id: 3,
      name: 'Hospital Solar System',
      client: 'City General Hospital',
      location: 'Karachi, Sindh',
      capacity: '300kW',
      status: 'Planning',
      startDate: '2024-04-01',
      endDate: '2024-06-15',
      budget: 8500000,
      description: 'Backup solar system for critical healthcare facility',
      image: '/placeholder.svg'
    }
  ]);

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-success text-success-foreground';
      case 'In Progress': return 'bg-primary text-primary-foreground';
      case 'Planning': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">Projects Management</h1>
          <p className="text-muted-foreground">Manage your solar installation projects</p>
        </div>
        <Button className="bg-gradient-solar text-primary-foreground shadow-solar">
          <Plus className="mr-2 h-4 w-4" />
          Add New Project
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover-lift">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <CardDescription className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {project.client}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  {project.location}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Zap className="h-3 w-3 mr-1" />
                  {project.capacity}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(project.startDate).toLocaleDateString()}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <DollarSign className="h-3 w-3 mr-1" />
                  Rs. {(project.budget / 1000000).toFixed(1)}M
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <Search className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">No projects found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default ProjectsManagement;