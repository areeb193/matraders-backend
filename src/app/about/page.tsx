"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import BrowseButton from "@/components/ui/browseButton";
import CallButton from "@/components/ui/callButton";
import { FaSolarPanel, FaArrowRight, FaThinkPeaks } from "react-icons/fa";
import {
  Target,
  Eye,
  Heart,
  Award,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Sun,
  Zap,
  Leaf,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { LightBulbIcon } from "@heroicons/react/20/solid";

const About = () => {
  const values = [
    {
      icon: <Sun className="h-8 w-8 text-secondary" />,
      title: "Innovation",
      description:
        "We embrace cutting-edge solar technology to provide the most efficient energy solutions.",
    },
    {
      icon: <Heart className="h-8 w-8 text-accent" />,
      title: "Customer First",
      description:
        "Your satisfaction is our priority. We build lasting relationships through exceptional service.",
    },
    {
      icon: <Leaf className="h-8 w-8 text-success" />,
      title: "Sustainability",
      description:
        "Committed to creating a cleaner, greener future for Pakistan through renewable energy.",
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Quality",
      description:
        "We use only premium materials and maintain the highest standards in every project.",
    },
  ];

  const milestones = [
    {
      year: "2018",
      event: "MA Traders Founded",
      description: "Started our journey in solar energy solutions",
    },
    {
      year: "2019",
      event: "100+ Installations",
      description: "Reached our first major milestone",
    },
    {
      year: "2021",
      event: "Commercial Expansion",
      description: "Expanded to industrial and commercial projects",
    },
    {
      year: "2023",
      event: "1000+ Happy Customers",
      description: "Became Lahore's trusted solar partner",
    },
    {
      year: "2024",
      event: "Advanced Technology",
      description: "Introduced smart solar monitoring systems",
    },
  ];

  const stats = [
    { number: "6+", label: "Years Experience" },
    { number: "1000+", label: "Projects Completed" },
    { number: "500+", label: "Happy Customers" },
    { number: "50MW+", label: "Solar Capacity Installed" },
  ];

  // testimonials data
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const testimonials = [
    {
      name: "Ahmed Hassan",
      location: "DHA Lahore",
      rating: 5,
      text: "Excellent service! MA Traders installed our 10kW system perfectly. Already saving 80% on electricity bills.",
    },
    {
      name: "Ahmed Hassan",
      location: "DHA Lahore",
      rating: 5,
      text: "Excellent service! MA Traders installed our 10kW system perfectly. Already saving 80% on electricity bills.",
    },
    {
      name: "Ahmed Hassan",
      location: "DHA Lahore",
      rating: 5,
      text: "Excellent service! MA Traders installed our 10kW system perfectly. Already saving 80% on electricity bills.",
    },
    {
      name: "Ali Khan",
      location: "Johar Town",
      rating: 2,
      text: "Professional team, quality equipment, and great after-sales support. Highly recommended!",
    },
    {
      name: "Muhammad Ali",
      location: "Gulberg",
      rating: 5,
      text: "Best solar company in Lahore. Transparent pricing and excellent installation quality.",
    },
  ];
  interface Testimonial {
    name: string;
    location: string;
    rating: number;
    text: string;
  }
  interface Props {
    testimonials: Testimonial[];
  }
  //
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative py-24 bg-cover h-[90vh] bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/about.jpg')" }}
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
            About MA Traders
          </Badge>

          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight mb-6">
            Powering Progress Through
            <span className="block text-secondary mt-2">
              Precision and Passion
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            MA Traders is dedicated to powering Pakistan with reliable,
            efficient, and sustainable energy solutions. From solar systems to
            electrical and AC services, we bring innovation and trust to every
            project
          </p>

          <div className="mt-10">
            <BrowseButton path="/services" name="Explore Services" />
          </div>
        </div>
      </section>
      <section className="relative py-20 bg-gradient-to-br from-sky-50 via-emerald-50 to-white overflow-hidden">
        {/* Subtle animated background circles */}

        <div className="relative max-w-7xl mt-10 mx-auto px-6 sm:px-8 lg:px-10">
          {/* Dark Card */}
          <Card className="relative p-8 flex flex-col items-start bg-gray-800 border-l-4 border-l-primary hover:shadow-2xl overflow-hidden -mt-16 z-10">
            {/* Reflection overlay */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute top-0 left-[-75%] w-1/6 h-full bg-gradient-to-r from-white/10 via-white/40 to-white/0 transform -skew-x-12 animate-sweep"></div>
            </div>

            {/* Heading */}
            <div className="mb-4 z-10">
              <h3 className="text-4xl md:text-1xl font-bold font-heading bg-gradient-to-r from-primary-foreground to-secondary bg-clip-text text-transparent drop-shadow-sm">
                Our Intro
              </h3>
            </div>

            {/* Paragraph */}
            <div className="z-10">
              <p className="text-gray-300 leading-relaxed">
                M.A Traders is Lahore trusted energy solutions partner,
                providing reliable and efficient services for homes and
                businesses. We specialize in fulfilling your energy needs with
                quality installations, modern technology, and comprehensive
                support. Our expert team ensures safe, long-lasting, and
                cost-effective solutions tailored to every customer. From solar
                panels to ACs, inverters, and security systems, we help you
                optimize energy usage and keep your spaces powered and
                protected. Experience premium service, transparency, and
                innovative solutions with MA Traders.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Tailwind animation */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.15;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.25;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 12s ease-in-out infinite;
        }

        @keyframes sweep {
          0% {
            left: -75%;
          }
          100% {
            left: 125%;
          }
        }
        .animate-sweep {
          animation: sweep 4s ease-in-out infinite;
        }
      `}</style>

      <section className="relative py-20 bg-gray-900 overflow-hidden">
        {/* Animated Background Circles */}
        <div className="absolute inset-0">
          <div className="w-96 h-96 bg-gradient-to-r from-green-600 via-indigo-500 to-green-200 rounded-full opacity-20 absolute -top-32 -left-32 animate-pulse-slow"></div>
          <div className="w-72 h-72 bg-gradient-to-r from-green-200 via-blue-500 to-purple-600 rounded-full opacity-20 absolute -bottom-24 -right-24 animate-pulse-slow"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl py-2 md:text-5xl font-bold font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-sm mb-3">
              Our Journey
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              From humble beginnings to becoming trusted solar partner
            </p>
          </div>

          <div className="relative">
            {/* Timeline line for desktop */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b to-green-600 from-indigo-500 hidden md:block"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`flex-1 ${
                      index % 2 === 0
                        ? "md:text-right md:pr-8"
                        : "md:text-left md:pl-8"
                    }`}
                  >
                    <Card className="p-6 hover-lift border-0 shadow-elegant bg-gray-800">
                      <div className="text-2xl font-bold text-emerald-400 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-heading font-semibold text-white mb-2">
                        {milestone.event}
                      </h3>
                      <p className="text-gray-300">{milestone.description}</p>
                    </Card>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden md:block w-4 h-4 bg-green-500 rounded-full border-4 border-gray-900 shadow-lg"></div>

                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Add this Tailwind plugin animation in your CSS/tailwind.config.js */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.3;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 10s ease-in-out infinite;
        }
      `}</style>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-sky-50 via-emerald-50 to-white relative overflow-hidden">

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 mt-[-10px]">
          {/* Section Header */}
          <div className="text-center mb-16 overflow-visible">
            <h2
              className="inline-block text-4xl md:text-5xl font-bold font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-sm mb-4 pb-2 leading-[1.18] -translate-y-[0.5px]"
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Our Values
            </h2>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Driven by passion and integrity
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center p-6 border border-gray-200 rounded-md hover:shadow-lg transition-all duration-300 bg-white relative z-10 hover-lift"
              >
                <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full w-fit flex items-center justify-center text-2xl">
                  {value.icon}
                </div>
                <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tailwind animation for subtle pulse */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.15;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.25;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 12s ease-in-out infinite;
        }
      `}</style>

      {/* Why Choose Us */}
      <section className="py-20  relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="relative py-20 bg-gray-900 overflow-hidden rounded-2xl">
            {/* Subtle animated background circles */}
            <div className="absolute inset-0 pointer-events-none ">
              <div className="w-96 h-96 bg-gradient-to-r from-purple-700 via-indigo-600 to-pink-600 rounded-full opacity-20 absolute -top-32 -left-32 animate-pulse-slow"></div>
              <div className="w-72 h-72 bg-gradient-to-r from-green-600 via-blue-500 to-purple-600 rounded-full opacity-20 absolute -bottom-24 -right-24 animate-pulse-slow"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Column */}
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold font-heading bg-gradient-to-r to-primary from-secondary bg-clip-text text-transparent drop-shadow-sm mb-3">
                    Why Customers Trust MA Traders
                  </h2>
                  <p className="text-lg text-gray-300 mb-8">
                    We have built our reputation on quality, reliability, and
                    exceptional customer service. Here iss what sets us apart
                    from other companies.
                  </p>

                  <div className="space-y-4 mb-8">
                    {[
                      "Certified and licensed professionals",
                      "Premium quality equipment only",
                      "Comprehensive warranties up to 5 years",
                      "Transparent pricing with no hidden costs",
                      "Complete after-sales support",
                      "Fast installation with minimal disruption",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" />
                        <span className="text-gray-200">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <Card className="p-6 hover:shadow-2xl border-l-4 border-l-purple-600 bg-gray-800 transition-all duration-300 hover-lift">
                    <div className="flex items-start space-x-4">
                      <Award className="h-8 w-8 text-purple-500 flex-shrink-0" />
                      <div>
                        <h3 className="font-heading font-semibold text-white mb-2">
                          Quality Assurance
                        </h3>
                        <p className="text-gray-300 text-sm">
                          All our installations are certified and come with
                          comprehensive warranties. We use only tier-1 solar
                          panels and premium components.
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 hover:shadow-2xl border-l-4 border-l-pink-500 bg-gray-800 transition-all duration-300 hover-lift">
                    <div className="flex items-start space-x-4">
                      <Users className="h-8 w-8 text-pink-400 flex-shrink-0" />
                      <div>
                        <h3 className="font-heading font-semibold text-white mb-2">
                          Expert Team
                        </h3>
                        <p className="text-gray-300 text-sm">
                          Our certified engineers and technicians have years of
                          experience in solar installation and maintenance
                          across Pakistan.
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 hover:shadow-2xl border-l-4 border-l-indigo-500 bg-gray-800 transition-all duration-300 hover-lift">
                    <div className="flex items-start space-x-4">
                      <TrendingUp className="h-8 w-8 text-indigo-400 flex-shrink-0" />
                      <div>
                        <h3 className="font-heading font-semibold text-white mb-2">
                          Proven Results
                        </h3>
                        <p className="text-gray-300 text-sm">
                          Our customers typically see 70-90% reduction in their
                          electricity bills and full return on investment within
                          3-4 years.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
      {/* testimonial Section */}
      <section className="relative overflow-hidden py-20 bg-gray-100 text-foreground">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center space-y-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl py-2 font-bold bg-gradient-to-r to-primary from-secondary bg-clip-text text-transparent"
          >
            What Our Customers Say
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground mb-10"
          >
            Hear from our satisfied clients across the country
          </motion.p>

          {/* ---- Slider ---- */}
          <div className="relative ">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {testimonials.map((t, index) => (
                  <motion.div
                    key={index}
                    className="min-w-[100%] md:min-w-[50%] lg:min-w-[33.3333%] px-4  mb-5"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <Card className="bg-white/70 backdrop-blur-xl border border-white/30 shadow-lg hover:shadow-2xl transition-all rounded-2xl">
                      <CardContent className="p-8">
                        <div className="flex justify-center mb-3">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-5 w-5 text-yellow-400 fill-yellow-400"
                            />
                          ))}
                        </div>
                        <p className="text-muted-foreground italic mb-6">
                          “{t.text}”
                        </p>
                        <h4 className="font-semibold text-lg">{t.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {t.location}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ---- Controls ---- */}
            <button
              onClick={() => emblaApi && emblaApi.scrollPrev()}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/30 backdrop-blur-md rounded-full hover:bg-white/50 transition"
            >
              <ChevronLeft className="h-5 w-5 text-gray-800" />
            </button>

            <button
              onClick={() => emblaApi && emblaApi.scrollNext()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/30 backdrop-blur-md rounded-full hover:bg-white/50 transition"
            >
              <ChevronRight className="h-5 w-5 text-gray-800" />
            </button>
          </div>

          {/* ---- Dots ---- */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.slice(0, 6).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === selectedIndex
                    ? "bg-primary scale-110"
                    : "bg-gray-400/50"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-sky-50 via-emerald-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl py-2 font-bold font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-sm mb-6">
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

export default About;
