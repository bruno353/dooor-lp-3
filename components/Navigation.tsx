'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Heart, DollarSign, Scale, ArrowRight, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false)
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false)

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
              <div 
                className="relative h-full flex items-center"
                onMouseEnter={() => setIsSolutionsOpen(true)}
                onMouseLeave={() => setIsSolutionsOpen(false)}
              >
                <div className="text-white hover:text-white px-6 py-2 rounded-md text-xs font-semibold uppercase tracking-wide flex items-center h-full cursor-pointer">
                  Solutions
                </div>
                
                <AnimatePresence>
                  {isSolutionsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-16 left-0 transform  mt-2 w-96 bg-black/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
                    >
                      {/* Header */}
                      <div className="px-6 py-6 border-b border-white/10">
                        <h3 className="text-xl font-extralight text-white mb-2">Dooor Solutions</h3>
                        <p className="text-sm text-gray-400 font-extralight">Purpose-built AI for high-stakes industries</p>
                      </div>
                      
                      {/* Solutions Grid */}
                      <div className="p-6 space-y-4">
                        {/* Healthcare - Active */}
                        <Link href="/solutions/healthcare">
                          <motion.div
                            whileHover={{ x: 4 }}
                            className="group flex items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                          >
                            <div className="flex-grow">
                              <h4 className="text-white font-medium text-sm mb-1">Healthcare</h4>
                              <p className="text-gray-400 text-xs font-extralight">The OS for the Modern Health System</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                          </motion.div>
                        </Link>

                        {/* Financial - Disabled */}
                        <div className="group flex items-center p-4 rounded-xl bg-white/5 border border-white/5 opacity-100 cursor-not-allowed">
                          <div className="flex-grow">
                            <h4 className="text-gray-500 font-medium text-sm mb-1">Financial</h4>
                            <p className="text-gray-600 text-xs font-extralight">Coming Soon</p>
                          </div>
                          <div className="text-xs bg-gray-500/20 text-gray-500 px-2 py-1 rounded-full">
                            Soon
                          </div>
                        </div>

                        {/* Legal - Disabled */}
                        <div className="group flex items-center p-4 rounded-xl bg-white/5 border border-white/5 opacity-100 cursor-not-allowed">
                          <div className="flex-grow">
                            <h4 className="text-gray-500 font-medium text-sm mb-1">Legal</h4>
                            <p className="text-gray-600 text-xs font-extralight">Coming Soon</p>
                          </div>
                          <div className="text-xs bg-gray-500/20 text-gray-500 px-2 py-1 rounded-full">
                            Soon
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="w-px bg-white/30 h-full"></div>
              <Link href="/contact" className="text-white hover:text-white px-6 py-2 rounded-md text-xs font-semibold uppercase tracking-wide flex items-center h-full">
                Contact
              </Link>
              <div className="w-px bg-white/30 h-full"></div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-black/50 backdrop-blur-sm inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-white/10 focus:outline-none transition-all"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 top-16 bg-black z-40"
            style={{ backgroundColor: '#000000' }}
          >
            <div className="absolute inset-0 bg-black"></div>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="relative px-4 py-8 space-y-6 bg-black min-h-full"
            >
              {/* Mobile Menu Items */}
              <div className="space-y-4">
                {/* Partnerships */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link 
                    href="/partnerships" 
                    className="block text-white hover:text-gray-300 text-lg font-extralight uppercase tracking-wide py-3 px-4 rounded-lg hover:bg-white/5 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Partnerships
                  </Link>
                </motion.div>

                {/* Company */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link 
                    href="/company" 
                    className="block text-white hover:text-gray-300 text-lg font-extralight uppercase tracking-wide py-3 px-4 rounded-lg hover:bg-white/5 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Company
                  </Link>
                </motion.div>

                {/* Solutions with Dropdown */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <button
                    onClick={() => setIsMobileSolutionsOpen(!isMobileSolutionsOpen)}
                    className="w-full flex items-center justify-between text-white hover:text-gray-300 text-lg font-extralight uppercase tracking-wide py-3 px-4 rounded-lg hover:bg-white/5 transition-all"
                  >
                    Solutions
                    <ChevronDown className={`h-5 w-5 transition-transform ${isMobileSolutionsOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isMobileSolutionsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-4 space-y-3 py-3">
                          {/* Healthcare */}
                          <Link 
                            href="/solutions/healthcare"
                            className="block"
                            onClick={() => setIsOpen(false)}
                          >
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all">
                              <h4 className="text-white font-medium text-sm mb-1">Healthcare</h4>
                              <p className="text-gray-400 text-xs font-extralight">The OS for the Modern Health System</p>
                            </div>
                          </Link>

                          {/* Financial - Disabled */}
                          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/5 opacity-60">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-gray-500 font-medium text-sm mb-1">Financial</h4>
                                <p className="text-gray-600 text-xs font-extralight">Coming Soon</p>
                              </div>
                              <div className="text-xs bg-gray-500/20 text-gray-500 px-2 py-1 rounded-full">
                                Soon
                              </div>
                            </div>
                          </div>

                          {/* Legal - Disabled */}
                          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/5 opacity-60">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-gray-500 font-medium text-sm mb-1">Legal</h4>
                                <p className="text-gray-600 text-xs font-extralight">Coming Soon</p>
                              </div>
                              <div className="text-xs bg-gray-500/20 text-gray-500 px-2 py-1 rounded-full">
                                Soon
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Contact */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link 
                    href="/contact" 
                    className="block text-white hover:text-gray-300 text-lg font-extralight uppercase tracking-wide py-3 px-4 rounded-lg hover:bg-white/5 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>
                </motion.div>
              </div>

              {/* Mobile CTA Section */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="pt-8 border-t border-white/10"
              >
                <div className="space-y-4">
                  <Link 
                    href="/contact"
                    className="block w-full bg-white text-black text-center py-3 px-6 rounded-full font-medium hover:bg-gray-200 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </Link>
                  <Link 
                    href="/partnerships"
                    className="block w-full border border-white text-white text-center py-3 px-6 rounded-full font-medium hover:bg-white hover:text-black transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Learn More
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navigation 