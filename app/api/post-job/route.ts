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
      companyName,
      companyWebsite,
      companyDescription,
      jobTitle,
      jobType,
      experienceLevel,
      location,
      workArrangement,
      salaryMin,
      salaryMax,
      jobDescription,
      requirements,
      benefits,
      contactName,
      contactEmail,
      contactPhone,
      agreeToTerms,
    } = formData

    if (!agreeToTerms) {
      return NextResponse.json(
        { error: "You must agree to the terms and conditions" },
        { status: 400 }
      )
    }

    // ✅ Insert only required fields into Supabase
    const { error: insertError } = await supabase.from("jobs").insert([
      {
        job_title: jobTitle,
        location,
        job_type: jobType,
        experience_level: experienceLevel,
        salary_min: salaryMin,
        salary_max: salaryMax,
        job_description: jobDescription,
        requirements,
        benefits,
      },
    ])

    if (insertError) {
      console.error("Supabase insert error:", insertError)
      return NextResponse.json({ error: "Failed to save job post" }, { status: 500 })
    }

    // ✅ Send full details via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "talentbridge839@gmail.com",
        pass: process.env.EMAIL_PASS,
      },
    })

    const mailOptions = {
      from: contactEmail,
      to: "talentbridge839@gmail.com",
      subject: `New Job Posted: ${jobTitle}`,
      html: `
        <h2>New Job Posting Received</h2>
        <p><strong>Company:</strong> ${companyName} (${companyWebsite || "N/A"})</p>
        <p><strong>Description:</strong> ${companyDescription}</p>
        <p><strong>Job Title:</strong> ${jobTitle}</p>
        <p><strong>Type:</strong> ${jobType}</p>
        <p><strong>Experience Level:</strong> ${experienceLevel}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Work Arrangement:</strong> ${workArrangement}</p>
        <p><strong>Salary Range:</strong> ₹${salaryMin} - ₹${salaryMax}</p>
        <p><strong>Job Description:</strong><br/>${jobDescription}</p>
        <p><strong>Requirements:</strong><br/>${requirements}</p>
        <p><strong>Benefits:</strong><br/>${benefits || "N/A"}</p>
        <hr />
        <p><strong>Contact:</strong> ${contactName} (${contactEmail})</p>
        <p><strong>Phone:</strong> ${contactPhone || "N/A"}</p>
      `,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: "Job posted successfully" })
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
