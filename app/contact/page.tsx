"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)

    const data = {
      firstName: formData.get("first-name"),
      lastName: formData.get("last-name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error("Failed to send email")

      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully.",
      })
      form.reset()
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "There was an issue sending your message.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f5efe3] text-[#6C5C4C]">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f7f3e9]">
        <div className="container px-4 md:px-6 text-center space-y-4">
          <h1 className="text-3xl font-bold sm:text-5xl text-[#766646]">Contact Us</h1>
          <p className="max-w-[900px] mx-auto text-[#6C5C4C] md:text-xl">Have questions or need assistance? We're here to help.</p>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#766646]">Get in Touch</h2>
                <p className="mt-2 text-[#6C5C4C]">Fill out the form and our team will get back to you within 24 hours.</p>
              </div>

              <Card className="bg-[#f7f3e9] border-[#CAA864]/30">
                <form onSubmit={handleSubmit}>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First name</Label>
                        <Input id="first-name" name="first-name" placeholder="Enter your first name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last name</Label>
                        <Input id="last-name" name="last-name" placeholder="Enter your last name" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" placeholder="Enter your email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" name="phone" type="tel" placeholder="Enter your phone number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" name="subject" placeholder="Enter the subject of your message" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" name="message" placeholder="Enter your message" className="min-h-[150px]" required />
                    </div>
                  </CardContent>
                  <CardFooter className="px-6 pb-6">
                    <Button type="submit" className="w-full gap-2 bg-[#CAA864] text-white hover:bg-[#b9984d]" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                      <Send className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#766646]">Contact Information</h2>
                <p className="mt-2 text-[#6C5C4C]">You can also reach out to us using the following contact details.</p>
              </div>

              <div className="grid gap-6">
                {[{
                  icon: <Mail className="h-6 w-6 text-[#CAA864]" />,
                  title: "Email",
                  desc: "For general inquiries and support",
                  content: <a href="mailto:talentbridge839@gmail.com" className="text-[#CAA864] hover:underline">talentbridge839@gmail.com</a>,
                }, {
                  icon: <Phone className="h-6 w-6 text-[#CAA864]" />,
                  title: "Phone",
                  desc: "Monday to Saturday, 9am to 6pm",
                  content: (
                    <div className="text-[#CAA864] space-y-1">
                      <a href="tel:+919359240954" className="block hover:underline">9359240954</a>
                      <a href="tel:+917351947652" className="block hover:underline">7351947652</a>
                    </div>
                  ),
                }, {
                  icon: <MapPin className="h-6 w-6 text-[#CAA864]" />,
                  title: "Office",
                  desc: "Come visit our office",
                  content: (
                    <p className="mt-2 text-sm">
                      New Shopping Complex, Shivalik Nagar<br />
                      Haridwar, Uttarakhand - 249403
                    </p>
                  ),
                }].map((item, i) => (
                  <Card key={i} className="bg-[#f7f3e9] border-[#CAA864]/30">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#CAA864]/10">
                          {item.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg text-[#6C5C4C]">{item.title}</CardTitle>
                          <CardDescription className="mt-2 text-[#6C5C4C]/80">{item.desc}</CardDescription>
                          <div className="mt-2 font-medium">{item.content}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-[#f7f3e9] border-[#CAA864]/30">
                <CardContent className="p-6">
                  <CardTitle className="text-lg mb-4 text-[#766646]">Business Hours</CardTitle>
                  <div className="space-y-2 text-[#6C5C4C]">
                    <div className="flex justify-between">
                      <span>Monday - Saturday</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
