'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo.png" 
                alt="Dooor Logo" 
                width={120} 
                height={40}
                className="h-6 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-11 h-16">
              <div className="w-px bg-white/30 h-full"></div>
              <Link href="/partnerships" className="text-white hover:text-white px-6 py-2 rounded-md text-xs font-semibold uppercase tracking-wide flex items-center h-full">
                Partnerships
              </Link>
              <div className="w-px bg-white/30 h-full"></div>
              <Link href="/company" className="text-white hover:text-white px-6 py-2 rounded-md text-xs font-semibold uppercase tracking-wide flex items-center h-full">
                Company
              </Link>
              <div className="w-px bg-white/30 h-full"></div>
              <div className="relative group h-full flex items-center">
                <div className="text-white hover:text-white px-6 py-2 rounded-md text-xs font-semibold uppercase tracking-wide flex items-center h-full">
                  Product Suite
                </div>
                {/* <div className="absolute left-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="py-1">
                    <Link href="/products/ambient-ai" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white">
                      Ambient AI Documentation
                    </Link>
                    <Link href="/products/patient-engagement" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white">
                      Patient Engagement
                    </Link>
                    <Link href="/products/clinical-decision" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white">
                      Clinical Decision Support
                    </Link>
                    <Link href="/products/ehr-integration" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white">
                      EHR Integration
                    </Link>
                  </div>
                </div> */}
              </div>
              <div className="w-px bg-white/30 h-full"></div>
              <Link href="/contact" className="text-white hover:text-white px-6 py-2 rounded-md text-xs font-semibold uppercase tracking-wide flex items-center h-full">
                Contact
              </Link>
              <div className="w-px bg-white/30 h-full"></div>
            </div>
          </div>

          {/* CTA Button */}
          {/* <div className="hidden md:block">
            <Link href="/contact" className="btn-primary text-white px-6 py-2 rounded-full text-sm font-medium">
              Discover Our Solutions
            </Link>
          </div> */}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900">
            <Link href="/partnerships" className="text-white hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Partnerships
            </Link>
            <Link href="/company" className="text-white hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Company
            </Link>
            <Link href="/products" className="text-white hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Product Suite
            </Link>
            <Link href="/contact" className="text-white hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation 