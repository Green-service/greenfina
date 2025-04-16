"use server"

import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

// Create a Supabase client for server components
export async function createServerSupabaseClient() {
  const cookieStore = cookies()

  return createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_ANON_KEY as string, {
    cookies: {
      get(name) {
        return cookieStore.get(name)?.value
      },
      set(name, value, options) {
        cookieStore.set({ name, value, ...options })
      },
      remove(name, options) {
        cookieStore.set({ name, value: "", ...options })
      },
    },
  })
}

// Get the current user session
export async function getSession() {
  const supabase = await createServerSupabaseClient()
  return await supabase.auth.getSession()
}

// Get the current user
export async function getCurrentUser() {
  const {
    data: { session },
  } = await getSession()
  return session?.user || null
}
