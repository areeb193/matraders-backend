"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  Facebook,
  Instagram,
  CheckCircle,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    location: "",
    message: "",
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Quote Request Sent!",
      description: "We'll contact you within 2 hours for a free consultation.",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      location: "",
      message: "",
    });
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-secondary" />,
      title: "Phone Number",
      details: "+92 301 7757484",
      action: "tel:+923017757484",
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-accent" />,
      title: "WhatsApp",
      details: "+92 301 7757484",
      action: "https://wa.me/923017757484",
    },
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email Address",
      details: "m.atradersceo484@gmail.com",
      action: "m.atradersceo484@gmail.com",
    },
    {
      icon: <MapPin className="h-6 w-6 text-success" />,
      title: "Office Address",
      details: "64 Gulshan block shop No.4 Allama Iqbal town Lahore, Pakistan",
      action: "https://maps.app.goo.gl/oTXZhN29pbqF7E8L6",
    },
  ];

  const businessHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Emergency Only" },
  ];

  const services = [
    "Solar System Installation",
    "Net Metering Solutions",
    "Custom Solar Design",
    "Equipment Trading",
    "Maintenance Services",
    "Consultation & Analysis",
    "Other Services",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative py-28 bg-cover h-[90vh] bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/contact2.webp')" }}
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
            Contact Us
          </Badge>

          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight mb-6">
            From consultation to connection
            <span className="block text-secondary mt-2">
              we are here for you
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Your trusted partner in solar, electrical, and AC solutions — reach
            out today and let power your world
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-2xl font-heading text-primary mb-2">
                  Request Free Quote
                </CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we will get back to you within 2
                  hours
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        placeholder="Enter your full name"
                        required
                        className="transition-smooth focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        placeholder="+92 3XX XXXXXXX"
                        required
                        className="transition-smooth focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="your.email@example.com"
                      required
                      className="transition-smooth focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="service">Service Required</Label>
                      <Select
                        value={formData.service}
                        onValueChange={(value) =>
                          handleInputChange("service", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Property Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) =>
                          handleInputChange("location", e.target.value)
                        }
                        placeholder="City, Area"
                        className="transition-smooth focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Details</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      placeholder="Tell us about your energy needs, roof type, current electricity bill, etc."
                      rows={4}
                      className="transition-smooth focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-solar text-primary-foreground shadow-solar hover:shadow-energy transition-smooth text-lg py-6"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Get Free Quote Now
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-heading font-bold text-primary mb-6">
                  Get In Touch
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Multiple ways to reach us. Choose what works best for you.
                </p>
              </div>

              <div className="space-y-4 border-gray-500">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="hover-lift shadow-elegant">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-muted rounded-lg">
                          {info.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-primary mb-1">
                            {info.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {info.details}
                          </p>
                          <Button
                            asChild
                            variant="link"
                            className="p-0 h-auto text-black hover:text-secondary transition-smooth"
                          >
                            <a
                              href={info.action}
                              target={
                                info.action.startsWith("http") ? "#" : undefined
                              }
                            >
                              Contact Now →
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours & Map */}
      <section className="py-20 bg-gradient-to-br from-sky-50 via-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Business Hours */}
            <Card className="bg-gray-50 shadow-elegant">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <Clock className="h-6 w-6 text-primary" />
                  <CardTitle className="text-2xl font-heading text-primary">
                    Business Hours
                  </CardTitle>
                </div>
                <p className="text-muted-foreground">
                  We are available when you need us most
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {businessHours.map((schedule, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-3 border-b border-border last:border-b-0"
                    >
                      <span className="font-medium text-foreground">
                        {schedule.day}
                      </span>
                      <span className="text-muted-foreground">
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-accent mb-1">
                        Emergency Support
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        For urgent technical issues with existing installations,
                        we provide 24/7 emergency support.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="bg-gray-50 shadow-elegant overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl font-heading text-primary mb-2">
                  Visit Our Office
                </CardTitle>
                <p className="text-muted-foreground">
                  Located in the heart of Lahore for easy access
                </p>
              </CardHeader>

              <CardContent>
                {/* Map Container */}
                <div className="w-full h-[400px] rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.3072189835307!2d74.29217687469621!3d31.51572104737342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391903f94f5291ab%3A0xa289253b8c78de4f!2sM.A.Traders!5e0!3m2!1sen!2s!4v1761070994767!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>

              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Media & FAQ */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Social Media */}
            <div>
              <h2 className="text-3xl font-heading font-bold text-primary mb-6">
                Follow Us
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Stay updated with our latest projects, solar tips, and industry
                news.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Facebook Button (Light Blue - Static) */}
                {/* Facebook Button (Light Blue - Static) */}
                <Button
                  size="lg"
                  onClick={(e) => e.preventDefault()}
                  className="!bg-[#3b82f6] hover:!bg-[#2563eb] text-white !shadow-md hover:!shadow-lg transition-all duration-300"
                >
                  <Facebook className="mr-2 h-5 w-5" />
                  Facebook
                </Button>

                {/* Instagram Button (Gradient - Static) */}
                <Button
                  size="lg"
                  onClick={(e) => e.preventDefault()}
                  className="!bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white !shadow-md hover:opacity-90 hover:!shadow-lg transition-all duration-300"
                >
                  <Instagram className="mr-2 h-5 w-5" />
                  Instagram
                </Button>

                {/* WhatsApp Button (Bright Green - Working Link) */}
                <Button
                  asChild
                  size="lg"
                  className="!bg-[#32d851] hover:!bg-[#25d366] text-white !shadow-md hover:!shadow-lg transition-all duration-300 col-span-1 sm:col-span-2"
                >
                  <a
                    href="https://wa.me/923017757484"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    WhatsApp Business
                  </a>
                </Button>
              </div>
            </div>

            {/* Quick FAQ */}
            <div>
              <h2 className="text-3xl font-heading font-bold text-primary mb-6">
                Quick Questions?
              </h2>
              <div className="space-y-4">
                {[
                  {
                    q: "How long does installation take?",
                    a: "Typically 2-5 days for residential and 1-4 weeks for commercial projects.",
                  },
                  {
                    q: "What warranty do you provide?",
                    a: "10 years on panels, 5 years on inverters, 2 years on installation workmanship.",
                  },
                  {
                    q: "Do you handle net metering?",
                    a: "Yes, we handle all NEPRA applications and utility coordination for net metering.",
                  },
                  {
                    q: "What financing options are available?",
                    a: "We offer flexible payment plans and can help connect you with solar financing partners.",
                  },
                ].map((faq, index) => (
                  <Card
                    key={index}
                    className="hover-lift border-0 shadow-elegant"
                  >
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-primary mb-2">
                        {faq.q}
                      </h4>
                      <p className="text-sm text-muted-foreground">{faq.a}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
