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
import SolarButton from "@/components/ui/solarButton";

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

const subServices = [
  {
    id: "inverter",
    title: "Inverter Setup",
    image: "/inverter1.jpg",
    image1: "/inverter2.webp",
    section: {
      heading1: "Inverter Setup",
      text1: `M.A Traders provides professional inverter installation services to ensure continuous, stable, and efficient power supply. Whether for homes, offices, or industrial facilities, our expert team installs inverters with precision and adherence to electrical safety standards.`,
      bulletGroups: [
        {
          subHeading: "Why Choose M.A TRADERS for Inverter Setup?",
          bullets: [
            "Certified Installation: All our inverter setups are handled by qualified electricians ensuring safety and compliance.",
            "Seamless Integration: We ensure your inverter perfectly integrates with your existing electrical system.",
            "High-Performance Systems: We use top-tier inverters that offer fast charging and long-term reliability.",
            "Load Assessment: Our team evaluates your power needs and installs the right inverter capacity.",
            "After-Sales Support: We provide maintenance, repairs, and guidance for optimal performance.",
          ],
        },
        {
          subHeading: "Installation Process",
          bullets: [
            "Site Assessment: Inspection of the power system and space availability.",
            "Product Selection: Recommending the right inverter model based on your energy demand.",
            "Installation: Proper wiring, mounting, and safety checks.",
            "Testing: Ensuring seamless power transition and efficiency.",
          ],
        },
      ],
      faqs: [
        {
          question: "What type of inverter is suitable for home use?",
          answer:
            "For most homes, a pure sine wave inverter is recommended as it supports all appliances safely and efficiently.",
        },
        {
          question: "Can you install hybrid inverters?",
          answer:
            "Yes, we install all types including hybrid, on-grid, and off-grid inverters.",
        },
        {
          question: "Do you offer inverter maintenance?",
          answer:
            "Yes, our technicians provide complete after-sales service and routine maintenance for all inverter types.",
        },
        {
          question: "How long does the installation take?",
          answer:
            "Typically, inverter installation takes around 2-3 hours depending on complexity and system capacity.",
        },
      ],
    },
  },
  {
    id: "battery",
    title: "Battery Setup",
    image: "/battery1.jpg",
    image1: "/battery2.webp",
    section: {
      heading1: "Battery Setup",
      text1: `Our battery installation service ensures reliable energy backup for uninterrupted power supply. M.A Traders specializes in installing deep-cycle, lithium, and tubular batteries with proper ventilation, wiring, and protection.`,
      bulletGroups: [
        {
          subHeading: "Why Choose M.A TRADERS for Battery Setup?",
          bullets: [
            "High-Quality Batteries: We provide only tested and durable batteries from trusted brands.",
            "Proper Ventilation Setup: We ensure heat dissipation and safety during charging cycles.",
            "Optimal Configuration: Batteries are connected in perfect series or parallel configurations as per power demand.",
            "Safety & Protection: Includes circuit breakers, fuses, and surge protection.",
            "Performance Monitoring: We provide voltage and charge monitoring solutions for efficient energy use.",
          ],
        },
        {
          subHeading: "Installation Process",
          bullets: [
            "Assessment: We evaluate your load and backup requirements.",
            "Battery Selection: Choosing the ideal battery capacity for your system.",
            "Setup: Professional connection with inverters, fuses, and protection gear.",
            "Testing: Full-cycle testing to ensure system readiness.",
          ],
        },
      ],
      faqs: [
        {
          question: "Which battery type lasts the longest?",
          answer:
            "Lithium-ion batteries generally offer the longest lifespan, efficiency, and fastest charging time.",
        },
        {
          question: "Do you provide replacement or battery upgrades?",
          answer:
            "Yes, we provide replacement, capacity upgrades, and compatibility checks with existing inverters.",
        },
        {
          question: "How often should I maintain my batteries?",
          answer:
            "Maintenance frequency depends on the battery type. Lead-acid batteries need quarterly checks, while lithium batteries require minimal maintenance.",
        },
        {
          question: "Can I use solar panels with your battery setup?",
          answer:
            "Absolutely! Our systems are compatible with solar integration for sustainable and cost-effective backup power.",
        },
      ],
    },
  },
];

export default function BatteryInverterSetup() {
  const [active, setActive] = useState(subServices[0]);

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black overflow-hidden">
      {/* ✅ Hero Section */}
      <section className="relative h-[90vh] w-full flex items-center justify-center">
        <img
          src="/inverter2.webp"
          alt="Battery and Inverter Setup"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
           Inverter and Battery <span className="text-yellow-400">Setup</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Reliable power backup solutions for homes, offices, and industries.
          </p>
        </div>
      </section>

      {/* ✅ Tabs */}
      <div className="relative z-20 max-w-7xl mx-auto mt-12 px-6 md:px-10 gap-16">
        <div className="flex flex-wrap gap-8 justify-center text-black">
          {subServices.map((item) => (
            <SolarButton
              key={item.id}
              onClick={() => setActive(item)}
              active={active.id === item.id}
            >
              {item.title}
            </SolarButton>
          ))}
        </div>

        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-14"
        >
          {/* ✅ Dynamic Heading */}
          <h2 className="text-4xl font-bold text-center text-yellow-600 mb-10">
            {active.title}
          </h2>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start pb-24">
            {/* LEFT SIDE — Text */}
            <div className="space-y-6 md:pr-10">
              <h3 className="text-2xl font-semibold text-yellow-600">
                {active.section.heading1}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {active.section.text1}
              </p>

              {active.section.bulletGroups.map((group, i) => (
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

              {/* ✅ FAQs */}
              <div className="mt-12">
                <h3 className="text-2xl font-semibold text-yellow-600 mb-4">
                  General Questions
                </h3>
                <div className="space-y-3">
                  {active.section.faqs.map((faq, i) => (
                    <FAQItem
                      key={i}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE — Images + Contact Card */}
            <div className="flex flex-col items-center gap-10">
              <div className="w-full h-[340px] rounded-3xl overflow-hidden shadow-lg mt-5">
                <img
                  src={active.image}
                  alt={active.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="w-full h-[340px] rounded-3xl overflow-hidden shadow-md">
                <img
                  src={active.image1}
                  alt={`${active.title} setup`}
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
