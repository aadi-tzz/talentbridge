import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import nodemailer from "nodemailer"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const formData = await request.json()

    const {
      companyName = "",
      companyDescription = "",
      jobTitle = "",
      job_type = "",            // <-- changed from jobType to job_type
      experienceLevel = "",
      location = "",
      salary = "",
      jobDescription = "",
      requirements = "",
      contactName = "",
      contactEmail = "",
      contactPhone = "",
      agreeToTerms,
    } = formData

    if (!agreeToTerms) {
      return NextResponse.json(
        { error: "You must agree to the terms and conditions" },
        { status: 400 }
      )
    }

    const { error: insertError } = await supabase.from("jobs").insert([
      {
        job_title: jobTitle,
        location,
        job_type: job_type,          // store job_type properly
        experience_level: experienceLevel,
        salary,
        job_description: jobDescription,
        requirements,
      },
    ])

    if (insertError) {
      console.error("Supabase insert error:", insertError)
      return NextResponse.json({ error: "Failed to save job post" }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "talentbridge839@gmail.com",
        pass: process.env.EMAIL_PASS,
      },
    })

    const mailOptions = {
      from: contactEmail || "talentbridge839@gmail.com",
      to: "talentbridge839@gmail.com",
      subject: `New Job Posted: ${jobTitle}`,
      html: `
        <h2>New Job Posting Received</h2>
        <p><strong>Company:</strong> ${companyName}</p>
        <p><strong>Description:</strong> ${companyDescription}</p>
        <p><strong>Job Title:</strong> ${jobTitle}</p>
        <p><strong>Department:</strong> ${job_type}</p>
        <p><strong>Experience Level:</strong> ${experienceLevel}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Salary:</strong> ${salary}</p>
        <p><strong>Job Description:</strong><br/>${jobDescription}</p>
        <p><strong>Requirements:</strong><br/>${requirements}</p>
        <hr />
        <p><strong>Contact:</strong> ${contactName} (${contactEmail})</p>
        <p><strong>Phone:</strong> ${contactPhone}</p>
      `,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: "Job posted successfully" })
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
