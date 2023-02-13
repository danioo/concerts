"use client"

import { AuthProvider } from '../utils/auth'
import { supabaseBrowserClient } from '../utils/supabase-browser'

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider supabase={supabaseBrowserClient}>
      {children}
    </AuthProvider>
  )
}