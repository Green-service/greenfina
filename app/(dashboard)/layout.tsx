import { SessionCheck } from '@/components/session-check'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SessionCheck />
      {children}
    </>
  )
} 