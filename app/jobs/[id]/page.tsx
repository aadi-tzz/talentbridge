import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MapPin, Clock, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getJobById } from "@/services/job-service"

export default async function JobDetailsPage({ params }: { params: { id: string } }) {
  const job = await getJobById(params.id)

  if (!job) notFound()

  return (
    <div className="min-h-screen bg-[#EEE6D6] text-[#3b3028] py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link href="/jobs" className="inline-flex items-center text-sm text-[#766646] hover:underline mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Jobs
        </Link>

        <div className="bg-[#D7CBAE] rounded-xl shadow-md p-8 space-y-6">
          {/* Job Header */}
          <div>
            <h1 className="text-2xl font-bold">{job.job_title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-[#6C5C4C] mt-2">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location || "N/A"}</span>
              <span className="flex items-center gap-1"><DollarSign className="h-4 w-4" /> {job.salary_min ? `${job.salary_min} - ${job.salary_max}` : "Not specified"}</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> Posted recently</span>
              <Badge className="bg-[#CAA864] text-white px-2 py-1 capitalize">{job.job_type}</Badge>
              <Badge className="bg-[#6C5C4C] text-white px-2 py-1 capitalize">{job.experience_level}</Badge>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{job.job_description}</p>
          </div>

          {/* Requirements */}
          {job.requirements && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Requirements</h2>
              <ul className="list-disc list-inside text-sm space-y-1">
                {job.requirements.split("\n").map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {job.benefits && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Benefits</h2>
              <ul className="list-disc list-inside text-sm space-y-1">
                {job.benefits.split("\n").map((ben, idx) => (
                  <li key={idx}>{ben}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Apply Button */}
          <div className="pt-4">
            <Link href={`/apply/${job.id}`}>
              <Button className="bg-[#766646] hover:bg-[#6C5C4C] text-white w-full sm:w-auto">
                Apply Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
