"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { FcGoogle } from "react-icons/fc"

export default function GoogleSignInButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      console.log("Starting Google sign-in process...")

      // Sign in with Google using Supabase Auth
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        console.error("Supabase OAuth error:", error)
        throw error
      }

      console.log("OAuth initiated:", data)
      // The redirect happens automatically by Supabase
    } catch (error) {
      console.error("Error signing in with Google:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      type="button"
      disabled={isLoading}
      onClick={handleGoogleSignIn}
      className="w-full flex items-center justify-center gap-2"
    >
      {isLoading ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        <FcGoogle className="h-5 w-5" />
      )}
      Sign in with Google
    </Button>
  )
}
