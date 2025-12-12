"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu as MenuIcon, X, Phone, ShoppingCart, LogIn } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { usePathname } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const pathname = usePathname();

  const navigation = [
    { name: "Home", href: "/" },
    {
      name: "About",
      href: "/about",
      children: [
        { name: "ABOUT US", href: "/about" },
        { name: "TEAM", href: "/team" },
      ],
    },
    {
      name: "Services",
      href: "/services",
      children: [
        {
          name: "SOLAR PANEL INSTALLATION",
          href: "/services/solar-panel-installation",
        },
        {
          name: "INVERTER & BATTERY SETUP",
          href: "/services/inverter-battery-setup",
        },
        { name: "AC INSTALLATION", href: "/services/ac-installation-services" },
        { name: "RESIDENTIAL WIRING", href: "/services/residential-wiring" },
        { name: "CCTV & Smoke Detectors", href: "/services/cctv-security" },
        {
          name: "TRACK & PANEL LIGHT",
          href: "/services/track-panel-light-services",
        },
      ],
    },
    { name: "Products", href: "/products" },
    { name: "Projects", href: "/projects" },
    { name: "FAQ", href: "/faq" },
  ];

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-900 via-white to-gray-900">
      <nav className="fixed inset-x-5 top-6 z-50 backdrop-blur-md bg-white/40 border border-black/30 rounded-full shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-3">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-3 hover:scale-105 transition-transform"
            >
              <div className="p-2 rounded-lg shadow-lg">
                <Image
                  src="/logo.jpeg"
                  alt="MA Traders"
                  width={56}
                  height={60}
                  className="rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg text-black">
                  M.A. Traders
                </span>
                <span className="text-xs text-black/80">
                  Solar Energy Systems
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4 overflow-visible">
              <NavigationMenu className="hidden lg:flex">
                <NavigationMenuList className="flex items-center space-x-3">
                  {navigation.map((item) =>
                    item.children ? (
                      <NavigationMenuItem key={item.name}>
                        <NavigationMenuTrigger
                          className={cn(
                            "text-[15px] font-medium transition-colors bg-transparent text-foreground hover:text-yellow-400 hover:bg-transparent flex items-center gap-1"
                          )}
                        >
                          <Link
                            href={item.href}
                            className="hover:text-yellow-400 flex items-center gap-1"
                          >
                            {item.name}
                          </Link>
                          <ChevronDownIcon className="w-4 h-4 opacity-60" />
                        </NavigationMenuTrigger>

                        <NavigationMenuContent className="backdrop-blur-md bg-black/90 dark:bg-black/30  rounded-xl shadow-lg p-2 mt-2 z-50 min-w-[200px]">
                          <ul className="flex flex-col gap-1">
                            {item.children.map((child) => (
                              <li key={child.name}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={child.href}
                                    className={cn(
                                      "block px-3 py-2 text-sm rounded-md text-white",
                                      "hover:bg-white/20 hover:text-yellow-400 transition-colors"
                                    )}
                                  >
                                    {child.name}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    ) : (
                      <NavigationMenuItem key={item.name}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              "text-[15px] font-medium text-foreground/90 transition-colors",
                              "hover:text-yellow-400 hover:bg-transparent px-3 py-2 rounded-md"
                            )}
                          >
                            {item.name}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )
                  )}
                </NavigationMenuList>
              </NavigationMenu>

              {/* Cart / Login / Contact */}
              <div className="flex items-center space-x-3 ml-10">
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="relative text-black hover:text-yellow-300"
                >
                  <Link href="/cart">
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-yellow-400 text-black">
                        {cartCount}
                      </Badge>
                    )}
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-black hover:text-yellow-300"
                >
                  <Link href="/login">
                    <LogIn className="h-4 w-4 mr-1" />
                    Login
                  </Link>
                </Button>

                <Button
                  asChild
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg hover:shadow-xl transition-transform rounded-3xl"
                >
                  <Link href="/contact">
                    <Phone className="h-4 w-4 mr-0" />
                    Contact
                  </Link>
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="text-black hover:text-yellow-300"
              >
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <MenuIcon className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 mx-4 px-4 py-4 space-y-3 bg-white border border-black/30 rounded-xl shadow-lg animate-fade-in-up z-[60] max-h-[80vh] overflow-y-auto">
            {navigation.map((item) =>
              item.children ? (
                <div key={item.name} className="space-y-1">
                  {item.name === "About" ? (
                    <button
                      onClick={() => setIsAboutOpen(!isAboutOpen)}
                      className="flex items-center justify-between w-full px-3 py-2 rounded-md text-black font-medium hover:text-yellow-300 hover:bg-black/20"
                    >
                      {item.name}
                      <ChevronDownIcon className={`w-4 h-4 transition-transform ${isAboutOpen ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 rounded-md text-black font-medium hover:text-yellow-300 hover:bg-black/20"
                    >
                      {item.name}
                    </Link>
                  )}
                  {item.name === "About" && isAboutOpen && (
                    <div className="pl-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className="block px-3 py-2 rounded-md text-sm text-black hover:text-yellow-300 hover:bg-black/20"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                  {item.name !== "About" && (
                    <div className="pl-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className="block px-3 py-2 rounded-md text-sm text-black hover:text-yellow-300 hover:bg-black/20"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-black hover:text-yellow-300 hover:bg-black/20"
                >
                  {item.name}
                </Link>
              )
            )}

            <div className="pt-4 border-t border-gray-200 space-y-3">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                <Link href="/cart" className="flex items-center" onClick={() => setIsOpen(false)}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                  {cartCount > 0 && (
                    <Badge className="ml-2 bg-yellow-400 text-black">
                      {cartCount}
                    </Badge>
                  )}
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                <Link
                  href="/login"
                  className="flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Link>
              </Button>

              <Button
                asChild
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg justify-start"
              >
                <Link href="/contact" className="flex items-center" onClick={() => setIsOpen(false)}>
                  <Phone className="h-4 w-4 mr-2" />
                  Contact
                </Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
