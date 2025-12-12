"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SolarButton from "@/components/ui/solarButton";
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

const subServices = [
  {
    id: "structure",
    title: "Elevated Solar Structures",
    image: "/elevated1.jpeg",
    image1: "/elevated2.jpg",
    sections: [
      {
        heading1: "Elevated Solar Structures",
        text1: `Elevated solar panel structures play a crucial role in optimizing placement and efficiency,
        especially in areas where space must be preserved. At M.A Traders, we offer advanced aluminum and steel structures
        ensuring durability, stability, and maximum energy generation.`,
        bulletGroups: [
          {
            subHeading: "Why Choose M.A TRADERS for Elevated Structures?",
            bullets: [
              "High Durability: Our structures are crafted from premium-grade materials, ensuring resistance to corrosion, extreme weather, and wear over time.",
              "Customized Solutions: We design frameworks tailored to your site specific requirements, ensuring perfect integration with your property.",
              "Expert Engineering: Designed and installed by industry professionals to guarantee safety, stability, and compliance with local regulations.",
              "Cost Effective: By maximizing land utilization, elevated solar panel structures offer long term value, real estate.",
              "Sustainability: Elevated solar system structures contribute to green building designs, combining renewable energy with space saving benefits.",
            ],
          },
          {
            subHeading: "Applications of Elevated Solar Structures",
            bullets: [
              "Commercial Properties: Parking lot canopies, rooftop solar structure installations with space underneath for HVAC units or maintenance areas.",
              "Industrial Facilities: Elevated setups over factory roofs or open yards for optimal land utilization.",
              "Agricultural Land: Structures built over fields to provide shade for crops while generating renewable energy.",
              "Public Infrastructure: Solar shelters for bus stops, train stations, or pedestrian walkways.",
            ],
          },
        ],
          faqs: [
          {
            question: "What is the life span of elevated solar structures?",
            answer:
              "Elevated solar panel structures is the best solar structures typically last over 25 years, depending on material and maintenance.",
          },
          {
            question: "Can elevated structures be installed on existing rooftops?",
            answer:
              "Yes, we design structures compatible with existing roofs or open spaces to meet specific client needs.",
          },
           {
            question: "Are elevated structures suitable for agricultural use?",
            answer:
              "Absolutely! They provide dual benefits of energy generation and shading for crops.",
          },
          {
            question: "Do you offer customized designs for elevated structures?",
            answer:
              "Yes, all our elevated structures are tailored to site-specific requirements for optimal results.",
          },
          {
            question: "Are the materials used weather resistent?",
            answer:
              "Yes, we use weatherproof aluminum and steel to ensure durability in various climatic conditions.",
          },
        ],
      },
    ],
  },
  {
    id: "Installation",
    title: "Solar System Installation",
    image: "/solarin1.jpg",
    image1: "/solarin2.jpg",
    sections: [
      {
        heading1: "Solar System Installation",
        text1: `Harness the power of the sun with MA TRADERS professional solar installation services! Whether you need a solar system for your home, business, factory, or farm, our team ensures flawless installation tailored to your specific energy needs.`,
        bulletGroups: [
          {
            subHeading: "Installation Services for Every Sector",
            bullets: [
              "Residential Solar Installation: Our residential installations are designed to provide homeowners with sustainable and cost effective energy solutions. From small rooftop systems to complete off grid setups, we ensure that every home gets maximum energy efficiency.",
              "Commercial Solar Installation: Power your business with clean, renewable energy. Our commercial solar solutions cater to offices, shops, and retail spaces, reducing operational costs while enhancing your brands eco friendly image.",
              "Industrial Solar Installation: For factories and large scale operations, we specialize in high capacity solar installations designed to handle the demanding energy requirements of industrial setups.",
              "Agricultural Solar Installation: Reduce dependency on expensive electricity for your agricultural operations. Our systems power everything from irrigation pumps to cold storage facilities, ensuring seamless and affordable energy solutions for farmers.",
            ],
          },
          {
            subHeading: "Why Choose MA TRADERS for Installation?",
            bullets: [
              "Custom Solutions: We assess your energy needs and design a solar system that perfectly fits your requirements.",
              "Top Quality Equipment: We use premium materials and follow industry best practices to ensure reliable installations.",
              "Timely Delivery: Our team values your time and completes every project within the promised timeline.",
              "After Sales Support: We do not just install and leave! Enjoy ongoing support and maintenance to keep your system running smoothly.",
            ],
          },
        ],
        faqs: [
          {
            question: "How long does a solar system installation take?",
            answer:
              "The installation timeline depends on the system size, but most residential systems are completed within 1-2 days. Larger commercial or industrial installations may take longer.",
          },
          {
            question: "Is my site suitable for solar installation?",
            answer:
              "Our team conducts a detailed site survey to determine whether your location is ideal for solar panels. We consider factors like sunlight exposure, roof space, and shading.",
          },
           {
            question: "Will the installation disrupt my daily activities?",
            answer:
              "We ensure a smooth and non-intrusive installation process, minimizing any inconvenience to your routine.",
          },
          {
            question: "Do you provide installation for off grid systems?",
            answer:
              "Yes, we specialize in both on-grid and off-grid solar system installations, catering to diverse energy needs.",
          },
        ],
      },
    ],
  },
  {
    id: "SolarDesign",
    title: "Customized Solar Design",
    image: "/custom1.webp",
    image1: "/custom2.png",
    sections: [
      {
        heading1: "Customized Solar Design",
        text1: `Achieve maximum solar efficiency with MA TRADERS tailored solar design services. Our expert team at solar design company in Lahore utilizes advanced computerized tools to create personalized system designs, ensuring optimal performance and cost savings for every project.`,
        bulletGroups: [
          {
            subHeading: "Why Choose MA TRADERS for Customized Solar Designs?",
            bullets: [
              "Expert Designers: Our team has years of experience in creating efficient solar layouts for various sectors.",
              "Advanced Technology: We use cutting edge software and tools to deliver precise and reliable designs.",
              "Flexible Solutions: Whether residential, commercial, industrial, or agricultural, our designs cater to all types of properties.",
              "Time and Money Savings: A well planned design reduces installation time and lowers overall project costs."
            ],
          },
           {
            subHeading: "Customized Solar Design Process at MA TRADERS",
            bullets: [
              "Initial Consultation: We discuss your energy goals and evaluate your property.",
              "Site Assessment: Our team inspects the area to determine factors like shading and optimal panel placement.",
              "System Design: Using advanced tools, we create a personalized solar layout and present a detailed plan.",
              "Client Approval: We share the design with you for feedback and make adjustments if necessary.",
              "Implementation Support: Once approved, the design is handed over to our installation team for seamless execution.",
              "Performance Monitoring: After installation, we provide guidance on system monitoring and maintenance to ensure efficiency and optimal performance."
            ],
          },
        ],
        faqs: [
          {
            question: "Why is customized solar design is important?",
            answer:
              "A customized design ensures that your solar system is optimized for your property’s unique conditions, leading to better performance and higher savings.",
          },
          {
            question: "How does you calculate the optimal angle for solar panels?",
            answer:
              "We use advanced tools and software to analyze your location solar irradiance, determining the best tilt and orientation for maximum sunlight capture.",
          },
           {
            question: "Is this service availble for all types of properties?",
            answer:
              "Absolutely! We provide customized designs for residential, commercial, industrial, and agricultural projects.",
          },
          {
            question: "How does it take to create a design?",
            answer:
              "The timeline depends on the project size but typically ranges from 3–7 days after the site assessment.",
          },
        ],
      },
    ],
  },
];

