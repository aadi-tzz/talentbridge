import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-palette-mutedBrown to-palette-darkBrown text-palette-gold">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Connecting Talent with Opportunity
              </h1>
              <p className="max-w-[600px] md:text-xl font-semibold bg-palette-tan/20 text-palette-gold p-4 rounded-lg shadow-md border border-palette-gold">
                Talent Bridge is your trusted partner in finding the perfect job or the ideal candidate. <br />
                We bridge the gap between talent and opportunity.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/jobs">
                <Button
                  size="lg"
                  className="bg-palette-gold text-black hover:bg-yellow-400"
                >
                  Find Jobs
                </Button>
              </Link>
              <Link href="/post-job">
                <Button
                  size="lg"
                  className="bg-[#EEE6D6] text-[#3b3028] hover:bg-[#D7CBAE]"
                >
                  Post a Job
                </Button>
              </Link>
            </div>
          </div>
          <img
            alt="Talent Bridge"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            src="/placeholder.png?height=400&width=800"
          />
        </div>
      </div>
    </section>
  )
}
