"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, CheckCircle, Clock, FileText, PieChart, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DashboardShell } from "@/components/ui/dashboard-shell"
import { createClient } from "@/lib/supabase/client"
import { formatCurrency } from "@/lib/utils"

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalLoans: 0,
    pendingLoans: 0,
    approvedLoans: 0,
    rejectedLoans: 0,
    totalUsers: 0,
    totalAmount: 0,
  })
  const [loading, setLoading] = useState(true)
  const [recentLoans, setRecentLoans] = useState<any[]>([])
  const supabase = createClient()

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Get loan stats
        const { data: loanStats, error: loanError } = await supabase
          .from("loan_applications")
          .select("id, status, amount")

        if (loanError) throw loanError

        // Get user count
        const { count: userCount, error: userError } = await supabase
          .from("profiles")
          .select("id", { count: "exact", head: true })

        if (userError) throw userError

        // Get recent loans
        const { data: recent, error: recentError } = await supabase
          .from("loan_applications")
          .select(`
            id,
            amount,
            status,
            created_at,
            profiles (full_name, email)
          `)
          .order("created_at", { ascending: false })
          .limit(5)

        if (recentError) throw recentError

        // Calculate stats
        const pendingLoans =
          loanStats?.filter((loan) => loan.status === "pending" || loan.status === "under_review").length || 0
        const approvedLoans = loanStats?.filter((loan) => loan.status === "approved").length || 0
        const rejectedLoans = loanStats?.filter((loan) => loan.status === "rejected").length || 0
        const totalAmount = loanStats?.reduce((sum, loan) => sum + Number.parseFloat(loan.amount), 0) || 0

        setStats({
          totalLoans: loanStats?.length || 0,
          pendingLoans,
          approvedLoans,
          rejectedLoans,
          totalUsers: userCount || 0,
          totalAmount,
        })

        setRecentLoans(recent || [])
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [supabase])

  return (
    <DashboardShell isAdmin>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Overview of loan applications, users, and financial metrics</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Loans</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalLoans}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalAmount > 0 && `Total value: ${formatCurrency(stats.totalAmount)}`}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingLoans}</div>
              <p className="text-xs text-muted-foreground">Awaiting review and approval</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Loans</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.approvedLoans}</div>
              <p className="text-xs text-muted-foreground">Successfully approved applications</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">Registered platform users</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Recent Loan Applications</CardTitle>
              <CardDescription>Latest loan applications submitted to the platform</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center h-40">
                  <p>Loading loan data...</p>
                </div>
              ) : recentLoans.length > 0 ? (
                <div className="space-y-4">
                  {recentLoans.map((loan) => (
                    <div key={loan.id} className="flex items-center justify-between border-b pb-4">
                      <div className="space-y-1">
                        <p className="font-medium">{loan.profiles?.full_name || "Unknown User"}</p>
                        <p className="text-sm text-muted-foreground">
                          {loan.profiles?.email} • {formatCurrency(Number.parseFloat(loan.amount))}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            loan.status === "approved"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                              : loan.status === "rejected"
                                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                          }`}
                        >
                          {loan.status.charAt(0).toUpperCase() + loan.status.slice(1).replace("_", " ")}
                        </span>
                        <span className="text-xs text-muted-foreground mt-1">
                          {new Date(loan.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-40">
                  <p className="text-muted-foreground">No loan applications yet</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/admin/loans">
                  View All Applications
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-between" asChild>
                <Link href="/admin/loans">
                  Review Loan Applications
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-between" asChild>
                <Link href="/admin/users">
                  Manage Users
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-between" asChild>
                <Link href="/admin/analytics">
                  View Analytics
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-between" asChild>
                <Link href="/admin/settings">
                  System Settings
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
            <CardDescription>Summary of loan disbursements and repayments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <PieChart className="h-16 w-16 text-muted-foreground/50" />
              <p className="ml-4 text-muted-foreground">Analytics charts will be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
