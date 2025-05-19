import { createClient } from "@supabase/supabase-js"

export async function getApprovedJobs() {
  const supabase = createClient(  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!)
  const { data: jobs, error } = await supabase
    .from("jobs")
    .select("*")               // ✅ Only approved
    .order("created_at", { ascending: false }) // ✅ Latest first

  if (error) {
    console.error("Error fetching approved jobs:", error.message)
    return []
  }

  return jobs || []
}
