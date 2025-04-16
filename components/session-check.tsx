'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { refreshSession } from '@/lib/session'

const SESSION_CHECK_INTERVAL = 5 * 60 * 1000 // 5 minutes

export function SessionCheck() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Initial session check
    checkSession()

    // Set up interval for session checks
    const interval = setInterval(checkSession, SESSION_CHECK_INTERVAL)

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        router.push('/')
      }
    })

    return () => {
      clearInterval(interval)
      subscription.unsubscribe()
    }
  }, [router])

  async function checkSession() {
    try {
      const session = await refreshSession()
      if (!session) {
        router.push('/')
      }
    } catch (error) {
      console.error('Session check error:', error)
    }
  }

  return null
} 