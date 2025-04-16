import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="hero-gradient absolute inset-0 z-0" />
      <div className="grid-pattern absolute inset-0 z-0 opacity-30" />
      <div className="container relative z-10">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center rounded-full border border-primary/30 px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20 w-fit glow-effect">
              Financial freedom starts here
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Empowering Your <span className="text-primary neon-text">Financial</span> Future
            </h1>
            <p className="text-xl text-muted-foreground">
              Apply for loans, invest in stokvela groups, and manage your finances with our AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="font-semibold glow-effect">
                <Link href="/auth/signup">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary/20 hover:border-primary/50">
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              {["Quick loan approvals", "Low interest rates", "Flexible repayments"].map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-square md:aspect-auto md:h-[600px] rounded-lg overflow-hidden futuristic-border">
              <img
                src="/placeholder.svg?height=600&width=600"
                alt="Green Fina Dashboard"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
