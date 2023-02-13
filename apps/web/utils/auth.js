"use client"

import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ supabase, ...props }) => {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    async function getActiveSession() {
      const { data: { session: activeSession } } = await supabase.auth.getSession()

      setSession(activeSession)
      setUser(activeSession?.user ?? null)
    }
    
    getActiveSession()

    const { data: { subscription: authListener } } = supabase.auth.onAuthStateChange((event, currentSession) => {
      if (event === "PASSWORD_RECOVERY") {
        router.push("/update-password")
      }

      if (event === "USER_UPDATED") {
        router.push("/profile")
      }

      setSession(currentSession)
      setUser(currentSession?.user ?? null)
    })

    return () => {
      authListener?.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      session, user, signOut: () => supabase.auth.signOut()
    }} {...props} />
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used withing AuthProvider")
  }

  return context
}