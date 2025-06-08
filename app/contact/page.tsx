'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Linkedin, Twitter } from 'lucide-react'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import BlobAnimation from '../../components/BlobAnimation'

export default function Contact() {
  const handleEmailContact = () => {
    window.location.href = 'mailto:thiago@dooor.ai?subject=Inquiry about Verifiable AI Solutions'
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Global Blob Animation Background */}
      <BlobAnimation 
        opacity={0.3} 
        zIndex={1} 
        className="fixed inset-0 overflow-hidden pointer-events-none" 
        color="white" 
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-20"
          >
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-extralight mb-6 md:mb-8 leading-tight">
              Discover <span className="text-gray-400">Verifiable AI</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-extralight">
              Ready to transform your organization with AI that's private, ownable, and auditable? 
              Let's explore how Dooor can become the foundation for your most ambitious goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-start">
            
            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 border border-white/10 h-full flex flex-col"
            >
              <h2 className="text-2xl md:text-3xl font-extralight mb-6 md:mb-8 text-white">Get in Touch</h2>
              <p className="text-gray-400 font-extralight mb-8 md:mb-12 leading-relaxed text-sm md:text-base">
                Ready to discuss how Verifiable AI can transform your organization? 
                Our team of AI architects and engineers is standing by to explore your unique challenges and co-develop the perfect solution.
              </p>
              
              {/* Contact Button */}
              <motion.button
                onClick={handleEmailContact}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl text-base md:text-lg font-medium hover:bg-gray-100 transition-all duration-300 flex items-center justify-center group"
              >
                <Mail className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3 group-hover:rotate-12 transition-transform duration-300" />
                Send us an Email
              </motion.button>
              
              <div className="mt-4 md:mt-6 text-center">
                <p className="text-xs md:text-sm text-gray-500 font-extralight">
                  This will open your email client to send a message to{' '}
                  <span className="text-gray-300">thiago@dooor.ai</span>
                </p>
              </div>

              {/* Additional Contact Info */}
              <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/10 flex-grow flex flex-col justify-end">
                <h3 className="text-base md:text-lg font-medium mb-4 md:mb-6 text-white">Prefer a different approach?</h3>
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center text-gray-400">
                    <Mail className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3 flex-shrink-0" />
                    <span className="font-extralight text-sm md:text-base break-all">thiago@dooor.ai</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Linkedin className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3 flex-shrink-0" />
                    <a 
                      href="https://linkedin.com/company/dooor" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-extralight hover:text-white transition-colors text-sm md:text-base break-all"
                    >
                      linkedin.com/company/dooor
                    </a>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Twitter className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3 flex-shrink-0" />
                    <a 
                      href="https://twitter.com/dooor_ai" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-extralight hover:text-white transition-colors text-sm md:text-base"
                    >
                      @dooor_ai
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Company Info Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6 md:space-y-8 lg:space-y-12"
            >
              {/* Headquarters */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/10">
                <div className="flex items-center mb-4 md:mb-6">
                  <MapPin className="h-5 w-5 md:h-6 md:w-6 text-white mr-2 md:mr-3 flex-shrink-0" />
                  <h3 className="text-lg md:text-xl font-medium text-white">Our Headquarters</h3>
                </div>
                <div className="space-y-1 md:space-y-2 font-extralight text-gray-300 text-sm md:text-base">
                  <p className="text-white font-medium">Dooor Labs, Inc.</p>
                  <p>1111b South Governors Ave</p>
                  <p>STE 29369</p>
                  <p>Dover, DE 19904 US</p>
                </div>
              </div>

              {/* Follow Journey */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/10">
                <h3 className="text-lg md:text-xl font-medium text-white mb-4 md:mb-6">Follow our Journey</h3>
                <div className="space-y-3 md:space-y-4">
                  <a 
                    href="https://linkedin.com/company/dooor" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-400 hover:text-white transition-colors group"
                  >
                    <Linkedin className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="font-extralight text-sm md:text-base break-all">linkedin.com/company/dooor</span>
                  </a>
                  <a 
                    href="https://twitter.com/dooor_ai" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-400 hover:text-white transition-colors group"
                  >
                    <Twitter className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="font-extralight text-sm md:text-base">@dooor_ai</span>
                  </a>
                </div>
              </div>

              {/* Mission Statement */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/20">
                <h3 className="text-lg md:text-xl font-medium text-white mb-3 md:mb-4">Our Mission</h3>
                <p className="text-gray-300 font-extralight leading-relaxed text-sm md:text-base">
                  We're building the infrastructure for a future where AI is not just powerful, 
                  but verifiable, private, and truly owned by the organizations that depend on it. 
                  Every partnership is a step toward that vision.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 md:py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight mb-4 md:mb-6">
              Ready to build the future of <span className="text-gray-400">AI together?</span>
            </h2>
            <p className="text-base md:text-lg text-gray-400 font-extralight mb-6 md:mb-8">
              Let's start the conversation about how Verifiable AI can transform your organization.
            </p>
            <motion.button
              onClick={handleEmailContact}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-6 md:px-8 py-2.5 md:py-3 rounded-full text-base md:text-lg font-medium hover:bg-gray-200 transition-all"
            >
              Start the Conversation
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 