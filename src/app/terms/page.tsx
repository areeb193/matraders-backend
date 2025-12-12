"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

const Terms = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge
            className="mb-5 mt-5 relative bg-primary/20 text-blue-500 border border-secondary/30 
                   font-semibold tracking-wide px-4 py-2 rounded-full ] 
                   backdrop-blur-md ] 
                   transition-all duration-300"
          >
            Terms & Conditions
          </Badge>
          <h1 className="text-4xl font-heading font-bold text-primary mb-6">
            Terms & Conditions
          </h1>
          <p className="text-lg text-muted-foreground">
            Terms of service for MA Traders Solar Energy Systems
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">
            Service Terms
          </h2>
          <p className="text-muted-foreground mb-6">
            These terms govern your use of our solar energy services and
            products.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary mb-4">
            Warranties
          </h2>
          <p className="text-muted-foreground mb-6">
            We provide comprehensive warranties on all equipment and
            installation work as specified in your service agreement.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary mb-4">
            Contact Information
          </h2>
          <p className="text-muted-foreground">
            For questions about these terms, contact us at
            m.atradersceo484@gmail.com or +92 301 7757484.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
