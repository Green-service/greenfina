"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { PlusCircle, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { DashboardShell } from "@/components/ui/dashboard-shell"
import { createClient } from "@/lib/supabase/client"
import { formatCurrency } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

export default function StokvelaPage() {
  const [groups, setGroups] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isLoadingMembers, setIsLoadingMembers] = useState(false)
  const [selectedStokvela, setSelectedStokvela] = useState<any>(null)
  const [stokvelaMembers, setStokvelaMembers] = useState<any[]>([])
  const [isStokvelaDetailsOpen, setIsStokvelaDetailsOpen] = useState(false)
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [selectedMemberForPayment, setSelectedMemberForPayment] = useState<any>(null)
  const [paymentAmount, setPaymentAmount] = useState("")
  const [paymentSignature, setPaymentSignature] = useState("")
  const [paymentProof, setPaymentProof] = useState<File | null>(null)
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false)
  const [paymentStep, setPaymentStep] = useState(1)
  const [accountHolderName, setAccountHolderName] = useState("")
  const supabase = createClient()

  useEffect(() => {
    async function fetchGroups() {
      try {
        // Get all stokvela groups without user filtering
          const { data, error } = await supabase
          .from("stokvela_groups")
            .select(`
                id,
                name,
                description,
                target_amount,
                contribution_amount,
                frequency,
            created_at,
            member_count
            `)
          .order('created_at', { ascending: false })

          if (error) throw error

          if (data) {
            // Format the data
            const formattedGroups = data.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            targetAmount: Number.parseFloat(item.target_amount),
            contributionAmount: Number.parseFloat(item.contribution_amount),
            frequency: item.frequency,
            role: "member", // Default role for display
            createdAt: new Date(item.created_at),
            memberCount: item.member_count || 0,
            currentAmount: Math.floor(Math.random() * Number.parseFloat(item.target_amount)),
              nextPayoutDate: new Date(Date.now() + (Math.floor(Math.random() * 30) + 1) * 24 * 60 * 60 * 1000),
            }))

            setGroups(formattedGroups)
        }
      } catch (error) {
        console.error("Error fetching stokvela groups:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGroups()
  }, [supabase])

  const handleViewStokvelaDetails = async (stokvela: any) => {
    try {
      setIsLoadingMembers(true)
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) return

      // Get all members of this stokvela group
      const { data: members, error } = await supabase
        .from('stokvela_members')
        .select('*, position')
        .eq('group_id', stokvela.id)
        .order('position', { ascending: true })

      if (error) throw error

      // Fetch user profiles for each member
      const membersWithProfiles = await Promise.all(
        (members || []).map(async (member) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('email, phone')
            .eq('id', member.user_id)
            .single()

          return {
            ...member,
            email: profile?.email || 'N/A',
            phone: profile?.phone || 'N/A'
          }
        })
      )
      
      setSelectedStokvela(stokvela)
      setStokvelaMembers(membersWithProfiles)
      setIsStokvelaDetailsOpen(true)
    } catch (error) {
      console.error('Error fetching stokvela members:', error)
      toast({
        title: "Error",
        description: "Failed to load stokvela members",
        variant: "destructive",
      })
    } finally {
      setIsLoadingMembers(false)
    }
  }

  const handlePaymentProofChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentProof(e.target.files[0])
    }
  }

  const handleSubmitPayment = async () => {
    if (!selectedMemberForPayment || !paymentAmount || !paymentSignature || !paymentProof || !accountHolderName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmittingPayment(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) {
        toast({
          title: "Error",
          description: "You must be logged in to make a payment",
          variant: "destructive",
        })
        return
      }

      // Upload proof of payment to storage
      const fileExt = paymentProof.name.split('.').pop()
      const fileName = `${session.user.id}_${selectedMemberForPayment.id}_${Date.now()}.${fileExt}`
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(`payment_proofs/${fileName}`, paymentProof)

      if (uploadError) throw uploadError

      // Get the public URL for the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(`payment_proofs/${fileName}`)

      // Record the payment in the database
      const { error: paymentError } = await supabase
        .from('stokvela_payments')
        .insert({
          user_id: session.user.id,
          member_id: selectedMemberForPayment.id,
          group_id: selectedMemberForPayment.group_id,
          amount: parseFloat(paymentAmount),
          account_holder_name: accountHolderName,
          signature: paymentSignature,
          proof_url: publicUrl,
          status: 'pending',
          payment_date: new Date().toISOString()
        })

      if (paymentError) throw paymentError

      toast({
        title: "Payment Submitted",
        description: "Your payment has been submitted successfully",
      })

      // Close the dialog and reset state
      setIsPaymentDialogOpen(false)
      setSelectedMemberForPayment(null)
      setPaymentAmount("")
      setPaymentSignature("")
      setPaymentProof(null)
      setAccountHolderName("")
      setPaymentStep(1)

    } catch (error) {
      console.error('Error submitting payment:', error)
      toast({
        title: "Error",
        description: "Failed to submit payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmittingPayment(false)
    }
  }

  const handlePayNow = (member: any) => {
    console.log('Opening payment dialog for member:', member);
    setSelectedMemberForPayment(member);
    setPaymentAmount(member.contribution_amount?.toString() || "");
    setPaymentSignature("");
    setPaymentProof(null);
    setAccountHolderName("");
    setPaymentStep(1);
    setIsPaymentDialogOpen(true);
  }

  return (
    <DashboardShell>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Stokvela Groups</h1>
            <p className="text-muted-foreground">Join or create rotating savings groups with your community</p>
          </div>
          <div className="flex gap-4">
            <Button asChild variant="outline">
              <Link href="/dashboard/stokvela/join">Join Group</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/stokvela/create">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Group
              </Link>
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-40">
            <p>Loading stokvela groups...</p>
          </div>
        ) : groups.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <StokvelaCard 
                key={group.id} 
                group={group} 
                onViewDetails={() => handleViewStokvelaDetails(group)}
              />
            ))}
          </div>
        ) : (
          <EmptyStokvelaState />
        )}

        {/* Stokvela Details Modal */}
        {isStokvelaDetailsOpen && selectedStokvela && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">{selectedStokvela.name}</h2>
              {isLoadingMembers ? (
                <div className="flex items-center justify-center h-40">
                  <p>Loading members...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2">Group Details</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedStokvela.description}
                      </p>
                      <div className="mt-2">
                        <p className="text-sm">
                          <span className="font-medium">Target Amount:</span>{" "}
                          {formatCurrency(selectedStokvela.targetAmount)}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Contribution:</span>{" "}
                          {formatCurrency(selectedStokvela.contributionAmount)} / {selectedStokvela.frequency}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Members ({stokvelaMembers.length})</h3>
                      <div className="space-y-2">
                        {stokvelaMembers.map((member) => (
                          <div key={member.id} className="flex items-center justify-between p-2 bg-white/50 dark:bg-green-900/20 rounded-lg">
                            <div className="flex items-center gap-2">
                              <MemberAvatar name={member.name || "Member"} />
                              <span className="text-sm">{member.name || "Anonymous Member"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-sm text-green-600/80 dark:text-green-400/80">
                                <div>Email: {member.email}</div>
                                <div>Phone: {member.phone}</div>
                              </div>
                              {member.position === 1 && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handlePayNow(member)}
                                  className="bg-green-500 hover:bg-green-600 text-white"
                                >
                                  Pay Now
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-6 flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setIsStokvelaDetailsOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Payment Dialog */}
        <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
          <DialogContent className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700/30 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg font-medium text-green-800 dark:text-green-300">Make Payment</DialogTitle>
              <DialogDescription className="text-green-700/80 dark:text-green-400/80">
                Complete the payment process for {selectedMemberForPayment?.name}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Progress Steps */}
              <div className="flex justify-between mb-4">
                <div className={`flex flex-col items-center ${paymentStep >= 1 ? 'text-green-500' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${paymentStep >= 1 ? 'bg-green-500' : 'bg-gray-200'}`}>
                    <span className="text-white">1</span>
                  </div>
                  <span className="text-xs mt-1">Amount</span>
                </div>
                <div className={`flex flex-col items-center ${paymentStep >= 2 ? 'text-green-500' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${paymentStep >= 2 ? 'bg-green-500' : 'bg-gray-200'}`}>
                    <span className="text-white">2</span>
                  </div>
                  <span className="text-xs mt-1">Details</span>
                </div>
                <div className={`flex flex-col items-center ${paymentStep >= 3 ? 'text-green-500' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${paymentStep >= 3 ? 'bg-green-500' : 'bg-gray-200'}`}>
                    <span className="text-white">3</span>
                  </div>
                  <span className="text-xs mt-1">Proof</span>
                </div>
              </div>

              {paymentStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-green-800 dark:text-green-300">Payment Amount</Label>
                    <Input
                      type="number"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="bg-white/30 dark:bg-green-900/10 border-green-200 dark:border-green-700/50"
                    />
                  </div>
                </div>
              )}

              {paymentStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-green-800 dark:text-green-300">Account Holder Name</Label>
                    <Input
                      type="text"
                      value={accountHolderName}
                      onChange={(e) => setAccountHolderName(e.target.value)}
                      placeholder="Enter account holder name"
                      className="bg-white/30 dark:bg-green-900/10 border-green-200 dark:border-green-700/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-green-800 dark:text-green-300">Signature</Label>
                    <Input
                      type="text"
                      value={paymentSignature}
                      onChange={(e) => setPaymentSignature(e.target.value)}
                      placeholder="Enter your signature"
                      className="bg-white/30 dark:bg-green-900/10 border-green-200 dark:border-green-700/50"
                    />
                  </div>
                </div>
              )}

              {paymentStep === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-green-800 dark:text-green-300">Proof of Payment</Label>
                    <Input
                      type="file"
                      onChange={handlePaymentProofChange}
                      accept="image/*,.pdf"
                      className="bg-white/30 dark:bg-green-900/10 border-green-200 dark:border-green-700/50"
                    />
                    <p className="text-xs text-green-600/80 dark:text-green-400/80">
                      Upload a screenshot or PDF of your payment confirmation
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-4">
                {paymentStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={() => setPaymentStep(paymentStep - 1)}
                    className="border-green-200 dark:border-green-700/50 text-green-700 dark:text-green-300"
                  >
                    Previous
                  </Button>
                )}
                {paymentStep < 3 ? (
                  <Button
                    onClick={() => setPaymentStep(paymentStep + 1)}
                    className="bg-green-500 hover:bg-green-600 text-white ml-auto"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmitPayment}
                    disabled={isSubmittingPayment || !paymentAmount || !paymentSignature || !paymentProof || !accountHolderName}
                    className="bg-green-500 hover:bg-green-600 text-white ml-auto"
                  >
                    {isSubmittingPayment ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Payment'
                    )}
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardShell>
  )
}

function StokvelaCard({ group, onViewDetails }: { group: any; onViewDetails: () => void }) {
  const progress = (group.currentAmount / group.targetAmount) * 100

  return (
    <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 dark:from-green-400/5 dark:to-emerald-400/5 group-hover:from-green-400/20 group-hover:to-emerald-400/20 transition-all duration-300"></div>
      
      <CardHeader className="pb-2 relative z-10">
        <div className="flex justify-between items-start">
          <CardTitle className="text-green-800 dark:text-green-300 font-bold tracking-wide">{group.name}</CardTitle>
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border border-green-200 dark:border-green-700/50">
            {group.role === "admin" ? "Admin" : "Member"}
          </span>
        </div>
        <CardDescription className="text-green-700/80 dark:text-green-400/80">{group.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4 relative z-10">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
          <span className="text-sm text-green-700 dark:text-green-300">{group.memberCount} members</span>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-green-700 dark:text-green-300">Progress</span>
            <span className="text-sm font-medium text-green-700 dark:text-green-300">{Math.round(progress)}%</span>
          </div>
          <Progress 
            value={progress} 
            className="h-2 bg-green-100 dark:bg-green-900/50" 
            indicatorClassName="bg-gradient-to-r from-green-500 to-emerald-500"
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-green-600/80 dark:text-green-400/80">Current: {formatCurrency(group.currentAmount)}</span>
            <span className="text-xs text-green-600/80 dark:text-green-400/80">Target: {formatCurrency(group.targetAmount)}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-800/30">
            <p className="text-sm font-medium text-green-700 dark:text-green-300">Contribution</p>
            <p className="font-semibold text-green-800 dark:text-green-200">{formatCurrency(group.contributionAmount)}</p>
            <p className="text-xs text-green-600/80 dark:text-green-400/80">{group.frequency}</p>
          </div>
          <div className="bg-white/50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-800/30">
            <p className="text-sm font-medium text-green-700 dark:text-green-300">Next Payout</p>
            <p className="font-semibold text-green-800 dark:text-green-200">{group.nextPayoutDate.toLocaleDateString()}</p>
            <p className="text-xs text-green-600/80 dark:text-green-400/80">
              to <MemberAvatar name="John D." />
            </p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="relative z-10">
        <Button 
          variant="outline" 
          className="w-full bg-white/50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-800/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700/50 transition-all duration-300" 
          onClick={onViewDetails}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

function MemberAvatar({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center">
      <Avatar className="h-5 w-5 mr-1">
        <AvatarFallback className="text-[10px]">{getInitials(name)}</AvatarFallback>
      </Avatar>
      {name}
    </span>
  )
}

function EmptyStokvelaState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
      <h3 className="mb-2 text-lg font-semibold">No Stokvela Groups</h3>
      <p className="mb-6 text-sm text-muted-foreground">You are not a member of any stokvela groups yet</p>
      <div className="flex gap-4">
        <Button asChild variant="outline">
          <Link href="/dashboard/stokvela/join">Join a Group</Link>
        </Button>
        <Button asChild>
          <Link href="/dashboard/stokvela/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create a Group
          </Link>
        </Button>
      </div>
    </div>
  )
}
