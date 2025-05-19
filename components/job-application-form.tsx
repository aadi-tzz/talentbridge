"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { createApplication } from "@/services/application-service"
import { getSupabaseBrowserClient } from "@/lib/supabase"

interface JobApplicationFormProps {
  jobId: string
  jobTitle: string
}

export function JobApplicationForm({ jobId, jobTitle }: JobApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [coverLetter, setCoverLetter] = useState("")
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const { user } = useAuth()
  const supabase = getSupabaseBrowserClient()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to apply for this job.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Upload resume if provided
      let resumeUrl = null
      if (resumeFile) {
        const fileExt = resumeFile.name.split(".").pop()
        const fileName = `${user.id}-${Date.now()}.${fileExt}`
        const filePath = `resumes/${fileName}`

        const { error: uploadError } = await supabase.storage.from("resumes").upload(filePath, resumeFile)

        if (uploadError) {
          throw new Error("Failed to upload resume")
        }

        const { data: publicURL } = supabase.storage.from("resumes").getPublicUrl(filePath)

        resumeUrl = publicURL.publicUrl
      }

      // Create application
      await createApplication({
        job_id: jobId,
        applicant_id: user.id,
        cover_letter: coverLetter,
        resume_url: resumeUrl,
        status: "pending",
      })

      toast({
        title: "Application Submitted",
        description: `Your application for ${jobTitle} has been submitted successfully.`,
      })

      // Reset form
      setCoverLetter("")
      setResumeFile(null)
    } catch (error) {
      console.error("Error submitting application:", error)
      toast({
        title: "Error",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Want to apply for this job?</h3>
        <p className="mb-4">Please log in or create an account to apply for this position.</p>
        <div className="flex gap-4 justify-center">
          <Button variant="outline" asChild>
            <a href="/login">Log In</a>
          </Button>
          <Button asChild>
            <a href="/register">Register</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="resume">Resume/CV *</Label>
        <Input id="resume" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} required />
        <p className="text-xs text-gray-500">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverLetter">Cover Letter</Label>
        <Textarea
          id="coverLetter"
          placeholder="Tell us why you're a good fit for this position"
          className="min-h-[150px]"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
        />
      </div>

      <div className="text-sm text-gray-500">
        <p>
          By submitting this application, you agree to our terms and privacy policy. All updates regarding your
          application will be sent to your registered email.
        </p>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  )
}
