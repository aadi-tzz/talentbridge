import Link from "next/link"
import { ArrowRight, Briefcase, Building2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import JobListingPreview from "@/components/job-listing-preview"
import { HeroSection } from "@/components/hero-section"
import { getApprovedJobs } from "@/lib/jobs"

export default async function Home() {
  const latestJobs = (await getApprovedJobs()).slice(0, 4)

  return (
    <div className="flex min-h-screen flex-col bg-palette-slate text-palette-gold">
      <HeroSection />

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-palette-charcoal text-palette-gold">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-palette-gold">
                How Talent Bridge Works
              </h2>
              <p className="max-w-[900px] text-palette-mutedBrown md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Connecting top talent with leading employers through our streamlined platform
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            {/* Job Seekers */}
            <div className="flex flex-col items-center space-y-4 text-center bg-palette-slate p-6 rounded-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-palette-gold">
                <Users className="h-8 w-8 text-palette-black" />
              </div>
              <h3 className="text-xl font-bold text-palette-gold">For Job Seekers</h3>
              <p className="text-palette-mutedBrown">
                Browse through hundreds of job listings and find your perfect match. Apply with ease and track your applications.
              </p>
              <Link href="/jobs">
                <Button variant="link" className="gap-1 group text-palette-gold hover:text-palette-tan">
                  Browse Jobs
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {/* Employers */}
            <div className="flex flex-col items-center space-y-4 text-center bg-palette-slate p-6 rounded-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-palette-gold">
                <Building2 className="h-8 w-8 text-palette-black" />
              </div>
              <h3 className="text-xl font-bold text-palette-gold">For Employers</h3>
              <p className="text-palette-mutedBrown">
                Post job openings and reach thousands of qualified candidates. Manage applications and find the right talent.
              </p>
              <Link href="/post-job">
                <Button variant="link" className="gap-1 group text-palette-gold hover:text-palette-tan">
                  Post a Job
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {/* Consultancy */}
            <div className="flex flex-col items-center space-y-4 text-center bg-palette-slate p-6 rounded-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-palette-gold">
                <Briefcase className="h-8 w-8 text-palette-black" />
              </div>
              <h3 className="text-xl font-bold text-palette-gold">Consultancy Services</h3>
              <p className="text-palette-mutedBrown">
                Get expert advice on recruitment, career development, and HR solutions tailored to your needs.
              </p>
              <Link href="/contact">
                <Button variant="link" className="gap-1 group text-palette-gold hover:text-palette-tan">
                  Contact Us
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-palette-slate text-palette-gold">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Job Openings</h2>
              <p className="max-w-[900px] text-palette-mutedBrown md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore our latest job opportunities from top employers
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8 py-12 lg:grid-cols-2">
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
                  salary={`${job.salary_min} - ${job.salary_max}`}
                  type={job.job_type}
                  created_at={job.created_at}
                />
              ))
            )}
          </div>
          <div className="flex justify-center">
            <Link href="/jobs">
              <Button className="gap-2 bg-palette-gold text-palette-black hover:bg-yellow-400">

                View All Jobs
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-palette-gold text-palette-black">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Take the Next Step?</h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Whether you're looking for your next career move or searching for top talent, we're here to help.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/jobs">
                <Button className="bg-palette-slate text-palette-gold hover:bg-palette-charcoal">
                  Find Jobs
                </Button>
              </Link>
              <Link href="/post-job">
                <Button className="bg-palette-slate text-palette-gold hover:bg-palette-charcoal">
                  Post a Job
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
