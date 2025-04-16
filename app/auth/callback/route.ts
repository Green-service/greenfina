import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const error = requestUrl.searchParams.get("error")
  const errorDescription = requestUrl.searchParams.get("error_description")

  console.log("Auth callback received:", { code: !!code, error, errorDescription })

  // If there's an error, redirect to login with the error
  if (error) {
    console.error("OAuth error:", error, errorDescription)
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(errorDescription || "Authentication failed")}`, request.url),
    )
  }

  // If there's no code, redirect to login
  if (!code) {
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent("No authentication code received")}`, request.url),
    )
  }

  try {
    // Create a Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase environment variables")
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent("Server configuration error")}`, request.url),
      )
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Exchange the code for a session
    console.log("Exchanging code for session...")
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error("Error exchanging code for session:", error)
      return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error.message)}`, request.url))
    }

    if (!data || !data.session) {
      console.error("No session returned after code exchange")
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent("Failed to create session")}`, request.url),
      )
    }

    console.log("Session created successfully, redirecting to dashboard")

    // Successful authentication, redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url))
  } catch (error: any) {
    console.error("Unexpected error during authentication callback:", error)
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(error?.message || "Authentication failed")}`, request.url),
    )
  }
}
