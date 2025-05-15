export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string | null
          email: string | null
          skills: string | null
          experience: string | null
          projects: string | null
          miscellaneous: string | null
          avatar_url: string | null
          user_type: string
          education: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name?: string | null
          email?: string | null
          skills?: string | null
          experience?: string | null
          projects?: string | null
          miscellaneous?: string | null
          avatar_url?: string | null
          user_type: string
          education?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          email?: string | null
          skills?: string | null
          experience?: string | null
          projects?: string | null
          miscellaneous?: string | null
          avatar_url?: string | null
          user_type?: string
          education?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      employer_profiles: {
        Row: {
          id: string
          work_email: string
          hiring_size: string
          worker_types: string[]
          company_type: string
          name: string
          additional_info: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id: string
          work_email: string
          hiring_size: string
          worker_types: string[]
          company_type: string
          name: string
          additional_info?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          work_email?: string
          hiring_size?: string
          worker_types?: string[]
          company_type?: string
          name?: string
          additional_info?: string | null
          created_at?: string
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 