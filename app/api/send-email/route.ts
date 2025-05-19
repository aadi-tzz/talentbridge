import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const { subject, html } = await req.json()

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "talentbridge839@gmail.com", // Replace with your Gmail
        pass: "jfxl ioju oafo kbik",   // Replace with your App Password
      },
    })

    await transporter.sendMail({
      from: '"Talent Bridge" <talentbridge839@gmail.com>',
      to: "talentbridge839@gmail.com",
      subject: subject || "New Submission",
      html,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Email sending failed:", error)
    return NextResponse.json({ success: false, error: "Email sending failed" }, { status: 500 })
  }
}
