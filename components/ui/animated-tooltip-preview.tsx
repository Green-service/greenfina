"use client"
import { AnimatedTooltip } from "./animated-tooltip"

const people = [
  {
    id: 1,
    name: "Khudi",
    designation: "Software Developer",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/khudi.jpg-Vo3WGvbh4LqD5CPc1vwx8MppPjuXf7.jpeg",
    testimonial:
      "As a developer, Green Fina's API and documentation are top-notch. I integrated their payment system into my startup's platform in just a few hours. Their developer support team is incredibly responsive!",
    rating: 5,
  },
  {
    id: 2,
    name: "Mahlatse",
    designation: "Business Owner",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mahlatse.jpg-AgyMoKXMPJrdI1QHRtPhdbw5uSqJPj.jpeg",
    testimonial:
      "Green Fina helped me secure funding for my restaurant when traditional banks turned me down. Their business loan application process was straightforward, and the AI recommendations were spot on!",
    rating: 5,
  },
  {
    id: 3,
    name: "Nhlamulo",
    designation: "General Worker",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nhlamulo.jpg-UShuqq7tBkvjYnu9E1Zu08EbmVFIxm.jpeg",
    testimonial:
      "The stokvela feature on Green Fina has transformed how our community saves money. It's transparent, easy to use, and has helped me save consistently for the first time in my life.",
    rating: 4,
  },
  {
    id: 4,
    name: "Clinton",
    designation: "Software Developer",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/clinton.jpg-13RhA44MwjMEpvMMjgWIj2aI2ZMri9.jpeg",
    testimonial:
      "Green Fina's student loan helped me complete my programming bootcamp. Their flexible repayment terms and low interest rates made it possible for me to focus on learning without financial stress.",
    rating: 5,
  },
]

export const AnimatedTooltipPreview = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-12">
      <div className="flex flex-row items-center justify-center mb-10 w-full">
        <AnimatedTooltip items={people} />
      </div>
    </div>
  )
}
