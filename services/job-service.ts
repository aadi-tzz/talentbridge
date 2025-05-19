"use server"

import { getSupabaseServerClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function getJobs(page = 1, limit = 10, filters: any = {}) {
  const supabase = getSupabaseServerClient()
  const offset = (page - 1) * limit

  let query = supabase
    .from("jobs")
    .select("*")
    //.eq("is_active", true)
    .order(
      filters.sort === "salary-high"
        ? "salary_max"
        : filters.sort === "salary-low"
        ? "salary_min"
        : "created_at",
      {
        ascending: filters.sort === "salary-low",
      }
    )
    .range(offset, offset + limit - 1)

  if (filters.job_type) {
    query = query.eq("job_type", filters.job_type)
  }
  if (filters.experience_level) {
    query = query.eq("experience_level", filters.experience_level)
  }
  if (filters.work_arrangement) {
    query = query.eq("work_arrangement", filters.work_arrangement)
  }
  if (filters.location) {
    query = query.ilike("location", `%${filters.location}%`)
  }
  if (filters.search) {
    query = query.or(
      `job_title.ilike.%${filters.search}%,job_description.ilike.%${filters.search}%`
    )
  }
  if (filters.salary_min) {
    query = query.gte("salary_min", filters.salary_min)
  }
  if (filters.salary_max) {
    query = query.lte("salary_max", filters.salary_max)
  }

  const { data: jobs, error } = await query

  if (error) {
    console.error("Error fetching jobs:", error)
    throw new Error("Failed to fetch jobs")
  }

  const { count: totalCount } = await supabase
    .from("jobs")
    .select("*", { count: "exact", head: true })
    //.eq("is_active", true)

  return {
    jobs,
    totalCount,
    page,
    limit,
    totalPages: Math.ceil(totalCount! / limit),
  }
}

export async function getJobById(id: string) {
  const supabase = getSupabaseServerClient()

  const { data: job, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching job:", error)
    throw new Error("Failed to fetch job")
  }

  return job
}

export async function createJob(jobData: any) {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase.from("jobs").insert(jobData).select().single()

  if (error) {
    console.error("Error creating job:", error)
    throw new Error("Failed to create job")
  }

  revalidatePath("/jobs")
  return data
}

export async function updateJob(id: string, jobData: any) {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase
    .from("jobs")
    .update(jobData)
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating job:", error)
    throw new Error("Failed to update job")
  }

  revalidatePath(`/jobs/${id}`)
  revalidatePath("/jobs")
  return data
}

export async function deleteJob(id: string) {
  const supabase = getSupabaseServerClient()

  const { error } = await supabase.from("jobs").delete().eq("id", id)

  if (error) {
    console.error("Error deleting job:", error)
    throw new Error("Failed to delete job")
  }

  revalidatePath("/jobs")
}

export async function getSimilarJobs(jobId: string, limit = 3) {
  const supabase = getSupabaseServerClient()

  // Get current job details
  const { data: currentJob, error: jobError } = await supabase
    .from("jobs")
    .select("job_type, experience_level")
    .eq("id", jobId)
    .single()

  if (jobError || !currentJob) {
    throw new Error("Job not found")
  }

  // Find similar jobs based on job_type and experience_level
  const { data: similarJobs, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("is_active", true)
    .eq("job_type", currentJob.job_type)
    .eq("experience_level", currentJob.experience_level)
    .neq("id", jobId)
    .limit(limit)

  if (error) {
    console.error("Error fetching similar jobs:", error)
    return []
  }

  return similarJobs || []
}
