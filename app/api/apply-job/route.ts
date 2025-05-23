import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const fullName = formData.get("fullName")
    const email = formData.get("email") || ""          // optional, default empty string
    const phone = formData.get("phone")
    const coverLetter = formData.get("coverLetter") || "" // optional, default empty string
    const jobTitle = formData.get("jobTitle")
    const resume = formData.get("resume")               // optional file

    // Validate required fields
    if (!fullName || !phone || !jobTitle) {
      return NextResponse.json(
        { error: "Missing required fields: fullName, phone or jobTitle." },
        { status: 400 }
      )
    }

    // Prepare attachments array, only add resume if provided
    const attachments = []
    if (resume && resume instanceof File) {
      const resumeBuffer = Buffer.from(await resume.arrayBuffer())
      attachments.push({
        filename: resume.name,
        content: resumeBuffer,
      })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // true if port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const mailOptions = {
      from: `"Talent Bridge" <${process.env.SMTP_USER}>`,
      to: "talentbridge839@gmail.com",
      subject: `New Job Application for: ${jobTitle}`,
      text: `Applicant details:
Name: ${fullName}
Email: ${email}
Phone: ${phone}
Cover Letter: ${coverLetter}`,
      attachments,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: "Application sent successfully." })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to process application." },
      { status: 500 }
    )
  }
}
