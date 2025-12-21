"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Loader2,
  ShoppingCart,
  Package,
  X,
  ArrowRight,
} from "lucide-react";

interface SearchProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  stockQuantity: number;
  category: { name: string } | string;
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus search input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Debounced search function
  useEffect(() => {
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // If search query is empty, clear results
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    // Set searching state
    setIsSearching(true);

    // Set new timeout for debouncing (500ms delay)
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(searchQuery)}&type=products&limit=50`
        );
        const data = await response.json();

        // API returns data.results.products, not data.products
        if (data.results?.products) {
          setSearchResults(data.results.products);
          setHasSearched(true);
        } else {
          setSearchResults([]);
          setHasSearched(true);
        }
      } catch (error) {
        console.error("Search failed:", error);
        setSearchResults([]);
        setHasSearched(true);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    // Cleanup function
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const handleSearchClear = () => {
    setSearchQuery("");
    setSearchResults([]);
    setHasSearched(false);
    inputRef.current?.focus();
  };

  const getCategoryName = (category: { name: string } | string): string => {
    return typeof category === "string"
      ? category
      : category?.name || "Uncategorized";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-primary mb-2">
            Product Search
          </h1>
          <p className="text-muted-foreground">
            Search for products by name or description
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                ref={inputRef}
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-12 h-14 text-lg border-2 focus:border-primary"
              />
              {searchQuery && (
                <button
                  onClick={handleSearchClear}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:bg-gray-100 rounded-full p-1 transition"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              )}
              {isSearching && (
                <Loader2 className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary animate-spin" />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {isSearching && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Searching products...</p>
            </div>
          </div>
        )}

        {!isSearching && hasSearched && searchResults.length === 0 && (
          <Card className="py-12">
            <CardContent className="text-center">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                No products match your search for "{searchQuery}"
              </p>
              <Button onClick={handleSearchClear} variant="outline">
                Clear Search
              </Button>
            </CardContent>
          </Card>
        )}

        {!isSearching && searchResults.length > 0 && (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                Found <span className="font-semibold text-primary">{searchResults.length}</span>{" "}
                product{searchResults.length !== 1 ? "s" : ""} for "{searchQuery}"
              </p>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map((product) => (
                <Link
                  key={product._id}
                  href={`/products/${product._id}`}
                  className="group"
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <CardContent className="p-4">
                      {/* Product Image */}
                      <div className="relative h-48 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                            <ShoppingCart className="h-12 w-12 text-gray-400" />
                          </div>
                        )}
                        {/* Stock Badge */}
                        <Badge
                          variant={product.stockQuantity > 0 ? "default" : "destructive"}
                          className="absolute top-2 right-2"
                        >
                          {product.stockQuantity > 0 ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </div>

                      {/* Product Info */}
                      <div className="space-y-2">
                        <Badge variant="secondary" className="text-xs">
                          {getCategoryName(product.category)}
                        </Badge>
                        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-2xl font-bold text-primary">
                            PKR {product.price.toLocaleString()}
                          </span>
                          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Empty State (no search yet) */}
        {!isSearching && !hasSearched && (
          <Card className="py-12">
            <CardContent className="text-center">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Start Searching</h3>
              <p className="text-muted-foreground">
                Enter a product name or description to search
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
