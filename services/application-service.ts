"use server"

import { getSupabaseServerClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function createApplication(applicationData: any) {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase.from("applications").insert(applicationData).select().single()

  if (error) {
    console.error("Error creating application:", error)
    throw new Error("Failed to create application")
  }

  revalidatePath(`/jobs/${applicationData.job_id}`)
  return data
}

export async function getUserApplications(userId: string) {
  const supabase = getSupabaseServerClient()

  const { data: applications, error } = await supabase
    .from("applications")
    .select(`
      *,
      jobs (
        id,
        title,
        company_id,
        location,
        job_type,
        companies (
          id,
          name,
          logo_url
        )
      )
    `)
    .eq("applicant_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching applications:", error)
    throw new Error("Failed to fetch applications")
  }

  return applications
}

export async function getJobApplications(jobId: string) {
  const supabase = getSupabaseServerClient()

  const { data: applications, error } = await supabase
    .from("applications")
    .select(`
      *,
      profiles (
        id,
        full_name,
        avatar_url,
        title
      )
    `)
    .eq("job_id", jobId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching job applications:", error)
    throw new Error("Failed to fetch job applications")
  }

  return applications
}

export async function updateApplicationStatus(id: string, status: string) {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase.from("applications").update({ status }).eq("id", id).select().single()

  if (error) {
    console.error("Error updating application status:", error)
    throw new Error("Failed to update application status")
  }

  return data
}

export async function getApplicationById(id: string) {
  const supabase = getSupabaseServerClient()

  const { data: application, error } = await supabase
    .from("applications")
    .select(`
      *,
      jobs (
        id,
        title,
        company_id,
        companies (
          id,
          name,
          logo_url
        )
      ),
      profiles (
        id,
        full_name,
        avatar_url,
        title,
        resume_url
      )
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching application:", error)
    throw new Error("Failed to fetch application")
  }

  return application
}
