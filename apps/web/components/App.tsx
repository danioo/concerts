"use client"

import { AuthProvider } from '../utils/auth'
import { FiltersProvider } from '../utils/filters'
import { supabaseBrowserClient } from '../utils/supabase-browser'

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider supabase={supabaseBrowserClient}>
      <FiltersProvider>
        {children}
      </FiltersProvider>
    </AuthProvider>
  )
}