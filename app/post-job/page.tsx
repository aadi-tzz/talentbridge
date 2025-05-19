"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"

export default function PostJobPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    companyName: "",
    companyWebsite: "",
    companyDescription: "",
    jobTitle: "",
    jobType: "",
    experienceLevel: "",
    location: "",
    workArrangement: "",
    salaryMin: "",
    salaryMax: "",
    jobDescription: "",
    requirements: "",
    benefits: "",
    contactName: "",
    contactEmail: "talentbridge839@gmail.com",
    contactPhone: "",
    agreeToTerms: false,
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (
      !formData.companyName ||
      !formData.jobTitle ||
      !formData.location ||
      !formData.contactEmail
    ) {
      toast({
        title: "Error",
        description: "Please fill all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch("/api/post-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error("Failed to post job")

      toast({
        title: "Job Posted Successfully",
        description:
          "Your job has been posted and will be reviewed shortly.",
      })
      setIsSubmitting(false)
      router.push("/jobs")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an issue posting your job.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f3e9] text-[#766646]">
      <section className="w-full py-12 md:py-20 text-center">
        <div className="container px-4 md:px-6">
          <h1
            className="inline-block text-5xl font-extrabold text-[#766646] px-6 py-3 border-4 border-[#CAA864] rounded-lg
                       shadow-md
                       bg-[#f5efe3]"
            style={{ boxShadow: "0 4px 8px rgba(202,168,100,0.4)" }}
          >
            Post a Job
          </h1>
          <p
            className="max-w-[900px] mx-auto mt-6 text-[#766646] md:text-xl font-semibold 
                       border-2 border-[#CAA864] rounded-md px-5 py-3
                       bg-[#f9f6e4]
                       shadow-sm"
          >
            Reach thousands of qualified candidates
          </p>
        </div>
      </section>

      <section className="w-full pb-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <Card className="shadow-md border border-[#CAA864] bg-[#f5efe3] rounded-2xl">
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle className="text-[#766646]">Job Details</CardTitle>
                  <CardDescription className="text-[#a78b42]">
                    Fill out all required fields *
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6 text-[#766646]">
                  {/* Company Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Company Information</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name *</Label>
                        <Input
                          id="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          required
                          className="bg-[#f9f6e4] border-[#CAA864] text-[#766646]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="companyWebsite">Company Website</Label>
                        <Input
                          id="companyWebsite"
                          type="url"
                          value={formData.companyWebsite}
                          onChange={handleInputChange}
                          className="bg-[#f9f6e4] border-[#CAA864] text-[#766646]"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyDescription">Company Description *</Label>
                      <Textarea
                        id="companyDescription"
                        value={formData.companyDescription}
                        onChange={handleInputChange}
                        required
                        className="bg-[#f9f6e4] border-[#CAA864] text-[#766646]"
                      />
                    </div>
                  </div>

                  {/* Job Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Job Information</h3>
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title *</Label>
                      <Input
                        id="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        required
                        className="bg-[#f9f6e4] border-[#CAA864] text-[#766646]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Job Location *</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                        className="bg-[#f9f6e4] border-[#CAA864] text-[#766646]"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Job Type *</Label>
                        <Select
                          onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, jobType: value }))
                          }
                          className="bg-[#f9f6e4] border-[#CAA864] text-[#766646]"
                        >
                          <SelectTrigger className="bg-[#f9f6e4] border-[#CAA864]">
                            <SelectValue placeholder="Select job type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="internship">Internship</SelectItem>
                            <SelectItem value="temporary">Temporary</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Experience Level *</Label>
                        <Select
                          onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, experienceLevel: value }))
                          }
                          className="bg-[#f9f6e4] border-[#CAA864] text-[#766646]"
                        >
                          <SelectTrigger className="bg-[#f9f6e4] border-[#CAA864]">
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="entry">Entry</SelectItem>
                            <SelectItem value="mid">Mid</SelectItem>
                            <SelectItem value="senior">Senior</SelectItem>
                            <SelectItem value="executive">Executive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Work Arrangement *</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, workArrangement: value }))
                        }
                        className="bg-[#f9f6e4] border-[#CAA864] text-[#766646]"
                      >
                        <SelectTrigger className="bg-[#f9f6e4] border-[#CAA864]">
                          <SelectValue placeholder="Select work arrangement" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="remote">Remote</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="onsite">On-site</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="salaryMin">Minimum Salary</Label>
                        <Input
                          id="salaryMin"
                          type="number"
                          value={formData.salaryMin}
                          onChange={handleInputChange}
                          className="bg-[#f9f6e4] border-[#CAA864] text-[#766646]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="salaryMax">Maximum Salary</Label>
                        <Input
                          id="salaryMax"
                          type="number"
                          value={formData.salaryMax}
                          onChange={handleInputChange}
                          className="bg-[#f9f6e4] border-[#CAA864] text-[#766646]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="jobDescription">Job Description *</Label>
                      <Textarea
                        id="jobDescription"
                        value={formData.jobDescription}
                        onChange={handleInputChange}
                        required
                        className="bg-[#f9f6e4] border-[#CAA864] text-[#766646]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="requirements">Requirements</Label>
                      <Textarea
                        id="requirements"
                        value={formData.requirements}
                        onChange={handleInputChange}
                        className="bg-[#f9f6e4] border-[#CAA864] text-[#766646]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="benefits">Benefits</Label>
                      <Textarea
                        id="benefits"
                        value={formData.benefits}
                        onChange={handleInputChange}
                        className="bg-[#f9f6e4] border-[#CAA864] text-[#766646]"
                      />
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Contact Information</h3>

                    <div className="space-y-2">
                      <Label htmlFor="contactName">Contact Person Name *</Label>
                      <Input
                        id="contactName"
                        value={formData.contactName}
                        onChange={handleInputChange}
                        required
                        className="bg-[#f9f6e4] border-[#CAA864] text-[#766646]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Contact Email *</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={formData.contactEmail}
                        onChange={handleInputChange}
                        required
                        className="bg-[#f9f6e4] border-[#CAA864] text-[#766646]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Contact Phone</Label>
                      <Input
                        id="contactPhone"
                        type="tel"
                        value={formData.contactPhone}
                        onChange={handleInputChange}
                        className="bg-[#f9f6e4] border-[#CAA864] text-[#766646]"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, agreeToTerms: !!checked }))
                        }
                        className="border-[#CAA864]"
                      />
                      <Label htmlFor="agreeToTerms" className="text-[#766646]">
                        I agree to the terms and conditions *
                      </Label>
                    </div>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#CAA864] hover:bg-[#b59239] text-white"
                  >
                    {isSubmitting ? "Posting..." : "Post Job"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
