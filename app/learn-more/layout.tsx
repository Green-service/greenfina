import { Navbar } from "@/components/landing/navbar"

export default function LearnMoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
} 