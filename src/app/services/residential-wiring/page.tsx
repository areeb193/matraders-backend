"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
    </div>
  );
};

export default function ResidentialWiring() {
  const faqs = [
    {
      question: "Do you provide wiring for newly constructed homes?",
      answer:
        "Yes, we provide complete electrical wiring for newly built houses, ensuring safety, load balance, and compliance with standards.",
    },
    {
      question: "Can you upgrade old or faulty wiring?",
      answer:
        "Absolutely. We offer full rewiring services, replacing outdated wires and switches to prevent hazards.",
    },
    {
      question: "Is your wiring suitable for smart home systems?",
      answer:
        "Yes, we design wiring layouts compatible with smart lighting, automation, and IoT systems.",
    },
    {
      question: "Do you handle large office or building projects?",
      answer:
        "Yes, our team manages wiring for multi-floor commercial spaces with proper distribution boards and safety compliance.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black overflow-hidden">
      {/* ✅ Hero Section */}
      <section className="relative h-[90vh] w-full flex items-center justify-center">
        <img
          src="/wiring1.webp"
          alt="Residential Wiring"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            Residential <span className="text-yellow-400">Wiring</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Safe, modern, and efficient wiring solutions for your home and office.
          </p>
        </div>
      </section>

      {/* ✅ Page Main Heading */}
      <div className="text-center mt-14 px-6">
        <h2 className="text-2xl md:text-4xl font-bold text-yellow-600">
          Professional Residential & Commercial Wiring Services
        </h2>
      </div>

      {/* ✅ Main Content */}
      <div className="max-w-7xl mx-auto mt-16 grid md:grid-cols-2 gap-12 px-6 md:px-10 items-start pb-24">
        {/* ✅ LEFT SIDE */}
        <div>
          {/* 🔹 Residential Wiring Section */}
          <h3 className="text-2xl font-semibold text-yellow-600 mb-2">
            Residential Wiring
          </h3>
          <p className="text-gray-700 leading-relaxed mb-8">
            Our residential wiring solutions are designed to keep your home
            safe, efficient, and ready for future smart technologies. Whether
            it's a new construction or an upgrade, we deliver flawless
            electrical installations that last.
          </p>

          {/* 🔹 Why Choose Section */}
          <h3 className="text-2xl font-semibold text-yellow-600 mb-3">
            Why Choose M.A Traders for Wiring?
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-10">
            <li>
              <strong>Certified Electricians:</strong> Our experts ensure all
              wiring meets safety and code compliance.
            </li>
            <li>
              <strong>Premium Quality Materials:</strong> We use high-grade
              wires and branded electrical components.
            </li>
            <li>
              <strong>Smart Home Ready:</strong> Future-proof setups compatible
              with automation and IoT.
            </li>
            <li>
              <strong>Energy Efficiency:</strong> Optimized designs to reduce
              power loss.
            </li>
            <li>
              <strong>Timely & Neat Work:</strong> Clean finishing with minimum
              disruption.
            </li>
          </ul>

          {/* 🔹 What We Offer Section */}
          <h3 className="text-2xl font-semibold text-yellow-600 mb-3">
            What We Offer
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-10">
            <li>Complete house wiring – from main panels to outlets.</li>
            <li>Office & commercial wiring for reliable power distribution.</li>
            <li>Lighting, switchboard, and socket installation.</li>
            <li>Rewiring and upgrading old systems.</li>
            <li>Generator, UPS, and solar connection integration.</li>
          </ul>

          {/* 🔹 FAQ Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-yellow-600 mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </div>

        {/* ✅ RIGHT SIDE — Images + Contact Card */}
        <div className="flex flex-col items-center gap-10">
          {["/wiring2.jpg", "/wiring3.webp"].map(
            (img, i) => (
              <div
                key={i}
                className="w-full h-[340px] rounded-3xl overflow-hidden shadow-lg"
              >
                <img
                  src={img}
                  alt={`Residential Wiring ${i + 1}`}
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
                  <div key={i} className="flex items-center gap-3 text-gray-800">
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
    </div>
  );
}
