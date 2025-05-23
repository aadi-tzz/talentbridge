"use client";

import {
  Users,
  Building2,
  Award,
  Briefcase,
  Clock,
  Globe
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function AboutPage() {
  const values = [
    {
      icon: <Users />,
      title: "People First",
      text: "We believe in the potential of every individual and strive to create opportunities that allow talent to thrive.",
    },
    {
      icon: <Building2 />,
      title: "Integrity",
      text: "We operate with transparency and honesty, building trust with our clients and candidates.",
    },
    {
      icon: <Award />,
      title: "Excellence",
      text: "We deliver exceptional service and continuously improve our processes.",
    },
    {
      icon: <Briefcase />,
      title: "Innovation",
      text: "We embrace new technologies to stay ahead in the recruitment landscape.",
    },
    {
      icon: <Clock />,
      title: "Efficiency",
      text: "We streamline our processes to deliver fast, quality results.",
    },
    {
      icon: <Globe />,
      title: "Diversity",
      text: "We celebrate diversity and create inclusive workplaces where everyone can succeed.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="w-full py-16 bg-[#f5efe3]">
        <div className="container px-4 md:px-6 grid gap-10 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[#6C5C4C]">
              About Talent Bridge
            </h1>
            <p className="text-lg text-gray-600">
              We're on a mission to connect exceptional talent with outstanding opportunities,
              bridging the gap between job seekers and employers.
            </p>
          </motion.div>
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            alt="Talent Bridge Team"
            className="w-full rounded-xl object-cover aspect-video shadow-md"
            src="/placeholder.png"
          />
        </div>
      </section>

      {/* Our Story */}
      <section className="w-full py-20 bg-[#fffdfa]">
        <div className="container px-4 md:px-6 grid lg:grid-cols-2 items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-[#766646]">Our Story</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Founded in <span className="font-semibold text-[#6C5C4C]">2020</span>, Talent Bridge emerged from a realization that the traditional hiring process was broken.
              Job seekers often struggled to find meaningful opportunities, while companies faced challenges identifying the right talent.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our founder experienced these hurdles first-hand and envisioned a platform that would transform recruitment into a more human-centered journey.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Today, Talent Bridge is a trusted name, connecting people with purpose-driven careers, fueled by our values of <span className="font-medium text-[#766646]">integrity</span>,
              <span className="font-medium text-[#766646]"> transparency</span>, and <span className="font-medium text-[#766646]">personalization</span>.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src="/story.png"
              alt="Our Story Illustration"
              className="w-full rounded-xl shadow-lg object-cover aspect-video"
            />
          </motion.div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="w-full py-16 bg-[#f7f3e9]">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-3xl font-bold text-[#6C5C4C]">Our Mission & Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Guided by our core principles, we're committed to transforming how talent and opportunity connect.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {values.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto">
                      <div className="text-primary w-8 h-8">{item.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-gray-600">{item.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="w-full py-16">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <h2 className="text-3xl font-bold text-[#766646]">Our Founder</h2>
            <p className="text-gray-600 text-lg">
              Meet the visionary behind Talent Bridge, driving our mission and impact.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <img
                src="/renu.png"
                alt="Renu Chaudhary"
                className="h-32 w-32 rounded-full object-cover"
              />
              <h3 className="text-lg font-bold">Renu Chaudhary</h3>
              <p className="text-sm text-gray-500">MBA (HR)</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
