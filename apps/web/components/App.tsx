"use client"

import { useState } from 'react'
import { AuthProvider } from '../utils/auth'
import { FiltersProvider } from '../utils/filters'
import { supabaseBrowserClient } from '../utils/supabase-browser'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

export default function App({ children }: { children: React.ReactNode }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider supabaseClient={supabaseClient} initialSession={null}>
      <AuthProvider supabase={supabaseBrowserClient}>
        <FiltersProvider>
          {children}
        </FiltersProvider>
      </AuthProvider>
    </SessionContextProvider>
  )
}