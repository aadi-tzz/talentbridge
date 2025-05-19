import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export function getUser() {
  const cookieStore = cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie) {
    return null
  }

  try {
    const session = JSON.parse(sessionCookie.value)

    // Check if session is expired
    if (new Date(session.expires) < new Date()) {
      cookieStore.delete("session")
      return null
    }

    return session
  } catch (error) {
    return null
  }
}

export function requireAuth() {
  const user = getUser()

  if (!user) {
    redirect("/login")
  }

  return user
}
