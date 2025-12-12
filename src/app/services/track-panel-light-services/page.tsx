"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Headphones,
  ChevronDown,
} from "lucide-react";
import ContactBtn from "@/components/ui/ContactuiButton";

const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      className="border border-yellow-200 bg-white rounded-2xl p-4 cursor-pointer shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-gray-900">{question}</h4>
        <ChevronDown
          className={`text-yellow-600 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>
      <AnimatePresence>
        {open && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 text-gray-700 leading-relaxed"
          >
            {answer}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function TrackAndPanelLightServices() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black overflow-hidden">
      {/* ✅ Hero Section */}
      <section className="relative h-[90vh] w-full flex items-center justify-center">
        <img
          src="/track1.webp"
          alt="Track and Panel Lighting"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            Track & Panel light <span className="text-yellow-400">Installation</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Modern and efficient lighting solutions for homes, offices, and commercial interiors.
          </p>
        </div>
      </section>

      {/* ✅ Page Main Heading */}
      <div className="text-center mt-14 px-6">
        <h2 className="text-2xl md:text-4xl font-bold text-yellow-600">
          Professional Track & Panel Light Installation Services
        </h2>
      </div>

      {/* ✅ Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto mt-14 px-6 md:px-10 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* ✅ LEFT SIDE */}
            <div className="space-y-6 md:pr-10">
              {/* Main Heading */}
              <h2 className="text-2xl font-bold text-yellow-600">
                Professional Track & Panel Light Installation
              </h2>
              <p className="text-gray-700 leading-relaxed">
                M.A Traders offers expert installation of track and panel lighting systems that
                enhance interior design while maintaining energy efficiency. Whether it’s your
                home, office, or retail space — our team ensures precise alignment, stylish
                fittings, and lasting performance.
              </p>

              {/* Why Choose Section */}
              <h3 className="text-2xl font-semibold text-yellow-600 mt-10 border-l-4 border-yellow-500 pl-3">
                Why Choose M.A Traders for Lighting Installation?
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>
                  <strong>Professional Setup:</strong> Expert electricians for seamless
                  installation and wiring.
                </li>
                <li>
                  <strong>Modern Aesthetic Design:</strong> Enhance ambiance with stylish
                  track, panel, and downlight fixtures.
                </li>
                <li>
                  <strong>Energy-Efficient Solutions:</strong> LED lighting systems that save
                  power and last longer.
                </li>
                <li>
                  <strong>Custom Lighting Layouts:</strong> Designed to match your interior
                  themes and functional needs.
                </li>
                <li>
                  <strong>Maintenance & Upgrades:</strong> Quick replacement or adjustment of
                  fixtures for long-term performance.
                </li>
              </ul>

              {/* Services Offered */}
              <h3 className="text-2xl font-semibold text-yellow-600 mt-10 border-l-4 border-yellow-500 pl-3">
                Our Lighting Services Include:
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Track Light Installation (Single & Multi-Head)</li>
                <li>LED Panel Light Setup for Ceilings</li>
                <li>Spot & Downlight Fittings</li>
                <li>False Ceiling Electrical Integration</li>
                <li>Lighting Layout Design Consultation</li>
              </ul>

              {/* ✅ FAQ Section */}
              <div className="mt-12">
                <h3 className="text-2xl font-semibold text-yellow-600 mb-4">
                  General Questions
                </h3>
                <div className="space-y-3">
                  <FAQItem
                    question="Do you provide lighting installation for both homes and offices?"
                    answer="Yes, we install lighting systems for residential and commercial projects, ensuring efficiency and design consistency."
                  />
                  <FAQItem
                    question="Can you replace old lights with energy-efficient LEDs?"
                    answer="Absolutely! We can replace existing fixtures with LED panels and track lights to reduce your energy cost."
                  />
                  <FAQItem
                    question="Do you offer ceiling design guidance for lights?"
                    answer="Yes, our team can assist with designing light placement and layouts that match your ceiling design."
                  />
                </div>
              </div>
            </div>

            {/* ✅ RIGHT SIDE — Images + Contact Card */}
            <div className="flex flex-col items-center gap-10">
              {["/track2.jpg", "/track3.webp"].map(
                (img, i) => (
                  <div
                    key={i}
                    className="w-full h-[340px] rounded-3xl overflow-hidden shadow-lg mt-5"
                  >
                    <img
                      src={img}
                      alt={`Lighting Service ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )
              )}

              <Card className="w-full max-w-[380px] bg-gradient-to-br from-yellow-100 via-white to-yellow-50 border border-yellow-400/60 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8 text-gray-800 space-y-5">
                  <h2 className="text-2xl font-bold text-center text-yellow-700">
                    Get In Touch
                  </h2>

                  <div className="space-y-4">
                    {[
                      {
                        Icon: Mail,
                        text: "m.atradersceo484@gmail.com",
                        href: "mailto:m.atradersceo484@gmail.com",
                      },
                      {
                        Icon: Phone,
                        text: "+92 301 7757484",
                        href: "tel:+923017757484",
                      },
                      {
                        Icon: MapPin,
                        text: "64, Gulshan Block, Shop No.4, Allama Iqbal Town, Lahore",
                      },
                      { Icon: Clock, text: "Mon - Sat: 9:00 - 18:00" },
                      { Icon: Headphones, text: "24/7 Service Available" },
                    ].map(({ Icon, text, href }, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 text-gray-800"
                      >
                        <Icon className="text-yellow-600" />
                        {href ? (
                          <a href={href} className="hover:text-yellow-600 transition">
                            {text}
                          </a>
                        ) : (
                          <p>{text}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="pt-5 text-center">
                    <ContactBtn />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
