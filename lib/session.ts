import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
)

export async function refreshSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return session
  } catch (error) {
    console.error('Error refreshing session:', error)
    return null
  }
}

export async function getSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return session
  } catch (error) {
    console.error('Error getting session:', error)
    return null
  }
}

export async function getUserRole(userId: string) {
  try {
    // First try to get existing role
    const { data: existingRole, error } = await supabase
      .from('ser_role')
      .select('role')
      .eq('user_id', userId)
      .maybeSingle()

    if (error) throw error

    // If no role exists, create a default user role
    if (!existingRole) {
      const { data: newRole, error: insertError } = await supabase
        .from('ser_role')
        .insert([
          {
            user_id: userId,
            role: 'user' // Default role
          }
        ])
        .select()
        .single()

      if (insertError) throw insertError
      return newRole?.role || 'user'
    }

    return existingRole?.role || 'user'
  } catch (error) {
    console.error('Error getting user role:', error)
    return 'user' // Default to user role on error
  }
} 