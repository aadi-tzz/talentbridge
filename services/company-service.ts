"use server"

import { getSupabaseServerClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function getCompanies() {
  const supabase = getSupabaseServerClient()

  const { data: companies, error } = await supabase.from("companies").select("*").order("name", { ascending: true })

  if (error) {
    console.error("Error fetching companies:", error)
    throw new Error("Failed to fetch companies")
  }

  return companies
}

export async function getCompanyById(id: string) {
  const supabase = getSupabaseServerClient()

  const { data: company, error } = await supabase.from("companies").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching company:", error)
    throw new Error("Failed to fetch company")
  }

  return company
}

export async function getUserCompanies(userId: string) {
  const supabase = getSupabaseServerClient()

  const { data: companies, error } = await supabase
    .from("companies")
    .select("*")
    .eq("owner_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching user companies:", error)
    throw new Error("Failed to fetch user companies")
  }

  return companies
}

export async function createCompany(companyData: any) {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase.from("companies").insert(companyData).select().single()

  if (error) {
    console.error("Error creating company:", error)
    throw new Error("Failed to create company")
  }

  revalidatePath("/companies")
  return data
}

export async function updateCompany(id: string, companyData: any) {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase.from("companies").update(companyData).eq("id", id).select().single()

  if (error) {
    console.error("Error updating company:", error)
    throw new Error("Failed to update company")
  }

  revalidatePath(`/companies/${id}`)
  revalidatePath("/companies")
  return data
}

export async function deleteCompany(id: string) {
  const supabase = getSupabaseServerClient()

  const { error } = await supabase.from("companies").delete().eq("id", id)

  if (error) {
    console.error("Error deleting company:", error)
    throw new Error("Failed to delete company")
  }

  revalidatePath("/companies")
}

export async function getCompanyJobs(companyId: string) {
  const supabase = getSupabaseServerClient()

  const { data: jobs, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("company_id", companyId)
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching company jobs:", error)
    throw new Error("Failed to fetch company jobs")
  }

  return jobs
}
