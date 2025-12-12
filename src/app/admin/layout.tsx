"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Settings,
  ShoppingBag,
  Briefcase,
  FileText,
  HelpCircle,
  UsersRound,
  Star,
  MessageSquare,
  Shield,
  Menu,
  X,
  Eye,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "User Management", href: "/admin/users", icon: Users },
    { name: "Services", href: "/admin/services", icon: Settings },
    { name: "Products", href: "/admin/products", icon: ShoppingBag },
    { name: "Projects", href: "/admin/projects", icon: Briefcase },
    { name: "FAQ", href: "/admin/faq", icon: HelpCircle },
    { name: "Team", href: "/admin/team", icon: UsersRound },
    { name: "Testimonials", href: "/admin/testimonials", icon: Star },
    { name: "Leads", href: "/admin/leads", icon: MessageSquare },
    { name: "Settings", href: "/admin/settings", icon: Settings },
    { name: "Security", href: "/admin/security", icon: Shield },
  ];

  const isActive = (path: string) => pathname === path;

  const handleViewWebsite = () => router.push("/");
  const handleLogout = () => router.push("/login");

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 h-full bg-card border-r border-border transition-all duration-300 z-40",
          sidebarCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg shadow-lg object-fit-cover">
                <img src="/logo.jpeg" alt="Logo" className="w-10 h-10 rounded-md" />
              </div>
              <div>
                <span className="font-bold text-lg text-primary">MA Traders</span>
                <div className="text-xs text-muted-foreground">Admin Panel</div>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-muted-foreground hover:text-primary"
          >
            {sidebarCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-all",
                isActive(item.href)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-primary hover:bg-muted"
              )}
            >
              <item.icon className="h-5 w-5" />
              {!sidebarCollapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewWebsite}
            className={cn(
              "w-full hover:bg-primary hover:text-primary-foreground transition-colors duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              sidebarCollapsed && "px-2"
            )}
            style={{ cursor: 'pointer' }}
          >
            <Eye className="h-4 w-4" />
            {!sidebarCollapsed && <span className="ml-2">View Website</span>}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className={cn("w-full text-destructive hover:text-destructive", sidebarCollapsed && "px-2")}
          >
            <LogOut className="h-4 w-4" />
            {!sidebarCollapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className={cn("transition-all duration-300", sidebarCollapsed ? "ml-16" : "ml-64")}>
        <header className="bg-card border-b border-border px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-primary">Admin Dashboard</h1>
              <p className="text-sm sm:text-base text-muted-foreground">Manage your solar energy business</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, <span className="font-medium text-foreground">Admin User</span>
              </span>
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-white">AU</span>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
