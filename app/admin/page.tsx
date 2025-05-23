"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Loader2 } from "lucide-react"
import { getJobs, deleteJob } from "@/services/job-service"
import { Job } from "@/types"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export default function AdminPage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()
  const [jobs, setJobs] = useState<Job[]>([])
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!loading) {
      if (!user || user.email !== "talentbridge839@gmail.com") {
        router.replace("/login?redirectedFrom=/admin")
      } else {
        getJobs(1, 1000) // Fetch all jobs up to 1000
          .then((res) => {
            console.log("Jobs response:", res)
            setJobs(res.jobs || [])
          })
          .catch((err) => {
            console.error("Failed to load jobs", err)
            setJobs([])
          })
      }
    }
  }, [user, loading, router])

  const toggleJobSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((jobId) => jobId !== id) : [...prev, id]
    )
  }

  const handleDelete = async () => {
    if (selectedIds.length === 0 || !confirm("Are you sure?")) return

    setDeleting(true)
    try {
      await deleteJob(selectedIds)
      setJobs((prev) => prev.filter((job) => !selectedIds.includes(job.id)))
      setSelectedIds([])
    } catch (error) {
      console.error("Delete failed", error)
    } finally {
      setDeleting(false)
    }
  }

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="flex justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold flex-grow">Admin - Manage Jobs</h1>

        {/* New Button to Post Multiple Jobs */}
        <Button onClick={() => router.push("/multi_job")}>
          Post Multiple Jobs
        </Button>

        <Button variant="outline" onClick={() => { logout(); router.push("/login") }}>
          Logout
        </Button>
      </div>

      <div className="mb-4 space-y-2">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="flex items-start gap-4 border p-4 rounded-md bg-white"
          >
            <Checkbox
              checked={selectedIds.includes(job.id)}
              onCheckedChange={() => toggleJobSelection(job.id)}
            />
            <div className="flex flex-col">
              <h2 className="font-semibold text-lg">{job.job_title || "Untitled Job"}</h2>
              <p className="text-sm text-gray-600">
                <strong>Location:</strong> {job.location || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Salary:</strong> ₹{job.salary}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={handleDelete}
        disabled={deleting || selectedIds.length === 0}
        variant="destructive"
      >
        {deleting ? "Deleting..." : "Delete Selected"}
      </Button>
    </div>
  )
}
