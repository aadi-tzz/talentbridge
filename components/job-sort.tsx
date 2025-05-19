"use client"  // Mark this as a client component

import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function JobSort() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get current 'sort' from URL or default to 'recent'
  const currentSort = searchParams.get("sort") || "recent"

  // When user changes sort option
  function onSortChange(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set("sort", value)
    params.set("page", "1")  // Reset pagination
 // Update 'sort' param in URL
    router.push(`/jobs?${params.toString()}`)  // Navigate to the new URL with updated sort
  }

  return (
    <Select value={currentSort} onValueChange={onSortChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="relevance">Relevance</SelectItem>
        <SelectItem value="recent">Most Recent</SelectItem>
        <SelectItem value="salary-high">Salary (High to Low)</SelectItem>
        <SelectItem value="salary-low">Salary (Low to High)</SelectItem>
      </SelectContent>
    </Select>
  )
}
