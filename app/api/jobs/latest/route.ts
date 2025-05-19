import { getSupabaseServerClient } from "@/lib/supabase"

import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(4)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
