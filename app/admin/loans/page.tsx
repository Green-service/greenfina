"use client"

import { useEffect, useState } from "react"
import { CheckCircle, Download, Search, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { createClient } from "@/lib/supabase/client"
import { formatCurrency } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

export default function AdminLoansPage() {
  const [loans, setLoans] = useState<any[]>([])
  const [filteredLoans, setFilteredLoans] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLoan, setSelectedLoan] = useState<any>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [processingAction, setProcessingAction] = useState(false)
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    async function fetchLoans() {
      try {
        const { data, error } = await supabase
          .from("loan_applications")
          .select(`
            id,
            amount,
            term,
            purpose,
            status,
            monthly_payment,
            bank_statement_url,
            id_document_url,
            contract_url,
            ai_recommendation,
            ai_risk_score,
            created_at,
            profiles (id, full_name, email, phone, monthly_income, credit_score)
          `)
          .order("created_at", { ascending: false })

        if (error) throw error

        setLoans(data || [])
        setFilteredLoans(data || [])
      } catch (error) {
        console.error("Error fetching loans:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLoans()
  }, [supabase])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredLoans(loans)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = loans.filter(
        (loan) =>
          loan.profiles?.full_name?.toLowerCase().includes(query) ||
          loan.profiles?.email?.toLowerCase().includes(query) ||
          loan.purpose?.toLowerCase().includes(query) ||
          loan.status?.toLowerCase().includes(query),
      )
      setFilteredLoans(filtered)
    }
  }, [searchQuery, loans])

  const pendingLoans = filteredLoans.filter((loan) => loan.status === "pending" || loan.status === "under_review")
  const approvedLoans = filteredLoans.filter((loan) => loan.status === "approved")
  const rejectedLoans = filteredLoans.filter((loan) => loan.status === "rejected")

  const handleViewDetails = (loan: any) => {
    setSelectedLoan(loan)
    setDialogOpen(true)
  }

  const handleStatusChange = async (loanId: string, newStatus: string, rejectionReason?: string) => {
    setProcessingAction(true)
    try {
      const { error } = await supabase
        .from("loan_applications")
        .update({
          status: newStatus,
          ...(rejectionReason ? { rejection_reason: rejectionReason } : {}),
        })
        .eq("id", loanId)

      if (error) throw error

      // Update local state
      setLoans(loans.map((loan) => (loan.id === loanId ? { ...loan, status: newStatus } : loan)))

      setFilteredLoans(filteredLoans.map((loan) => (loan.id === loanId ? { ...loan, status: newStatus } : loan)))

      toast({
        title: "Status updated",
        description: `Loan application has been ${newStatus}`,
      })

      setDialogOpen(false)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update loan status",
        variant: "destructive",
      })
    } finally {
      setProcessingAction(false)
    }
  }

  return (
    <DashboardShell isAdmin>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Loan Applications</h1>
          <p className="text-muted-foreground">Review and manage all loan applications</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name, email, or purpose..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Applications</TabsTrigger>
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
            <LoanApplicationsTable loans={filteredLoans} loading={loading} onViewDetails={handleViewDetails} />
          </TabsContent>
          <TabsContent value="pending" className="space-y-4">
            <LoanApplicationsTable loans={pendingLoans} loading={loading} onViewDetails={handleViewDetails} />
          </TabsContent>
          <TabsContent value="approved" className="space-y-4">
            <LoanApplicationsTable loans={approvedLoans} loading={loading} onViewDetails={handleViewDetails} />
          </TabsContent>
          <TabsContent value="rejected" className="space-y-4">
            <LoanApplicationsTable loans={rejectedLoans} loading={loading} onViewDetails={handleViewDetails} />
          </TabsContent>
        </Tabs>
      </div>

      {selectedLoan && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Loan Application Details</DialogTitle>
              <DialogDescription>Review the application details and supporting documents</DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Applicant Information</h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="text-muted-foreground">Name:</span> {selectedLoan.profiles?.full_name}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Email:</span> {selectedLoan.profiles?.email}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Phone:</span> {selectedLoan.profiles?.phone || "N/A"}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Monthly Income:</span>{" "}
                      {formatCurrency(Number.parseFloat(selectedLoan.profiles?.monthly_income || 0))}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Credit Score:</span>{" "}
                      {selectedLoan.profiles?.credit_score || "N/A"}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Loan Details</h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="text-muted-foreground">Amount:</span>{" "}
                      {formatCurrency(Number.parseFloat(selectedLoan.amount))}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Term:</span> {selectedLoan.term} months
                    </p>
                    <p>
                      <span className="text-muted-foreground">Monthly Payment:</span>{" "}
                      {formatCurrency(Number.parseFloat(selectedLoan.monthly_payment || 0))}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Purpose:</span> {selectedLoan.purpose}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Application Date:</span>{" "}
                      {new Date(selectedLoan.created_at).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Status:</span>
                      <Badge
                        className="ml-2"
                        variant={
                          selectedLoan.status === "approved"
                            ? "default"
                            : selectedLoan.status === "rejected"
                              ? "destructive"
                              : "outline"
                        }
                      >
                        {selectedLoan.status.charAt(0).toUpperCase() + selectedLoan.status.slice(1).replace("_", " ")}
                      </Badge>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Supporting Documents</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" asChild>
                    <a href={selectedLoan.bank_statement_url} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" />
                      Bank Statement
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={selectedLoan.id_document_url} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" />
                      ID Document
                    </a>
                  </Button>
                </div>
              </div>

              {selectedLoan.ai_recommendation && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">AI Recommendation</CardTitle>
                    <CardDescription>
                      Risk Score: {selectedLoan.ai_risk_score ? `${selectedLoan.ai_risk_score}/10` : "N/A"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{selectedLoan.ai_recommendation || "No AI recommendation available"}</p>
                  </CardContent>
                </Card>
              )}
            </div>
            <DialogFooter>
              {selectedLoan.status === "pending" || selectedLoan.status === "under_review" ? (
                <div className="flex gap-4">
                  <Button
                    variant="destructive"
                    onClick={() => handleStatusChange(selectedLoan.id, "rejected")}
                    disabled={processingAction}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => handleStatusChange(selectedLoan.id, "approved")}
                    disabled={processingAction}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                </div>
              ) : (
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Close
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </DashboardShell>
  )
}

function LoanApplicationsTable({
  loans,
  loading,
  onViewDetails,
}: {
  loans: any[]
  loading: boolean
  onViewDetails: (loan: any) => void
}) {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
    under_review: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
    approved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <p>Loading loan applications...</p>
      </div>
    )
  }

  if (loans.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 rounded-lg border border-dashed p-8 text-center">
        <div>
          <h3 className="mb-2 text-lg font-semibold">No loan applications found</h3>
          <p className="text-sm text-muted-foreground">There are no loan applications matching your criteria</p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Applicant</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Term</TableHead>
            <TableHead>Purpose</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loans.map((loan) => (
            <TableRow key={loan.id}>
              <TableCell className="font-medium">
                <div>
                  {loan.profiles?.full_name || "Unknown"}
                  <p className="text-xs text-muted-foreground">{loan.profiles?.email}</p>
                </div>
              </TableCell>
              <TableCell>{formatCurrency(Number.parseFloat(loan.amount))}</TableCell>
              <TableCell>{loan.term} months</TableCell>
              <TableCell className="max-w-[200px] truncate">{loan.purpose}</TableCell>
              <TableCell>{new Date(loan.created_at).toLocaleDateString()}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    statusColors[loan.status as keyof typeof statusColors] || statusColors.pending
                  }`}
                >
                  {loan.status.charAt(0).toUpperCase() + loan.status.slice(1).replace("_", " ")}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" onClick={() => onViewDetails(loan)}>
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
