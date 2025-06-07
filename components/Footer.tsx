'use client'

import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <Link href="/" className="text-white text-2xl font-bold mb-4 block">
              dooor
            </Link>
            <p className="text-gray-400 mb-4">
              Humanizing Healthcare with AI
            </p>
            <p className="text-sm text-gray-500">
              All solutions are LGPD-compliant.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wide">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-400 hover:text-white transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Suite */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wide">Product Suite</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products/ambient-ai" className="text-gray-400 hover:text-white transition-colors">
                  Ambient AI
                </Link>
              </li>
              <li>
                <Link href="/products/patient-engagement" className="text-gray-400 hover:text-white transition-colors">
                  Patient Engagement
                </Link>
              </li>
              <li>
                <Link href="/products/clinical-decision" className="text-gray-400 hover:text-white transition-colors">
                  Clinical Decision Support
                </Link>
              </li>
              <li>
                <Link href="/products/ehr-integration" className="text-gray-400 hover:text-white transition-colors">
                  EHR Integration
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wide">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy
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
            <Link href="/contact" className="btn-primary text-white px-6 py-2 rounded-full text-sm font-medium">
              Let's get in touch
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 