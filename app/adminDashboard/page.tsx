"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function AdminDashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser()

      if (error || !data?.user) {
        router.push("/login")
        return
      }

      // Verify admin role
      let isAdmin = false

      // First check if role is in user metadata
      const role = data.user?.user_metadata?.role

      if (role === "admin") {
        isAdmin = true
      } else {
        // If not in metadata, try to get it from the database
        const { data: userData, error } = await supabase
          .from("users_account")
          .select("user_role")
          .eq("id", data.user.id)
          .single()

        if (!error && userData && userData.user_role === "admin") {
          isAdmin = true
        }
      }

      if (!isAdmin) {
        router.push("/userDashboard")
        return
      }

      setUser(data.user)
      setLoading(false)
    }

    getUser()
  }, [router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
          <CardDescription>Welcome to the Green Finance admin panel</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Admin Profile</h3>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>ID:</strong> {user.id}
              </p>
              <p>
                <strong>Role:</strong> Admin
              </p>
              {user.user_metadata && (
                <>
                  {user.user_metadata.full_name && (
                    <p>
                      <strong>Name:</strong> {user.user_metadata.full_name}
                    </p>
                  )}
                  {user.user_metadata.avatar_url && (
                    <div className="mt-2">
                      <img
                        src={user.user_metadata.avatar_url || "/placeholder.svg"}
                        alt="Profile"
                        className="h-16 w-16 rounded-full"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Manage user accounts</p>
                  <Button className="mt-2" variant="outline">
                    Manage Users
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Loans</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Review and approve loans</p>
                  <Button className="mt-2" variant="outline">
                    Manage Loans
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Investments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Monitor investment portfolios</p>
                  <Button className="mt-2" variant="outline">
                    View Investments
                  </Button>
                </CardContent>
              </Card>
            </div>
            <Button onClick={handleSignOut} variant="outline">
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
