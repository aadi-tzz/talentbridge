export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          title: string | null
          bio: string | null
          resume_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          title?: string | null
          bio?: string | null
          resume_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          title?: string | null
          bio?: string | null
          resume_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      companies: {
        Row: {
          id: string
          name: string
          description: string | null
          website: string | null
          logo_url: string | null
          location: string | null
          size: string | null
          industry: string | null
          owner_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          website?: string | null
          logo_url?: string | null
          location?: string | null
          size?: string | null
          industry?: string | null
          owner_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          website?: string | null
          logo_url?: string | null
          location?: string | null
          size?: string | null
          industry?: string | null
          owner_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          title: string
          description: string
          requirements: string | null
          benefits: string | null
          company_id: string | null
          location: string | null
          salary_min: number | null
          salary_max: number | null
          job_type: string
          experience_level: string | null
          work_arrangement: string | null
          posted_by: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          requirements?: string | null
          benefits?: string | null
          company_id?: string | null
          location?: string | null
          salary_min?: number | null
          salary_max?: number | null
          job_type: string
          experience_level?: string | null
          work_arrangement?: string | null
          posted_by?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          requirements?: string | null
          benefits?: string | null
          company_id?: string | null
          location?: string | null
          salary_min?: number | null
          salary_max?: number | null
          job_type?: string
          experience_level?: string | null
          work_arrangement?: string | null
          posted_by?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      applications: {
        Row: {
          id: string
          job_id: string | null
          applicant_id: string | null
          resume_url: string | null
          cover_letter: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          job_id?: string | null
          applicant_id?: string | null
          resume_url?: string | null
          cover_letter?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          job_id?: string | null
          applicant_id?: string | null
          resume_url?: string | null
          cover_letter?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string | null
          title: string
          message: string
          type: string
          reference_id: string | null
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          title: string
          message: string
          type: string
          reference_id?: string | null
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          title?: string
          message?: string
          type?: string
          reference_id?: string | null
          is_read?: boolean
          created_at?: string
        }
      }
    }
  }
}
