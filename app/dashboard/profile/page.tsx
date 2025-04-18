"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardShell } from "@/components/ui/dashboard-shell"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"

const profileSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  dateOfBirth: z.string().optional(),
  employmentStatus: z.string().optional(),
  monthlyIncome: z.coerce.number().optional(),
  profileImage: z.any().refine((files) => {
    if (typeof window === 'undefined') return true; // Skip validation during SSR
    return !files || (files instanceof FileList && files.length >= 0);
  }, {
    message: "Invalid profile image",
  }),
})

const employmentOptions = [
  { value: "employed", label: "Employed" },
  { value: "self_employed", label: "Self-Employed" },
  { value: "unemployed", label: "Unemployed" },
  { value: "student", label: "Student" },
  { value: "retired", label: "Retired" },
]

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)
  const supabase = createClient()
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      dateOfBirth: "",
      employmentStatus: "",
      monthlyIncome: undefined,
    },
  })

  useEffect(() => {
    async function getProfile() {
      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser()

        if (authUser) {
          // Get user data from users_account table
          const { data: accountData, error: accountError } = await supabase
            .from("users_account")
            .select("*")
            .eq("auth_id", authUser.id)
            .single()

          if (accountData) {
            // Combine auth data with account data
            setUser({
              ...accountData,
              auth: {
                ...authUser,
                provider: authUser.app_metadata?.provider || "email",
                created_at: authUser.created_at,
              },
            })
            setProfileImageUrl(accountData.profile_picture_url)

            form.reset({
              fullName: accountData.full_name || "",
              email: accountData.email || "",
              phone: accountData.phone || "",
              address: accountData.address || "",
              city: accountData.city || "",
              state: accountData.state || "",
              postalCode: accountData.postal_code || "",
              country: accountData.country || "",
              dateOfBirth: accountData.date_of_birth
                ? new Date(accountData.date_of_birth).toISOString().split("T")[0]
                : "",
              employmentStatus: accountData.employment_status || "",
              monthlyIncome: accountData.monthly_income ? Number.parseFloat(accountData.monthly_income) : undefined,
            })
          } else {
            // Fallback to auth data only
            setUser({
              email: authUser.email,
              full_name: authUser.user_metadata?.full_name || authUser.user_metadata?.name || "User",
              profile_picture_url: authUser.user_metadata?.avatar_url,
              auth: {
                ...authUser,
                provider: authUser.app_metadata?.provider || "email",
                created_at: authUser.created_at,
              },
            })
            // Fallback to profiles table if needed
            const { data: profile } = await supabase.from("profiles").select("*").eq("id", authUser.id).single()

            if (profile) {
              setUser(profile)
              setProfileImageUrl(profile.profile_image_url)

              form.reset({
                fullName: profile.full_name || "",
                email: authUser.email || "",
                phone: profile.phone || "",
                address: profile.address || "",
                dateOfBirth: profile.date_of_birth ? new Date(profile.date_of_birth).toISOString().split("T")[0] : "",
                employmentStatus: profile.employment_status || "",
                monthlyIncome: profile.monthly_income ? Number.parseFloat(profile.monthly_income) : undefined,
              })
            }
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error)
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    getProfile()
  }, [supabase, form, toast])

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    setIsSaving(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("User not authenticated")

      let profileImageUrl = null

      // Upload profile image if provided
      if (values.profileImage && values.profileImage.length > 0) {
        const file = values.profileImage[0]
        const fileExt = file.name.split(".").pop()
        const filePath = `${user.id}/profile-image.${fileExt}`

        const { error: uploadError } = await supabase.storage.from("profiles").upload(filePath, file, { upsert: true })

        if (uploadError) throw uploadError

        const { data: urlData } = supabase.storage.from("profiles").getPublicUrl(filePath)

        profileImageUrl = urlData.publicUrl
      }

      // Check if user exists in users_account
      const { data: existingUser } = await supabase.from("users_account").select("id").eq("auth_id", user.id).single()

      if (existingUser) {
        // Update users_account
        const { error } = await supabase
          .from("users_account")
          .update({
            full_name: values.fullName,
            phone: values.phone,
            address: values.address,
            city: values.city,
            state: values.state,
            postal_code: values.postalCode,
            country: values.country,
            date_of_birth: values.dateOfBirth,
            employment_status: values.employmentStatus,
            monthly_income: values.monthlyIncome,
            ...(profileImageUrl ? { profile_picture_url: profileImageUrl } : {}),
            updated_at: new Date().toISOString(),
          })
          .eq("auth_id", user.id)

        if (error) throw error
      } else {
        // Insert into users_account
        const { error } = await supabase.from("users_account").insert({
          auth_id: user.id,
          email: values.email,
          full_name: values.fullName,
          phone: values.phone,
          address: values.address,
          city: values.city,
          state: values.state,
          postal_code: values.postalCode,
          country: values.country,
          date_of_birth: values.dateOfBirth,
          employment_status: values.employmentStatus,
          monthly_income: values.monthlyIncome,
          profile_picture_url: profileImageUrl,
          user_role: "user",
          is_verified: true,
        })

        if (error) throw error
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      })

      if (profileImageUrl) {
        setProfileImageUrl(profileImageUrl)
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">Your account information</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={user?.profile_picture_url || "/placeholder.svg?height=80&width=80"}
                    alt={user?.full_name}
                  />
                  <AvatarFallback className="text-lg">{getInitials(user?.full_name || "User")}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{user?.full_name}</h3>
                  <p className="text-muted-foreground">{user?.email}</p>
                  {user?.auth?.provider && (
                    <div className="mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-500/20 text-green-400">
                      Signed in with {user.auth.provider}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Email</h4>
                  <p>{user?.email}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Phone</h4>
                  <p>{user?.phone || "Not provided"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Account Created</h4>
                  <p>{user?.auth?.created_at ? new Date(user.auth.created_at).toLocaleDateString() : "Unknown"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Verification Status</h4>
                  <p>{user?.is_verified ? "Verified" : "Not verified"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle>Database Information</CardTitle>
              <CardDescription>Your stored information in the database</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-black/30 p-4 rounded-md overflow-auto text-xs">{JSON.stringify(user, null, 2)}</pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}
