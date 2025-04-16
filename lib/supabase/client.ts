import { createBrowserClient } from "@supabase/ssr"

// Create a single instance that will be reused
let supabase: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
  if (!supabase) {
    supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  return supabase
}
