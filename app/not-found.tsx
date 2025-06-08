'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import Navigation from '../components/Navigation'
import BlobAnimation from '../components/BlobAnimation'

export default function NotFound() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push('/')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  const handleGoHome = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-black text-white relative flex items-center justify-center">
      {/* Global Blob Animation Background */}
      <BlobAnimation 
        opacity={0.3} 
        zIndex={1} 
        className="fixed inset-0 overflow-hidden pointer-events-none" 
        color="white" 
      />
      
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 404 Number */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-8xl lg:text-9xl font-extralight mb-8 text-transparent bg-gradient-to-b from-white to-gray-400/50 bg-clip-text"
          >
            404
          </motion.div>
          
          {/* Main Message */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl lg:text-5xl font-extralight mb-6"
          >
            Page Not Found
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-extralight leading-relaxed"
          >
            The page you're looking for doesn't exist or has been moved. 
            Don't worry, we'll take you back to safety.
          </motion.p>
          
          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-12 max-w-md mx-auto"
          >
            <div className="text-6xl font-extralight mb-4 text-white">
              {countdown}
            </div>
            <p className="text-gray-400 font-extralight">
              Redirecting to home page in {countdown} second{countdown !== 1 ? 's' : ''}...
            </p>
          </motion.div>
          
          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.button
              onClick={handleGoHome}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-200 transition-all inline-flex items-center justify-center"
            >
              <Home className="h-5 w-5 mr-2" />
              Go Home Now
            </motion.button>
            
            <motion.button
              onClick={() => window.history.back()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-white text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-white hover:text-black transition-all inline-flex items-center justify-center"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 