export default function SolarPanel() {
  const [active, setActive] = useState(subServices[0]);

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black overflow-hidden">
      {/* ✅ Hero Section (Static Heading) */}
      <section className="relative h-[90vh] w-full flex items-center justify-center">
        <img
          src="/solarin3.webp"
          alt="Solar Panels"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
             Solar System <span className="text-yellow-400">Installation</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Professional and reliable solar system installation services for
            homes and businesses.
          </p>
        </div>
      </section>

      {/* ✅ Tabs */}
      <div className="relative z-20 max-w-7xl mx-auto mt-12 px-6 md:px-10 gap-16">
        <div className="flex flex-wrap gap-3 justify-center text-black">
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

        <div className="mt-14">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
            >
              {/* Dynamic heading under tabs */}
              <h2 className="text-4xl font-bold text-center text-yellow-600 mb-10">
                {active.title}
              </h2>

              {active.sections.map((section, i) => (
                <div
                  key={i}
                  className="grid md:grid-cols-2 gap-10 md:gap-16 items-start pb-24"
                >
                  {/* ✅ LEFT SIDE — Text Section */}
                  <div className="space-y-6 md:pr-10">
                    <h3 className="text-2xl font-semibold text-yellow-600">
                      {section.heading1}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {section.text1}
                    </p>

                    {section.bulletGroups?.map((group, i) => (
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
                    {section.faqs && (
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
                    )}
                  </div>

                  {/* ✅ RIGHT SIDE — Image + Contact Card */}
                  <div className="flex flex-col items-center gap-10">
                    <div className="w-full h-[340px] rounded-3xl overflow-hidden shadow-lg mt-5">
                      <img
                        src={active.image}
                        alt={section.heading1}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* 🆕 Middle image (different for each category) */}
                    {active.image1 && (
                      <div className="w-full h-[340px] rounded-3xl overflow-hidden shadow-md">
                        <img
                          src={active.image1}
                          alt="Additional Visual"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    <Card className="w-full max-w-[380px] bg-gradient-to-br from-yellow-50 via-white to-yellow-20 border border-yellow-400/60 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
                      <CardContent className="p-8 text-gray-800 space-y-5">
                        <h2 className="text-2xl font-bold text-center text-yellow-700">
                          Get In Touch
                        </h2>

                        <div className="space-y-4">
                          {[
                            {
                              Icon: Mail,
                              text: "m.atradersceo484@gmail.com",
                              href: "m.atradersceo484@gmail.com",
                            },
                            {
                              Icon: Phone,
                              text: "+92 301 7757484",
                              href: "tel:+92 301 7757484",
                            },
                            {
                              Icon: MapPin,
                              text: "64, Gulshan block,shop No.4, Allama Iqbal Town, Lahore",
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
              ))}
            </motion.div>
        </div>
      </div>
    </div>
  );
}
