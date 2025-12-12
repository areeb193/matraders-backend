"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Fade } from "react-awesome-reveal";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

import Link from "next/link";
import CallButton from "@/components/ui/callButton";
import BrowseButton from "@/components/ui/browseButton";
import AboutCompanyButton from "@/components/ui/aboutButtons";
import {
  FaBuilding,
  FaLightbulb,
  FaSnowflake,
  FaSolarPanel,
} from "react-icons/fa";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";

import Slider from "react-slick";

// Dynamically import react-slick with SSR disabled
import IntroCard from "@/components/ui/IntroCard";
import { motion, useScroll, useTransform } from "framer-motion";

import {
  Sun,
  Zap,
  Settings,
  ChevronLeft,
  ChevronRight,
  Award,
  Users,
  TrendingUp,
  Phone,
  ArrowRight,
  CheckCircle,
  Star,
  Bell,
  Camera,
  Lightbulb,
  Building,
  Snowflake,
  CheckCircle2,
  ArrowUpRight,
  Wrench,
  AlarmSmoke,
  Cctv,
} from "lucide-react";

import ExploreServiceButton from "@/components/ui/explore-service-button";

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (_oldIndex: number, next: number) => setActiveIndex(next),
  };

  const achievements = [
    {
      icon: <FaSolarPanel className="h-8 w-8 text-white" />,
      title: "50MW+ Solar Power",
      description:
        "Annual energy production through our residential & commercial solar projects.",
    },
    {
      icon: <FaSnowflake className="h-8 w-8 text-white" />,
      title: "500+ AC Installations",
      description:
        "Efficient split, inverter and  commercial AC systems installed with long-term performance.",
    },
    {
      icon: <FaBuilding className="h-8 w-8 text-white" />,
      title: "30+ Malls Wired",
      description:
        "Safe & reliable electrical wiring for commercial and retail outlets in 8 years of service.",
    },
    {
      icon: <AlarmSmoke className="h-8 w-8 text-white" />,
      title: "500+ Smoke Detectors",
      description:
        "Fire safety systems installed ensuring 100% compliance with safety standards.",
    },
    {
      icon: <Cctv className="h-8 w-8 text-white" />,
      title: "500+ CCTV Sites",
      description:
        "Secured businesses & homes with 24/7 surveillance and remote monitoring solutions.",
    },
    {
      icon: <FaLightbulb className="h-8 w-8 text-white" />,
      title: "1000+ Lighting Services",
      description:
        "Track & panel light installations reducing 15% electricity costs for clients annually.",
    },
  ];
  //about company tabs
  const [activeTab, setActiveTab] = useState("who");

  const tabContent: Record<string, string> = {
    who: "At M.A Traders, we are a trusted solar energy company in Lahore, providing complete energy and electrical solutions.Our services include Solar Panel Installation, Inverter & Battery Setup, AC Installation & Services, Residential Wiring, CCTV & Smoke Detectors, and Track & Panel Light Services.",
    mission:
      "Our mission is to empower every home and business with clean, affordable, and reliable energy solutions.From solar panel installation to inverter, battery, and AC services, we ensure efficiency and comfort in every setup.",
    goal: "Our goal is to lead Pakistan solar and electrical industry through innovation, reliability, and quality service. Above all, we strive to deliver unmatched customer satisfaction while driving the nation shift toward renewable energy.",
  };

  const services = [
    {
      title: "Solar Panel Installation",
      image: "/solarin1.jpg",
      description:
        "High-efficiency solar panels installed for homes and businesses.",
      link: "/services/solar-panel-installation",
    },
    {
      title: "Inverter & Battery Setup",
      image: "/battery1.jpg",
      description:
        "Reliable inverter and battery solutions for uninterrupted power.",
      link: "/services/inverter-battery-setup",
    },
    {
      title: "AC Installation & Services",
      image: "/ac4.png",
      description:
        "Split, inverter, and commercial AC installation & maintenance.",
      link: "/services/ac-installation-services",
    },
    {
      title: "Residential Wiring",
      image: "/wiring2.jpg",
      description: "Safe and modern electrical wiring solutions for homes.",
      link: "/services/residential-wiring",
    },
    {
      title: "CCTV & Smoke Detectors",
      image: "/cctv3.jpg",
      description: "Indoor & outdoor cameras with remote monitoring solutions.",
      link: "/services/cctv-security",
    },
    {
      title: "Track Light Services",
      image: "/track2.jpg",
      description: "LED and track light installation, repair, and maintenance.",
      link: "/services/track-panel-light-services",
    },
  ];
  const brands = [
    "/brands/Sapphire.png",
    "/brands/khaadi.png",
    "/brands/Zara.svg",
    "/brands/Zara.svg",
    "/brands/Zara.svg",
    "/brands/Sapphire.png",
    "/brands/Zara.svg",
  ];

  const features = [
    "Trusted Solar Experts",
    "Affordable Pricing",
    "High-Quality Equipment",
    "Professional Installation",
    "After-Sales Support",
    "Energy Efficiency Guaranteed",
  ];
  const stats = [
    { value: "200+", label: "Projects Completed" },
    { value: "5+", label: "Years Warranty" },
    { label: "Professional Team" },
    { value: "500+", label: "Happy Customers" },
    { value: "24/7", label: "Support Available" },
  ];

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

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <Slider ref={sliderRef} {...settings} className="h-screen">
          {/* Slide 1 */}
          <div className="h-screen">
            <img
              src="/bg.jpg"
              alt="Solar Image 1"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Slide 2 */}
          <div className="h-screen">
            <img
              src="/bg3.jpg"
              alt="Solar Image 2"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Slide 3 */}
          <div className="h-screen">
            <img
              src="/bg4.jpg"
              alt="Solar Image 3"
              className="w-full h-full object-cover"
            />
          </div>

          {/*Video */}
          <div className="h-screen relative">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/background-video.webm" type="video/webm" />
              <source src="/background-video.mp4" type="video/mp4" />
            </video>
          </div>
        </Slider>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-50 flex gap-2">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => sliderRef.current?.slickGoTo(i)}
            />
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/40 to-transparent"></div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4">
            <h1 className="text-xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground mb-6 mt-16 leading-tight">
              From Energy to Security
              <span className="block bg-gradient-solar bg-clip-text text-yellow-400 text-xl md:text-5xl lg:text-5xl">
                We Power It All
              </span>
            </h1>

            <p className="text-md md:text-xl text-primary-foreground/90 mb-12 max-w-3xl mx-auto text-white">
              From solar installation to lighting and security, we build smarter
              homes for a better life
            </p>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              {/* Left Card - Product Info */}
              <Card className="relative backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-2xl  pt-6 hover-lift">
                {/* Top-right Icon Button */}
                <div className="absolute top-2 right-2 border border-yellow-400 rounded-full p-1 hover:bg-primary/30 transition">
                  <Link href="/services">
                    <ArrowUpRight className="w-5 h-5 text-yellow-400" />
                  </Link>
                </div>

                {/* Content */}
                <CardContent className="flex items-center gap-4">
                  {/* Image */}
                  <div className="w-1/2">
                    <img
                      src="/solarin2.jpg"
                      alt="Product"
                      className="w-full h-full rounded-lg object-cover"
                    />
                  </div>

                  {/* Text */}
                  <div className="w-1/2 flex flex-col items-start text-left">
                    <p className="text-sm text-white mb-2">
                      Professional installation, support, and maintenance.
                    </p>
                    <Link
                      href="/services"
                      className="text-sm font-bold underline text-white"
                    >
                      Discover Our Services
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Center Card - Customers */}
              <Card className="relative backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-2xl p-2 md:p-10 hover-lift hidden sm:flex flex-col justify-center items-center w-full h-52 ">
                {/* Top - small rounded testimonial images */}
                <div className="flex justify-center items-center -space-x-4 ">
                  <img
                    src="/bg2.jpg"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <img
                    src="/bg.jpg"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <img
                    src="/bg3.jpg"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-4xl font-bold text-white">
                    500+
                  </CardTitle>
                  <p className="text-white">Happy Customers</p>
                </CardHeader>
              </Card>

              {/* Right Card - Services */}
              <Card className="relative backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-2xl pt-6 flex flex-col justify-between hover-lift">
                {/* Top-right icon */}
                <div className="absolute top-2 right-2 border border-yellow-400 rounded-full p-1 hover:bg-primary/30 transition">
                  <Link href="/products">
                    <ArrowUpRight className="w-5 h-5 text-yellow-400" />
                  </Link>
                </div>

                {/* Content */}
                <CardContent className="flex items-center gap-4">
                  {" "}
                  {/* items-center instead of items-start */}
                  {/* Image */}
                  <div className="w-1/2">
                    <img
                      src="/pro.png"
                      alt="Product"
                      className="w-full h-full rounded-lg object-cover"
                    />
                  </div>
                  {/* Text */}
                  <div className="w-1/2 flex flex-col justify-center text-left">
                    <p className="text-sm text-white">
                      Explore high-quality solar products with full warranty.
                    </p>
                    <Link
                      href="/products"
                      className="text-sm font-bold underline text-white"
                    >
                      View Our Products
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="relative py-24 bg-gray-100 overflow-hidden">
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 bg-grid-slate-400/10 [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-sm ">
              Our Achievements
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Delivering excellence in solar, electrical, and safety solutions
              across Pakistan
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <Card className="relative group border-0 shadow-lg shadow-yellow-400/5 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition duration-500" />
                  <CardHeader className="text-center pb-4 relative z-10">
                    <div className="mx-auto mb-5 p-4 rounded-full bg-black/80 group-hover:bg-black/90 text-white shadow-md group-hover:scale-110 transition-transform duration-500">
                      {achievement.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight">
                      {achievement.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-muted-foreground text-center text-base leading-relaxed">
                      {achievement.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* About company */}
      <section className="relative py-20 bg-gradient-to-br from-sky-50 via-emerald-50 to-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-6 lg:px-8 items-center">
          {/* Left Side - Image */}

          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/about-company.jpg"
              alt="About M.A Traders"
              width={600}
              height={500}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

            {/* Animated IntroCard */}
            <motion.div
              initial={{ x: 200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="absolute bottom-8 right-8 z-50"
            >
              <IntroCard />
            </motion.div>
          </div>

          {/* Right Side - Content */}
          <div>
            <p className="text-primary font-semibold tracking-wide uppercase mb-2">
              About Company
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              We Are the Best Solar Company in Lahore
            </h2>

            {/* Tabs */}
            <div className="flex flex-wrap gap-4 mb-4 justify-center sm:justify-start">
              <AboutCompanyButton
                name="About Us"
                active={activeTab === "who"}
                onClick={() => setActiveTab("who")}
              />
              <AboutCompanyButton
                name="Our Mission"
                active={activeTab === "mission"}
                onClick={() => setActiveTab("mission")}
              />
              <AboutCompanyButton
                name="Our Goal"
                active={activeTab === "goal"}
                onClick={() => setActiveTab("goal")}
              />
            </div>

            {/* Tab Content */}
            <motion.p
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-slate-600 mb-6 leading-relaxed"
            >
              {tabContent[activeTab]}
            </motion.p>

            {/* Bullet Points */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Reliable service",
                "Expert consultation",
                "Quality installation",
                "Solar equipment trading",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      {/* services */}
      <section className="py-20  bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-sm">
              Our Services
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Comprehensive energy solutions for all your needs
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <Card className="relative group overflow-hidden rounded-2xl shadow-lg shadow-black/10 hover:shadow-2xl transition-all duration-500">
                  {/* Image Background */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-72 object-cover group-hover:scale-125 transition-transform duration-500"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 opacity-70 group-hover:opacity-80 transition-opacity duration-500" />

                  {/* Text Overlay */}
                  <CardHeader className="absolute bottom-36 left-4 z-10 bg-white/20 backdrop-blur-md p-4 rounded-xl max-w-xs">
                    <CardTitle className="text-2xl font-bold text-white drop-shadow-lg">
                      {service.title}
                    </CardTitle>
                    <p className="text-white/90 text-start text-base leading-relaxed mt-2 drop-shadow-md">
                      {service.description}
                    </p>
                  </CardHeader>

                  {/* Explore Button */}
                  <CardFooter className="absolute bottom-1 z-10">
                    <ExploreServiceButton href={service.link} />
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Brands Section */}
      <section className="relative py-16 bg-gradient-to-br from-sky-50 via-emerald-50 to-white   text-white overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-sm">
            Brands We Deal With
          </h2>
          <p className="text-muted-foreground text-lg">
            Trusted partnerships with world-leading brands
          </p>
        </div>

        {/*  Auto Scrolling Brand Slider */}
        <div className="relative flex overflow-x-hidden">
          <div className="flex animate-slide space-x-16">
            {brands.concat(brands).map((brand, i) => (
              <div
                key={i}
                className="flex items-center justify-center w-48 h-32"
              >
                <Image
                  src={brand}
                  alt={`Brand ${i}`}
                  width={120}
                  height={80}
                  className="object-contain grayscale hover:grayscale-0 transition duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}

      {/* ---------- Section 1: Why Choose Us ---------- */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#1e293b] text-white">
        {/* Background Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-primary/30 blur-[150px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/20 blur-[180px] rounded-full" />
        </div>

        {/* Main Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <Fade triggerOnce direction="up">
            <div className="text-center space-y-6 mb-20">
              <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-lg">
                Why Choose{" "}
                <span className="font-black text-white">MA Traders?</span>
              </h2>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed">
                We do not just provide services — we deliver reliability,
                comfort, and long-term value through expert solar solutions,
                inverter & battery setups, AC installations, secure CCTV
                systems, and efficient home wiring.
              </p>
            </div>
          </Fade>

          {/* Core Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Features */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 text-center lg:text-left"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-center lg:justify-start space-x-3 bg-white/5 backdrop-blur-md rounded-xl py-6 px-4 border border-white/10 hover:border-primary/40 transition-all"
                  >
                    <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0 drop-shadow-md" />
                    <span className="text-lg font-medium text-gray-100">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="pt-6">
                <Button
                  asChild
                  className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 text-gray-800 text-lg px-8 py-6 rounded-full hover:from-gray-200 hover:to-gray-400 transition-all"
                >
                  <Link href="/about" className="flex items-center gap-2">
                    Learn More About Us
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Right: Futuristic Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-[1rem] overflow-hidden shadow-[0_0_40px_rgba(14,165,233,0.2)] border border-white/10"
            >
              <img
                src="/bg.jpg"
                alt="Solar energy"
                className="w-full h-full object-cover rounded-[0.5rem] brightness-95 hover:brightness-105 transition-all"
              />

              {/* Glow Layer */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------- Section 2: Stats Cards ---------- */}
      <section className="relative py-20 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#020617] overflow-hidden text-white">
        {/* Ambient Glow Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-sky-500/20 blur-[180px] rounded-full animate-pulse" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/10 blur-[220px] rounded-full animate-pulse" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-5xl md:text-6xl py-2 font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              The Power of Trust ⚡
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
              Our numbers speak louder than words — delivering excellence,
              reliability, and energy independence nationwide.
            </p>
          </div>

          {/* Floating Stat Cards */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, y: -6 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative rounded-2xl overflow-hidden backdrop-blur-xl border border-white/10 hover:border-transparent transition-all duration-200"
              >
                {/* Animated Gradient Border */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r  opacity-0 group-hover:opacity-100 blur-lg transition-all`}
                />

                {/* Card Content */}
                <Card className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-center shadow-[0_0_25px_rgba(56,189,248,0.15)] hover:shadow-[0_0_40px_rgba(56,189,248,0.3)] transition-all duration-200 p-8">
                  <CardHeader className="space-y-3">
                    <CardTitle className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent drop-shadow-sm">
                      {stat.value}
                    </CardTitle>
                    <CardDescription className="text-gray-300 text-sm uppercase tracking-widest font-medium">
                      {stat.label}
                    </CardDescription>
                  </CardHeader>
                </Card>

                {/* Glow Ring on Hover */}
                <div
                  className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r  opacity-0 group-hover:opacity-60 transition-all duration-700`}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative overflow-hidden py-20 bg-gray-100 text-foreground">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl py-2 font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
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
      <section className="relative py-20 bg-gradient-to-br from-sky-50 via-emerald-50 to-white">
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

export default Home;
