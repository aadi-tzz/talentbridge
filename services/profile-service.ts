"use server"

import { getSupabaseServerClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function getProfileById(id: string) {
  const supabase = getSupabaseServerClient()

  const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching profile:", error)
    throw new Error("Failed to fetch profile")
  }

  return profile
}

export async function updateProfile(id: string, profileData: any) {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase.from("profiles").update(profileData).eq("id", id).select().single()

  if (error) {
    console.error("Error updating profile:", error)
    throw new Error("Failed to update profile")
  }

  revalidatePath(`/profile`)
  return data
}

export async function uploadResume(userId: string, file: File) {
  const supabase = getSupabaseServerClient()

  // Generate a unique file name
  const fileExt = file.name.split(".").pop()
  const fileName = `${userId}-${Date.now()}.${fileExt}`
  const filePath = `resumes/${fileName}`

  // Upload file to Supabase Storage
  const { error: uploadError } = await supabase.storage.from("resumes").upload(filePath, file)

  if (uploadError) {
    console.error("Error uploading resume:", uploadError)
    throw new Error("Failed to upload resume")
  }

  // Get the public URL
  const { data: publicURL } = supabase.storage.from("resumes").getPublicUrl(filePath)

  // Update the profile with the resume URL
  await updateProfile(userId, { resume_url: publicURL.publicUrl })

  return publicURL.publicUrl
}
