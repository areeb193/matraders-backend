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

export default function ElevatedStructures() {
  const section = {
    heading1: "AC Installation",
    text1: `M.A Traders provides professional AC installation services ensuring maximum performance, energy efficiency, and long-lasting comfort. Whether for residential, commercial, or industrial setups, our team delivers quick, reliable, and safe installations tailored to your cooling requirements. From ducted to split systems, we ensure every installation meets international quality standards for optimal cooling and low energy consumption.`,
    bulletGroups: [
      {
        subHeading: "Why Choose M.A TRADERS for AC Installation?",
        bullets: [
          "Expert Technicians: Our certified professionals ensure every installation is performed with precision and attention to detail.",
          "Energy-Efficient Solutions: We prioritize modern, eco-friendly installation techniques to help you save electricity and reduce costs.",
          "Wide Range of Systems: From split and inverter units to central and ducted systems — we handle all AC types with equal expertise.",
          "Guaranteed Performance: Every installation comes with performance testing to ensure optimal airflow and cooling efficiency.",
          "Quick & Hassle-Free Service: We value your time — our team completes installations promptly with minimum disruption.",
          "After-Sales Support: Enjoy reliable maintenance and on-call assistance for any issues after installation."
        ],
      },
      {
        subHeading: "Installation Process",
        bullets: [
          "Site Survey: We inspect your space for optimal indoor and outdoor unit placement.",
          "System Recommendation: Our experts suggest the best AC model and capacity for your environment.",
          "Professional Installation: Proper mounting, wiring, and refrigerant setup by certified engineers.",
          "Testing & Handover: We test performance and ensure your system runs flawlessly.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long does a standard AC installation take?",
        answer:
          "Most residential AC installations are completed within 2-4 hours. However, larger or commercial setups may take longer depending on the number of units and wiring requirements.",
      },
      {
        question: "Do you install both inverter and non-inverter air conditioners?",
        answer:
          "Yes. Our certified technicians are trained to install all major AC types — including inverter, split, cassette, and central systems.",
      },
      {
        question: "What should I prepare before the installation team arrives?",
        answer:
          "Ensure clear access to the indoor and outdoor unit locations and a nearby power outlet. Our team will handle everything else — from mounting to vacuum testing.",
      },
      {
        question: "Is after-sales maintenance included in the service?",
        answer:
          "M.A Traders offers optional annual maintenance plans, including filter cleaning, coil inspection, and performance testing to keep your AC running smoothly.",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black overflow-hidden">
      {/* ✅ Hero Section */}
      <section className="relative h-[90vh] w-full flex items-center justify-center">
        <img
          src="/ac1.webp"
          alt="Elevated Solar Structures"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            AC <span className="text-yellow-400">Installation</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Professional and reliable AC installation services ensuring maximum cooling efficiency and system longevity
          </p>
        </div>
      </section>

    {/* ✅ Page Main Heading */}
      <div className="text-center mt-14 px-6">
        <h2 className="text-2xl md:text-4xl font-bold text-yellow-600">
          Professional AC Installation Services
        </h2>
      </div>



      {/* ✅ Content Section */}
      <div className="relative z-20 max-w-7xl mx-auto mt-14 px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start pb-24">
            {/* ✅ LEFT SIDE — Text Section */}
            <div className="space-y-6 md:pr-10">
              <h3 className="text-2xl font-semibold text-yellow-600">
                {section.heading1}
              </h3>
              <p className="text-gray-700 leading-relaxed">{section.text1}</p>

              {section.bulletGroups.map((group, i) => (
                <div key={i} className="mt-8">
                  <h3 className="text-xl font-semibold text-yellow-600 mb-2 border-l-4 border-yellow-500 pl-3">
                    {group.subHeading}
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {group.bullets.map((b, index) => {
                      const [boldPart, ...rest] = b.split(":");
                      return (
                        <li key={index}>
                          <strong className="text-gray-900 font-semibold">
                            {boldPart}:
                          </strong>
                          {rest.join(":")}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}

              {/* ✅ FAQ Section */}
              <div className="mt-12">
                <h3 className="text-2xl font-semibold text-yellow-600 mb-4">
                  General Questions
                </h3>
                <div className="space-y-3">
                  {section.faqs.map((faq, i) => (
                    <FAQItem
                      key={i}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ✅ RIGHT SIDE — Images + Contact Card */}
            <div className="flex flex-col items-center gap-10">
              <div className="w-full h-[340px] rounded-3xl overflow-hidden shadow-lg mt-5">
                <img
                  src="/ac2.jpg"
                  alt="Solar Structure"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="w-full h-[340px] rounded-3xl overflow-hidden shadow-md">
                <img
                  src="/ac4.png"
                  alt="Solar Setup"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

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
                      {
                        Icon: Clock,
                        text: "Mon - Sat: 9:00 - 18:00",
                      },
                      {
                        Icon: Headphones,
                        text: "24/7 Service Available",
                      },
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
        </motion.div>
      </div>
    </div>
  );
}
