'use client'

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function InvestmentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!isLoading && !user) {
      console.log("No user found, redirecting to login")
      router.push("/login")
    }
  }, [isLoading, user, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  // If no user is found after loading completes, show a message
  if (!user) {
    return (
      <div className="container mx-auto py-10">
        <div className="rounded-lg border bg-card p-8">
          <h2 className="text-2xl font-bold">Session Expired</h2>
          <p className="text-muted-foreground">Your session has expired or you are not logged in.</p>
          <button 
            onClick={() => router.push("/login")}
            className="mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      {children}
    </div>
  )
} 