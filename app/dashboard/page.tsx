"use client"

import { useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InvestmentGraph from '../../components/InvestmentGraph'

export default function DashboardPage() {
  const { user, userRole, isLoading, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!isLoading && !user) {
      console.log("No user found, redirecting to login")
      router.push("/login")
    }
  }, [isLoading, user, router])

  const handleSignOut = async () => {
    await signOut()
    router.push("/login")
  }

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
        <Card>
          <CardHeader>
            <CardTitle>Session Expired</CardTitle>
            <CardDescription>Your session has expired or you are not logged in.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/login")}>Go to Login</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>{userRole === "admin" ? "Admin Dashboard" : "User Dashboard"}</CardTitle>
          <CardDescription>Welcome to your Green Finance dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              {user?.user_metadata?.avatar_url && (
                <img
                  src={user.user_metadata.avatar_url || "/placeholder.svg"}
                  alt="Profile"
                  className="h-12 w-12 rounded-full"
                />
              )}
              <div>
                <h3 className="text-lg font-medium">{user?.user_metadata?.full_name || user?.email}</h3>
                <p className="text-sm text-muted-foreground">
                  {user?.email} • {userRole === "admin" ? "Administrator" : "User"}
                </p>
              </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="loans">Loans</TabsTrigger>
                <TabsTrigger value="investments">Investments</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$12,345.67</div>
                      <p className="text-xs text-muted-foreground">+2.5% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3</div>
                      <p className="text-xs text-muted-foreground">Total: $5,432.10</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Investments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$6,789.01</div>
                      <p className="text-xs text-muted-foreground">+4.3% ROI</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="loans" className="space-y-4 pt-4">
                <h3 className="text-lg font-medium">Your Loans</h3>
                <p>No active loans found.</p>
              </TabsContent>
              <TabsContent value="investments" className="space-y-4 pt-4">
                <h3 className="text-lg font-medium">Your Investments</h3>
                <div className="space-y-4">
                  <InvestmentGraph />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Investment Value</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">R6,789.01</div>
                        <p className="text-xs text-muted-foreground">+4.3% ROI</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">Across different sectors</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {userRole === "admin" && (
              <div className="pt-4">
                <h3 className="text-lg font-medium mb-4">Admin Controls</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline">Manage Users</Button>
                  <Button variant="outline">Review Loan Applications</Button>
                  <Button variant="outline">System Settings</Button>
                </div>
              </div>
            )}

            <div className="pt-4">
              <Button onClick={handleSignOut} variant="outline">
                Sign Out
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
