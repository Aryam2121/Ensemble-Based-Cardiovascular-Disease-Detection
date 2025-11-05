"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">♥</span>
            </div>
            <span className="font-bold text-lg text-foreground">CVD Detection</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#" className="text-foreground hover:text-primary transition">
              Home
            </Link>
            <Link href="#" className="text-foreground hover:text-primary transition">
              Research
            </Link>
            <Link href="#" className="text-foreground hover:text-primary transition">
              About
            </Link>
            <Link href="#" className="text-foreground hover:text-primary transition">
              Contact
            </Link>
          </div>

          <Button variant="outline" size="sm" className="hidden md:inline-flex bg-transparent">
            Documentation
          </Button>
        </div>
      </div>
    </nav>
  )
}
