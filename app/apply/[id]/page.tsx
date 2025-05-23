"use client"

import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"
import { toast } from "@/hooks/use-toast"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { notFound } from "next/navigation"

export default function ApplyJobPage() {
  const router = useRouter()
  const { id } = useParams()
  const supabase = createClientComponentClient()

  const [jobTitle, setJobTitle] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
  })
  const [resumeFile, setResumeFile] = useState<File | null>(null)

  useEffect(() => {
    async function fetchJob() {
      if (!id) return

      const { data, error } = await supabase
        .from("jobs")
        .select("job_title")
        .eq("id", id)
        .single()

      if (error || !data) {
        notFound()
      } else {
        setJobTitle(data.job_title)
      }
    }
    fetchJob()
  }, [id, supabase])

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null
    setResumeFile(file)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!formData.fullName || !formData.phone) {
      toast({
        title: "Error",
        description: "Please fill all required fields (Full Name and Phone).",
        variant: "destructive",
      })
      return
    }

    const data = new FormData()
    data.append("fullName", formData.fullName)
    if (formData.email) data.append("email", formData.email)  // optional
    data.append("phone", formData.phone)
    if (formData.coverLetter) data.append("coverLetter", formData.coverLetter) // optional
    if (resumeFile) data.append("resume", resumeFile)  // optional now
    data.append("jobId", id!)
    data.append("jobTitle", jobTitle || "")

    setIsSubmitting(true)
    try {
      const res = await fetch("/api/apply-job", {
        method: "POST",
        body: data,
      })

      if (!res.ok) throw new Error("Failed to apply")

      toast({
        title: "Application Submitted",
        description: "Your application has been sent successfully.",
      })
      router.push("/jobs")
    } catch {
      toast({
        title: "Error",
        description: "There was an error submitting your application.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#EEE6D6] text-[#3b3028] py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link href="/jobs" className="inline-flex items-center text-sm text-[#766646] hover:underline mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Jobs
        </Link>

        <div className="bg-[#D7CBAE] rounded-xl shadow-md p-8 space-y-6">
          <h1 className="text-2xl font-bold">{jobTitle ? `Apply for: ${jobTitle}` : "Loading job..."}</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="bg-[#EEE6D6] text-[#3b3028] placeholder:text-[#766646]"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label htmlFor="email">Email (optional)</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-[#EEE6D6] text-[#3b3028] placeholder:text-[#766646]"
                placeholder="example@mail.com"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="bg-[#EEE6D6] text-[#3b3028] placeholder:text-[#766646]"
                placeholder="+91 9876543210"
              />
            </div>

            <div>
              <Label htmlFor="coverLetter">Cover Letter (optional)</Label>
              <Textarea
                id="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                className="bg-[#EEE6D6] text-[#3b3028] placeholder:text-[#766646]"
                placeholder="Write your cover letter here..."
              />
            </div>

            <div>
              <Label htmlFor="resume">Resume (PDF, DOC) (optional)</Label>
              <Input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="bg-[#EEE6D6] text-[#3b3028]"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#766646] hover:bg-[#6C5C4C] text-white w-full sm:w-auto"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
