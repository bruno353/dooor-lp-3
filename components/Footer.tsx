'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Hackathon Info */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo.png" 
                alt="CrossFi Hackathon" 
                width={120} 
                height={40}
                className="h-6 w-auto"
              />
            </Link>
            <p className="text-gray-400 mb-4 mt-4">
              CrossFi Blockchain Hackathon - Building the future of decentralized education
            </p>
            <p className="text-sm text-gray-500">
              Total Prize Pool: $500,000 USD in MPX tokens
            </p>
          </div>

          {/* Hackathon Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wide">Hackathon</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#tracks" className="text-gray-400 hover:text-white transition-colors">
                  Tracks
                </Link>
              </li>
              <li>
                <Link href="#prizes" className="text-gray-400 hover:text-white transition-colors">
                  Prizes
                </Link>
              </li>
              <li>
                <Link href="#timeline" className="text-gray-400 hover:text-white transition-colors">
                  Timeline
                </Link>
              </li>
              <li>
                <Link href="#rules" className="text-gray-400 hover:text-white transition-colors">
                  Rules & Guidelines
                </Link>
              </li>
            </ul>
          </div>

          {/* CrossFi Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wide">CrossFi</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-gray-400 hover:text-white transition-colors">
                  About CrossFi
                </Link>
              </li>
              <li>
                <Link href="#ecosystem" className="text-gray-400 hover:text-white transition-colors">
                  CrossFi Universe
                </Link>
              </li>
              <li>
                <Link href="#technology" className="text-gray-400 hover:text-white transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="#community" className="text-gray-400 hover:text-white transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wide">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#discord" className="text-gray-400 hover:text-white transition-colors">
                  Discord Community
                </Link>
              </li>
              <li>
                <Link href="#resources" className="text-gray-400 hover:text-white transition-colors">
                  Developer Resources
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <span className="text-gray-400 text-sm">
              © 2025 CrossFi Blockchain Hackathon. All rights reserved.
            </span>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link href="#register" className="bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-200 transition-all">
              Register for Hackathon
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 