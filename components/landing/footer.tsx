import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#020202] border-t border-white/5 text-white/70">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-12 h-12">
                <Image src="/images/logo.png" alt="Green Fina Logo" width={48} height={48} className="object-contain" />
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-green-400 mr-1 futuristic-text">Green</span>
                <span className="text-2xl font-bold text-green-400 futuristic-text">Fina</span>
              </div>
            </Link>
            <p className="text-sm text-white/50">
              Empowering your financial future with innovative solutions and personalized services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/50 hover:text-green-500 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-white/50 hover:text-green-500 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-white/50 hover:text-green-500 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm hover:text-green-500 transition-colors">
                  Personal Loans
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-green-500 transition-colors">
                  Student Loans
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-green-500 transition-colors">
                  Business Loans
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-green-500 transition-colors">
                  Stokvela Groups
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-green-500 transition-colors">
                  Financial Advisory
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm hover:text-green-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-green-500 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-green-500 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-green-500 transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-green-500 transition-colors">
                  Partners
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm hover:text-green-500 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-green-500 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-green-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-green-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:text-green-500 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 text-center text-sm text-white/40">
          <p>© {new Date().getFullYear()} Green Fina. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
