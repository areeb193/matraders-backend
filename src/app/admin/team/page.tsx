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
  Users,
  Upload,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const TeamManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  
  // Mock data
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'Ahmad Hassan',
      role: 'Chief Executive Officer',
      department: 'Management',
      email: 'ahmad@matraders.com',
      phone: '+92 300 1234567',
      location: 'Lahore',
      bio: 'Over 15 years of experience in renewable energy sector. Leading MA Traders towards sustainable energy solutions.',
      joinDate: '2020-01-15',
      status: 'active',
      avatar: null
    },
    {
      id: 2,
      name: 'Sarah Khan',
      role: 'Solar Installation Manager',
      department: 'Engineering',
      email: 'sarah@matraders.com',
      phone: '+92 301 2345678',
      location: 'Lahore',
      bio: 'Certified solar installation expert with 8+ years experience. Manages all residential and commercial installations.',
      joinDate: '2021-03-20',
      status: 'active',
      avatar: null
    },
    {
      id: 3,
      name: 'Muhammad Ali',
      role: 'Sales Director',
      department: 'Sales',
      email: 'ali@matraders.com',
      phone: '+92 302 3456789',
      location: 'Islamabad',
      bio: 'Expert in solar energy solutions with excellent customer relationship skills. Drives our sales growth.',
      joinDate: '2020-08-10',
      status: 'active',
      avatar: null
    },
    {
      id: 4,
      name: 'Ali Ahmed',
      role: 'Customer Support Lead',
      department: 'Support',
      email: 'Ali@matraders.com',
      phone: '+92 303 4567890',
      location: 'Karachi',
      bio: 'Dedicated to providing excellent customer service and technical support for all solar installations.',
      joinDate: '2021-11-05',
      status: 'active',
      avatar: null
    },
    {
      id: 5,
      name: 'Omar Sheikh',
      role: 'Technical Engineer',
      department: 'Engineering',
      email: 'omar@matraders.com',
      phone: '+92 304 5678901',
      location: 'Lahore',
      bio: 'Electrical engineer specializing in solar system design and maintenance. Ensures quality installations.',
      joinDate: '2022-02-15',
      status: 'active',
      avatar: null
    }
  ]);

  const departments = ['all', 'Management', 'Engineering', 'Sales', 'Support', 'Marketing'];

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || member.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getDepartmentStats = () => {
    const stats: Record<string, number> = {};
    teamMembers.forEach(member => {
      stats[member.department] = (stats[member.department] || 0) + 1;
    });
    return stats;
  };

  const departmentStats = getDepartmentStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary">Team Management</h2>
          <p className="text-muted-foreground">Manage your team members and their information</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-energy text-primary-foreground shadow-energy">
              <Plus className="mr-2 h-4 w-4" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Team Member</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Ahmad Hassan" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Job Title</Label>
                  <Input id="role" placeholder="Solar Engineer" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="ahmad@matraders.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+92 300 1234567" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <select className="w-full p-2 border rounded-md">
                    {departments.slice(1).map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Lahore" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Brief description of the team member's role and experience"
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Profile Photo</Label>
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
                <Button className="bg-gradient-solar text-primary-foreground">Add Member</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Members</p>
                <p className="text-2xl font-bold text-primary">{teamMembers.length}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        {Object.entries(departmentStats).map(([dept, count]) => (
          <Card key={dept} className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{dept}</p>
                  <p className="text-2xl font-bold text-accent">{count}</p>
                </div>
                <Users className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Table */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select 
              className="w-full sm:w-48 p-2 border rounded-md"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="all">All Departments</option>
              {departments.slice(1).map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <Card key={member.id} className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-gradient-solar text-primary-foreground">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{member.name}</h3>
                      <p className="text-sm text-primary font-medium">{member.role}</p>
                      <Badge variant="outline" className="mt-1">{member.department}</Badge>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Mail className="mr-2 h-4 w-4" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="mr-2 h-4 w-4" />
                      <span>{member.phone}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-2 h-4 w-4" />
                      <span>{member.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                    {member.bio}
                  </p>
                  
                  <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    <span className="text-xs text-muted-foreground">
                      Joined {new Date(member.joinDate).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-8">
              <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No team members found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamManagement;