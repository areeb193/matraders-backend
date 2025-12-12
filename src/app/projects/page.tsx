"use client";

import React, { useState } from 'react';
import  Link  from 'next/link';
import CallButton from "@/components/ui/callButton";
import BrowseButton from "@/components/ui/browseButton";
import AboutCompanyButton from "@/components/ui/aboutButtons"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin,
  Calendar,
  Zap,
  TrendingUp,
  Home,
  Building,
  Factory,
  ArrowRight,
  CheckCircle,
  Sun
} from 'lucide-react';
import { FaSolarPanel } from 'react-icons/fa';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const projectCategories = [
    { id: 'all', name: 'All Projects', icon: <FaSolarPanel className="h-4 w-4" /> },
    { id: 'residential', name: 'Residential', icon: <Home className="h-4 w-4" /> },
    { id: 'commercial', name: 'Commercial', icon: <Building className="h-4 w-4" /> },
    { id: 'industrial', name: 'Industrial', icon: <Factory className="h-4 w-4" /> }
  ];

  const projects = [
    {
      id: 1,
      title: 'Luxury Villa Solar Installation',
      category: 'residential',
      location: 'DHA Phase 5, Lahore',
      capacity: '15kW',
      panels: '26 x 580W Panels',
      completion: 'March 2024',
      savings: '85% Bill Reduction',
      timeline: '3 Days Installation',  
      investment: 'PKR 1,850,000',
      image1:"/bg2.jpg",
      image2:"/bg.jpg",
      description: 'Complete rooftop solar system with net metering for luxury residential property.',
      features: [
        'Tier-1 Monocrystalline Panels',
        'String Inverter Technology',
        'Net Metering Connection',
        'Smart Monitoring System',
        '25-Year Warranty'
      ],
      beforeimage1: '/placeholder.svg',
      afterimage1: '/placeholder.svg',
      status: 'Completed'
    },
    {
      id: 2,
      title: 'Shopping Mall Solar Project',
      category: 'commercial',
      location: 'Gulberg, Lahore',
            image2:"/bg.jpg",

      capacity: '200kW',
      panels: '348 x 575W Panels',
            image1:"/bg2.jpg",

      completion: 'January 2024',
      savings: '70% Bill Reduction',
      timeline: '2 Weeks Installation',
      investment: 'PKR 18,500,000',
      description: 'Large-scale commercial solar installation for shopping complex.',
      features: [
        'High-Efficiency Panels',
        'Three-Phase Inverters',
        'Elevated Structures',
        'Professional Cable Management',
        'Remote Monitoring'
      ],
      beforeimage1: '/placeholder.svg',
      afterimage1: '/placeholder.svg',
      status: 'Completed'
    },
    {
      id: 3,
      title: 'Textile Factory Solar System',
      category: 'industrial',
      location: 'Faisalabad Industrial Area',
            image2:"/bg.jpg",

      capacity: '500kW',
            image1:"/bg2.jpg",

      panels: '870 x 575W Panels',
      completion: 'February 2024',
      savings: '60% Bill Reduction',
      timeline: '4 Weeks Installation',
      investment: 'PKR 42,000,000',
      description: 'Industrial-scale solar installation for textile manufacturing facility.',
      features: [
        'Industrial-Grade Equipment',
        'Ground Mount Structures',
        'Grid-Tie System',
        'Load Management System',
        'Comprehensive O&M'
      ],
      beforeimage1: '/placeholder.svg',
      afterimage1: '/placeholder.svg',
      status: 'Completed'
    },
    {
      id: 4,
      title: 'Residential Community Project',
      category: 'residential',
      location: 'Johar Town, Lahore',
      capacity: '120kW',
      panels: '208 x 575W Panels',
            image1:"/bg2.jpg",
      image2:"/bg.jpg",

      completion: 'April 2024',
      savings: '80% Bill Reduction',
      timeline: '1 Week Installation',
      investment: 'PKR 12,800,000',
      description: 'Solar installation for residential community with shared infrastructure.',
      features: [
        'Community Solar Setup',
        'Individual Metering',
        'Shared O&M Costs',
        'Bulk Purchase Benefits',
        'Professional Management'
      ],
      beforeimage1: '/placeholder.svg',
      afterimage1: '/placeholder.svg',
      status: 'Completed'
    },
    {
      id: 5,
      title: 'Hospital Solar Installation',
      category: 'commercial',
      location: 'Model Town, Lahore',
      capacity: '100kW',
            image1:"/bg2.jpg",
      image2:"/bg.jpg",

      panels: '174 x 575W Panels',
      completion: 'May 2024',
      savings: '75% Bill Reduction',
      timeline: '10 Days Installation',
      investment: 'PKR 9,500,000',
      description: 'Critical facility solar installation with battery backup system.',
      features: [
        'Hybrid System with Batteries',
        'UPS Integration',
        'Critical Load Backup',
        'Smart Load Management',
        '24/7 Monitoring'
      ],
      beforeimage1: '/placeholder.svg',
      afterimage1: '/placeholder.svg',
      status: 'Completed'
    },
    {
      id: 6,
      title: 'School Solar Project',
      category: 'commercial',
      location: 'Cantt Area, Lahore',
      capacity: '50kW',
            image1:"/bg2.jpg",
      image2:"/bg.jpg",

      panels: '87 x 575W Panels',
      completion: 'June 2024',
      savings: '90% Bill Reduction',
      timeline: '5 Days Installation',
      investment: 'PKR 5,200,000',
      description: 'Educational institution solar project with student engagement program.',
      features: [
        'Educational Display System',
        'Student Learning Program',
        'Environmental Benefits',
        'Long-term Savings',
        'Community Impact'
      ],
      beforeimage1: '/placeholder.svg',
      afterimage1: '/placeholder.svg',
      status: 'Completed'
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const stats = [
    { label: 'Total Capacity Installed', value: '1000+ kW' },
    { label: 'Projects Completed', value: '100+' },
    { label: 'Average Savings', value: '75%' },
    { label: 'Customer Satisfaction', value: '98%' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
                  <section
                    className="relative py-28 bg-cover h-[90vh] bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/bg2.jpg')" }}
                  >
                    {/* Overlay for better text contrast */}
                    <div className="absolute inset-0 bg-black/60"></div>
            
                    <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
                      <Badge
                        className="mb-5 relative bg-primary/20 text-secondary border border-secondary/30 
                         font-semibold tracking-wide px-4 py-2 rounded-full ] 
                         backdrop-blur-md ] 
                         transition-all duration-300"
                      >
                        Our Projects
                      </Badge>
            
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight mb-6">
                         Our Work Reflects Our Commitment to
                         <span className="block text-secondary mt-2">
                           Excellence
                         </span>
                       </h1>
            
                      <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                        Real projects, real results. See how we have helped customers across Pakistan achieve energy independence and significant cost savings.
                      </p>
            
                    </div>
                  </section>

      {/* Stats Section */}
      <section className="relative py-12 bg-gray-100 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <h1 className='text-center text-3xl md:text-4xl font-heading font-bold text-primary mb-8 '>Our Values</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 hover-lift border-0 shadow-elegant">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground font-medium text-sm">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Project Categories */}
      <section className="py-20 bg-gradient-to-br from-sky-50 via-emerald-50 to-white" id="projects">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Projects Portfolio
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse our diverse portfolio of residential, commercial, and industrial solar installations
            </p>
          </div>

          <Tabs value={selectedCategory} onValueChange={(value) => {
            setSelectedCategory(value);
            setCurrentPage(1);
          }} className="w-full">
            <TabsList
  className="
    flex flex-wrap justify-center gap-2 sm:gap-6
    w-full max-w-3xl mx-auto mb-12
    bg-transparent sm:bg-inherit
  "
