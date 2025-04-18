"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { motion } from "framer-motion"
import { X, Mail, Lock, Loader2, ArrowRight, Eye, EyeOff } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

const signInSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
})

interface SignInModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const supabase = createClient()

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      })

      if (error) {
        throw error
      }

      toast({
        title: "Success!",
        description: "You have successfully signed in.",
      })

      // Check if user is admin (in a real app, you'd check a role in the database)
      const isAdmin = values.email.includes("admin")
      router.push(isAdmin ? "/admin" : "/dashboard")
      onClose()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Invalid email or password.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGoogleSignIn() {
    setIsGoogleLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        throw error
      }

      // The user will be redirected to Google for authentication
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign in with Google.",
        variant: "destructive",
      })
      setIsGoogleLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md border-none bg-black/80 backdrop-blur-xl p-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-sky-500/5 to-purple-500/10 z-0" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-sky-400 to-green-400 z-10" />

        <div className="relative z-10 p-6">
          <div className="absolute top-2 right-2">
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white/70 hover:text-white">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          {/* Logo at the top of the modal */}
          <div className="flex justify-center mb-4">
            <motion.div
              animate={{
                opacity: [0.7, 1, 0.7],
                scale: [0.98, 1, 0.98],
                filter: [
                  "drop-shadow(0 0 5px rgba(74, 222, 128, 0.5))",
                  "drop-shadow(0 0 10px rgba(74, 222, 128, 0.8))",
                  "drop-shadow(0 0 5px rgba(74, 222, 128, 0.5))",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "mirror",
              }}
              className="relative w-16 h-16 mb-2"
            >
              <Image src="/images/logo.png" alt="Green Fina Logo" width={64} height={64} className="object-contain" />
            </motion.div>
          </div>

          <DialogTitle className="text-xl font-bold text-center mb-6 text-white">Sign in to Green Fina</DialogTitle>

          <div className="space-y-6">
            <Button
              variant="outline"
              className="w-full border-white/10 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center gap-2 h-11"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
            >
              {isGoogleLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Sign in with Google
                </>
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-black px-2 text-white/50">or continue with</span>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative">
                        <FormControl>
                          <Input
                            placeholder="Email"
                            {...field}
                            className="bg-white/5 border-white/10 focus:border-green-400/50 text-white h-11 pl-10"
                          />
                        </FormControl>
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-white/40" />
                      </div>
                      <FormMessage className="text-red-400 text-xs mt-1">
                        {form.formState.errors.email?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            {...field}
                            className="bg-white/5 border-white/10 focus:border-green-400/50 text-white h-11 pl-10 pr-10"
                          />
                        </FormControl>
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-white/40" />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1 h-9 w-9 p-0 text-white/40 hover:text-white/70"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                        </Button>
                      </div>
                      <FormMessage className="text-red-400 text-xs mt-1">
                        {form.formState.errors.password?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-400 to-sky-400 hover:from-green-500 hover:to-sky-500 text-white h-11"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      Sign in
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </form>
            </Form>

            <div className="text-center text-sm text-white/50">
              Don&apos;t have an account?{" "}
              <Button
                variant="link"
                className="p-0 h-auto text-green-400 hover:text-green-300"
                onClick={() => {
                  onClose()
                  router.push("/auth/signup")
                }}
              >
                Sign up
              </Button>
            </div>
          </div>
        </div>

        <motion.div
          className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        />
        <motion.div
          className="absolute -top-10 -left-10 w-40 h-40 bg-sky-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
            delay: 1,
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
