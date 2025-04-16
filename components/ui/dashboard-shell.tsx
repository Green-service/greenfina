"use client"

import type React from "react"

import { ModeToggle } from "@/components/ui/mode-toggle"
import { UserNav } from "@/components/ui/user-nav"

export function DashboardShell({ children, isAdmin }: { children: React.ReactNode; isAdmin?: boolean }) {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex flex-1 items-center space-x-4 sm:space-x-6">
            <a href="/" className="text-2xl font-bold">
              Green Fina
            </a>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            {isAdmin ? null : <UserNav />}
            <ModeToggle />
          </div>
        </div>
      </header>
      <main className="container mx-auto max-w-7xl flex-1 px-6 py-8 md:px-8 lg:px-10">{children}</main>
    </div>
  )
}
