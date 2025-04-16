"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Send } from "lucide-react"

export const FinaChatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm Fina, your AI assistant. How can I help you today?",
    },
  ])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { role: "user", content: newMessage }])
      setNewMessage("")

      // Simulate AI response
      setTimeout(() => {
        setMessages([
          ...messages,
          { role: "user", content: newMessage },
          { role: "assistant", content: "This is a dummy response from Fina." },
        ])
      }, 1000)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button variant="outline" onClick={() => setIsOpen(true)} className="rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=fina" alt="Fina AI" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
        </Button>
      ) : (
        <Card className="w-80">
          <CardHeader>
            <CardTitle>Fina AI Assistant</CardTitle>
          </CardHeader>
          <CardContent className="h-64 overflow-y-auto">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.role === "user" ? "text-right" : ""}`}>
                {message.role === "assistant" ? (
                  <div className="flex items-start gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=fina" alt="Fina AI" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <p className="text-sm">{message.content}</p>
                  </div>
                ) : (
                  <p className="text-sm">{message.content}</p>
                )}
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex items-center">
            <Input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="mr-2"
            />
            <Button onClick={handleSendMessage} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </CardFooter>
          <Button variant="ghost" onClick={() => setIsOpen(false)} className="absolute top-2 right-2">
            Close
          </Button>
        </Card>
      )}
    </div>
  )
}
