"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { supabase } from "@/lib/supabase"
import type { Session, User } from "@supabase/supabase-js"

type AuthContextType = {
  session: Session | null
  user: User | null
  userRole: string
  isLoading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState<string>("user")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        console.log("Getting initial session...")
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error("Error getting session:", error)
          setIsLoading(false)
          return
        }

        console.log("Session data:", data.session ? "Session exists" : "No session")
        setSession(data.session)
        setUser(data.session?.user || null)

        if (data.session?.user) {
          await getUserRole(data.session.user)
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Unexpected error in getInitialSession:", error)
        setIsLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log("Auth state changed:", event)
      setSession(newSession)
      setUser(newSession?.user || null)

      if (newSession?.user) {
        await getUserRole(newSession.user)
      }

      setIsLoading(false)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  // Get user role from metadata or database
  const getUserRole = async (user: User) => {
    try {
      // First check if role is in user metadata
      if (user.user_metadata?.role) {
        setUserRole(user.user_metadata.role)
        return
      }

      // If not in metadata, try to get it from the database
      const { data, error } = await supabase.from("users_account").select("user_role").eq("id", user.id).single()

      if (error) {
        console.error("Error fetching user role:", error)
        return
      }

      if (data && data.user_role) {
        setUserRole(data.user_role)
      }
    } catch (error) {
      console.error("Error in getUserRole:", error)
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error("Error signing out:", error)
        throw error
      }
      setSession(null)
      setUser(null)
      setUserRole("user")
    } catch (error) {
      console.error("Unexpected error in signOut:", error)
    }
  }

  return <AuthContext.Provider value={{ session, user, userRole, isLoading, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
