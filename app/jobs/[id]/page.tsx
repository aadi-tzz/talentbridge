import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MapPin, Clock, IndianRupee } from "lucide-react"
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
            <h1 className="text-2xl font-bold">{job.job_title || "Empty"}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#6C5C4C] mt-4">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {job.location || "Empty"}
              </span>
              <span className="flex items-center gap-1">
                <IndianRupee className="h-4 w-4" /> {job.salary || "Empty"}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> Posted recently
              </span>

              {/* Job Type */}
              <div className="flex flex-col items-start">
                <span className="text-[0.7rem] text-[#3b3028] font-semibold uppercase tracking-wide">
                  Job Type
                </span>
                <Badge className="bg-[#CAA864] text-white px-2 py-1 capitalize">
                  {job.job_type || "Empty"}
                </Badge>
              </div>

              {/* Experience Level */}
              <div className="flex flex-col items-start">
                <span className="text-[0.7rem] text-[#3b3028] font-semibold uppercase tracking-wide">
                  Experience
                </span>
                <Badge className="bg-[#6C5C4C] text-white px-2 py-1 capitalize">
                  {job.experience_level || "Empty"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {job.job_description?.trim() || "Empty"}
            </p>
          </div>

          {/* Requirements */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Requirements</h2>
            {job.requirements?.trim() ? (
              <ul className="list-disc list-inside text-sm space-y-1">
                {job.requirements.split("\n").map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm">Empty</p>
            )}
          </div>

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
