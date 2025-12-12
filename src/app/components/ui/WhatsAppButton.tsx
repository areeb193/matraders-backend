"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, X,Phone } from "lucide-react";
import { FaWhatsapp, FaPhone } from "react-icons/fa";


export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const whatsappLink = "https://wa.me/923017757484";

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      {/* Chat Widget */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="mb-3"
          >
            <Card className="w-80 shadow-2xl rounded-2xl border border-green-200 bg-gradient-to-br from-white to-green-50 overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between bg-green-600 text-white py-3 px-4">
                <CardTitle className="text-lg font-semibold">
                  WhatsApp Support
                </CardTitle>
                <button onClick={() => setOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <p className="text-gray-700 flex gap-3">
                    <MessageCircle/>
                   <span>Hi there! Need help? Chat with us on WhatsApp.</span>
                </p>
                <p className="text-gray-700 flex gap-2" >
                  <Phone/> <span className="font-medium">+92 301 7757484</span>
                </p>
                <Button
                  onClick={() => window.open(whatsappLink, "_blank")}
                  className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md"
                >
                  Start Chat
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-xl"
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition">
      
 
        <FaWhatsapp className="w-8 h-8"/>
 
    </div>
       
      </motion.button>
    </div>
  );
}
