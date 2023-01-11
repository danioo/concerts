export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      concerts: {
        Row: {
          id: number
          created_at: string
          title: string
          description: string
          genre_id: number
        }
        Insert: {
          id?: number
          created_at?: string
          title: string
          description: string
          genre_id: number
        }
        Update: {
          id?: number
          created_at?: string
          title?: string
          description?: string
          genre_id?: number
        }
      }
      genres: {
        Row: {
          id: number
          created_at: string
          name: string
        }
        Insert: {
          id?: number
          created_at?: string
          name: string
        }
        Update: {
          id?: number
          created_at?: string
          name?: string
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
