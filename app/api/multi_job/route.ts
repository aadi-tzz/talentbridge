import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const { jobs } = await req.json()

    if (!Array.isArray(jobs) || jobs.length === 0) {
      return NextResponse.json({ message: "No jobs provided" }, { status: 400 })
    }

    const formattedJobs = jobs.map(job => ({
      job_title: job.job_title,
      job_type: job.job_type,
      experience_level: job.experience_level,
      location: job.location,
      salary: job.salary,
      job_description: job.job_description,
      requirements: job.requirements,
    }))

    // Insert all jobs at once
    const { error } = await supabase.from("jobs").insert(formattedJobs)

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json({ message: "Database error" }, { status: 500 })
    }

    // Email summary (optional enhancement)
    const emailBody = formattedJobs.map((job, index) => `
      <h3>Job #${index + 1}</h3>
      <p><strong>Title:</strong> ${job.job_title}</p>
      <p><strong>Location:</strong> ${job.location}</p>
      <p><strong>Type:</strong> ${job.job_type}</p>
      <p><strong>Experience Level:</strong> ${job.experience_level}</p>
      <p><strong>Salary:</strong> ${job.salary}</p>
      <p><strong>Description:</strong><br>${job.job_description}</p>
      <p><strong>Requirements:</strong><br>${job.requirements}</p>
      <hr>
    `).join("")

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "talentbridge839@gmail.com",
      subject: `New Jobs Posted (${formattedJobs.length})`,
      html: `<h2>${formattedJobs.length} Job(s) Posted</h2>${emailBody}`
    })

    return NextResponse.json({ message: "Jobs posted successfully" }, { status: 200 })

  } catch (err) {
    console.error("Error in multi_job route:", err)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}
