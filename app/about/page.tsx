import {
  Users,
  Building2,
  Award,
  Briefcase,
  Clock,
  Globe
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="w-full py-16 bg-[#f5efe3]">
        <div className="container px-4 md:px-6 grid gap-10 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[#6C5C4C]">
              About Talent Bridge
            </h1>
            <p className="text-lg text-gray-600">
              We're on a mission to connect exceptional talent with outstanding opportunities,
              bridging the gap between job seekers and employers.
            </p>
          </div>
          <img
            alt="Talent Bridge Team"
            className="w-full rounded-xl object-cover aspect-video"
            src="/placeholder.png"
          />
        </div>
      </section>

      {/* Our Story */}
      <section className="w-full py-16">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-[#766646]">Our Story</h2>
            <p className="text-gray-600 text-lg">
              Founded in 2020, Talent Bridge was born from a simple observation:
              the traditional recruitment process was broken. Job seekers struggled
              to find meaningful opportunities, while employers faced challenges in
              identifying the right talent.
            </p>
          </div>
          <div className="space-y-5 text-gray-600">
            <p>
              Our founder, having experienced these challenges firsthand as both a
              job seeker and a hiring manager, set out to create a solution that would
              transform the recruitment landscape.
            </p>
            <p>
              Today, Talent Bridge has grown into a trusted partner for job seekers
              and employers across industries. We've maintained our core values of
              transparency, integrity, and excellence.
            </p>
            <p>
              What sets us apart is our personalized approach. We don't just match skills
              to jobs — we build real connections that lead to meaningful careers.
            </p>
          </div>
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
            {[
              { icon: <Users />, title: "People First", text: "We believe in the potential of every individual and strive to create opportunities that allow talent to thrive." },
              { icon: <Building2 />, title: "Integrity", text: "We operate with transparency and honesty, building trust with our clients and candidates." },
              { icon: <Award />, title: "Excellence", text: "We deliver exceptional service and continuously improve our processes." },
              { icon: <Briefcase />, title: "Innovation", text: "We embrace new technologies to stay ahead in the recruitment landscape." },
              { icon: <Clock />, title: "Efficiency", text: "We streamline our processes to deliver fast, quality results." },
              { icon: <Globe />, title: "Diversity", text: "We celebrate diversity and create inclusive workplaces where everyone can succeed." }
            ].map((item, idx) => (
              <Card key={idx}>
                <CardContent className="p-6 text-center space-y-4">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto">
                    <div className="text-primary w-8 h-8">{item.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-gray-600">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-16">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-[#766646]">Our Team</h2>
            <p className="text-gray-600 text-lg">
              Meet the professionals behind Talent Bridge, driving our vision and success forward.
            </p>
          </div>
          <div className="grid gap-10 sm:grid-cols-2">
            {[
              { name: "Renu Chaudhary", title: "MBA (HR)", img: "/renu.png" },
              { name: "Pooja", title: "MBA (HR & Marketing)", img: "/pooja.png" }
            ].map((member, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-2">
                <img
                  src={member.img}
                  alt={member.name}
                  className="h-32 w-32 rounded-full object-cover"
                />
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
