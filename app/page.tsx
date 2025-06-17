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
    '/crossfi.mp4',
    '/crossfi-2.mp4',
    '/crossfi-3.mp4'
  ]

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

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
      {/* Global Blob Animation Background - Hidden on mobile, shown on desktop */}
      <BlobAnimation 
        opacity={0.3} 
        zIndex={1} 
        className="hidden lg:block fixed inset-0 overflow-hidden pointer-events-none" 
        color="white" 
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0">
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
            <div className="inline-flex items-center mt-12 lg:mt-0 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8">
              <span className="text-sm font-medium">CrossFi Blockchain Hackathon</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-inter font-extralight mb-8 leading-tight">
              Build the Future of {' '}
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Payment Gateway
              </span>
            </h1>
            
            <p className="text-lg md:text-xl font-extralight lg:text-xl text-gray-300 mb-12 md:mb-12 max-w-4xl mx-auto">
             Create decentralized platforms for education, certification, and credentialing on blockchain, leveraging the infrastructure of CrossFi Universe. Join us in building the next generation of educational technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12 md:mb-16 font-inter">
              <motion.button
                className="bg-white text-black px-6 w-fit mx-auto lg:mx-0 py-2 rounded-full text-base flex items-center justify-center hover:bg-gray-200 transition-all"
                onClick={() => scrollToSection('tracks')}
              >
                Explore Tracks
              </motion.button>
              <motion.button
                className="border border-white text-white px-6 w-fit mx-auto lg:mx-0 py-2 rounded-full text-base hover:bg-white hover:text-black transition-all"
              >
                <a href="#register">
                  Register Now
                </a>
              </motion.button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-12 max-w-2xl mx-auto mb-8 md:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-normal mb-2">$500K</div>
                <div className="text-gray-400 font-extralight text-sm md:text-base">Total Prize Pool</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-normal mb-2">3</div>
                <div className="text-gray-400 font-extralight text-sm md:text-base">Development Tracks</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-normal mb-2">8 Weeks</div>
                <div className="text-gray-400 font-extralight text-sm md:text-base">Development Period</div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute hidden lg:block bottom-8 left-1/2 transform -translate-x-1/2"
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
            <p className="text-sm uppercase tracking-wide text-gray-600 mb-4">Powered by cutting-edge blockchain technology</p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
              <div className="text-2xl font-bold">CrossFi Chain</div>
              <div className="text-2xl font-bold">Web3 Infrastructure</div>
              <div className="text-2xl font-bold">DeFi Integration</div>
              <div className="text-2xl font-bold">Smart Contracts</div>
              <div className="text-2xl font-bold">CrossChain Protocol</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hackathon Tracks */}
      <section id="tracks" className="py-24 bg-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-6xl font-extralight mb-8">
              Choose Your <span className="text-gray-400">Development Track</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-extralight">
              Three specialized tracks focusing on different aspects of decentralized education and blockchain innovation. Each track offers unique challenges and opportunities to showcase your skills.
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
                src="/crossfi-app.png"
                alt="Blockchain Development"
                className="w-full rounded-2xl grayscale"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-extralight mb-6">Why CrossFi?</h3>
              <p className="text-lg text-gray-300 mb-8 font-extralight">
                CrossFi provides the infrastructure for the next generation of decentralized applications, focusing on education, certification, and credentialing systems that are secure, transparent, and tamper-proof.
              </p>
              <div className="space-y-4 font-extralight">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-white mr-3" />
                  <span>Decentralized & Transparent</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-white mr-3" />
                  <span>CrossChain Compatibility</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-white mr-3" />
                  <span>Educational Focus</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Track Highlights */}
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
                <h4 className="text-xl font-medium mb-4 text-white">AI & Decentralized Infrastructure</h4>
                <p className="text-gray-400 font-extralight leading-relaxed">
                  Build scalable, efficient solutions that leverage AI and decentralized infrastructure to create the next generation of educational platforms and tools.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300"
              >
                <h4 className="text-xl font-medium mb-4 text-white">UI/UX SocialFi & EduTech</h4>
                <p className="text-gray-400 font-extralight leading-relaxed">
                  Focus on creating engaging user experiences and social finance integrations that make decentralized education accessible and user-friendly for everyone.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300"
              >
                <h4 className="text-xl font-medium mb-4 text-white">CrossChain Scalability</h4>
                <p className="text-gray-400 font-extralight leading-relaxed">
                  Develop solutions that bridge different blockchain ecosystems, enabling seamless interoperability and scalability across the Web3 educational landscape.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Challenge Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-0 md:mb-24 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto mb-16 mt-16 md:mt-52"
            >
              <h2 className="text-4xl lg:text-8xl font-extralight mb-20 text-transparent bg-gradient-to-b from-gray-100 to-gray-400/50 bg-clip-text">
                The <span className="">CrossFi Challenge</span>
              </h2>
              <div className="text-left bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-12">
                <p className="text-xl text-gray-300 font-extralight leading-relaxed">
                  Create decentralized platforms for education, certification, and credentialing on blockchain, leveraging the infrastructure of CrossFi Universe. Build solutions that integrate <strong className="text-white font-medium">tokenization</strong> into the broader CrossFi ecosystem, offering secure, transparent, and tamper-proof educational records.
                </p>
              </div>
              
              <h3 className="text-2xl lg:text-3xl font-extralight mb-12 text-center">
                We're looking for solutions that demonstrate three key <strong className="text-white font-medium">principles</strong>:
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
                  <h4 className="text-xl font-medium mb-4 text-white">Decentralized</h4>
                  <p className="text-gray-400 font-extralight leading-relaxed">
                    Build platforms that operate without central authorities, giving users complete control over their educational data and credentials while ensuring global accessibility.
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
                  <h4 className="text-xl font-medium mb-4 text-white">Interoperable</h4>
                  <p className="text-gray-400 font-extralight leading-relaxed">
                    Create solutions that work seamlessly across different blockchain ecosystems and platforms, enabling a truly connected Web3 educational experience.
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
                  <h4 className="text-xl font-medium mb-4 text-white">Secure & Transparent</h4>
                  <p className="text-gray-400 font-extralight leading-relaxed">
                    Implement tamper-proof systems that provide complete transparency and security for educational records, certificates, and credentials using blockchain technology.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 pt-4 bg-black text-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-8xl font-extralight mb-12">
              <span className="text-transparent bg-gradient-to-b from-gray-100 to-gray-400/20 bg-clip-text">Our Tech Stack</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-extralight">
              Built with cutting-edge technology and enterprise-grade infrastructure designed for decentralized excellence.
            </p>
          </motion.div>

          {/* Clean 4x4 Square Grid Layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-8 md:grid-rows-4 gap-4 md:gap-6 aspect-auto md:aspect-square w-full max-w-4xl mx-auto">
            
            {/* AI Core Engine - Large Card (2x2) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="col-span-2 row-span-2 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 relative overflow-hidden group"
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
                <h3 className="text-2xl md:text-3xl font-extralight mb-3 md:mb-4 text-white">Cosmos SDK</h3>
                <p className="text-gray-200 text-sm md:text-base font-extralight mb-4 md:mb-6 flex-grow">
                  The modular architecture for building scalable and interoperable blockchain applications.
                </p>
                <div className="space-y-2 md:space-y-3">
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-gray-300">Interoperability</span>
                    <span className="text-white font-medium">100% Compatible</span>
                  </div>
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-gray-300">Processing Speed</span>
                    <span className="text-white font-medium">100% Compatible</span>
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
              className="col-span-1 row-span-2 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20 relative overflow-hidden group"
            >
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="absolute inset-0 bg-black/85 rounded-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10 h-full flex flex-col">
                <h3 className="text-lg md:text-xl font-extralight mb-3 md:mb-4 text-white">Tendermint Consensus</h3>
                <p className="text-gray-200 text-xs md:text-sm font-extralight mb-4 md:mb-6 flex-grow">
                  The fastest and most secure consensus mechanism for blockchain networks.
                </p>
                <div className="space-y-1 md:space-y-2 text-xs">
                  <div className="text-gray-300">• Fast & Secure</div>
                  <div className="text-gray-300">• Byzantine Fault Tolerance</div>
                  <div className="text-gray-300">• High Throughput</div>
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
              className="col-span-1 row-span-1 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-3 md:p-4 border border-white/20 relative overflow-hidden group"
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
                <h3 className="text-base md:text-lg font-extralight text-white mb-1 md:mb-2">Smart Contracts</h3>
                <p className="text-gray-200 text-xs font-extralight">EVM Compatible</p>
              </div>
            </motion.div>

            {/* Vector Database - Small Card (1x1) */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="col-span-1 row-span-1 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-3 md:p-4 border border-white/20 relative overflow-hidden group"
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
                <h3 className="text-base md:text-lg font-extralight text-white mb-1 md:mb-2">CrossFi XAPI</h3>
                <p className="text-gray-200 text-xs font-extralight">API for financial services</p>
              </div>
            </motion.div>

            {/* API Gateway - Wide Card (2x1) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.01 }}
              className="col-span-2 row-span-1 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20 relative overflow-hidden group"
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
                  <h3 className="text-lg md:text-xl font-extralight text-white mb-1 md:mb-2">Tendermint Consensus</h3>
                  <p className="text-gray-200 text-xs md:text-sm font-extralight">Consensus mechanism for blockchain networks</p>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium text-xs md:text-sm">User Friendly</div>
                  <div className="text-gray-300 text-xs">Non-custodial Payment Gateway</div>
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
              className="col-span-2 row-span-1 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20 relative overflow-hidden group"
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
                  <h3 className="text-lg md:text-xl font-extralight text-white mb-1 md:mb-2">Observability</h3>
                  <p className="text-gray-200 text-xs md:text-sm font-extralight">24/7 monitoring with real-time alerts</p>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium text-xs md:text-sm">99.9% Uptime</div>
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
              className="col-span-2 row-span-1 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20 relative overflow-hidden group"
            >
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1588600878108-578307a3cc9d?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="absolute inset-0 bg-black/85 rounded-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10 flex items-center justify-between h-full">
                <div>
                  <h3 className="text-lg md:text-xl font-extralight text-white mb-1 md:mb-2">DeFi Integration</h3>
                  <p className="text-gray-200 text-xs md:text-sm font-extralight">Build on CrossFi DeFi infrastructure</p>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium text-xs md:text-sm">99.9% Uptime</div>
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
              className="col-span-1 row-span-1 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-3 md:p-4 border border-white/20 relative overflow-hidden group"
            >
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1545987796-200677ee1011?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="absolute inset-0 bg-black/85 rounded-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10 h-full flex flex-col justify-center text-center">
                <h3 className="text-base md:text-lg font-extralight text-white mb-1 md:mb-2">ML Pipeline</h3>
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
              className="col-span-1 row-span-1 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-3 md:p-4 border border-white/20 relative overflow-hidden group"
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
                <h3 className="text-base md:text-lg font-extralight text-white mb-1 md:mb-2">DevOps</h3>
                <p className="text-gray-200 text-xs font-extralight">CI/CD Pipeline</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Product Showcase Carousel */}
      <section 
        ref={carouselSectionRef}
        className="relative bg-black py-6 lg:py-24"
      >
        {/* Desktop Version - Horizontal Scroll */}
        <div className="hidden lg:block w-full h-screen flex flex-col overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <h2 className="text-5xl lg:text-6xl font-extralight mb-8">
              Discover <span className="text-gray-400">product ideas</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-extralight">
              Explore, discuss and form teams to build the next big thing.
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
              <motion.div 
                className="flex-shrink-0 rounded-3xl p-12 w-[55vw]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
                  <div className="order-2 lg:order-1">
                    <div className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-extralight inline-block mb-8">
                      Payment Gateway
                    </div>
                    <h3 className="text-4xl lg:text-5xl font-extralight mb-6 text-white leading-tight">Payment Mobile App</h3>
                    <p className="text-gray-300 text-xl leading-relaxed mb-4 font-extralight">
                     A mobile Android and iOS app that allows users to send and receive payments in both fiat and cryptocurrencies.
                    </p>
                    <div className="space-y-4 font-extralight">
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="h-6 w-6 text-white mr-4" />
                        <span className="text-lg">Send and receive payments in both fiat and cryptocurrencies.</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="h-6 w-6 text-white mr-4" />
                        <span className="text-lg">Non-custodial payment gateway</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="h-6 w-6 text-white mr-4" />
                        <span className="text-lg">Multi-currency cards for international payments</span>
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
                className="flex-shrink-0 rounded-3xl p-12 w-[55vw]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
                  <div className="order-2 lg:order-1">
                    <div className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-extralight inline-block mb-8">
                      CrossFi xApp
                    </div>
                    <h3 className="text-4xl lg:text-5xl font-extralight mb-6 text-white leading-tight">CrossFi xApp</h3>
                    <p className="text-gray-300 text-xl leading-relaxed mb-4 font-extralight">
                    A cross-chain interoperability platform that allows users to send and receive payments in both fiat and cryptocurrencies.
                    </p>
                    <div className="space-y-4 font-extralight">
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="h-6 w-6 text-white mr-4" />
                        <span className="text-lg">Cross-chain interoperability</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="h-6 w-6 text-white mr-4" />
                        <span className="text-lg">Automates claims processes with crypto proof</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="h-6 w-6 text-white mr-4" />
                        <span className="text-lg">Accelerates revenue cycles</span>
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
                className="flex-shrink-0 rounded-3xl p-12 w-[55vw]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
                  <div className="order-2 lg:order-1">
                    <div className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-extralight inline-block mb-8">
                      Tokenization
                    </div>
                    <h3 className="text-4xl lg:text-5xl font-extralight mb-6 text-white leading-tight">Token Merge</h3>
                    <p className="text-gray-300 text-xl leading-relaxed mb-8 font-extralight">
                      A tokenization platform that allows users to tokenize their assets and trade them on the blockchain.
                    </p>
                    <div className="space-y-4 font-extralight">
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="h-6 w-6 text-white mr-4" />
                        <span className="text-lg">Tokenization of assets</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="h-6 w-6 text-white mr-4" />
                        <span className="text-lg">Tokenization of assets</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="h-6 w-6 text-white mr-4" />
                        <span className="text-lg">Tokenization of assets</span>
                      </div>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <img 
                      src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Medical Records System"
                      className="w-full h-80 lg:h-96 object-cover rounded-3xl grayscale"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="flex-shrink-0 rounded-3xl p-12 w-[55vw]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
                  <div className="order-2 lg:order-1">
                    <div className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-extralight inline-block mb-8">
                      Education app for cross-chain interoperability
                    </div>
                    <h3 className="text-4xl lg:text-5xl font-extralight mb-6 text-white leading-tight">Educ</h3>
                    <p className="text-gray-300 text-xl leading-relaxed mb-8 font-extralight">
                      An education app for cross-chain interoperability that allows users to learn and interact with chain data in a secure and collaborative space.
                    </p>
                    <div className="space-y-4 font-extralight">
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="h-6 w-6 text-white mr-4" />
                        <span className="text-lg">Cross-chain interoperability</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="h-6 w-6 text-white mr-4" />
                        <span className="text-lg">Multi-modal support</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="h-6 w-6 text-white mr-4" />
                        <span className="text-lg">Wisdoms built for you</span>
                      </div>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <img 
                      src="https://images.unsplash.com/photo-1619658535018-5a55d32e4628?q=80&w=2002&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="AI Voice Documentation"
                      className="w-full h-80 lg:h-96 object-cover rounded-3xl grayscale"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="flex-shrink-0 rounded-3xl p-12 w-[55vw]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
                  <div className="order-2 lg:order-1">
                    <div className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-extralight inline-block mb-8">
                      ENGAGEMENT
                    </div>
                    <h3 className="text-4xl lg:text-5xl font-extralight mb-6 text-white leading-tight">Experience Hub</h3>
                    <p className="text-gray-300 text-xl leading-relaxed mb-8 font-extralight">
                      A platform for users to experience and interact with cross-chain interoperability.
                    </p>
                    <div className="space-y-4 font-extralight">
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="h-6 w-6 text-white mr-4" />
                        <span className="text-lg">Cross-chain interoperability</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="h-6 w-6 text-white mr-4" />
                        <span className="text-lg">AI-powered scheduling</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="h-6 w-6 text-white mr-4" />
                        <span className="text-lg">Cross-chain interoperability</span>
                      </div>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <img 
                      src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2006&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Patient Engagement Platform"
                      className="w-full h-80 lg:h-96 object-cover rounded-3xl grayscale"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Call to Action - Desktop */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            onClick={() => {
              window.location.href = 'https://crossfi.org/documents/';
            }}
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

        {/* Mobile Version - Vertical Layout */}
        <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-extralight mb-6">
              Discover <span className="text-gray-400">product ideas</span>
            </h2>
            <p className="text-lg text-gray-400 font-extralight">
              Explore, discuss and form teams to build the next big thing.
            </p>
          </motion.div>

          {/* Mobile Product Cards - Vertical Stack */}
          <div className="space-y-12">
            {/* Analytics Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Clinical Dashboard Interface"
                  className="w-full h-48 object-cover rounded-xl grayscale"
                />
              </div>
              <div className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-extralight inline-block mb-4">
                ANALYTICS
              </div>
              <h3 className="text-2xl font-extralight mb-4 text-white leading-tight">CrossFi Analytics Dashboard</h3>
              <p className="text-gray-300 text-base leading-relaxed mb-6 font-extralight">
                Real-time insights and predictive analytics for educational performance tracking and blockchain metrics.
              </p>
              <div className="space-y-3 font-extralight">
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-white mr-3" />
                  <span className="text-sm">Real-time performance metrics</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-white mr-3" />
                  <span className="text-sm">Educational progress analytics</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-white mr-3" />
                  <span className="text-sm">Blockchain network insights</span>
                </div>
              </div>
            </motion.div>

            {/* Mobile Health Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1663153203126-08bbadc178ad?q=80&w=1958&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Mobile Health App"
                  className="w-full h-48 object-cover rounded-xl grayscale"
                />
              </div>
              <div className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-extralight inline-block mb-4">
                MOBILE
              </div>
              <h3 className="text-2xl font-extralight mb-4 text-white leading-tight">CrossFi Mobile SDK</h3>
              <p className="text-gray-300 text-base leading-relaxed mb-6 font-extralight">
                Comprehensive mobile development kit for building decentralized educational applications with blockchain integration.
              </p>
              <div className="space-y-3 font-extralight">
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-white mr-3" />
                  <span className="text-sm">Cross-platform SDK support</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-white mr-3" />
                  <span className="text-sm">Blockchain integration tools</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-white mr-3" />
                  <span className="text-sm">Educational app templates</span>
                </div>
              </div>
            </motion.div>

            {/* EHR Integration Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                  alt="Medical Records System"
                  className="w-full h-48 object-cover rounded-xl grayscale"
                />
              </div>
              <div className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-extralight inline-block mb-4">
                BLOCKCHAIN INTEGRATION
              </div>
              <h3 className="text-2xl font-extralight mb-4 text-white leading-tight">Smart Contract Builder</h3>
              <p className="text-gray-300 text-base leading-relaxed mb-6 font-extralight">
                Seamless integration with CrossFi blockchain infrastructure for building decentralized educational platforms.
              </p>
              <div className="space-y-3 font-extralight">
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-white mr-3" />
                  <span className="text-sm">Smart contract templates</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-white mr-3" />
                  <span className="text-sm">Real-time blockchain sync</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-white mr-3" />
                  <span className="text-sm">Secure transaction protocols</span>
                </div>
              </div>
            </motion.div>

            {/* Voice AI Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="AI Voice Documentation"
                  className="w-full h-48 object-cover rounded-xl grayscale"
                />
              </div>
              <div className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-extralight inline-block mb-4">
                AI EDUCATION
              </div>
              <h3 className="text-2xl font-extralight mb-4 text-white leading-tight">AI Learning Assistant</h3>
              <p className="text-gray-300 text-base leading-relaxed mb-6 font-extralight">
                Intelligent tutoring system with natural language processing for personalized educational experiences.
              </p>
              <div className="space-y-3 font-extralight">
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-white mr-3" />
                  <span className="text-sm">Natural language processing</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-white mr-3" />
                  <span className="text-sm">Multi-language support</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-white mr-3" />
                  <span className="text-sm">Personalized learning paths</span>
                </div>
              </div>
            </motion.div>

            {/* Patient Experience Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2006&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Patient Engagement Platform"
                  className="w-full h-48 object-cover rounded-xl grayscale"
                />
              </div>
              <div className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-extralight inline-block mb-4">
                STUDENT ENGAGEMENT
              </div>
              <h3 className="text-2xl font-extralight mb-4 text-white leading-tight">Student Experience Platform</h3>
              <p className="text-gray-300 text-base leading-relaxed mb-6 font-extralight">
                Comprehensive student engagement platform with gamification, NFT certificates, and peer-to-peer learning.
              </p>
              <div className="space-y-3 font-extralight">
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-white mr-3" />
                  <span className="text-sm">Gamified learning experience</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-white mr-3" />
                  <span className="text-sm">NFT certificate system</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-white mr-3" />
                  <span className="text-sm">Peer-to-peer learning network</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Call to Action - Mobile */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-16"
            onClick={() => {
              window.location.href = 'https://accelar-universe-frontend.vercel.app/hackathons';
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-6 py-3 rounded-full text-base font-medium hover:bg-gray-200 transition-all inline-flex items-center"
            >
              Join CrossFi Hackathon <ArrowRight className="h-4 w-4 ml-2" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* CrossFi Ecosystem */}
      <section className="lg:py-24 py-6 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl pb-2 text-transparent bg-gradient-to-b from-gray-100 to-gray-400/20 bg-clip-text lg:text-8xl font-extralight mb-8">
               CrossFi Chain Ecosystem
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-extralight">
            The next-generation cross-chain interoperability protocol for decentralized finance. Build powerful dApps leveraging our synchronized modular architecture combining Cosmos and EVM compatibility.
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
                  src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2132&q=80"
                  alt="Blockchain Infrastructure"
                  className="w-full h-64 object-cover rounded-2xl grayscale mb-6"
                />
                <div className="flex items-center mb-4">
                  <h3 className="text-2xl font-extralight">Cross-Chain Infrastructure</h3>
                </div>
                <p className="text-gray-300 mb-6 font-extralight">
                  Layer 1 blockchain with synchronized modular architecture combining Cosmos SDK and EVM compatibility for seamless interoperability.
                </p>
                <div className="space-y-3 font-extralight">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">EVM Compatibility</span>
                    <span className="text-white font-medium">100% Compatible</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Transaction Speed</span>
                    <span className="text-white font-medium">2-3s Finality</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Cross-Chain Support</span>
                    <span className="text-white font-medium">Multi-Network</span>
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
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <h4 className="text-lg font-extralight mb-2 md:mb-0">DEFI PROTOCOLS</h4>
                  <div className="bg-sky-500/20 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 self-start md:self-auto">
                    <span className="text-xs font-extralight text-gray-300">Cross-Chain Asset Transfers</span>
                  </div>
                </div>
                <p className="text-gray-400 font-extralight">Build decentralized exchanges, lending protocols, and yield farming platforms with seamless asset transfers across blockchain networks.</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 relative">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <h4 className="text-lg font-extralight mb-2 md:mb-0">WEB3 BANKING</h4>
                  <div className="bg-sky-500/20 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 self-start md:self-auto">
                    <span className="text-xs font-extralight text-gray-300">Non-Custodial Financial Services</span>
                  </div>
                </div>
                <p className="text-gray-400 font-extralight">Create modern banking solutions with multi-currency cards, cross-border payments via SWIFT and IBAN, while maintaining full user control over assets.</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 relative">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <h4 className="text-lg font-extralight mb-2 md:mb-0">SYNTHETIC ASSETS</h4>
                  <div className="bg-sky-500/20 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 self-start md:self-auto">
                    <span className="text-xs font-extralight text-gray-300">Decentralized Trading Platform</span>
                  </div>
                </div>
                <p className="text-gray-400 font-extralight">Deploy platforms for synthetic asset trading including stocks, commodities, and algorithmically-backed stablecoins with up to 10x leverage.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* dApp Development Section */}
      <section className="lg:py-24 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-6xl font-extralight mb-8 leading-tight">
              We Don't Just Provide Infrastructure. <br />
              <span className="text-gray-400">We Enable Innovation.</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto font-extralight leading-relaxed">
              As we stated earlier, we are not setting any strict conditions for Boost XFI utility participation, as we believe this will help many developers to make their first step towards productive and mutually beneficial cooperation with the CrossFi ecosystem.
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
                    src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2132&q=80"
                    alt="Blockchain development"
                    className="w-full h-48 object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-500"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
                    alt="DeFi protocols"
                    className="w-full h-32 object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="space-y-4 pt-8">
                  <img 
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
                    alt="Cross-chain network"
                    className="w-full h-32 object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-500"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Developer community"
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
                <h3 className="text-xl font-medium mb-4 text-white">MPX Token Rewards</h3>
                <p className="text-gray-400 font-extralight leading-relaxed">
                  All payments to hackathon winners will be made in our staking token MPX, providing immediate value while building your stake in the CrossFi ecosystem.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 relative group hover:border-white/20 transition-all duration-300">
                <div className="absolute top-6 right-6 w-2 h-2 bg-white rounded-full opacity-60"></div>
                <h3 className="text-xl font-medium mb-4 text-white">XFI Grants Eligibility</h3>
                <p className="text-gray-400 font-extralight leading-relaxed">
                  All winners will be eligible to apply for additional grants in Q3 2025 in our native token XFI, opening doors to long-term ecosystem participation.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 relative group hover:border-white/20 transition-all duration-300">
                <div className="absolute top-6 right-6 w-2 h-2 bg-white rounded-full opacity-60"></div>
                <h3 className="text-xl font-medium mb-4 text-white">Incubation Program</h3>
                <p className="text-gray-400 font-extralight leading-relaxed">
                  Join the CrossFi incubation program for ongoing support, mentorship, and additional funding opportunities to scale your dApp within our growing ecosystem.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <h4 className="text-lg font-medium mb-3 text-white">Compatible Wallets</h4>
              <p className="text-gray-400 font-extralight text-sm">MetaMask, TrustWallet, Keplr and other EVM-compatible wallets supported</p>
            </div>
            <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <h4 className="text-lg font-medium mb-3 text-white">Developer Resources</h4>
              <p className="text-gray-400 font-extralight text-sm">Comprehensive documentation, SDKs, and API references for seamless development</p>
            </div>
            <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <h4 className="text-lg font-medium mb-3 text-white">Community Support</h4>
              <p className="text-gray-400 font-extralight text-sm">Active GitHub repositories, Discord community, and technical mentorship</p>
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
              Build Your Future on  <span className="text-gray-400">CrossFi Blockchain</span>
            </h2>
            <p className="text-xl font-extralight text-gray-400 mb-12 max-w-2xl mx-auto">
              Let's explore how CrossFi blockchain can become the foundation for your organization's most innovative educational solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-8 w-fit mx-auto lg:mx-0 py-3 rounded-full text-lg font-medium hover:bg-gray-200 transition-all"
              >
                <a href="https://accelar-universe-frontend.vercel.app/hackathons">
                Join Hackathon
                </a>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-white text-white px-8 w-fit mx-auto lg:mx-0 py-3 rounded-full text-lg font-medium hover:bg-white hover:text-black transition-all"
              >
                <a href="#tracks">
                Explore Tracks
                </a>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hackathon Roadmap Section */}
      <section id="roadmap" className="py-24 bg-black text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-8xl font-extralight mb-12">
              <span className="text-transparent bg-gradient-to-b from-gray-100 to-gray-400/20 bg-clip-text">Hackathon Roadmap</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-extralight">
              From launch announcement to winners celebration. Follow our comprehensive timeline to build revolutionary decentralized education solutions on CrossFi blockchain.
            </p>
          </motion.div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Central Timeline Line - Hidden on mobile */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-white/20 via-white/10 to-white/5 h-full"></div>
            
            {/* Timeline Events */}
            <div className="space-y-12 lg:space-y-24">
              
              {/* Phase 1: Launch Announcement & Preparation */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col lg:flex-row items-center lg:items-start"
              >
                <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0 text-center lg:text-right">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10 relative group hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center justify-center lg:justify-end mb-4">
                      <div className="bg-blue-500/20 p-3 rounded-xl">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-medium text-white mb-3">Launch Announcement & Preparation</h3>
                    <p className="text-gray-300 font-extralight mb-4">
                      Launch announcement, preparations for launch. Initial documentation release, community building, and developer resource distribution.
                    </p>
                    <div className="space-y-2 text-sm text-gray-400">
                      <div className="flex items-center justify-center lg:justify-end">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>June 5 - 16th</span>
                      </div>
                      <div className="flex items-center justify-center lg:justify-end">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span>Community preparations</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Timeline Point */}
                <div className="hidden lg:flex relative z-10 w-6 h-6 bg-blue-500 border-4 border-black rounded-full flex-shrink-0"></div>
                
                <div className="lg:w-1/2 lg:pl-12"></div>
              </motion.div>

              {/* Phase 2: Application Period */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col lg:flex-row items-center lg:items-start"
              >
                <div className="lg:w-1/2 lg:pr-12"></div>
                
                {/* Timeline Point */}
                <div className="hidden lg:flex relative z-10 w-6 h-6 bg-green-500 border-4 border-black rounded-full flex-shrink-0"></div>
                
                <div className="lg:w-1/2 lg:pl-12 mb-8 lg:mb-0 text-center lg:text-left">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10 relative group hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center justify-center lg:justify-start mb-4">
                      <div className="bg-green-500/20 p-3 rounded-xl">
                        <FileText className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-medium text-white mb-3">Application Period</h3>
                    <p className="text-gray-300 font-extralight mb-4">
                      Open registration and application period for all developers and teams. Submit your project ideas, form teams, and begin development on CrossFi infrastructure.
                    </p>
                    <div className="space-y-2 text-sm text-gray-400">
                      <div className="flex items-center justify-center lg:justify-start">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>June 16 - July 7</span>
                      </div>
                      <div className="flex items-center justify-center lg:justify-start">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span>Development phase begins</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Phase 3: Projects Scoring */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex flex-col lg:flex-row items-center lg:items-start"
              >
                <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0 text-center lg:text-right">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10 relative group hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center justify-center lg:justify-end mb-4">
                      <div className="bg-purple-500/20 p-3 rounded-xl">
                        <Shield className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-medium text-white mb-3">Projects Scoring</h3>
                    <p className="text-gray-300 font-extralight mb-4">
                      Comprehensive evaluation and scoring by industry experts and CrossFi team. Projects assessed on innovation, technical implementation, and potential impact on decentralized education.
                    </p>
                    <div className="space-y-2 text-sm text-gray-400">
                      <div className="flex items-center justify-center lg:justify-end">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>August 4 - 8th</span>
                      </div>
                      <div className="flex items-center justify-center lg:justify-end">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span>Expert evaluation process</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Timeline Point */}
                <div className="hidden lg:flex relative z-10 w-6 h-6 bg-purple-500 border-4 border-black rounded-full flex-shrink-0"></div>
                
                <div className="lg:w-1/2 lg:pl-12"></div>
              </motion.div>

              {/* Phase 4: Winners Announcement */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-col lg:flex-row items-center lg:items-start"
              >
                <div className="lg:w-1/2 lg:pr-12"></div>
                
                {/* Timeline Point */}
                <div className="hidden lg:flex relative z-10 w-6 h-6 bg-yellow-500 border-4 border-black rounded-full flex-shrink-0"></div>
                
                <div className="lg:w-1/2 lg:pl-12 mb-8 lg:mb-0 text-center lg:text-left">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10 relative group hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center justify-center lg:justify-start mb-4">
                      <div className="bg-yellow-500/20 p-3 rounded-xl">
                        <Star className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-medium text-white mb-3">Winners Announcement</h3>
                    <p className="text-gray-300 font-extralight mb-4">
                      Final results announcement and celebration of winning projects. Distribution of $500K prize pool in MPX tokens, plus access to incubation programs and future grant opportunities.
                    </p>
                    <div className="space-y-2 text-sm text-gray-400">
                      <div className="flex items-center justify-center lg:justify-start">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>August 11 - 15th</span>
                      </div>
                      <div className="flex items-center justify-center lg:justify-start">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span>MPX token distribution</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Important Information Box */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
          >
            <div className="flex items-start mb-6">
              <div className="bg-blue-500/20 p-3 rounded-xl mr-4 flex-shrink-0">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-white mb-4">Prize Distribution & Future Opportunities</h3>
                <p className="text-gray-300 font-extralight leading-relaxed mb-4">
                  As we stated earlier, we are not setting any strict conditions for Boost XFI utility participation, as we believe this will help many developers to make their first step towards productive and mutually beneficial cooperation with CrossFi.
                </p>
                <p className="text-gray-300 font-extralight leading-relaxed">
                  All payments to hackathon winners will be made in our <strong className="text-white font-medium">staking token MPX</strong> and not our native token XFI. Nevertheless, all winners will be eligible to apply for additional grants in Q3 2025 and/or be part of the CrossFi incubation program which are both eligible for grants in XFI.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Key Dates Summary */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-extralight mb-12 text-white">Key Milestones</h3>
            <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-2xl font-light text-white mb-2">June 5-16</div>
                <h4 className="text-lg font-medium text-white mb-2">Launch</h4>
                <p className="text-gray-400 text-sm">Announcement and preparations</p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-2xl font-light text-white mb-2">June 16 - July 7</div>
                <h4 className="text-lg font-medium text-white mb-2">Applications</h4>
                <p className="text-gray-400 text-sm">Registration and development period</p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-2xl font-light text-white mb-2">Aug 4-8</div>
                <h4 className="text-lg font-medium text-white mb-2">Scoring</h4>
                <p className="text-gray-400 text-sm">Expert evaluation process</p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-2xl font-light text-white mb-2">Aug 11-15</div>
                <h4 className="text-lg font-medium text-white mb-2">Winners</h4>
                <p className="text-gray-400 text-sm">Results and MPX distribution</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Prizes Section */}
      <section id="prizes" className="py-24 pt-4 bg-black text-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-8xl font-extralight mb-12">
              <span className="text-transparent bg-gradient-to-b from-gray-100 to-gray-400/20 bg-clip-text">Prize Pool</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-extralight">
              $500,000 USD total prize pool distributed in MPX tokens across all tracks and categories. Additional grants and incubation opportunities available for winners.
            </p>
          </motion.div>

          {/* Prize Distribution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-4xl mx-auto">
            
            {/* Main Prize Pool - Large Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="col-span-1 md:col-span-2 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 relative overflow-hidden group"
            >
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.0.3')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="absolute inset-0 bg-black/85 rounded-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10 h-full flex flex-col text-center">
                <h3 className="text-3xl md:text-4xl font-extralight mb-3 md:mb-4 text-white">Total Prize Pool</h3>
                <div className="text-6xl md:text-8xl font-light mb-4 md:mb-6 text-transparent bg-gradient-to-r from-white to-gray-300 bg-clip-text">
                  $500K
                </div>
                <p className="text-gray-200 text-lg md:text-xl font-extralight mb-4 md:mb-6">
                  Distributed in MPX tokens across all tracks and categories
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm md:text-base">
                  <div className="text-center">
                    <div className="text-white font-medium text-lg">Grand Prize</div>
                    <div className="text-gray-300">Best Overall Project</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-medium text-lg">Track Winners</div>
                    <div className="text-gray-300">1st, 2nd, 3rd per track</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Track 1 Prizes */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20 relative overflow-hidden group"
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
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10 h-full flex flex-col">
                <h3 className="text-xl md:text-2xl font-extralight mb-3 md:mb-4 text-white">AI & Infrastructure</h3>
                <div className="space-y-2 md:space-y-3 flex-grow">
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-300">1st Place</span>
                    <span className="text-white font-medium">$50,000</span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-300">2nd Place</span>
                    <span className="text-white font-medium">$30,000</span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-300">3rd Place</span>
                    <span className="text-white font-medium">$20,000</span>
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-400">
                  + Incubation program eligibility
                </div>
              </div>
            </motion.div>

            {/* Track 2 Prizes */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20 relative overflow-hidden group"
            >
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="absolute inset-0 bg-black/85 rounded-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10 h-full flex flex-col">
                <h3 className="text-xl md:text-2xl font-extralight mb-3 md:mb-4 text-white">UI/UX & EduTech</h3>
                <div className="space-y-2 md:space-y-3 flex-grow">
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-300">1st Place</span>
                    <span className="text-white font-medium">$50,000</span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-300">2nd Place</span>
                    <span className="text-white font-medium">$30,000</span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-300">3rd Place</span>
                    <span className="text-white font-medium">$20,000</span>
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-400">
                  + Design mentorship program
                </div>
              </div>
            </motion.div>

            {/* Track 3 Prizes */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20 relative overflow-hidden group"
            >
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.0.3')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="absolute inset-0 bg-black/85 rounded-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10 h-full flex flex-col">
                <h3 className="text-xl md:text-2xl font-extralight mb-3 md:mb-4 text-white">CrossChain Scalability</h3>
                <div className="space-y-2 md:space-y-3 flex-grow">
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-300">1st Place</span>
                    <span className="text-white font-medium">$50,000</span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-300">2nd Place</span>
                    <span className="text-white font-medium">$30,000</span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-300">3rd Place</span>
                    <span className="text-white font-medium">$20,000</span>
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-400">
                  + Technical partnership opportunities
                </div>
              </div>
            </motion.div>

            {/* Special Awards */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20 relative overflow-hidden group"
            >
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="absolute inset-0 bg-black/85 rounded-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10 h-full flex flex-col">
                <h3 className="text-xl md:text-2xl font-extralight mb-3 md:mb-4 text-white">Special Awards</h3>
                <div className="space-y-2 md:space-y-3 flex-grow text-sm md:text-base">
                  <div className="text-gray-300">• Most Innovative Solution</div>
                  <div className="text-gray-300">• Best Community Impact</div>
                  <div className="text-gray-300">• Technical Excellence</div>
                  <div className="text-gray-300">• People's Choice Award</div>
                </div>
                <div className="mt-4 text-xs text-gray-400">
                  $10,000 each + recognition
                </div>
              </div>
            </motion.div>
          </div>

          {/* Additional Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-extralight mb-8 text-white">Additional Benefits for Winners</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-lg font-medium text-white mb-3">Q3 2025 Grants</h4>
                <p className="text-gray-400 text-sm">All winners eligible for additional grants in XFI and stablecoins</p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-lg font-medium text-white mb-3">Incubation Program</h4>
                <p className="text-gray-400 text-sm">Join the CrossFi incubation program with mentorship and resources</p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-lg font-medium text-white mb-3">Community Support</h4>
                <p className="text-gray-400 text-sm">Ongoing support from CrossFi developers and community</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 