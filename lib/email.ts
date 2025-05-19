"use server"

export async function sendVerificationEmail(email: string, otp: string) {
  // In a real application, you would use a service like SendGrid, Mailgun, etc.
  // For this demo, we'll just log the OTP to the console
  console.log(`Sending OTP ${otp} to ${email}`)

  // Simulate email sending delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    success: true,
    message: `OTP sent to ${email}`,
  }
}
