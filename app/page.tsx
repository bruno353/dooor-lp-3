'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Brain, Shield, Zap, Database, Users, FileText, Activity, Lock, ArrowRight, Play, ChevronDown, Stethoscope, Heart, CheckCircle, Globe, Clock, Star } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import AnimatedGrid from '../components/AnimatedGrid'
import BlobAnimation from '../components/BlobAnimation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  // Carousel references for GSAP
  const carouselSectionRef = useRef<HTMLElement>(null)
  const carouselContainerRef = useRef<HTMLDivElement>(null)
  const carouselTrackerRef = useRef<HTMLDivElement>(null)

  // Video rotation state
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isSwitchingRef = useRef(false)
  const videoTimerRef = useRef<NodeJS.Timeout | null>(null)

  const videos = [
    '/40353-425442466_small.mp4',
    '/40053-424371550_small.mp4',
    '/49815-458438877_small.mp4'
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
            // Fallback: try to play on user interaction
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

  useEffect(() => {
    const carouselSection = carouselSectionRef.current
    const carouselContainer = carouselContainerRef.current
    const carouselTracker = carouselTrackerRef.current
    
    if (!carouselSection || !carouselContainer || !carouselTracker) return

    // Get carousel width for animation distance
    const getScrollDistance = () => {
      const containerWidth = carouselTracker.scrollWidth
      const viewportWidth = carouselContainer.offsetWidth
      return -(containerWidth - viewportWidth)
    }

    // Create ScrollTrigger animation
    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: carouselSection,
      pin: true,
      scrub: 1,
      start: "top top",
      end: () => `+=${Math.abs(getScrollDistance()) * 2}`, // Extend duration
      animation: gsap.to(carouselTracker, {
        x: getScrollDistance,
        ease: "none"
      }),
      invalidateOnRefresh: true
    })

    // Refresh ScrollTrigger on window resize
    const handleResize = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      scrollTriggerInstance.kill()
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
              <span className="text-sm font-medium">Transforming Industries with AI</span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-inter font-extralight mb-8 leading-tight">
              The OS for {' '}
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Verifiable AI
              </span>
            </h1>
            
            <p className="text-xl font-extralight lg:text-xl text-gray-300 mb-12 max-w-4xl mx-auto">
             The platform for enterprises to build and deploy Private, Ownable, and Auditable AI solutions.
             We build software and AI experiences that simplify provider, administrator, and user workflows.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 font-inter">
              <motion.button
                className="bg-white text-black px-6 py-2 rounded-full text-base  flex items-center justify-center hover:bg-gray-200 transition-all"
              >
                Let's Talk
              </motion.button>
              <motion.button
                className="border border-white text-white px-6 py-2 rounded-full text-base  hover:bg-white hover:text-black transition-all"
              >
                Explore
              </motion.button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-center"
              >
                <div className="text-4xl font-normal mb-2">90%+</div>
                <div className="text-gray-400 font-extralight">Documentation Accuracy</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-center"
              >
                <div className="text-4xl font-normal mb-2">2-3h</div>
                <div className="text-gray-400 font-extralight">Time Saved Daily</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="text-center"
              >
                <div className="text-4xl font-normal mb-2">48h</div>
                <div className="text-gray-400 font-extralight">Implementation Time</div>
              </motion.div>
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

      {/* Trust Section */}
      <section className="py-20 bg-white text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm uppercase tracking-wide text-gray-600 mb-4">Trusted by leading institutions</p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
              <div className="text-2xl font-bold">Internet Computer Protocol</div>
              <div className="text-2xl font-bold">Akash Network</div>
              <div className="text-2xl font-bold">Farmaleaf</div>
              <div className="text-2xl font-bold">Carbify</div>
              <div className="text-2xl font-bold">Colb Finance</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problems We Solve */}
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
              Using AI should not be this <span className="text-gray-400">complicated</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-extralight">
              The race to deploy AI is on, but for regulated industries, the most powerful models introduce unacceptable risks. The core challenge is clear.
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
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Doctor with paperwork"
                className="w-full rounded-2xl grayscale"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-extralight mb-6">The Privacy Burden</h3>
              <p className="text-lg text-gray-300 mb-8 font-extralight">
                How do you harness the power of AI without ceding control over your data, your security, and your reputation?
              </p>
              <div className="space-y-4 font-extralight">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-white mr-3" />
                  <span>Data is your asset</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-white mr-3" />
                  <span>Ownable & Verifiable</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-white mr-3" />
                  <span>LGPD & GDPR compliant by design</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Risk Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300"
              >
                <h4 className="text-xl font-medium mb-4 text-white">"Black Box" Risk</h4>
                <p className="text-gray-400 font-extralight leading-relaxed">
                  Opaque AI models offer no way to prove the integrity of their outputs, creating massive operational and compliance vulnerabilities.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300"
              >
                <h4 className="text-xl font-medium mb-4 text-white">Data Sovereignty Leaks</h4>
                <p className="text-gray-400 font-extralight leading-relaxed">
                  Centralized AI solutions often require sending your most sensitive data to third-party clouds, creating critical security risks and single points of failure.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300"
              >
                <h4 className="text-xl font-medium mb-4 text-white">The Auditability Gap</h4>
                <p className="text-gray-400 font-extralight leading-relaxed">
                  Without a tamper-proof record of every AI decision, demonstrating compliance and tracing errors becomes a near-impossible task.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Solution Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-24 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto mb-16 mt-52"
            >
              <h2 className="text-4xl lg:text-8xl font-extralight mb-8 text-transparent bg-gradient-to-b from-gray-100 to-gray-400/50 bg-clip-text">
                From "Black Box" to <span className="">Verifiable AI</span>
              </h2>
              <div className="text-left bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-12">
                <p className="text-xl text-gray-300 font-extralight leading-relaxed">
                  Dooor is the solution to the enterprise <strong className="text-white font-medium">AI dilemma</strong>. Our platform provides the essential infrastructure to build, deploy, and manage AI agents that are secure, compliant, and transparent by default.
                </p>
              </div>
              
              <h3 className="text-2xl lg:text-3xl font-extralight mb-12 text-center">
                We deliver <strong className="text-white font-medium">Verifiable AI</strong> through three integrated pillars:
              </h3>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8 text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="border border-white/10 rounded-2xl p-8 transition-all duration-300 relative overflow-hidden group cursor-pointer"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                }}
                style={{
                  background: `radial-gradient(200px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 70%)`
                }}
              >
                {/* Mouse follower spotlight */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(150px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.1), transparent 60%)`
                  }}
                ></div>
                
                <div className="relative z-10">
                  <div className="text-3xl font-extralight mb-6 text-white">1.</div>
                  <h4 className="text-xl font-medium mb-4 text-white">Verifiable</h4>
                  <p className="text-gray-400 font-extralight leading-relaxed">
                    Use Zero-Knowledge Proofs to mathematically prove the integrity of any AI-generated result without exposing the sensitive source data. Trust is no longer a belief; it's a mathematical certainty.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="border border-white/10 rounded-2xl p-8 transition-all duration-300 relative overflow-hidden group cursor-pointer"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                }}
                style={{
                  background: `radial-gradient(200px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 70%)`
                }}
              >
                {/* Mouse follower spotlight */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(150px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.1), transparent 60%)`
                  }}
                ></div>
                
                <div className="relative z-10">
                  <div className="text-3xl font-extralight mb-6 text-white">2.</div>
                  <h4 className="text-xl font-medium mb-4 text-white">Private & Ownable</h4>
                  <p className="text-gray-400 font-extralight leading-relaxed">
                    Maintain absolute sovereignty. With our decentralized architecture and self-hosted deployment options, your data and your AI models stay within your environment, under your control. Always.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="border border-white/10 rounded-2xl p-8 transition-all duration-300 relative overflow-hidden group cursor-pointer"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                }}
                style={{
                  background: `radial-gradient(200px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 70%)`
                }}
              >
                {/* Mouse follower spotlight */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(150px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.1), transparent 60%)`
                  }}
                ></div>
                
                <div className="relative z-10">
                  <div className="text-3xl font-extralight mb-6 text-white">3.</div>
                  <h4 className="text-xl font-medium mb-4 text-white">Auditable</h4>
                  <p className="text-gray-400 font-extralight leading-relaxed">
                    Leverage immutable, blockchain-anchored logs to create a tamper-proof, time-stamped record of every AI action and data interaction, turning compliance from a challenge into a feature.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 !pt-0 bg-black text-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-8xl font-extralight mb-8">
              <span className="text-transparent bg-gradient-to-b from-gray-100 to-gray-400/20 bg-clip-text">Our Tech Stack</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-extralight">
              Built with cutting-edge technology and enterprise-grade infrastructure designed for healthcare excellence.
            </p>
          </motion.div>

          {/* Clean 4x4 Square Grid Layout */}
          <div className="grid grid-cols-4 grid-rows-4 gap-6 aspect-square w-full max-w-4xl mx-auto">
            
            {/* AI Core Engine - Large Card (2x2) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="col-span-2 row-span-2 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20 relative overflow-hidden group"
            >
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.0.3')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="absolute inset-0 bg-black/85 rounded-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10 h-full flex flex-col">
                <h3 className="text-3xl font-extralight mb-4 text-white">AI Core Engine</h3>
                <p className="text-gray-200 text-base font-extralight mb-6 flex-grow">
                  Advanced neural networks with multi-language processing for medical documentation.
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Model Accuracy</span>
                    <span className="text-white font-medium">94.7%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Processing Speed</span>
                    <span className="text-white font-medium">&lt; 200ms</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* TEE Security - Tall Card (1x2) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="col-span-1 row-span-2 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 relative overflow-hidden group"
            >
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="absolute inset-0 bg-black/85 rounded-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10 h-full flex flex-col">
                <h3 className="text-xl font-extralight mb-4 text-white">TEE Security</h3>
                <p className="text-gray-200 text-sm font-extralight mb-6 flex-grow">
                  Hardware-level isolation for sensitive healthcare data processing.
                </p>
                <div className="space-y-2 text-xs">
                  <div className="text-gray-300">• End-to-end encryption</div>
                  <div className="text-gray-300">• LGPD compliant</div>
                  <div className="text-gray-300">• Zero-knowledge</div>
                </div>
              </div>
            </motion.div>

            {/* Cloud Native - Small Card (1x1) */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="col-span-1 row-span-1 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/20 relative overflow-hidden group"
            >
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="absolute inset-0 bg-black/85 rounded-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10 h-full flex flex-col justify-center text-center">
                <h3 className="text-lg font-extralight text-white mb-2">Cloud Native</h3>
                <p className="text-gray-200 text-xs font-extralight">Kubernetes & Auto-scaling</p>
              </div>
            </motion.div>

            {/* Vector Database - Small Card (1x1) */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="col-span-1 row-span-1 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/20 relative overflow-hidden group"
            >
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2134&auto=format&fit=crop&ixlib=rb-4.0.3')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="absolute inset-0 bg-black/85 rounded-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10 h-full flex flex-col justify-center text-center">
                <h3 className="text-lg font-extralight text-white mb-2">Vector DB</h3>
                <p className="text-gray-200 text-xs font-extralight">&lt; 50ms search</p>
              </div>
            </motion.div>

            {/* API Gateway - Wide Card (2x1) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.01 }}
              className="col-span-2 row-span-1 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 relative overflow-hidden group"
            >
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="absolute inset-0 bg-black/85 rounded-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10 flex items-center justify-between h-full">
                <div>
                  <h3 className="text-xl font-extralight text-white mb-2">API Gateway</h3>
                  <p className="text-gray-200 text-sm font-extralight">RESTful, GraphQL & WebSocket endpoints</p>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium text-sm">Rate Limited</div>
                  <div className="text-gray-300 text-xs">Auto Throttling</div>
                </div>
              </div>
            </motion.div>

            {/* Observability - Wide Card (2x1) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.01 }}
              className="col-span-2 row-span-1 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 relative overflow-hidden group"
            >
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="absolute inset-0 bg-black/85 rounded-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10 flex items-center justify-between h-full">
                <div>
                  <h3 className="text-xl font-extralight text-white mb-2">Observability</h3>
                  <p className="text-gray-200 text-sm font-extralight">24/7 monitoring with real-time alerts</p>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium text-sm">99.9% Uptime</div>
                  <div className="text-gray-300 text-xs">Real-time Metrics</div>
                </div>
              </div>
            </motion.div>

            {/* EHR Integration - Large Card (2x2) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.01 }}
              className="col-span-2 row-span-1 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 relative overflow-hidden group"
            >
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="absolute inset-0 bg-black/85 rounded-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10 flex items-center justify-between h-full">
                <div>
                  <h3 className="text-xl font-extralight text-white mb-2">EHR Integration</h3>
                  <p className="text-gray-200 text-sm font-extralight">Integrate with your existing EHR system</p>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium text-sm">99.9% Uptime</div>
                  <div className="text-gray-300 text-xs">Real-time Metrics</div>
                </div>
              </div>
            </motion.div>

            {/* ML Pipeline - Small Card (1x1) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="col-span-1 row-span-1 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/20 relative overflow-hidden group"
            >
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="absolute inset-0 bg-black/85 rounded-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10 h-full flex flex-col justify-center text-center">
                <h3 className="text-lg font-extralight text-white mb-2">ML Pipeline</h3>
                <p className="text-gray-200 text-xs font-extralight">Real-time inference</p>
              </div>
            </motion.div>

            {/* DevOps - Small Card (1x1) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="col-span-1 row-span-1 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/20 relative overflow-hidden group"
            >
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.0.3')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="absolute inset-0 bg-black/85 rounded-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10 h-full flex flex-col justify-center text-center">
                <h3 className="text-lg font-extralight text-white mb-2">DevOps</h3>
                <p className="text-gray-200 text-xs font-extralight">CI/CD Pipeline</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Product Showcase Carousel */}
      <section 
        ref={carouselSectionRef}
        className="relative bg-black py-24"
      >
        <div className="w-full h-screen flex flex-col overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <h2 className="text-5xl lg:text-6xl font-extralight mb-8">
              Discover our <span className="text-gray-400">product ecosystem</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-extralight">
              Explore our suite of healthcare applications designed to revolutionize medical workflows, 
              from AI-powered documentation to intelligent patient engagement platforms.
            </p>
          </motion.div>

          {/* Full Width Horizontal Scrolling Carousel */}
          <div 
            ref={carouselContainerRef}
            className="relative w-full flex-1 overflow-hidden"
          >
            <div 
              ref={carouselTrackerRef}
              className="flex space-x-8 h-full items-center pl-40 pr-8"
            >
              {/* Products with improved layout */}
              {/* <motion.div 
                className="flex-shrink-0  rounded-3xl p-12 border border-white/10 w-[55vw]"
                // whileHover={{ y: -10 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
                  <div className="order-2 lg:order-1">
                    <div className="bg-white/20 text-white px-6 py-3 rounded-full text-base font-medium inline-block mb-8">
                      TELEMEDICINE
                    </div>
                    <h3 className="text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">Dooor Telehealth Platform</h3>
                    <p className="text-gray-300 text-xl leading-relaxed mb-8">
                      Secure video consultations with integrated AI documentation and real-time patient monitoring capabilities. 
                      Experience the future of remote healthcare with our comprehensive telemedicine solution.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="h-6 w-6 text-white mr-4" />
                        <span className="text-lg">End-to-end encrypted video calls</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="h-6 w-6 text-white mr-4" />
                        <span className="text-lg">Real-time AI documentation</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="h-6 w-6 text-white mr-4" />
                        <span className="text-lg">Integrated patient monitoring</span>
                      </div>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <img 
                      src="https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                      alt="Telemedicine App Interface"
                      className="w-full h-80 lg:h-96 object-cover rounded-3xl grayscale"
                    />
                  </div>
                </div>
              </motion.div> */}

              <motion.div 
                className="flex-shrink-0  rounded-3xl p-12 w-[55vw]"
                // whileHover={{ y: -10 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
                  <div className="order-2 lg:order-1">
                    <div className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-extralight inline-block mb-8">
                      ANALYTICS
                    </div>
                    <h3 className="text-4xl lg:text-5xl font-extralight mb-6 text-white leading-tight">Clinical Analytics Dashboard</h3>
                    <p className="text-gray-300 text-xl leading-relaxed mb-8 font-extralight">
                      Real-time insights and predictive analytics for better clinical decision-making and operational efficiency.
                      Transform your healthcare data into actionable intelligence.
                    </p>
                    <div className="space-y-4 font-extralight">
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="h-6 w-6 text-white mr-4" />
                        <span className="text-lg">Real-time performance metrics</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="h-6 w-6 text-white mr-4" />
                        <span className="text-lg">Predictive patient analytics</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="h-6 w-6 text-white mr-4" />
                        <span className="text-lg">Operational efficiency insights</span>
                      </div>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <img 
                      src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Clinical Dashboard Interface"
                      className="w-full h-80 lg:h-96 object-cover rounded-3xl grayscale"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="flex-shrink-0  rounded-3xl p-12 w-[55vw]"
                // whileHover={{ y: -10 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
                  <div className="order-2 lg:order-1">
                    <div className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-extralight inline-block mb-8">
                      MOBILE
                    </div>
                    <h3 className="text-4xl lg:text-5xl font-extralight mb-6 text-white leading-tight">Dooor Mobile Health</h3>
                    <p className="text-gray-300 text-xl leading-relaxed mb-8 font-extralight">
                      Comprehensive mobile health monitoring with AI-driven symptom tracking and medication management.
                      Healthcare at your fingertips, whenever you need it.
                    </p>
                    <div className="space-y-4 font-extralight">
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="h-6 w-6 text-white mr-4" />
                        <span className="text-lg">AI-powered symptom tracking</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="h-6 w-6 text-white mr-4" />
                        <span className="text-lg">Smart medication reminders</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="h-6 w-6 text-white mr-4" />
                        <span className="text-lg">24/7 health monitoring</span>
                      </div>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <img 
                      src="https://images.unsplash.com/photo-1663153203126-08bbadc178ad?q=80&w=1958&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Mobile Health App"
                      className="w-full h-80 lg:h-96 object-cover rounded-3xl grayscale"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="flex-shrink-0  rounded-3xl p-12 w-[55vw]"
                // whileHover={{ y: -10 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
                  <div className="order-2 lg:order-1">
                    <div className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-extralight inline-block mb-8">
                      EHR INTEGRATION
                    </div>
                    <h3 className="text-4xl lg:text-5xl font-extralight mb-6 text-white leading-tight">Smart EHR Connector</h3>
                    <p className="text-gray-300 text-xl leading-relaxed mb-8 font-extralight">
                      Seamless integration with major Brazilian EHR systems including Tasy, MV Soul, and Philips Tasy.
                      Connect all your healthcare systems effortlessly.
                    </p>
                    <div className="space-y-4 font-extralight">
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="h-6 w-6 text-white mr-4" />
                        <span className="text-lg">Universal EHR compatibility</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="h-6 w-6 text-white mr-4" />
                        <span className="text-lg">Real-time data synchronization</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="h-6 w-6 text-white mr-4" />
                        <span className="text-lg">Secure data transfer protocols</span>
                      </div>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <img 
                      src="https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                      alt="Medical Records System"
                      className="w-full h-80 lg:h-96 object-cover rounded-3xl grayscale"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="flex-shrink-0  rounded-3xl p-12  w-[55vw]"
                // whileHover={{ y: -10 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
                  <div className="order-2 lg:order-1">
                    <div className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-extralight inline-block mb-8">
                      VOICE AI
                    </div>
                    <h3 className="text-4xl lg:text-5xl font-extralight mb-6 text-white leading-tight">Ambient Voice Assistant</h3>
                    <p className="text-gray-300 text-xl leading-relaxed mb-8 font-extralight">
                      Hands-free clinical documentation with natural language processing in Portuguese and English.
                      Let AI handle the paperwork while you focus on patients.
                    </p>
                    <div className="space-y-4 font-extralight">
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="h-6 w-6 text-white mr-4" />
                        <span className="text-lg">Natural language processing</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="h-6 w-6 text-white mr-4" />
                        <span className="text-lg">Multi-language support</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="h-6 w-6 text-white mr-4" />
                        <span className="text-lg">Hands-free operation</span>
                      </div>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <img 
                      src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                      alt="AI Voice Documentation"
                      className="w-full h-80 lg:h-96 object-cover rounded-3xl grayscale"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="flex-shrink-0  rounded-3xl p-12 w-[55vw]"
                // whileHover={{ y: -10 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
                  <div className="order-2 lg:order-1">
                    <div className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-extralight inline-block mb-8">
                      ENGAGEMENT
                    </div>
                    <h3 className="text-4xl lg:text-5xl font-extralight mb-6 text-white leading-tight">Patient Experience Hub</h3>
                    <p className="text-gray-300 text-xl leading-relaxed mb-8 font-extralight">
                      Omnichannel patient engagement with AI-powered appointment scheduling and care coordination.
                      Revolutionize how you connect with and care for your patients.
                    </p>
                    <div className="space-y-4 font-extralight">
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="h-6 w-6 text-white mr-4" />
                        <span className="text-lg">Omnichannel communication</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="h-6 w-6 text-white mr-4" />
                        <span className="text-lg">AI-powered scheduling</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="h-6 w-6 text-white mr-4" />
                        <span className="text-lg">Care coordination platform</span>
                      </div>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <img 
                      src="https://images.unsplash.com/photo-1592323401640-9c24ed33e561?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Patient Engagement Platform"
                      className="w-full h-80 lg:h-96 object-cover rounded-3xl grayscale"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Call to Action */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-200 transition-all inline-flex items-center"
            >
              Explore All Products <ArrowRight className="h-5 w-5 ml-2" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Technology Excellence */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl pb-2 text-transparent bg-gradient-to-b from-gray-100 to-gray-400/20 bg-clip-text lg:text-8xl font-extralight mb-8">
               Purpose-Built Solutions for High-Stakes Industries
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-extralight">
            Generic AI fails when trust is paramount. We partner with industry leaders to co-develop bespoke solutions on our Verifiable AI platform, solving their most critical and complex challenges.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Healthcare Security"
                  className="w-full h-64 object-cover rounded-2xl grayscale mb-6"
                />
                <div className="flex items-center mb-4">
                  <h3 className="text-2xl font-extralight">TEE-Powered Security</h3>
                </div>
                <p className="text-gray-300 mb-6 font-extralight">
                  Hardware-isolated secure environments for AI inference with end-to-end encryption and LGPD compliance.
                </p>
                <div className="space-y-3 font-extralight">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Data Protection</span>
                    <span className="text-white font-medium">100% Compliant</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Encryption Overhead</span>
                    <span className="text-white font-medium">+22.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Uptime SLA</span>
                    <span className="text-white font-medium">99.9%</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 relative">
                <div className="flex items-center mb-6">
                  {/* <Globe className="h-6 w-6 text-white mr-3" /> */}
                  <h4 className="text-lg font-extralight">GOVERNMENT</h4>
                </div>
                {/* Tag in top-right corner */}
                <div className="absolute top-4 right-4 bg-sky-500/20 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1">
                  <span className="text-xs font-extralight text-gray-300">The Framework for Trusted Public Sector AI</span>
                </div>
                <p className="text-gray-400 font-extralight">Build secure, transparent, and accountable AI solutions for public services, from intelligence analysis to citizen engagement, while upholding the highest standards of data sovereignty.</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 relative">
                <div className="flex items-center mb-6">
                  {/* <Heart className="h-6 w-6 text-white mr-3" /> */}
                  <h4 className="text-lg font-extralight">HEALTHCARE</h4>
                </div>
                {/* Tag in top-right corner */}
                <div className="absolute top-4 right-4 bg-sky-500/20 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1">
                  <span className="text-xs font-extralight text-gray-300">The OS for the Modern Health System</span>
                </div>
                <p className="text-gray-400 font-extralight">Empower your clinicians and streamline operations. Our solutions automate clinical documentation to reduce physician burnout, enhance provider-payer synergy, and build a secure data backbone for advanced medical research.</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 relative">
                <div className="flex items-center mb-6">
                  {/* <Database className="h-6 w-6 text-white mr-3" /> */}
                  <h4 className="text-lg font-extralight">FINANCE</h4>
                </div>
                {/* Tag in top-right corner */}
                <div className="absolute top-4 right-4 bg-sky-500/20 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1">
                  <span className="text-xs font-extralight text-gray-300">The Engine for Secure Financial Intelligence</span>
                </div>
                <p className="text-gray-400 font-extralight">Deploy AI agents for fraud detection, algorithmic trading, and risk analysis with mathematical proof of operational integrity and data privacy.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Strategic Capabilities Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-6xl font-extralight mb-8 leading-tight">
              We Don't Sell Products. <br />
              <span className="text-gray-400">We Build Strategic Capabilities.</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto font-extralight leading-relaxed">
              We believe the most powerful solutions are built in partnership. Our co-development model embeds our team of elite AI architects and engineers with yours, ensuring the final capability is perfectly tailored to solve your core challenges.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Left Side - Image Collage */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                    alt="Team collaboration"
                    className="w-full h-48 object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-500"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Strategic planning"
                    className="w-full h-32 object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="space-y-4 pt-8">
                  <img 
                    src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Engineering team"
                    className="w-full h-32 object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-500"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2084&q=80"
                    alt="Partnership meeting"
                    className="w-full h-48 object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
              
              {/* Floating accent element */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/3 rounded-full blur-2xl"></div>
            </motion.div>

            {/* Right Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 relative group hover:border-white/20 transition-all duration-300">
                <div className="absolute top-6 right-6 w-2 h-2 bg-white rounded-full opacity-60"></div>
                <h3 className="text-xl font-medium mb-4 text-white">Dedicated Pods</h3>
                <p className="text-gray-400 font-extralight leading-relaxed">
                  A dedicated team of Dooor's Forward Deployed Engineers and AI Scientists works as an extension of your organization.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 relative group hover:border-white/20 transition-all duration-300">
                <div className="absolute top-6 right-6 w-2 h-2 bg-white rounded-full opacity-60"></div>
                <h3 className="text-xl font-medium mb-4 text-white">Mission-Aligned KPIs</h3>
                <p className="text-gray-400 font-extralight leading-relaxed">
                  Success is defined from day one by measurable business outcomes, not software licenses. Our success is your success.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 relative group hover:border-white/20 transition-all duration-300">
                <div className="absolute top-6 right-6 w-2 h-2 bg-white rounded-full opacity-60"></div>
                <h3 className="text-xl font-medium mb-4 text-white">Mutual Investment</h3>
                <p className="text-gray-400 font-extralight leading-relaxed">
                  We structure our partnerships as a shared investment in a common vision, creating a foundation for lasting strategic advantage.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom Stats/Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 pt-16 border-t border-white/10"
          >
            <div className="text-center">
              <div className="text-3xl font-extralight mb-2 text-white">6-12</div>
              <div className="text-gray-400 font-extralight">Month Partnership Cycles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extralight mb-2 text-white">100%</div>
              <div className="text-gray-400 font-extralight">Outcome-Based Success</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extralight mb-2 text-white">24/7</div>
              <div className="text-gray-400 font-extralight">Dedicated Support</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}

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
              Build Your Future on  <span className="text-gray-400">Verifiable AI</span>
            </h2>
            <p className="text-xl font-extralight text-gray-400 mb-12 max-w-2xl mx-auto">
              Let's explore how the Dooor OS can become the engine for your organization's most ambitious goals.
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