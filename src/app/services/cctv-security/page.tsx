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

export default function CCTVInstallation() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black overflow-hidden">
      {/* ✅ Hero Section */}
      <section className="relative h-[90vh] w-full flex items-center justify-center">
        <img
          src="/cctv1.webp"
          alt="CCTV Installation"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            CCTV & Smoke Detectors <span className="text-yellow-400">Installation</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Complete security camera installation services for homes, offices,
            and commercial properties.
          </p>
        </div>
      </section>

       {/* ✅ Page Main Heading */}
      <div className="text-center mt-14 px-6">
        <h2 className="text-2xl md:text-4xl font-bold text-yellow-600">
          Professional CCTV & Smoke Detectors Installation
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
                Professional CCTV & Smoke Detection Installation 
              </h2>
              <p className="text-gray-700 leading-relaxed">
                M.A Traders offers complete CCTV camera and smoke detector installation and setup services designed to ensure your home or business stays secure. From basic indoor cameras to full-scale multi-location systems, we handle everything — installation, configuration, and support
              </p>

              {/* Why Choose Section */}
              <h3 className="text-2xl font-semibold text-yellow-600 mt-10 border-l-4 border-yellow-500 pl-3">
                Why Choose M.A Traders for CCTV & Smoke Detector Installation?
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>
                  <strong>Certified Technicians:</strong> Our team is trained in handling top CCTV and smoke detector brands with precision
                </li>
                <li>
                  <strong>Customized Solutions:</strong> We design complete security and safety systems tailored to your property layout.
                </li>
                <li>
                  <strong>High-Definition Systems:</strong> Installations include HD, Full HD, and 4K camera options for crystal-clear monitoring.
                </li>
                <li>
                  <strong>Remote Monitoring:</strong> Access live camera footage and smoke alert notifications from anywhere using your smartphone or PC.
                </li>
                <li>
                  <strong>After-Sales Support:</strong> Enjoy free guidance and maintenance support even after installation.
                </li>
              </ul>

              {/* Services Offered */}
              <h3 className="text-2xl font-semibold text-yellow-600 mt-10 border-l-4 border-yellow-500 pl-3">
                Our CCTV Services Include:
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Home & Office CCTV & Smoke Detector Setup</li>
                <li>HD/IP Camera Installation</li>
                <li>DVR/NVR Configuration</li>
                <li>Network & Internet Setup for Live Viewing</li>
                <li>Maintenance and Replacement</li>
              </ul>

              {/* ✅ FAQ Section */}
              <div className="mt-12">
                <h3 className="text-2xl font-semibold text-yellow-600 mb-4">
                  General Questions
                </h3>
                <div className="space-y-3">
                  <FAQItem
                    question="Do you provide CCTV installation for homes?"
                    answer="Yes, we offer complete CCTV setup for residential areas with HD night vision cameras and remote access features."
                  />
                  <FAQItem
                    question="Can I monitor my cameras on mobile?"
                    answer="Absolutely! We configure your cameras with mobile and desktop apps for real-time access."
                  />
                  <FAQItem
                    question="Do you install both indoor and outdoor cameras?"
                    answer="Yes, we install weatherproof outdoor cameras as well as discreet indoor units based on your security needs."
                  />
                  <FAQItem
                    question="How often should smoke detectors be tested or maintained?"
                    answer="Smoke detectors should be tested at least once a month and cleaned regularly to remove dust"
                  />
                </div>
              </div>
            </div>

            {/* ✅ RIGHT SIDE — Images + Contact Card */}
            <div className="flex flex-col items-center gap-10">
              {["/cctv2.webp", "/smoke.webp"].map((img, i) => (
                <div
                  key={i}
                  className="w-full h-[340px] rounded-3xl overflow-hidden shadow-lg mt-5"
                >
                  <img
                    src={img}
                    alt={`CCTV Installation ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}

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
                          <a
                            href={href}
                            className="hover:text-yellow-600 transition"
                          >
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
