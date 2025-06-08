'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo.png" 
                alt="Dooor Logo" 
                width={120} 
                height={40}
                className="h-6 w-auto"
              />
            </Link>
            <p className="text-gray-400 mb-4 mt-4">
              The OS for verifiable AI
            </p>
            <p className="text-sm text-gray-500">
              LGPD and GDPR compliant.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wide">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/partnerships" className="text-gray-400 hover:text-white transition-colors">
                  Partnerships
                </Link>
              </li>
              <li>
                <Link href="/company" className="text-gray-400 hover:text-white transition-colors">
                  Company
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>


          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wide">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/compliance" className="text-gray-400 hover:text-white transition-colors">
                  LGPD Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <span className="text-gray-400 text-sm">
              © 2025 Dooor. All rights reserved.
            </span>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link href="/contact" className="bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-200 transition-all">
              Let's get in touch
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 