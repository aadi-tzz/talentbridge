"use server"

import { getSupabaseServerClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function getUserNotifications(userId: string) {
  const supabase = getSupabaseServerClient()

  const { data: notifications, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching notifications:", error)
    throw new Error("Failed to fetch notifications")
  }

  return notifications
}

export async function markNotificationAsRead(id: string) {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase.from("notifications").update({ is_read: true }).eq("id", id).select().single()

  if (error) {
    console.error("Error marking notification as read:", error)
    throw new Error("Failed to mark notification as read")
  }

  revalidatePath("/notifications")
  return data
}

export async function markAllNotificationsAsRead(userId: string) {
  const supabase = getSupabaseServerClient()

  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("user_id", userId)
    .eq("is_read", false)

  if (error) {
    console.error("Error marking all notifications as read:", error)
    throw new Error("Failed to mark all notifications as read")
  }

  revalidatePath("/notifications")
}

export async function deleteNotification(id: string) {
  const supabase = getSupabaseServerClient()

  const { error } = await supabase.from("notifications").delete().eq("id", id)

  if (error) {
    console.error("Error deleting notification:", error)
    throw new Error("Failed to delete notification")
  }

  revalidatePath("/notifications")
}

export async function getUnreadNotificationsCount(userId: string) {
  const supabase = getSupabaseServerClient()

  const { count, error } = await supabase
    .from("notifications")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("is_read", false)

  if (error) {
    console.error("Error counting unread notifications:", error)
    throw new Error("Failed to count unread notifications")
  }

  return count || 0
}
