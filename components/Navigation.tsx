'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Heart, DollarSign, Scale, ArrowRight, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isTracksOpen, setIsTracksOpen] = useState(false)
  const [isMobileTracksOpen, setIsMobileTracksOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image 
                src="/crossfi-logo.png" 
                alt="CrossFi Hackathon" 
                width={360} 
                height={120}
                className="h-24 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-11 h-16">
              <div className="w-px bg-white/30 h-full"></div>
              <div 
                className="relative h-full flex items-center"
                onMouseEnter={() => setIsTracksOpen(true)}
                onMouseLeave={() => setIsTracksOpen(false)}
              >
                <div className="text-white hover:text-white/75 px-6 py-2 rounded-md text-xs font-semibold uppercase tracking-wide flex items-center h-full cursor-pointer">
                  Tracks
                </div>
                
                <AnimatePresence>
                  {isTracksOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-16 left-0 transform  mt-2 w-96 bg-black/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
                    >
                      {/* Header */}
                      <div className="px-6 py-6 border-b border-white/10">
                        <h3 className="text-xl font-extralight text-white mb-2">Hackathon Tracks</h3>
                        <p className="text-sm text-gray-400 font-extralight">Choose your development path</p>
                      </div>
                      
                      {/* Tracks Grid */}
                      <div className="p-6 space-y-4">
                        {/* AI & Decentralized Infrastructure */}
                        <Link href="#tracks">
                          <motion.div
                            whileHover={{ x: 4 }}
                            className="group flex items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                          >
                            <div className="flex-grow">
                              <h4 className="text-white font-medium text-sm mb-1">AI & Decentralized Infrastructure</h4>
                              <p className="text-gray-400 text-xs font-extralight">Build scalable AI solutions on blockchain</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                          </motion.div>
                        </Link>

                        {/* UI/UX SocialFi & EduTech */}
                        <Link href="#tracks">
                          <motion.div
                            whileHover={{ x: 4 }}
                            className="group flex items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                          >
                            <div className="flex-grow">
                              <h4 className="text-white font-medium text-sm mb-1">UI/UX SocialFi & EduTech</h4>
                              <p className="text-gray-400 text-xs font-extralight">Create engaging educational experiences</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                          </motion.div>
                        </Link>

                        {/* CrossChain Scalability */}
                        <Link href="#tracks">
                          <motion.div
                            whileHover={{ x: 4 }}
                            className="group flex items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                          >
                            <div className="flex-grow">
                              <h4 className="text-white font-medium text-sm mb-1">CrossChain Scalability</h4>
                              <p className="text-gray-400 text-xs font-extralight">Bridge ecosystems seamlessly</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                          </motion.div>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="w-px bg-white/30 h-full"></div>
              <Link href="#roadmap" className="text-white hover:text-white/75 px-6 py-2 rounded-md text-xs font-semibold uppercase tracking-wide flex items-center h-full">
                Roadmap
              </Link>
              <div className="w-px bg-white/30 h-full"></div>
              <Link href="#prizes" className="text-white hover:text-white/75 px-6 py-2 rounded-md text-xs font-semibold uppercase tracking-wide flex items-center h-full">
                Prizes
              </Link>
              <div className="w-px bg-white/30 h-full"></div>
              <Link href="https://xfi.foundation/hackathon" className="text-white hover:text-white/75 px-6 py-2 rounded-md text-xs font-semibold uppercase tracking-wide flex items-center h-full">
                About CrossFi
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
                {/* Tracks with Dropdown */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                >
                  <button
                    onClick={() => setIsMobileTracksOpen(!isMobileTracksOpen)}
                    className="w-full flex items-center justify-between text-white hover:text-gray-300 text-lg font-extralight uppercase tracking-wide py-3 px-4 rounded-lg hover:bg-white/5 transition-all"
                  >
                    Tracks
                    <ChevronDown className={`h-5 w-5 transition-transform ${isMobileTracksOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isMobileTracksOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="pl-6 space-y-2 overflow-hidden"
                      >
                        <Link 
                          href="#tracks" 
                          className="block text-gray-300 hover:text-white py-2 px-4 rounded-lg hover:bg-white/5 transition-all"
                          onClick={() => setIsOpen(false)}
                        >
                          AI & Decentralized Infrastructure
                        </Link>
                        <Link 
                          href="#tracks" 
                          className="block text-gray-300 hover:text-white py-2 px-4 rounded-lg hover:bg-white/5 transition-all"
                          onClick={() => setIsOpen(false)}
                        >
                          UI/UX SocialFi & EduTech
                        </Link>
                        <Link 
                          href="#tracks" 
                          className="block text-gray-300 hover:text-white py-2 px-4 rounded-lg hover:bg-white/5 transition-all"
                          onClick={() => setIsOpen(false)}
                        >
                          CrossChain Scalability
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Roadmap */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link 
                    href="#roadmap" 
                    className="block text-white hover:text-gray-300 text-lg font-extralight uppercase tracking-wide py-3 px-4 rounded-lg hover:bg-white/5 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Roadmap
                  </Link>
                </motion.div>

                {/* Prizes */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link 
                    href="#prizes" 
                    className="block text-white hover:text-gray-300 text-lg font-extralight uppercase tracking-wide py-3 px-4 rounded-lg hover:bg-white/5 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Prizes
                  </Link>
                </motion.div>

                {/* Timeline */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link 
                    href="#timeline" 
                    className="block text-white hover:text-gray-300 text-lg font-extralight uppercase tracking-wide py-3 px-4 rounded-lg hover:bg-white/5 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Timeline
                  </Link>
                </motion.div>

                {/* About CrossFi */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link 
                    href="#about" 
                    className="block text-white hover:text-gray-300 text-lg font-extralight uppercase tracking-wide py-3 px-4 rounded-lg hover:bg-white/5 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    About CrossFi
                  </Link>
                </motion.div>
              </div>

              {/* CTA Section */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="pt-8 border-t border-white/10"
              >
                <Link 
                  href="#register" 
                  className="block w-full bg-white text-black text-center py-4 px-6 rounded-full font-medium hover:bg-gray-200 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Register Now
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navigation 