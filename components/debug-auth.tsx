"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { checkSupabaseConfig, supabase } from "@/lib/supabase"

export default function DebugAuth() {
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const checkAuth = async () => {
    setIsLoading(true)
    try {
      const config = checkSupabaseConfig()
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

      const debugData = {
        config,
        session: sessionData,
        sessionError,
        origin: window.location.origin,
        redirectUrl: `${window.location.origin}/auth/callback`,
        timestamp: new Date().toISOString(),
      }

      setDebugInfo(debugData)
      console.log("Debug info:", debugData)
    } catch (error) {
      console.error("Debug error:", error)
      setDebugInfo({ error })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-8 p-4 border rounded-md">
      <h3 className="text-lg font-medium mb-2">Auth Debugging</h3>
      <Button variant="outline" onClick={checkAuth} disabled={isLoading} className="mb-4">
        {isLoading ? "Checking..." : "Check Auth Configuration"}
      </Button>

      {debugInfo && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md overflow-auto max-h-60">
          <pre className="text-xs">{JSON.stringify(debugInfo, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
