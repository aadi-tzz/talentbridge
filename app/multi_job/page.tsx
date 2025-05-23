"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

type JobData = {
  job_title: string
  job_type: string
  experience_level: string
  location: string
  salary: string
  job_description: string
  requirements: string
}

const emptyJob: JobData = {
  job_title: "",
  job_type: "",
  experience_level: "",
  location: "",
  salary: "",
  job_description: "",
  requirements: "",
}

export default function PostMultipleJobsPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [jobs, setJobs] = useState<JobData[]>([{ ...emptyJob }])

  const handleJobChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target
    setJobs((prev) => {
      const newJobs = [...prev]
      newJobs[index][id as keyof JobData] = value
      return newJobs
    })
  }

  const addJob = () => {
    setJobs((prev) => [...prev, { ...emptyJob }])
  }

  const validateJobs = () => {
    for (const [i, job] of jobs.entries()) {
      if (
        !job.job_title.trim() ||
        !job.location.trim()
      ) {
        toast({
          title: `Error in job #${i + 1}`,
          description: "Please fill all required fields (job title and location).",
          variant: "destructive",
        })
        return false
      }
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateJobs()) return

    setIsSubmitting(true)
    try {
      const res = await fetch("/api/multi_job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobs }),
      })

      if (!res.ok) throw new Error("Failed to post jobs")

      toast({
        title: "Jobs Posted Successfully",
        description: "Your jobs have been posted and will be reviewed shortly.",
      })
      setIsSubmitting(false)
      router.push("/jobs")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an issue posting your jobs.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f3e9] text-[#766646] p-6">
      <h1 className="text-4xl font-extrabold mb-6 border-b-4 border-[#CAA864] pb-2">
        Post Multiple Jobs
      </h1>

      <form onSubmit={handleSubmit} className="overflow-x-auto">
        <table className="table-auto border border-[#CAA864] w-full bg-[#f5efe3] rounded-lg">
          <thead>
            <tr className="text-[#766646] bg-[#f9f6e4]">
              <th className="border border-[#CAA864] px-3 py-2">Job Title *</th>
              <th className="border border-[#CAA864] px-3 py-2">Department</th>
              <th className="border border-[#CAA864] px-3 py-2">Experience Level</th>
              <th className="border border-[#CAA864] px-3 py-2">Location *</th>
              <th className="border border-[#CAA864] px-3 py-2">Salary</th>
              <th className="border border-[#CAA864] px-3 py-2">Job Description</th>
              <th className="border border-[#CAA864] px-3 py-2">Requirements</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, i) => (
              <tr key={i} className="text-[#766646]">
                <td className="border border-[#CAA864] p-1">
                  <Input
                    id="job_title"
                    value={job.job_title}
                    onChange={(e) => handleJobChange(i, e)}
                    required
                    className="bg-[#f9f6e4] text-sm"
                  />
                </td>
                <td className="border border-[#CAA864] p-1">
                  <Input
                    id="job_type"
                    value={job.job_type}
                    onChange={(e) => handleJobChange(i, e)}
                    className="bg-[#f9f6e4] text-sm"
                  />
                </td>
                <td className="border border-[#CAA864] p-1">
                  <Input
                    id="experience_level"
                    value={job.experience_level}
                    onChange={(e) => handleJobChange(i, e)}
                    className="bg-[#f9f6e4] text-sm"
                  />
                </td>
                <td className="border border-[#CAA864] p-1">
                  <Input
                    id="location"
                    value={job.location}
                    onChange={(e) => handleJobChange(i, e)}
                    required
                    className="bg-[#f9f6e4] text-sm"
                  />
                </td>
                <td className="border border-[#CAA864] p-1">
                  <Input
                    id="salary"
                    value={job.salary}
                    onChange={(e) => handleJobChange(i, e)}
                    className="bg-[#f9f6e4] text-sm"
                  />
                </td>
                <td className="border border-[#CAA864] p-1">
                  <Textarea
                    id="job_description"
                    value={job.job_description}
                    onChange={(e) => handleJobChange(i, e)}
                    className="bg-[#f9f6e4] text-sm resize-none h-16"
                  />
                </td>
                <td className="border border-[#CAA864] p-1">
                  <Textarea
                    id="requirements"
                    value={job.requirements}
                    onChange={(e) => handleJobChange(i, e)}
                    className="bg-[#f9f6e4] text-sm resize-none h-16"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between mt-4 items-center">
          <Button type="button" onClick={addJob} variant="outline" className="text-lg font-bold">
            + Add Job
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Posting..." : "Post All Jobs"}
          </Button>
        </div>
      </form>
    </div>
  )
}
