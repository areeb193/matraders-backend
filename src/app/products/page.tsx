"use client";

import React, { useState, useEffect } from "react";
import CallButton from "@/components/ui/callButton";
import BrowseButton from "@/components/ui/browseButton";
import { productAPI, categoryAPI, type Product as APIProduct, type Category as APICategory } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Shield,
  Award,
  CheckCircle,
  Plus,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Products = () => {
  // State for API data
  const [products, setProducts] = useState<APIProduct[]>([]);
  const [categories, setCategories] = useState<APICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // UI State
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<string>("all");
  
  const { addToCart } = useCart();

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          productAPI.getAll(),
          categoryAPI.getAll(),
        ]);
        
        setProducts(productsData);
        setCategories(categoriesData);
        
        // Set first category as active tab
        if (categoriesData.length > 0) {
          setActiveTab("all");
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter products by category
  const getFilteredProducts = () => {
    if (activeTab === "all") return products;
    
    return products.filter(product => {
      const categoryId = typeof product.category === 'string' 
        ? product.category 
        : product.category._id;
      return categoryId === activeTab;
    });
  };

  // Pagination logic
  const itemsPerPage = 9;
  const filteredProducts = getFilteredProducts();
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get category name helper
  const getCategoryName = (product: APIProduct): string => {
    if (typeof product.category === 'string') {
      const cat = categories.find(c => c._id === product.category);
      return cat?.name || 'Uncategorized';
    }
    return product.category?.name || 'Uncategorized';
  };

  const brands = [
    "/brands/Sapphire.png",
    "/brands/khaadi.png",
    "/brands/Zara.svg",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative py-28 bg-cover h-[90vh] bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/herosolar.webp')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <Badge className="mb-5 bg-primary/20 text-secondary border border-secondary/30 font-semibold tracking-wide px-4 py-2 rounded-full backdrop-blur-md">
            Our Products
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight mb-6">
            From Solar Panels to Batteries
            <span className="block text-secondary mt-2">We Power It All</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Explore our wide range of solar panels, inverters, batteries, and electrical equipment — engineered for performance and built to last
          </p>
        </div>
      </section>

      {/* Brand Partners */}
      <section className="relative py-16 bg-gray-100 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-10">
          <h2 className="text-4xl font-bold font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-sm p-2">
            Authorized partner of leading brands
          </h2>
          <p className="text-muted-foreground text-lg">
            Trusted partnerships with world-leading brands
          </p>
        </div>
        
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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Product Categories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Browse our comprehensive range of solar equipment and accessories
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20">
              <AlertCircle className="h-12 w-12 text-destructive mb-4" />
              <p className="text-destructive font-semibold mb-2">{error}</p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={(value) => {
              setActiveTab(value);
              setCurrentPage(1);
            }} className="w-full">
              <TabsList className="flex flex-wrap justify-center gap-2 sm:gap-4 w-full max-w-5xl mx-auto mb-12 bg-transparent sm:bg-inherit">
                <TabsTrigger
                  value="all"
                  className="flex items-center space-x-2 px-3 sm:px-6 py-2 rounded-none border border-gray-200 bg-white shadow-sm text-gray-700 font-medium transition-all duration-200 hover:bg-primary/10 hover:text-primary data-[state=active]:bg-primary data-[state=active]:text-white min-w-[100px] justify-center"
                >
                  All Products
                </TabsTrigger>
                
                {categories.map((category) => (
                  <TabsTrigger
                    key={category._id}
                    value={category._id}
                    className="flex items-center space-x-2 px-3 sm:px-6 py-2 rounded-none border border-gray-200 bg-white shadow-sm text-gray-700 font-medium transition-all duration-200 hover:bg-primary/10 hover:text-primary data-[state=active]:bg-primary data-[state=active]:text-white min-w-[100px] justify-center"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value={activeTab}>
                {visibleProducts.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-muted-foreground text-lg">No products found in this category.</p>
                  </div>
                ) : (
                  <>
                    {/* Products Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                      {visibleProducts.map((product) => (
                        <Card key={product._id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden group cursor-pointer">
                          <Link href={`/products/${product._id}`} className="block">
                            <div className="h-54 bg-white flex items-center justify-center p-4 overflow-hidden">
                              {product.image ? (
                                <Image 
                                  src={product.image} 
                                  alt={product.name}
                                  width={400}
                                  height={300}
                                  className="w-full h-48 object-cover rounded group-hover:scale-105 transition-transform duration-300"
                                />
                              ) : (
                                <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center rounded">
                                  <ShoppingCart className="h-16 w-16 text-gray-400" />
                                </div>
                              )}
                            </div>

                            <CardHeader className="pb-4">
                              <div className="flex justify-between items-start mb-2">
                                <Badge className="bg-secondary text-primary">
                                  {getCategoryName(product)}
                                </Badge>
                                <Badge className="bg-green-100 text-green-800">
                                  {product.stockQuantity > 0 ? `${product.stockQuantity} In Stock` : 'Out of Stock'}
                                </Badge>
                              </div>
                              <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                            </CardHeader>
                          </Link>

                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                              {product.description || 'No description available'}
                            </p>

                            <div className="flex items-center justify-between mt-4">
                              <div className="text-2xl font-bold text-primary">
                                PKR {product.price.toLocaleString()}
                              </div>
                              <Button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  addToCart({
                                    id: product._id,
                                    name: product.name,
                                    brand: getCategoryName(product),
                                    price: product.price,
                                    image: product.image || '',
                                    inStock: product.stockQuantity > 0,
                                  });
                                }}
                                size="sm"
                                disabled={product.stockQuantity === 0}
                                className="bg-gradient-to-r from-primary to-secondary text-white"
                              >
                                <Plus className="h-4 w-4 mr-1" />
                                Add to Cart
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-center mt-10">
                        <Pagination>
                          <PaginationContent>
                            <PaginationItem>
                              <PaginationPrevious
                                href="#products"
                                onClick={(e) => {
                                  e.preventDefault();
                                  goToPage(currentPage - 1);
                                }}
                                className={currentPage === 1 ? "pointer-events-none opacity-40" : "cursor-pointer"}
                              />
                            </PaginationItem>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                              <PaginationItem key={page}>
                                <PaginationLink
                                  href="#products"
                                  isActive={page === currentPage}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    goToPage(page);
                                  }}
                                  className="cursor-pointer"
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            ))}

                            <PaginationItem>
                              <PaginationNext
                                href="#products"
                                onClick={(e) => {
                                  e.preventDefault();
                                  goToPage(currentPage + 1);
                                }}
                                className={currentPage === totalPages ? "pointer-events-none opacity-40" : "cursor-pointer"}
                              />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
            </Tabs>
          )}
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
            <Card className="text-center p-8 hover:shadow-xl transition-all border-0 shadow-lg">
              <div className="mx-auto mb-6 p-4 bg-primary rounded-full w-fit">
                <Award className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-primary mb-4">
                Premium Quality
              </h3>
              <p className="text-muted-foreground">
                All products are sourced from Tier-1 manufacturers with international certifications.
              </p>
            </Card>

            <Card className="text-center p-8 hover:shadow-xl transition-all border-0 shadow-lg">
              <div className="mx-auto mb-6 p-4 bg-secondary rounded-full w-fit">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-primary mb-4">
                Comprehensive Warranty
              </h3>
              <p className="text-muted-foreground">
                Extended warranties and complete after-sales support throughout the product lifecycle.
              </p>
            </Card>

            <Card className="text-center p-8 hover:shadow-xl transition-all border-0 shadow-lg">
              <div className="mx-auto mb-6 p-4 bg-accent rounded-full w-fit">
                <CheckCircle className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-primary mb-4">
                Competitive Pricing
              </h3>
              <p className="text-muted-foreground">
                Best market rates with flexible payment options and bulk discounts.
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
            Get a free consultation and quote for your solar installation project today!
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
