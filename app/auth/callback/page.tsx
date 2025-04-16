"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Handle the OAuth callback
    const handleAuthCallback = async () => {
      try {
        // Check for error in URL
        const errorParam = searchParams.get("error")
        const errorDescription = searchParams.get("error_description")

        if (errorParam) {
          console.error("OAuth error:", errorParam, errorDescription)
          setError(errorDescription || "Authentication failed")
          toast({
            title: "Authentication Error",
            description: errorDescription || "Authentication failed",
            variant: "destructive",
          })
          setTimeout(() => router.push("/login"), 2000)
          return
        }

        console.log("Processing auth callback...")

        // Get the session
        const { data, error } = await supabase.auth.getSession()

        console.log("Session data:", data)

        if (error) {
          console.error("Error during auth callback:", error)
          setError(error.message)
          toast({
            title: "Authentication Error",
            description: error.message,
            variant: "destructive",
          })
          setTimeout(() => router.push("/login"), 2000)
          return
        }

        if (!data.session) {
          console.warn("No session found after OAuth callback")
          setError("No session found")
          toast({
            title: "Authentication Error",
            description: "No session found after authentication",
            variant: "destructive",
          })
          setTimeout(() => router.push("/login"), 2000)
          return
        }

        console.log("Authentication successful, redirecting to dashboard...")

        // Redirect to dashboard or home page after successful authentication
        router.push("/dashboard")
      } catch (err) {
        console.error("Unexpected error during auth callback:", err)
        setError("An unexpected error occurred")
        toast({
          title: "Authentication Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        })
        setTimeout(() => router.push("/login"), 2000)
      }
    }

    handleAuthCallback()
  }, [router, searchParams, toast])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow">
        {error ? (
          <>
            <div className="text-center text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-xl font-semibold">Authentication Error</h3>
              <p className="mt-1">{error}</p>
              <p className="mt-4 text-sm text-gray-500">Redirecting to login page...</p>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
            <p className="text-center text-muted-foreground">Completing authentication...</p>
          </>
        )}
      </div>
    </div>
  )
}
