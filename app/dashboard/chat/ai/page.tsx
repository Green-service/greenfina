"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Bot, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { DashboardShell } from "@/components/ui/dashboard-shell"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createClient } from "@/lib/supabase/client"

const messageSchema = z.object({
  message: z.string().min(1, {
    message: "Message cannot be empty.",
  }),
})

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function AIChatPage() {
  const router = useRouter()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your Green Fina AI assistant. How can I help you with your financial needs today?",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  })

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Load chat history
  useEffect(() => {
    async function loadChatHistory() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (user) {
          const { data, error } = await supabase
            .from("ai_chat_history")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: true })
            .limit(50)

          if (error) throw error

          if (data && data.length > 0) {
            const formattedMessages: Message[] = data
              .map((item) => ({
                id: item.id,
                role: "user" as const,
                content: item.message,
                timestamp: new Date(item.created_at),
              }))
              .concat(
                data.map((item) => ({
                  id: `response-${item.id}`,
                  role: "assistant" as const,
                  content: item.response,
                  timestamp: new Date(item.created_at),
                })),
              )

            setMessages([messages[0], ...formattedMessages])
          }
        }
      } catch (error) {
        console.error("Error loading chat history:", error)
      }
    }

    loadChatHistory()
  }, [supabase])

  async function onSubmit(values: z.infer<typeof messageSchema>) {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: values.message,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    form.reset()
    setIsLoading(true)

    // Simulate AI response (in a real app, this would call an AI API)
    setTimeout(async () => {
      try {
        // Generate a response based on the user's message
        let response = ""
        const userMsg = values.message.toLowerCase()

        if (userMsg.includes("loan") && userMsg.includes("apply")) {
          response =
            "To apply for a loan, go to the Loans section in your dashboard and click on 'Apply for Loan'. You'll need to provide some personal information, financial details, and upload supporting documents like bank statements and ID."
        } else if (userMsg.includes("interest rate")) {
          response =
            "Our current interest rates range from 8.5% to 15% depending on the loan type and your credit profile. Student loans typically have the lowest rates, while business loans have higher rates due to increased risk."
        } else if (userMsg.includes("stokvela")) {
          response =
            "Stokvela groups are community savings clubs where members contribute a fixed amount regularly, and each member takes turns receiving the full pot. You can join existing groups or create your own in the Stokvela section of your dashboard."
        } else if (userMsg.includes("document") || userMsg.includes("upload")) {
          response =
            "For loan applications, you'll need to upload your ID document, recent bank statements (last 3 months), proof of income, and possibly proof of residence. All documents should be clear, legible scans or photos."
        } else if (userMsg.includes("payment") || userMsg.includes("repay")) {
          response =
            "Loan repayments are made monthly via direct debit from your bank account. You can view your payment schedule, upcoming payments, and payment history in the Loans section of your dashboard."
        } else {
          response =
            "Thank you for your question. I'd be happy to help with your financial needs. Could you provide more specific details about what you're looking for, such as loan options, investment opportunities, or account management assistance?"
        }

        const aiMessage: Message = {
          id: `response-${userMessage.id}`,
          role: "assistant",
          content: response,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, aiMessage])

        // Save to database
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (user) {
          await supabase.from("ai_chat_history").insert({
            user_id: user.id,
            message: values.message,
            response: response,
          })
        }
      } catch (error) {
        console.error("Error processing message:", error)
      } finally {
        setIsLoading(false)
      }
    }, 1500)
  }

  return (
    <DashboardShell>
      <div className="flex flex-col gap-8 h-[calc(100vh-10rem)]">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
          <p className="text-muted-foreground">Chat with our AI assistant for financial advice and support</p>
        </div>

        <Card className="flex-1 flex flex-col futuristic-card">
          <CardHeader>
            <CardTitle>Green Fina AI</CardTitle>
            <CardDescription>Ask questions about loans, investments, or financial advice</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                    <Avatar className={message.role === "assistant" ? "bg-primary glow-effect" : ""}>
                      {message.role === "assistant" ? (
                        <>
                          <AvatarFallback>AI</AvatarFallback>
                          <Bot className="h-5 w-5 text-primary-foreground" />
                        </>
                      ) : (
                        <>
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                          <AvatarFallback>U</AvatarFallback>
                        </>
                      )}
                    </Avatar>
                    <div
                      className={`rounded-lg p-3 ${
                        message.role === "assistant"
                          ? "bg-secondary border border-border/30"
                          : "bg-primary text-primary-foreground glow-effect"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full gap-2">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="Type your message..."
                          {...field}
                          disabled={isLoading}
                          className="border-border/30 focus:border-primary/50"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" size="icon" disabled={isLoading} className={isLoading ? "" : "glow-effect"}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </form>
            </Form>
          </CardFooter>
        </Card>
      </div>
    </DashboardShell>
  )
}
