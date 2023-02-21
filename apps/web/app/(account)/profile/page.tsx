"use client"

import { Button } from "@mantine/core"
import { redirect, useRouter } from "next/navigation"

import { useAuth } from "../../../utils/auth"

export default function ProfilePage() {
  const { user, signOut } = useAuth()
  const router = useRouter()

  if (!user) {
    redirect("/login")
  }

  return (
    <div>
      <h1>Welcome {user?.email}!</h1>

      <Button onClick={() => router.push("/")}>Go back</Button>

      <Button onClick={signOut}>Sign out</Button>
    </div>
  )
}