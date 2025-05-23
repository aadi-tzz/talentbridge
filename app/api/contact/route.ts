import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import fs from "fs"
import os from "os"
import path from "path"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    // Extract text fields
    const firstName = formData.get("first-name")?.toString() || ""
    const lastName = formData.get("last-name")?.toString() || ""
    const email = formData.get("email")?.toString() || ""
    const phone = formData.get("phone")?.toString() || "N/A"
    const subject = formData.get("subject")?.toString() || "No Subject"
    const message = formData.get("message")?.toString() || ""

    // Handle attachment (optional)
    const file = formData.get("attachment") as File | null
    let attachments = []

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer())

      // Save file temporarily (required by nodemailer)
      const tempDir = os.tmpdir()
      const filePath = path.join(tempDir, file.name)
      fs.writeFileSync(filePath, buffer)

      attachments.push({
        filename: file.name,
        path: filePath,
      })
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const mailOptions = {
      from: email || process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `Contact Form: ${subject}`,
      html: `
        <h3>New message from Talent Bridge contact form</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email || "N/A"}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
      attachments,
    }

    await transporter.sendMail(mailOptions)

    // Clean up temp file if created
    if (attachments.length > 0) {
      fs.unlinkSync(attachments[0].path)
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Error sending mail:", error)
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 })
  }
}
