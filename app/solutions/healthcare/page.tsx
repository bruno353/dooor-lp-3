'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Shield, Clock, Users, CheckCircle, ArrowRight, ChevronDown, Stethoscope, FileText, Database, Lock, Heart, Activity } from 'lucide-react'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'
import BlobAnimation from '../../../components/BlobAnimation'

export default function HealthcarePage() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Video rotation state
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isSwitchingRef = useRef(false)
  const videoTimerRef = useRef<NodeJS.Timeout | null>(null)

  const videos = [
    '/doctor.mp4',
    '/doctor2.mp4',
    '/40353-425442466_small.mp4'
  ]

  // Handle video end and rotation
  const handleVideoEnd = () => {
    if (!isSwitchingRef.current) {
      isSwitchingRef.current = true
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length)
    }
  }

  // Start 5-second timer for video rotation
  const startVideoTimer = () => {
    // Clear any existing timer
    if (videoTimerRef.current) {
      clearTimeout(videoTimerRef.current)
    }
    
    // Set new 5-second timer
    videoTimerRef.current = setTimeout(() => {
      handleVideoEnd()
    }, 5000) // 5 seconds
  }

  // Reset video when index changes
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current
      video.currentTime = 0 // Reset to beginning
      video.load()
      
      // Add a small delay to ensure video is loaded
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch((error) => {
            console.log('Autoplay prevented:', error)
          })
        }
        // Reset switching flag and start 5-second timer
        isSwitchingRef.current = false
        startVideoTimer()
      }, 100)
      
      return () => {
        clearTimeout(timer)
        // Clean up video timer when component unmounts or video changes
        if (videoTimerRef.current) {
          clearTimeout(videoTimerRef.current)
        }
      }
    }
  }, [currentVideoIndex])

  // Initial video setup
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      // Ensure video is ready to play
      video.addEventListener('loadeddata', () => {
        video.play().catch(() => {
          // Handle autoplay restrictions
        })
      })
    }
  }, [])

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (videoTimerRef.current) {
        clearTimeout(videoTimerRef.current)
      }
    }
  }, [])

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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute opacity-60 inset-0" style={{ zIndex: 2 }}>
          <video
            ref={videoRef}
            src={videos[currentVideoIndex]}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover grayscale"
            onEnded={handleVideoEnd}
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        <motion.div 
          style={{ y, opacity, zIndex: 10 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8">
              <Stethoscope className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Healthcare Solutions</span>
            </div>
            
            <h1 className="text-5xl lg:text-8xl font-inter font-extralight mb-8 leading-tight">
              The OS for the {' '}
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Modern Health System
              </span>
            </h1>
            
            <p className="text-xl font-extralight lg:text-xl text-gray-300 mb-12 max-w-5xl mx-auto leading-relaxed">
              The future of healthcare requires a new foundation. One that empowers clinicians, secures the enterprise, and accelerates innovation—all at the same time. The Dooor Healthcare OS is a unified platform built on Verifiable AI, designed to solve the most fundamental challenges facing visionary health systems today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 font-inter">
              <motion.button
                className="bg-white text-black px-6 py-2 rounded-full text-base flex items-center justify-center hover:bg-gray-200 transition-all"
              >
                Schedule Demo
              </motion.button>
              <motion.button
                className="border border-white text-white px-6 py-2 rounded-full text-base hover:bg-white hover:text-black transition-all"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className="h-8 w-8 text-white/60" />
          </motion.div>
        </motion.div>
      </section>

      {/* The Mandate Section */}
      <section className="py-24 bg-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-6xl font-extralight mb-8">
              The Mandate for Modern Healthcare: <span className="text-gray-400">Efficiency & Empathy</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto font-extralight leading-relaxed">
              Leading health systems operate under immense pressure. You must simultaneously push the boundaries of clinical excellence while managing extreme operational complexity. The core friction points are clear:
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                alt="Healthcare professional"
                className="w-full rounded-2xl grayscale"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="flex items-center mb-4">
                  <Clock className="h-6 w-6 text-white mr-3" />
                  <h3 className="text-xl font-medium text-white">Physician Burnout</h3>
                </div>
                <p className="text-gray-400 font-extralight leading-relaxed">
                  Administrative overload is stealing valuable time and focus from patient care.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="flex items-center mb-4">
                  <Shield className="h-6 w-6 text-white mr-3" />
                  <h3 className="text-xl font-medium text-white">System-wide Risk</h3>
                </div>
                <p className="text-gray-400 font-extralight leading-relaxed">
                  The gap between clinical actions and financial processes creates vulnerabilities to fraud, error, and inefficiency.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="flex items-center mb-4">
                  <Database className="h-6 w-6 text-white mr-3" />
                  <h3 className="text-xl font-medium text-white">The Innovation Barrier</h3>
                </div>
                <p className="text-gray-400 font-extralight leading-relaxed">
                  The promise of data-driven medicine is often blocked by the risks of sharing and analyzing sensitive patient information.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 max-w-4xl mx-auto">
              <p className="text-xl font-extralight text-gray-300 leading-relaxed">
                Our platform is <strong className="text-white font-medium">engineered to solve these problems from the ground up.</strong>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Unified Platform Section */}
      <section className="py-24 bg-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-6xl font-extralight mb-8">
              A Unified Platform for a <span className="text-gray-400">Connected Health System</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto font-extralight leading-relaxed">
              We partner with healthcare leaders to deploy a suite of powerful capabilities on our core Verifiable AI platform. Our partnership begins by solving your most immediate needs with our foundational solutions, <strong className="text-white">Kenna</strong> and <strong className="text-white">Veris</strong>.
            </p>
          </motion.div>

          {/* Foundational Solutions */}
          <div className="grid lg:grid-cols-2 gap-12 mb-24">
            {/* Kenna */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 relative overflow-hidden group flex flex-col h-full"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                <h3 className="text-3xl lg:text-4xl font-medium text-white mb-2 md:mb-0">Kenna™</h3>
                {/* Tag positioned below title on mobile, top-right on desktop */}
                <div className="bg-blue-500/20 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 self-start md:self-auto">
                  <span className="text-xs font-extralight text-gray-300">AI Scribe & Clinical Assistant</span>
                </div>
              </div>
              
              <div className="mb-8">
                <p className="text-lg font-extralight text-gray-300 leading-relaxed mb-6">
                  <strong className="text-white">Kenna</strong> restores the human connection in healthcare. It is our ambient AI solution designed to understand the nuanced doctor-patient conversation, instantly liberating physicians from administrative work.
                </p>
              </div>

              <div className="space-y-6 flex-grow">
                <div>
                  <h4 className="text-white font-medium mb-2">Solves:</h4>
                  <p className="text-gray-400 font-extralight">The critical problem of physician burnout.</p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Function:</h4>
                  <p className="text-gray-400 font-extralight">Automatically generates structured, CFM-compliant clinical notes in real-time.</p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Outcome:</h4>
                  <p className="text-gray-400 font-extralight">Gives hours back to physicians, enhances the quality of patient interaction, and creates a pristine, verifiable record at the point of care.</p>
                </div>
              </div>

              <div className="mt-8">
                <img 
                  src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2006&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="AI Clinical Assistant"
                  className="w-full h-48 object-cover rounded-2xl grayscale"
                />
              </div>
            </motion.div>

            {/* Veris */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 relative overflow-hidden group flex flex-col h-full"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                <h3 className="text-3xl lg:text-4xl font-medium text-white mb-2 md:mb-0">Veris™</h3>
                {/* Tag positioned below title on mobile, top-right on desktop */}
                <div className="bg-green-500/20 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 self-start md:self-auto">
                  <span className="text-xs font-extralight text-gray-300">Verifiable Claims & Integrity Engine</span>
                </div>
              </div>
              
              <div className="mb-8">
                <p className="text-lg font-extralight text-gray-300 leading-relaxed mb-6">
                  <strong className="text-white">Veris</strong> secures the financial and administrative backbone of your health system. It acts as a system-level integrity engine, using the trusted data captured by Kenna to create a single, immutable source of truth.
                </p>
              </div>

              <div className="space-y-6 flex-grow">
                <div>
                  <h4 className="text-white font-medium mb-2">Solves:</h4>
                  <p className="text-gray-400 font-extralight">Provider-payer friction, revenue cycle delays, and fraud risk.</p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Function:</h4>
                  <p className="text-gray-400 font-extralight">Verifies clinical documentation and automates claims processes with cryptographic proof.</p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Outcome:</h4>
                  <p className="text-gray-400 font-extralight">Accelerates revenue cycles, drastically reduces claim denials, and creates a fraud-resistant synergy between clinical and financial operations.</p>
                </div>
              </div>

              <div className="mt-8">
                <img 
                  src="https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                  alt="Claims Verification System"
                  className="w-full h-48 object-cover rounded-2xl grayscale"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Beyond the Foundation Section */}
      <section className="py-24 bg-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-6xl font-extralight mb-8">
              Beyond the Foundation: <span className="text-gray-400">Co-Developing the Future</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto font-extralight leading-relaxed">
              A successful partnership unlocks the full potential of the Dooor OS. The trusted data ecosystem created by Kenna and Veris becomes the foundation for the next generation of healthcare capabilities, which we will co-develop with visionary partners like you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 text-center"
            >
              <Users className="h-12 w-12 text-white mx-auto mb-6" />
              <h3 className="text-xl font-medium text-white mb-4">Patient Data Sovereignty (Guardian™)</h3>
              <p className="text-gray-400 font-extralight leading-relaxed">
                Empower patients with cryptographic ownership of their verifiable medical records, enabling a new era of patient-managed consent for research and care coordination.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 text-center"
            >
              <Activity className="h-12 w-12 text-white mx-auto mb-6" />
              <h3 className="text-xl font-medium text-white mb-4">Privacy-Preserving Analytics (Augur™)</h3>
              <p className="text-gray-400 font-extralight leading-relaxed">
                Deploy powerful operational and clinical analytics across your entire network without ever exposing or pooling raw patient data, unlocking predictive insights with unparalleled security.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 text-center"
            >
              <FileText className="h-12 w-12 text-white mx-auto mb-6" />
              <h3 className="text-xl font-medium text-white mb-4">Gold-Standard Clinical Trials (Arbiter™)</h3>
              <p className="text-gray-400 font-extralight leading-relaxed">
                Create a new standard for data integrity in medical research. Manage clinical trials with a fully verifiable, immutable audit trail for every single event, from patient consent to final analysis.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Healthcare Standards Section */}
      <section className="py-24 bg-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-6xl font-extralight mb-8">
              Engineered for Healthcare's <span className="text-gray-400">Highest Standards</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto font-extralight leading-relaxed">
              Every solution in our suite runs on the core Dooor OS, delivering unique advantages that generic AI cannot match.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Healthcare compliance"
                className="w-full rounded-2xl grayscale"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-6 font-extralight">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-white mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium mb-2">LGPD & HIPAA Compliant by Design</h4>
                    <p className="text-gray-400 font-extralight">
                      Our "privacy-first" architecture is built to exceed the requirements of Brazil's LGPD and international standards.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-white mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium mb-2">Verifiable Audit Trails</h4>
                    <p className="text-gray-400 font-extralight">
                      Create an immutable log for every action, simplifying compliance with CFM regulations and satisfying the most rigorous audits.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-white mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium mb-2">EHR-Native Experience</h4>
                    <p className="text-gray-400 font-extralight">
                      Our solutions are designed to integrate seamlessly into existing clinical workflows, augmenting your current investments.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-6xl font-extralight mb-8">
              Let's Build the Future of <span className="text-gray-400">Brazilian Healthcare. Together.</span>
            </h2>
            <p className="text-xl font-extralight text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Our co-development model is designed for visionary leaders ready to build a lasting strategic advantage. Let's discuss how a pilot program featuring <strong className="text-white">Kenna</strong> and <strong className="text-white">Veris</strong> can serve as the first step in transforming your health system.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-200 transition-all"
              >
                Schedule a Demo
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-white text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-white hover:text-black transition-all"
              >
                Contact Sales
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 