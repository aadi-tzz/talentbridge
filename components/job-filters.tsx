"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

interface JobFiltersProps {
  searchParams: {
    page?: string
    search?: string
    job_type?: string
    experience_level?: string
    work_arrangement?: string
    location?: string
    salary_min?: string
    salary_max?: string
  }
}

export function JobFilters({ searchParams }: JobFiltersProps) {
  const router = useRouter()
  const currentParams = useSearchParams()

  const [filters, setFilters] = useState({
    job_type: searchParams.job_type?.split(",") || [],
    experience_level: searchParams.experience_level?.split(",") || [],
    work_arrangement: searchParams.work_arrangement?.split(",") || [],
    salary_range: searchParams.salary_min
      ? searchParams.salary_max
        ? `${searchParams.salary_min}-${searchParams.salary_max}`
        : `${searchParams.salary_min}+`
      : "",
  })

  const handleCheckboxChange = (category: "job_type" | "experience_level" | "work_arrangement", value: string) => {
    setFilters((prev) => {
      const currentValues = [...prev[category]]
      const index = currentValues.indexOf(value)

      if (index === -1) {
        currentValues.push(value)
      } else {
        currentValues.splice(index, 1)
      }

      return {
        ...prev,
        [category]: currentValues,
      }
    })
  }

  const handleSalaryChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      salary_range: value,
    }))
  }

  const applyFilters = () => {
    const params = new URLSearchParams()

    // Preserve search and location
    if (currentParams.has("search")) {
      params.set("search", currentParams.get("search")!)
    }

    if (currentParams.has("location")) {
      params.set("location", currentParams.get("location")!)
    }

    // Add filter values
    if (filters.job_type.length > 0) {
      params.set("job_type", filters.job_type.join(","))
    }

    if (filters.experience_level.length > 0) {
      params.set("experience_level", filters.experience_level.join(","))
    }

    if (filters.work_arrangement.length > 0) {
      params.set("work_arrangement", filters.work_arrangement.join(","))
    }

    if (filters.salary_range) {
      if (filters.salary_range === "0-50000") {
        params.set("salary_min", "0")
        params.set("salary_max", "50000")
      } else if (filters.salary_range === "50000-100000") {
        params.set("salary_min", "50000")
        params.set("salary_max", "100000")
      } else if (filters.salary_range === "100000-150000") {
        params.set("salary_min", "100000")
        params.set("salary_max", "150000")
      } else if (filters.salary_range === "150000+") {
        params.set("salary_min", "150000")
      }
    }

    router.push(`/jobs?${params.toString()}`)
  }

  const clearFilters = () => {
    setFilters({
      job_type: [],
      experience_level: [],
      work_arrangement: [],
      salary_range: "",
    })

    const params = new URLSearchParams()

    // Preserve search and location only
    if (currentParams.has("search")) {
      params.set("search", currentParams.get("search")!)
    }

    if (currentParams.has("location")) {
      params.set("location", currentParams.get("location")!)
    }

    router.push(`/jobs?${params.toString()}`)
  }

  return null
}
