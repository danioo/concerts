"use client"

import { Button } from "@mantine/core"
import { redirect } from "next/navigation"

import { useAuth } from "../../../utils/auth"

export default function ProfilePage() {
  const { user, signOut } = useAuth()

  if (!user) {
    redirect("/login")
  }

  return (
    <div>
      <h1>Welcome {user.email}!</h1>

      <Button onClick={() => redirect("/")}>Go back</Button>

      <Button onClick={signOut}>Sign out</Button>
    </div>
  )
}