>
  {projectCategories.map((category) => (
    <TabsTrigger
      key={category.id}
      value={category.id}
      className="
        group flex items-center space-x-2 px-3 sm:px-6 py-2 rounded-none
        border border-gray-200 bg-white shadow-sm
        text-gray-700 font-medium transition-all duration-200 ease-in-out
        hover:bg-primary/10 hover:text-primary
        data-[state=active]:bg-primary data-[state=active]:text-white
        data-[state=active]:shadow-md data-[state=active]:scale-[1.03]
        min-w-[100px] sm:min-w-[140px] justify-center
        flex-shrink-0
      "
    >
      <span className="sm:hidden">{category.name}</span>
      <span className="hidden sm:flex items-center space-x-2">
        <span className="text-primary group-data-[state=active]:text-white transition-colors duration-300">
          {category.icon}
        </span>
        <span>{category.name}</span>
      </span>
    </TabsTrigger>
  ))}
</TabsList>



            <TabsContent value={selectedCategory}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {filteredProjects.map((project) => (
                  <Card key={project.id} className="hover-lift border-0 shadow-elegant overflow-hidden">
                    <div className="grid grid-cols-2 h-52">
  <div className="h-full bg-muted flex items-center justify-center overflow-hidden">
    <img
      src={project.image1}
      alt="category image1"
      className="w-full h-full object-cover"
    />
  </div>

  <div className="h-full bg-muted flex items-center justify-center overflow-hidden">
    <img
      src={project.image2}
      alt="category image2"
      className="w-full h-full object-cover"
    />
  </div>
</div>


                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge 
                          variant="outline" 
                          className={
                            project.category === 'residential' ? 'border-success text-success' :
                            project.category === 'commercial' ? 'border-primary text-primary' :
                            'border-accent text-accent'
                          }
                        >
                          {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                        </Badge>
                        <Badge className="bg-secondary text-primary">{project.status}</Badge>
                      </div>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <p className="text-muted-foreground text-sm">{project.description}</p>
                    </CardHeader>

                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{project.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Zap className="h-4 w-4 text-secondary" />
                            <span className="font-semibold">{project.capacity}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{project.completion}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="h-4 w-4 text-success" />
                            <span className="text-success font-semibold">{project.savings}</span>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Timeline:</div>
                            <div className="font-semibold">{project.timeline}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Investment:</div>
                            <div className="font-semibold text-primary">{project.investment}</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-6">
                        <h4 className="font-semibold text-primary">Key Features:</h4>
                        <div className="grid grid-cols-1 gap-1">
                          {project.features.slice(0, 3).map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                              <span className="text-xs text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button 
                        asChild 
                        className="w-full bg-gradient-solar text-primary-foreground shadow-solar"
                      >
                        <Link href="/contact">
                          Get Similar Quote
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Process Overview */}
<section className="relative py-16 bg-gray-100 text-gray-800 overflow-hidden">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Our Project Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From initial consultation to final commissioning, we ensure a smooth project experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Site Assessment',
                description: 'Detailed site survey, energy audit, and feasibility analysis'
              },
              {
                step: '02',
                title: 'System Design',
                description: 'Custom solar system design optimized for your requirements'
              },
              {
                step: '03',
                title: 'Installation',
                description: 'Professional installation by certified technicians'
              },
              {
                step: '04',
                title: 'Commissioning',
                description: 'System testing, grid connection, and performance verification'
              }
            ].map((step, index) => (
              <Card key={index} className="text-center p-6 hover-lift border-0 shadow-elegant relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-solar text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    {step.step}
                  </div>
                </div>
                
                <h3 className="text-lg font-heading font-semibold text-primary mb-3 mt-4">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-sky-50 via-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-sm mb-6">
            Ready to Start Your Solar Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Get a free consultation and quote for your solar installation
            project today!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-8">
  <CallButton />
  <BrowseButton path="/products" name="Browse Products" />
  
</div>

        </div>
      </section>
    </div>
  );
};

export default Projects;