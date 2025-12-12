"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone } from "lucide-react";
import CallButton from "@/components/ui/callButton";
import BrowseButton from "@/components/ui/browseButton";

const Team = () => {
  const teamMembers = [
    {
      name: "Muhammad Zeeshan Amin",
      position: "Owner",
      role: "IT & CCTV Expert",
      image: "/dummy.jpeg",
    },
    {
      name: "Muhammad Usama Jabbar",
      position: "Co Partner",
      role: "Supervisor",
      image: "/dummy.jpeg",
    },
    {
      name: "M. Nabeel, M. Nasir, M. Hamza",
      position: "Electrical Technicians",
      image: "/dummy.jpeg",
    },
    {
      name: "Mr. Ali",
      position: "Side Civil Expert",
      image: "/dummy.jpeg",
    },
    {
      name: "Mr. Babar",
      position: "Welding Expert",
      image: "/dummy.jpeg",
    },
    {
      name: "M. Ramzan, M. Imran",
      position: "Plumbers",
      image: "/dummy.jpeg",
    },
    {
      name: "Muhammad Naeem",
      position: "HVAC Technician",
      image: "/dummy.jpeg",
    },
    {
      name: "M. Shoaib Dhaku, M. Ali",
      position: "Helpers",
      image: "/dummy.jpeg",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative py-28 bg-cover h-[90vh] bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/team-solar.jpg')" }}
      >
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <Badge
            className="mb-5 relative bg-primary/20 text-secondary border border-secondary/30 
                      font-semibold tracking-wide px-4 py-2 rounded-full ] 
                      backdrop-blur-md ] 
                      transition-all duration-300"
          >
            Our Team
          </Badge>

          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 drop-shadow-lg">
            Meet our <span className="text-yellow-400">Experts</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Our team is the driving force behind every successful project. With
            expertise, dedication, and innovation, we work together to deliver
            excellence in every service we provide
          </p>
        </div>
      </section>

      {/* ✅ Department Overview Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-sm mb-6">
            Department Overview
          </h2>

          <p className="text-gray-700 text-lg max-w-3xl mx-auto mb-10">
            MA Traders operates through specialized departments including
            Leadership, Engineering, Operations, Marketing, and Customer Support
            — each contributing to seamless solar energy delivery across
            Pakistan.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Leadership & Strategy",
                icon: "🏢",
                desc: "Guiding MA Traders with vision, strategic decisions, and sustainable leadership.",
              },
              {
                name: "Technical Engineering",
                icon: "⚙️",
                desc: "Designing and maintaining high-efficiency solar systems and technical infrastructure.",
              },
              {
                name: "Project Operations",
                icon: "🛠️",
                desc: "Overseeing project execution, timelines, and quality control for smooth installations.",
              },
              {
                name: "Marketing & Awareness",
                icon: "📣",
                desc: "Promoting solar adoption and building strong customer relationships nationwide.",
              },
            ].map((dept, i) => (
              <div
                key={i}
                className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-3">{dept.icon}</div>
                <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                  {dept.name}
                </h3>
                <p className="text-gray-600 text-sm">{dept.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*Leadership Team Section */}
      <section className="pt-10 pb-20 bg-gradient-to-br from-sky-50 via-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-sm mb-4">
              Our Leadership & Expert Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The driving force behind our success — experienced leaders and
              engineers dedicated to sustainability.
            </p>
          </div>

          {/*Team Cards */}
          <div className="flex flex-col items-center space-y-8">
            {/* First row - 2 cards centered */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center">
              {teamMembers.slice(0, 2).map((member, index) => (
                <Card
                  key={index}
                  className="border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden w-72"
                >
                  {/* Image Section */}
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <CardHeader className="text-center mt-4">
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {member.name}
                    </CardTitle>
                    <p className="text-yellow-600 font-medium">
                      {member.position}
                    </p>
                    {member.role && (
                      <p className="text-yellow-600 font-medium">
                        {member.role}
                      </p>
                    )}
                  </CardHeader>
                </Card>
              ))}
            </div>

            {/* Second row - 3 cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {teamMembers.slice(2, 5).map((member, index) => (
                <Card
                  key={index}
                  className="border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden w-72"
                >
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <CardHeader className="text-center mt-4">
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {member.name}
                    </CardTitle>
                    <p className="text-yellow-600 font-medium">
                      {member.position}
                    </p>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {/* Third row - 3 cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {teamMembers.slice(5, 8).map((member, index) => (
                <Card
                  key={index}
                  className="border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden w-72"
                >
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <CardHeader className="text-center mt-4">
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {member.name}
                    </CardTitle>
                    <p className="text-yellow-600 font-medium">
                      {member.position}
                    </p>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Company Culture Section */}
      <section className="pt-10 pb-20 bg-gray-100 text-center">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-sm mb-4">
            Our Company Culture
          </h2>

          <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
            At MA Traders, we believe in teamwork, growth, and purpose. Our
            workplace thrives on mutual respect, open communication, and a
            shared vision of a cleaner, greener Pakistan.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Team Collaboration",
                icon: "🤝",
                desc: "Encouraging teamwork and open communication to achieve shared goals.",
              },
              {
                name: "Innovation & Research",
                icon: "💡",
                desc: "Driving progress with continuous innovation in solar technologies.",
              },
              {
                name: "Employee Growth",
                icon: "📈",
                desc: "Empowering employees through learning, training, and career growth.",
              },
              {
                name: "Work-Life Balance",
                icon: "🌿",
                desc: "Fostering a positive and balanced environment for personal well-being.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h4 className="text-xl font-heading font-semibold text-primary mb-2">
                  {item.name}
                </h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-sky-50 via-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-sm mb-6">
            Ready to Start Your Solar Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Get a free consultation and quote for your solar installation
            project today!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-8">
            <CallButton />
            <BrowseButton path="/projects" name="View our work" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
