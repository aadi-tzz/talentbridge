"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-palette-gold bg-palette-mutedBrown text-palette-gold">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-palette-gold">
            <img src="/logo.png" alt="Talent Bridge Logo" className="h-10 w-10 object-contain" />
            Talent Bridge
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {[
            { href: "/", label: "Home" },
            { href: "/jobs", label: "Find Jobs" },
            { href: "/post-job", label: "Post a Job" },
            { href: "/about", label: "About Us" },
            { href: "/contact", label: "Contact" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium transition-colors hover:text-palette-tan"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Admin Button */}
        <div className="hidden md:flex gap-2 items-center">
          <Link href="/login">
            <Button
              variant="outline"
              size="sm"
              className="border-palette-gold bg-palette-gold text-black"
            >
              Admin Login
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-black"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="container md:hidden bg-palette-mutedBrown text-palette-gold border-t border-palette-gold">
          <nav className="flex flex-col gap-4 pb-6 pt-4">
            {[
              { href: "/", label: "Home" },
              { href: "/jobs", label: "Find Jobs" },
              { href: "/post-job", label: "Post a Job" },
              { href: "/about", label: "About Us" },
              { href: "/contact", label: "Contact" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium transition-colors hover:text-palette-tan"
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2">
              <Link href="/login" onClick={() => setIsMenuOpen(false)} className="w-full">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-palette-gold bg-palette-gold text-black"
                >
                  Admin Login
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
