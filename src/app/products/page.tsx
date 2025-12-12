"use client";

import React, { useState } from "react";
import  Link  from 'next/link';
import CallButton from "@/components/ui/callButton";
import BrowseButton from "@/components/ui/browseButton";
import AboutCompanyButton from "@/components/ui/aboutButtons"
import products from "@/products.json";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Image from "next/image";
import {
  Sun,
  Zap,
  Battery,
  Settings,
  Cable,
  ShoppingCart,
  Star,
  Shield,
  Award,
  ArrowRight,
  CheckCircle,
  Plus,
  Grid,
  Cctv,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import InverterBattery from "@/services/inverter-battery-setup/page";
import { FaCamera, FaCarBattery, FaSolarPanel } from "react-icons/fa";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

const Products = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("panels");

  const { addToCart, getCartCount } = useCart();
  const cartCount = getCartCount();

  const categories = [
    {
      id: "panels",
      name: "Solar Panels",
      icon: <FaSolarPanel className="h-6 w-6" />,
      description:
        "High-efficiency monocrystalline and polycrystalline solar panels",
    },
    {
      id: "inverters",
      name: "Inverters",
      icon: <Zap className="h-6 w-6"/>,
      description: "String, hybrid, and micro inverters for all system types",
    },
    {
      id: "batteries",
      name: "Batteries",
      icon: <FaCarBattery className="h-6 w-6" />,
      description: "Lithium-ion and gel batteries for energy storage",
    },
    {
      id: "mounting",
      name: "Mounting",
      icon: <Grid className="h-6 w-6" />,
      description: "Roof and ground mounting structures and hardware",
    },
    {
      id: "accessories",
      name: "Accessories",
      icon: <Cable className="h-6 w-6" />,
      description: "Cables, connectors, monitoring systems, and more",
    },{
      id: "cctv",
      name: "CCTV",
      icon: <Cctv className="h-6 w-6" />,
      description: "Cameras, Installation",
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

type SolarPanel = {
  name: string;
  brand: string;
  power: string;
  efficiency: string;
  warranty: string;
  price: string;
  features: string[];
  image: string;
};

type Battery = {
  name: string;
  brand: string;
  capacity: string;
  type: string;
  warranty: string;
  price: string;
  features: string[];
  image: string;
};

type Product = SolarPanel | Battery;


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
              className="relative py-28 bg-cover h-[90vh] bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/herosolar.webp')" }}
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
                  Our Products
                </Badge>
      
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight mb-6">
                  From Solar Panels to Batteries
                  <span className="block text-secondary mt-2">
                    We Power It All
                  </span>
                </h1>
      
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                  Explore our wide range of solar panels, inverters, batteries, and electrical equipment — engineered for performance and built to last
                </p>
      
              </div>
            </section>

      {/* Brand Partners */}
      <section className="relative py-16 bg-gray-100   text-white overflow-hidden">
            <div className="max-w-7xl mx-auto text-center mb-10">
              <h2 className="text-4xl md:text-4xl font-bold font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-sm p-2">
               Authorized partner of leading brands
              </h2>
              <p className="text-muted-foreground text-lg">
                Trusted partnerships with world-leading brands
              </p>
            </div>
      
            {/*  Auto Scrolling Brand Slider */}
            <div className="relative flex overflow-x-hidden">
              <div className="flex animate-slide space-x-16">
                {brands.concat(brands).map((brand, i) => (
                  <div key={i} className="flex items-center justify-center w-48 h-32">
                    <Image
                      src={brand}
                      alt={`Brand ${i}`}
                      width={90}
                      height={80}
                      className="object-contain grayscale hover:grayscale-0 transition duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

      {/* Product Categories */}
      <section className="py-20 bg-gradient-to-br from-sky-50 via-emerald-50 to-white" id="products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={(value) => {
            setActiveTab(value);
            setCurrentPage(1);
          }} className="w-full">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
                Product Categories
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Browse our comprehensive range of solar equipment and
                accessories
              </p>
            </div>

            <TabsList
  className="
    flex flex-wrap justify-center gap-2 sm:gap-4
    w-full max-w-5xl mx-auto mb-12
    bg-transparent sm:bg-inherit
  "
>
  {categories.map((category) => (
    <TabsTrigger
      key={category.id}
      value={category.id}
      className="
        flex items-center space-x-2 px-3 sm:px-6 py-2 rounded-none
        border border-gray-200 bg-white shadow-sm
        text-gray-700 font-medium transition-all duration-200
        hover:bg-primary/10 hover:text-primary
        data-[state=active]:bg-primary data-[state=active]:text-white
        min-w-[100px] sm:min-w-[130px] justify-center
        flex-shrink-0
      "
    >
      <span className="sm:hidden">{category.name}</span>
      <span className="hidden sm:flex items-center space-x-2">
        {category.icon}
        <span>{category.name}</span>
      </span>
    </TabsTrigger>
  ))}
</TabsList>


            {Object.entries(products).map(([categoryId, categoryProducts]) => {
    const itemsPerPage = 9;

  const totalPages = Math.ceil(categoryProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleProducts = categoryProducts.slice(startIndex, startIndex + itemsPerPage);
 const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };


  return (
    <TabsContent key={categoryId} value={categoryId}>
      {/* ✅ Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {visibleProducts.map((product, index) => (
          <Card
            key={index}
            className="hover-lift border-0 shadow-elegant overflow-hidden"
          >
            <div className="h-54 bg-white flex items-center justify-center">
              
                <img src={product.image} alt="/product image" />
             
            </div>

            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-2">
                <Badge className="bg-secondary text-primary">
                  {product.brand}
                </Badge>
                <div className="flex items-center space-x-1">
                  <Badge className="mb-6 bg-slate-200 text-primary">
              In Stock
            </Badge>
                </div>
              </div>
              <CardTitle className="text-lg">{product.name}</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-3 mb-6">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-start">
                    <span className="text-muted-foreground">Power:</span>
                    <span className="font-medium">
                      {"power" in product
                        ? product.power
                        : "capacity" in product
                        ? product.capacity
                        : "-"}
                    </span>
                  </div>

                  {"efficiency" in product && (
                    <div className="flex justify-start">
                      <span className="text-muted-foreground">Efficiency:</span>
                      <span className="font-medium">
                        {product.efficiency}
                      </span>
                    </div>
                  )}

                </div>

                <div className="space-y-1">
                  {product.features.slice(0, 3).map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center space-x-2"
                    >
                      <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-primary">
                  {product.price}
                </div>
                <Button
                  onClick={() =>
                    addToCart({
                      id: Date.now() + Math.random(),
                      name: product.name,
                      brand: product.brand,
                      price: parseInt(product.price.replace(/[^\d]/g, "")),
                      image: product.image,
                      inStock: true,
                    })
                  }
                  size="sm"
                  className="bg-gradient-solar text-primary-foreground shadow-solar"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
          
        ))}
      </div>

      {/* ✅ Pagination UI */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#products"
                  onClick={() => goToPage(currentPage - 1)}
                  className={`${
                    currentPage === 1 ? "pointer-events-none opacity-40" : ""
                  }`}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#products"
                      isActive={page === currentPage}
                      onClick={() => goToPage(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  href="#products"
                  onClick={() => goToPage(currentPage + 1)}
                  className={`${
                    currentPage === totalPages
                      ? "pointer-events-none opacity-40"
                      : ""
                  }`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </TabsContent>
  );
})}

          </Tabs>
        </div>
      </section>

      {/* Features Section */}
<section className="relative py-16 bg-gray-100 text-gray-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Why Our Products?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quality, reliability, and performance you can trust for decades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover-lift border-0 shadow-elegant">
              <div className="mx-auto mb-6 p-4 bg-primary rounded-full w-fit">
                <Award className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-primary mb-4">
                Premium Quality
              </h3>
              <p className="text-muted-foreground">
                All products are sourced from Tier-1 manufacturers with
                international certifications and proven track records.
              </p>
            </Card>

            <Card className="text-center p-8 hover-lift border-0 shadow-elegant">
              <div className="mx-auto mb-6 p-4 bg-secondary rounded-full w-fit">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-primary mb-4">
                Comprehensive Warranty
              </h3>
              <p className="text-muted-foreground">
                Extended warranties up to 25 years on panels and complete
                after-sales support throughout the product lifecycle.
              </p>
            </Card>

            <Card className="text-center p-8 hover-lift border-0 shadow-elegant">
              <div className="mx-auto mb-6 p-4 bg-accent rounded-full w-fit">
                <CheckCircle className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-primary mb-4">
                Competitive Pricing
              </h3>
              <p className="text-muted-foreground">
                Best market rates with flexible payment options and bulk
                discounts for commercial and industrial customers.
              </p>
            </Card>
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
  <BrowseButton path="/projects" name="View Projects" />
  
</div>

        </div>
      </section>
    </div>
  );
};

export default Products;
