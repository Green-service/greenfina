"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardShell } from "@/components/ui/dashboard-shell"
import { createClient } from "@/lib/supabase/client"
import { formatCurrency } from "@/lib/utils"

export default function LoansPage() {
  const [loans, setLoans] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchLoans() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (user) {
          const { data, error } = await supabase
            .from("loan_applications")
            .select("*, loan_types(*)")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })

          if (error) throw error
          setLoans(data || [])
        }
      } catch (error) {
        console.error("Error fetching loans:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLoans()
  }, [supabase])

  const pendingLoans = loans.filter((loan) => loan.status === "pending" || loan.status === "under_review")
  const approvedLoans = loans.filter((loan) => loan.status === "approved")
  const rejectedLoans = loans.filter((loan) => loan.status === "rejected")

  return (
    <DashboardShell>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Loans</h1>
            <p className="text-muted-foreground">View and manage your loan applications</p>
          </div>
          <Button asChild>
            <Link href="/dashboard/loans/apply">
              <PlusCircle className="mr-2 h-4 w-4" />
              Apply for Loan
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Loans</TabsTrigger>
            <TabsTrigger value="pending">
              Pending
              {pendingLoans.length > 0 && (
                <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  {pendingLoans.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <p>Loading loan data...</p>
              </div>
            ) : loans.length > 0 ? (
              loans.map((loan) => <LoanCard key={loan.id} loan={loan} />)
            ) : (
              <EmptyLoansState />
            )}
          </TabsContent>
          <TabsContent value="pending" className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <p>Loading loan data...</p>
              </div>
            ) : pendingLoans.length > 0 ? (
              pendingLoans.map((loan) => <LoanCard key={loan.id} loan={loan} />)
            ) : (
              <EmptyLoansState status="pending" />
            )}
          </TabsContent>
          <TabsContent value="approved" className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <p>Loading loan data...</p>
              </div>
            ) : approvedLoans.length > 0 ? (
              approvedLoans.map((loan) => <LoanCard key={loan.id} loan={loan} />)
            ) : (
              <EmptyLoansState status="approved" />
            )}
          </TabsContent>
          <TabsContent value="rejected" className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <p>Loading loan data...</p>
              </div>
            ) : rejectedLoans.length > 0 ? (
              rejectedLoans.map((loan) => <LoanCard key={loan.id} loan={loan} />)
            ) : (
              <EmptyLoansState status="rejected" />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}

function LoanCard({ loan }: { loan: any }) {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
    under_review: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
    approved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  }

  const statusColor = statusColors[loan.status as keyof typeof statusColors] || statusColors.pending

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{loan.loan_types?.name || "Loan"}</CardTitle>
            <CardDescription>Applied on {new Date(loan.created_at).toLocaleDateString()}</CardDescription>
          </div>
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColor}`}>
            {loan.status.charAt(0).toUpperCase() + loan.status.slice(1).replace("_", " ")}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Amount</p>
            <p className="text-lg font-semibold">{formatCurrency(Number.parseFloat(loan.amount))}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Term</p>
            <p className="text-lg font-semibold">{loan.term} months</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Purpose</p>
            <p className="text-lg font-semibold">{loan.purpose || "Not specified"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Monthly Payment</p>
            <p className="text-lg font-semibold">
              {loan.monthly_payment ? formatCurrency(Number.parseFloat(loan.monthly_payment)) : "N/A"}
            </p>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard/loans/${loan.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function EmptyLoansState({ status }: { status?: string }) {
  let message = "You haven't applied for any loans yet"

  if (status === "pending") {
    message = "You don't have any pending loan applications"
  } else if (status === "approved") {
    message = "You don't have any approved loans"
  } else if (status === "rejected") {
    message = "You don't have any rejected loan applications"
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
      <h3 className="mb-2 text-lg font-semibold">{message}</h3>
      <p className="mb-6 text-sm text-muted-foreground">Apply for a loan to get started with Green Fina</p>
      <Button asChild>
        <Link href="/dashboard/loans/apply">
          <PlusCircle className="mr-2 h-4 w-4" />
          Apply for Loan
        </Link>
      </Button>
    </div>
  )
}
