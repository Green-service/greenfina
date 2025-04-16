"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"

export default function DebugPage() {
  const { user, session, isLoading } = useAuth()
  const [localStorageItems, setLocalStorageItems] = useState<Record<string, string>>({})
  const [sessionData, setSessionData] = useState<any>(null)
  const [cookieData, setCookieData] = useState<string>("")

  useEffect(() => {
    // Get local storage items
    const items: Record<string, string> = {}
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key) {
        items[key] = localStorage.getItem(key) || ""
      }
    }
    setLocalStorageItems(items)

    // Get session data
    const getSessionData = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        console.error("Error getting session:", error)
      } else {
        setSessionData(data)
      }
    }
    getSessionData()

    // Get cookie data
    setCookieData(document.cookie)
  }, [])

  const refreshSession = async () => {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.error("Error refreshing session:", error)
    } else {
      setSessionData(data)
      alert("Session refreshed")
    }
  }

  const clearLocalStorage = () => {
    localStorage.clear()
    setLocalStorageItems({})
    alert("Local storage cleared")
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Authentication Debug</CardTitle>
          <CardDescription>Troubleshoot authentication issues</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Auth Context</h3>
              <p>
                <strong>Loading:</strong> {isLoading ? "Yes" : "No"}
              </p>
              <p>
                <strong>User:</strong> {user ? "Authenticated" : "Not authenticated"}
              </p>
              {user && (
                <div className="mt-2">
                  <p>
                    <strong>User ID:</strong> {user.id}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                </div>
              )}
              <p>
                <strong>Session:</strong> {session ? "Active" : "None"}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium">Session Data</h3>
              <pre className="mt-2 p-4 bg-gray-100 rounded-md overflow-auto max-h-60 text-xs">
                {JSON.stringify(sessionData, null, 2)}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-medium">Local Storage</h3>
              <pre className="mt-2 p-4 bg-gray-100 rounded-md overflow-auto max-h-60 text-xs">
                {JSON.stringify(localStorageItems, null, 2)}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-medium">Cookies</h3>
              <pre className="mt-2 p-4 bg-gray-100 rounded-md overflow-auto max-h-60 text-xs">{cookieData}</pre>
            </div>

            <div className="flex space-x-4">
              <Button onClick={refreshSession}>Refresh Session</Button>
              <Button onClick={clearLocalStorage} variant="destructive">
                Clear Local Storage
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
