"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CallButton from "@/components/ui/callButton";
import BrowseButton from "@/components/ui/browseButton";
import CTA from "@/components/ui/cta";
import {
  Phone,
  ArrowRight,
  Settings,
  CheckCircle,
  Users,
  Wrench,
  ClipboardList,
} from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "Solar Panel Installation",
      image: "/solarin1.jpg",
      description:
        "Professional solar installation for homes and businesses with complete net metering setup.",
      link: "/services/solar-panel-installation",
    },
    {
      title: "Inverter & Battery Setup",
      image: "/inverter1.jpg",
      description:
        "Efficient inverter and battery solutions ensuring uninterrupted power and maximum energy storage.",
      link: "/services/inverter-battery-setup",
    },
    {
      title: "AC Installation Services",
      image: "/ac2.jpg",
      description:
        "Expert AC installation, maintenance, and repair services for residential and commercial clients.",
      link: "/services/ac-installation-services",
    },
    {
      title: "Residential Wiring",
      image: "/wiring2.jpg",
      description:
        "Safe and reliable electrical wiring solutions for new constructions and home renovations.",
      link: "/services/residential-wiring",
    },
    {
      title: "CCTV & Smoke detectors",
      image: "/cctv3.jpg",
      description:
        "Complete CCTV setup, configuration, and monitoring services for home and business security.",
      link: "/services/cctv-security",
    },
    {
      title: "Track & Panel Light Services",
      image: "/track2.jpg",
      description:
        "Modern track and panel lighting solutions to enhance your interior design and ambiance.",
      link: "/services/track-panel-installation",
    },
  ];

  const processSteps = [
    {
      icon: <ClipboardList className="h-6 w-6 text-white" />,
      title: "Consultation",
      description:
        "Discuss your requirements and get expert guidance from our engineers.",
    },
    {
      icon: <Settings className="h-6 w-6 text-white" />,
      title: "Custom Design",
      description:
        "We create tailored designs to fit your home, office, or industry.",
    },
    {
      icon: <Wrench className="h-6 w-6 text-white" />,
      title: "Installation",
      description:
        "Certified technicians ensure precise and professional setup.",
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: "After-Sales Support",
      description:
        "Our team offers maintenance, repair, and 24/7 customer assistance.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
    <section
                 className="relative py-28 bg-cover h-[90vh] bg-center bg-no-repeat"
                 style={{ backgroundImage: "url('/service.jpg')" }}
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
                     Our Services
                   </Badge>
         
                   <h1 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight mb-6">
                     Quality Electrical & Solar Services
                     <span className="block text-secondary mt-2">
                       You Can Trust
                     </span>
                   </h1>
         
                   <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                     From solar panel installations to AC servicing, wiring, and CCTV setup — MA Traders delivers reliable, affordable, and future-ready solutions                   </p>
         
                 </div>
               </section>
      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-br from-sky-50 via-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-sm text-center mb-12">
            Our Professional Services
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <Card
                key={index}
                className="hover-lift border-0 overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 text-sm">
                    {service.description}
                  </p>
                  <Button
                    asChild
                    className="bg-yellow-500 text-white font-semibold hover:bg-yellow-400 transition-all duration-200 shadow-md"
                  >
                    <Link href={service.link}>
                      Explore More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="pt-10 pb-20  relative bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-sm">
            How We Work
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="relative bg-white/70 backdrop-black-md border border-gray-200 shadow-lg rounded-2xl p-6 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-black to-gray-700 text-white rounded-full shadow-md">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-sky-50 via-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl py-2 md:text-5xl font-bold font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-sm mb-6">
            Ready to Start Your Solar Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Get a free consultation and quote for your solar installation
            project today!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-8">
            <CallButton />
            <BrowseButton path="/projects" name="View Projects" />
          </div>
        </div>
      </section>
    
    </div>
  );
};

export default Services;
