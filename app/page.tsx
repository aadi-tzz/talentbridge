import Link from "next/link"
import { ArrowRight, Briefcase, Building2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import JobListingPreview from "@/components/job-listing-preview"
import { HeroSection } from "@/components/hero-section"
import { getApprovedJobs } from "@/lib/jobs"

export default async function Home() {
  const latestJobs = (await getApprovedJobs()).slice(0, 4)

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-palette-slate via-palette-charcoal to-palette-slate text-palette-gold font-sans">
      <HeroSection />

      {/* Features Section */}
      <section className="w-full py-16 md:py-28 bg-gradient-to-tr from-palette-charcoal via-palette-slate to-palette-charcoal text-palette-gold relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col items-center max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight drop-shadow-lg">
              How Talent Bridge Works
            </h2>
            <p className="text-palette-mutedBrown text-lg sm:text-xl leading-relaxed">
              Connecting top talent with leading employers through our streamlined platform
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-3 max-w-5xl mx-auto">
            {/* Job Seekers */}
            <div className="flex flex-col items-center space-y-6 bg-palette-slate rounded-3xl p-10 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-palette-gold text-palette-black drop-shadow-lg">
                <Users className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-semibold">For Job Seekers</h3>
              <p className="text-palette-mutedBrown max-w-[280px]">
                Browse through hundreds of job listings and find your perfect match. Apply with ease and track your applications.
              </p>
              <Link href="/jobs" passHref>
                <Button
                  variant="link"
                  className="group gap-2 text-palette-gold hover:text-palette-tan font-semibold inline-flex items-center"
                  aria-label="Browse Jobs"
                >
                  Browse Jobs
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                </Button>
              </Link>
            </div>

            {/* Employers */}
            <div className="flex flex-col items-center space-y-6 bg-palette-slate rounded-3xl p-10 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-palette-gold text-palette-black drop-shadow-lg">
                <Building2 className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-semibold">For Employers</h3>
              <p className="text-palette-mutedBrown max-w-[280px]">
                Post job openings and reach thousands of qualified candidates. Manage applications and find the right talent.
              </p>
              <Link href="/post-job" passHref>
                <Button
                  variant="link"
                  className="group gap-2 text-palette-gold hover:text-palette-tan font-semibold inline-flex items-center"
                  aria-label="Post a Job"
                >
                  Post a Job
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                </Button>
              </Link>
            </div>

            {/* Consultancy */}
            <div className="flex flex-col items-center space-y-6 bg-palette-slate rounded-3xl p-10 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-palette-gold text-palette-black drop-shadow-lg">
                <Briefcase className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-semibold">Consultancy Services</h3>
              <p className="text-palette-mutedBrown max-w-[280px]">
                Get expert advice on recruitment, career development, and HR solutions tailored to your needs.
              </p>
              <Link href="/contact" passHref>
                <Button
                  variant="link"
                  className="group gap-2 text-palette-gold hover:text-palette-tan font-semibold inline-flex items-center"
                  aria-label="Contact Us"
                >
                  Contact Us
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative shapes */}
        <div className="pointer-events-none absolute -bottom-16 left-1/2 -translate-x-1/2 opacity-20">
          <svg
            width="600"
            height="200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-float-slow"
          >
            <circle cx="300" cy="100" r="80" fill="#CAA864" />
          </svg>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="w-full py-16 md:py-24 bg-palette-slate text-palette-gold">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center space-y-5 mb-12">
            <h2 className="text-4xl font-extrabold tracking-tight drop-shadow-md">
              Featured Job Openings
            </h2>
            <p className="text-palette-mutedBrown text-lg leading-relaxed">
              Explore our latest job opportunities from top employers
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-2 max-w-6xl mx-auto">
            {latestJobs.length === 0 ? (
              <p className="text-center text-palette-mutedBrown col-span-2">
                No job listings available at the moment.
              </p>
            ) : (
              latestJobs.map((job) => (
                <JobListingPreview
                  key={job.id}
                  id={job.id}
                  title={job.job_title}
                  company={job.company}
                  location={job.location}
                  salary={job.salary}
                  type={job.job_type}
                  created_at={job.created_at}
                />
              ))
            )}
          </div>

          <div className="flex justify-center mt-12">
            <Link href="/jobs" passHref>
              <Button className="gap-3 bg-palette-gold text-palette-black font-semibold hover:bg-yellow-400 shadow-lg transition">
                View All Jobs
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Resume & Job Posting Help */}
      <section className="w-full py-16 md:py-20 bg-gradient-to-b from-palette-slate to-palette-charcoal text-palette-gold">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Added heading line */}
          <h2 className="text-4xl font-extrabold mb-12 text-center drop-shadow-md">
            How Can We Assist You?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center">
            {/* Resume Help */}
            <div className="bg-palette-charcoal p-10 rounded-3xl flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div>
                <h3 className="text-3xl font-bold mb-3 drop-shadow-md">
                  Don’t see jobs that you are into?
                </h3>
                <p className="mb-1 text-lg">Send us your resume</p>
                <p className="mb-6 text-lg">We will find jobs for you</p>
              </div>
              <Link href="/contact" passHref>
                <Button className="mx-auto bg-palette-gold text-palette-black font-semibold px-8 py-3 rounded-full shadow hover:bg-yellow-400 transition">
                  Send Resume
                </Button>
              </Link>
            </div>

            {/* Job Posting Help */}
            <div className="bg-palette-charcoal p-10 rounded-3xl flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div>
                <h3 className="text-3xl font-bold mb-3 drop-shadow-md">
                  Don’t wanna go through the hassle of posting jobs?
                </h3>
                <p className="mb-1 text-lg">Just send us the jobs in any document</p>
                <p className="mb-6 text-lg">We will post it for you</p>
              </div>
              <Link href="/contact" passHref>
                <Button className="mx-auto bg-palette-gold text-palette-black font-semibold px-8 py-3 rounded-full shadow hover:bg-yellow-400 transition">
                  Send Jobs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24 bg-palette-gold text-palette-black">
        <div className="container mx-auto px-6 max-w-5xl text-center space-y-8">
          <h2 className="text-4xl font-extrabold tracking-tight drop-shadow-sm">
            Ready to Take the Next Step?
          </h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed">
            Whether you’re looking for your next career move or searching for top talent, we’re here to help.
          </p>
          <div className="flex justify-center gap-6 mt-4 flex-wrap">
            <Link href="/jobs" passHref>
              <Button className="bg-palette-slate text-palette-gold font-semibold px-8 py-3 rounded-full shadow hover:bg-palette-charcoal transition">
                Find Jobs
              </Button>
            </Link>
            <Link href="/post-job" passHref>
              <Button className="bg-palette-slate text-palette-gold font-semibold px-8 py-3 rounded-full shadow hover:bg-palette-charcoal transition">
                Post a Job
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
