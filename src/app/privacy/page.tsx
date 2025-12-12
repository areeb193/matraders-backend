"use client"

import React from 'react';
import { Badge } from '@/components/ui/badge';

const Privacy = () => {
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
                            Privacy Policy
                          </Badge>
          <h1 className="text-4xl font-heading font-bold text-primary mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground">
            How we collect, use, and protect your information
          </p>
        </div>
        
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">Information We Collect</h2>
          <p className="text-muted-foreground mb-6">
            We collect information you provide directly to us, such as when you request a quote, 
            contact us, or use our services.
          </p>
          
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">How We Use Your Information</h2>
          <p className="text-muted-foreground mb-6">
            We use the information we collect to provide, maintain, and improve our services, 
            process transactions, and communicate with you.
          </p>
          
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about this Privacy Policy, please contact us at info@matraders.com.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;