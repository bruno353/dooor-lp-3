'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Users, Target, Zap, Shield, ArrowRight, CheckCircle, Mail, ChevronDown } from 'lucide-react'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import BlobAnimation from '../../components/BlobAnimation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

export default function Partnership() {
  // Refs for each slide section
  const containerRef = useRef<HTMLDivElement>(null)
  const slide1Ref = useRef<HTMLElement>(null)
  const slide2Ref = useRef<HTMLElement>(null)
  const slide3Ref = useRef<HTMLElement>(null)
  const slide4Ref = useRef<HTMLElement>(null)
  const slide5Ref = useRef<HTMLElement>(null)
  const slide6Ref = useRef<HTMLElement>(null)
  const slide7Ref = useRef<HTMLElement>(null)
  const slide8Ref = useRef<HTMLElement>(null)
  const slide9Ref = useRef<HTMLElement>(null)

  useEffect(() => {
    // Only apply GSAP effects on desktop (large screens)
    if (window.innerWidth < 1024) {
      return // Skip GSAP animations on mobile/tablet
    }

    const container = containerRef.current
    if (!container) return

    // Set up scroll snapping
    gsap.set(container, {
      scrollBehavior: "smooth"
    })

    // Add snap scrolling
    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      snap: {
        snapTo: "labels",
        duration: { min: 0.2, max: 1 },
        delay: 0.1,
        ease: "power2.inOut"
      }
    })

    // Helper function to create slide animation (for slides 2-8)
    const createSlideAnimation = (slideRef: React.RefObject<HTMLElement>, staggerDelay = 0.15) => {
      if (!slideRef.current) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: slideRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
          pinSpacing: false
        }
      })

      tl.fromTo(
        slideRef.current.querySelectorAll('.slide-element'),
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1, stagger: staggerDelay }
      )
      .to(
        slideRef.current.querySelectorAll('.slide-element'),
        { opacity: 0, y: -100, duration: 0.5, stagger: 0.1 },
        "+=0.5"
      )
    }

    // First slide (Hero) - appears immediately and only exits on scroll
    if (slide1Ref.current) {
      // Make sure first slide elements are visible from the start
      gsap.set(slide1Ref.current.querySelectorAll('.slide-element'), {
        opacity: 1,
        y: 0
      })

      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: slide1Ref.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
          pinSpacing: false
        }
      })

      // Only animate exit (no entrance animation)
      tl1.to(
        slide1Ref.current.querySelectorAll('.slide-element'),
        { opacity: 0, y: -100, duration: 0.5, stagger: 0.1 }
      )
    }

    // Create animations for slides 2-8 (with entrance and exit)
    createSlideAnimation(slide2Ref, 0.15)
    createSlideAnimation(slide3Ref, 0.15)
    createSlideAnimation(slide4Ref, 0.2)
    createSlideAnimation(slide5Ref, 0.2)
    createSlideAnimation(slide6Ref, 0.2)
    createSlideAnimation(slide7Ref, 0.15)
    createSlideAnimation(slide8Ref, 0.2)
    
    // Last slide (CTA) - entrance only, no exit animation
    if (slide9Ref.current) {
      const tl9 = gsap.timeline({
        scrollTrigger: {
          trigger: slide9Ref.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: true,
          pinSpacing: true
        }
      })

      tl9.fromTo(
        slide9Ref.current.querySelectorAll('.slide-element'),
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.3 }
      )
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const handleEmailContact = () => {
    window.location.href = 'mailto:thiago@dooor.ai?subject=Partnership Inquiry'
  }

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
      
      {/* Desktop: GSAP Slide Layout */}
      <div ref={containerRef} className="hidden lg:block">
        {/* Slide 1 - Hero Section */}
        <section ref={slide1Ref} className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="slide-element">
              <h1 className="text-4xl lg:text-7xl font-extralight mb-8 leading-tight">
                We Don't Sell Products. <br />
                <span className="text-transparent bg-gradient-to-b from-gray-100 to-gray-400/50 bg-clip-text">
                  We Build Strategic Capabilities.
                </span>
              </h1>
            </div>
            
            <div className="slide-element max-w-5xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-white/10 text-left">
                <blockquote className="text-lg lg:text-2xl font-extralight text-gray-300 leading-relaxed">
                  Traditional vendor relationships fail when tackling transformative challenges. At Dooor, we believe the most powerful and enduring solutions are{' '}
                  <strong className="text-white">built together</strong>. Our co-development partnership model is designed to forge deep alliances with industry leaders, embedding our team with yours to build the future, side-by-side.
                </blockquote>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="slide-element absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ChevronDown className="h-8 w-8 text-white/60" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Slide 2 - Problem Statement */}
        <section ref={slide2Ref} className="relative h-screen flex items-center justify-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="slide-element">
              <h2 className="text-4xl lg:text-6xl font-extralight mb-8">
                Beyond the RFP: <span className="text-gray-400">The Limits of Traditional Procurement</span>
              </h2>
            </div>

            <div className="slide-element max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 text-left">
                <p className="text-xl lg:text-2xl font-extralight text-gray-300 leading-relaxed mb-6">
                  For challenges as complex as deploying enterprise-wide AI, the standard model of buying off-the-shelf software is broken. Generic solutions rarely fit the unique workflows of sophisticated organizations, leading to failed implementations, low adoption, and wasted investment.
                </p>
                <p className="text-lg lg:text-xl font-extralight text-gray-400 leading-relaxed">
                  We created our partnership model to solve this. It's built on a simple premise:{' '}
                  <strong className="text-white">the people closest to the problem are essential to building the solution.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 3 - Partnership Benefits */}
        <section ref={slide3Ref} className="relative h-screen flex items-center justify-center">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="slide-element text-center mb-12">
              <h2 className="text-3xl lg:text-5xl font-extralight mb-6">
                Our Partnership Approach
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="slide-element bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-medium text-white mb-4">From Vendor to Partner</h3>
                <p className="text-gray-400 font-extralight leading-relaxed">
                  We move beyond transactional sales to become a strategic extension of your team, deeply invested in your long-term success.
                </p>
              </div>

              <div className="slide-element bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-medium text-white mb-4">From Generic to Bespoke</h3>
                <p className="text-gray-400 font-extralight leading-relaxed">
                  We don't force you into a one-size-fits-all product. We use our foundational platform to build tailored capabilities that solve your specific challenges.
                </p>
              </div>

              <div className="slide-element bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-medium text-white mb-4">From Risk to Shared Investment</h3>
                <p className="text-gray-400 font-extralight leading-relaxed">
                  We structure our engagements as a mutual investment in a shared vision, ensuring our goals are perfectly aligned with yours from day one.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 4 - Framework Introduction */}
        <section ref={slide4Ref} className="relative h-screen flex items-center justify-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="slide-element">
              <h2 className="text-4xl lg:text-6xl font-extralight mb-8">
                A Disciplined Framework for <span className="text-gray-400">Co-Creation</span>
              </h2>
            </div>
            
            <div className="slide-element max-w-4xl mx-auto">
              <p className="text-xl text-gray-400 font-extralight leading-relaxed mb-12">
                Our partnership model is a structured, three-part framework designed to ensure alignment, accelerate development, and deliver measurable results.
              </p>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-extralight mb-4 text-white">1.</div>
                    <h3 className="text-lg font-medium text-white mb-2">Dedicated Teams</h3>
                    <p className="text-gray-400 font-extralight text-sm">Your Embedded AI Pod</p>
                  </div>
                  <div>
                    <div className="text-3xl font-extralight mb-4 text-white">2.</div>
                    <h3 className="text-lg font-medium text-white mb-2">Mission-Aligned KPIs</h3>
                    <p className="text-gray-400 font-extralight text-sm">Defining Success Together</p>
                  </div>
                  <div>
                    <div className="text-3xl font-extralight mb-4 text-white">3.</div>
                    <h3 className="text-lg font-medium text-white mb-2">Mutual Investment</h3>
                    <p className="text-gray-400 font-extralight text-sm">Shared Risk & Reward</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 5 - Dedicated Teams */}
        <section ref={slide5Ref} className="relative h-screen flex items-center justify-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="slide-element">
                <div className="text-4xl font-extralight mb-6 text-white">1.</div>
                <h3 className="text-3xl lg:text-4xl font-medium text-white mb-6">
                  Dedicated Teams: Your Embedded AI Pod
                </h3>
                <p className="text-lg font-extralight text-gray-300 leading-relaxed mb-8">
                  From the moment we engage, we deploy a dedicated "pod" of elite Dooor talent to work exclusively on your mission. This isn't an outsourced support team; they are your partners in innovation.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-white mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-medium mb-2">Forward-Deployed Engineers & AI Scientists</h4>
                      <p className="text-gray-400 font-extralight text-sm">
                        Our technical experts work directly with your operational and IT teams, ensuring seamless integration and real-time problem-solving.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-white mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-medium mb-2">Executive Sponsorship</h4>
                      <p className="text-gray-400 font-extralight text-sm">
                        Each partnership has direct oversight from Dooor's founders, guaranteeing strategic alignment and swift decision-making.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="slide-element">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                  alt="Dedicated team collaboration"
                  className="w-full h-80 object-cover rounded-3xl grayscale"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Slide 6 - Mission-Aligned KPIs */}
        <section ref={slide6Ref} className="relative h-screen flex items-center justify-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="slide-element order-2 lg:order-1">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Mission-aligned KPIs"
                  className="w-full h-80 object-cover rounded-3xl grayscale"
                />
              </div>
              <div className="slide-element order-1 lg:order-2">
                <div className="text-4xl font-extralight mb-6 text-white">2.</div>
                <h3 className="text-3xl lg:text-4xl font-medium text-white mb-6">
                  Mission-Aligned KPIs: Defining Success Together
                </h3>
                <p className="text-lg font-extralight text-gray-300 leading-relaxed mb-8">
                  We begin every partnership by defining what success looks like, not for us, but for you. Our engagement is governed by clear, measurable Key Performance Indicators tied directly to your business outcomes.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-white mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-medium mb-2">Focus on Outcomes, Not Outputs</h4>
                      <p className="text-gray-400 font-extralight text-sm">
                        We measure success by the value we create (e.g., hours of clinical time saved, reduction in financial fraud, improved operational efficiency), not by the number of software features we ship.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-white mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-medium mb-2">Transparent Governance</h4>
                      <p className="text-gray-400 font-extralight text-sm">
                        A Joint Steering Committee with leaders from both organizations meets regularly to track progress against KPIs and ensure the project remains on course.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 7 - Mutual Investment */}
        <section ref={slide7Ref} className="relative h-screen flex items-center justify-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="slide-element">
                <div className="text-4xl font-extralight mb-6 text-white">3.</div>
                <h3 className="text-3xl lg:text-4xl font-medium text-white mb-6">
                  Mutual Investment: A Foundation of Shared Risk & Reward
                </h3>
                <p className="text-lg font-extralight text-gray-300 leading-relaxed mb-8">
                  Our financial model is designed to cement our role as a true partner. The engagement starts with a co-development fee that secures your dedicated Dooor team and covers the bespoke development work required to tailor our platform for you.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-white mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-medium mb-2">De-Risked for You</h4>
                      <p className="text-gray-400 font-extralight text-sm">
                        This model ensures you have a committed, world-class team focused solely on your success.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-white mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-medium mb-2">Ensures Our Commitment</h4>
                      <p className="text-gray-400 font-extralight text-sm">
                        It provides us with the resources to go above and beyond, investing our best talent and technology into solving your biggest challenges.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="slide-element">
                <img 
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2084&q=80"
                  alt="Mutual investment partnership"
                  className="w-full h-80 object-cover rounded-3xl grayscale"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Slide 8 - Who We Partner With */}
        <section ref={slide8Ref} className="relative h-screen flex items-center justify-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="slide-element text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-extralight mb-6">
                We Seek Visionary Leaders in <span className="text-gray-400">Demanding Industries</span>
              </h2>
              <p className="text-lg text-gray-400 font-extralight max-w-4xl mx-auto">
                Our co-development model is intensive and requires deep commitment. Therefore, we are selective in our partnerships. We seek to align with organizations that are:
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="slide-element bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 text-center">
                <Shield className="h-12 w-12 text-white mx-auto mb-6" />
                <h3 className="text-xl font-medium text-white mb-4">Leaders in Regulated Industries</h3>
                <p className="text-gray-400 font-extralight leading-relaxed">
                  Visionaries in sectors like healthcare, finance, and government who understand that trust and security are non-negotiable.
                </p>
              </div>

              <div className="slide-element bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 text-center">
                <Target className="h-12 w-12 text-white mx-auto mb-6" />
                <h3 className="text-xl font-medium text-white mb-4">Facing Complex, High-Stakes Challenges</h3>
                <p className="text-gray-400 font-extralight leading-relaxed">
                  Organizations with ambitious goals that cannot be solved by off-the-shelf technology.
                </p>
              </div>

              <div className="slide-element bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 text-center">
                <Users className="h-12 w-12 text-white mx-auto mb-6" />
                <h3 className="text-xl font-medium text-white mb-4">Committed to True Collaboration</h3>
                <p className="text-gray-400 font-extralight leading-relaxed">
                  Partners who are willing to engage deeply, share insights, and build together for the long term.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 9 - Call to Action */}
        <section ref={slide9Ref} className="relative h-screen flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="slide-element">
              <h2 className="text-4xl lg:text-6xl font-extralight mb-8">
                Let's Build Your <span className="text-gray-400">Strategic Advantage.</span>
              </h2>
            </div>
            
            <div className="slide-element">
              <p className="text-xl font-extralight text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                If you are ready to move beyond traditional vendor relationships and are looking for a dedicated partner to help solve your most critical challenges with Verifiable AI, let's begin the conversation.
              </p>
            </div>
            
            <div className="slide-element">
              <motion.button
                onClick={handleEmailContact}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-200 transition-all inline-flex items-center"
              >
                <Mail className="h-5 w-5 mr-3" />
                <a href="/contact">
                Start the Conversation
                </a>
                <ArrowRight className="h-5 w-5 ml-3" />
              </motion.button>
            </div>
          </div>
        </section>
      </div>

      {/* Mobile: Simple Vertical Layout */}
      <div className="lg:hidden">
        {/* Hero Section - Mobile */}
        <section className="relative py-20 pt-32 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-3xl sm:text-4xl font-extralight mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              We Don't Sell Products. <br />
              <span className="text-transparent bg-gradient-to-b from-gray-100 to-gray-400/50 bg-clip-text">
                We Build Strategic Capabilities.
              </span>
            </motion.h1>
            
            <motion.div 
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <blockquote className="text-base sm:text-lg font-extralight text-gray-300 leading-relaxed">
                Traditional vendor relationships fail when tackling transformative challenges. At Dooor, we believe the most powerful and enduring solutions are{' '}
                <strong className="text-white">built together</strong>. Our co-development partnership model is designed to forge deep alliances with industry leaders, embedding our team with yours to build the future, side-by-side.
              </blockquote>
            </motion.div>
          </div>
        </section>

        {/* Problem Statement - Mobile */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-2xl sm:text-3xl font-extralight mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Beyond the RFP: <span className="text-gray-400">The Limits of Traditional Procurement</span>
            </motion.h2>

            <motion.div 
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-base sm:text-lg font-extralight text-gray-300 leading-relaxed mb-6">
                For challenges as complex as deploying enterprise-wide AI, the standard model of buying off-the-shelf software is broken. Generic solutions rarely fit the unique workflows of sophisticated organizations, leading to failed implementations, low adoption, and wasted investment.
              </p>
              <p className="text-sm sm:text-base font-extralight text-gray-400 leading-relaxed">
                We created our partnership model to solve this. It's built on a simple premise:{' '}
                <strong className="text-white">the people closest to the problem are essential to building the solution.</strong>
              </p>
            </motion.div>
          </div>
        </section>

        {/* Partnership Benefits - Mobile */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl font-extralight mb-6">
                Our Partnership Approach
              </h2>
            </motion.div>

            <div className="space-y-6">
              <motion.div 
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-medium text-white mb-4">From Vendor to Partner</h3>
                <p className="text-gray-400 font-extralight leading-relaxed text-sm">
                  We move beyond transactional sales to become a strategic extension of your team, deeply invested in your long-term success.
                </p>
              </motion.div>

              <motion.div 
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-medium text-white mb-4">From Generic to Bespoke</h3>
                <p className="text-gray-400 font-extralight leading-relaxed text-sm">
                  We don't force you into a one-size-fits-all product. We use our foundational platform to build tailored capabilities that solve your specific challenges.
                </p>
              </motion.div>

              <motion.div 
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-medium text-white mb-4">From Risk to Shared Investment</h3>
                <p className="text-gray-400 font-extralight leading-relaxed text-sm">
                  We structure our engagements as a mutual investment in a shared vision, ensuring our goals are perfectly aligned with yours from day one.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Framework Introduction - Mobile */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-2xl sm:text-3xl font-extralight mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              A Disciplined Framework for <span className="text-gray-400">Co-Creation</span>
            </motion.h2>
            
            <motion.p 
              className="text-base text-gray-400 font-extralight leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Our partnership model is a structured, three-part framework designed to ensure alignment, accelerate development, and deliver measurable results.
            </motion.p>
            
            <motion.div 
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="space-y-8">
                <div>
                  <div className="text-2xl font-extralight mb-4 text-white">1.</div>
                  <h3 className="text-base font-medium text-white mb-2">Dedicated Teams</h3>
                  <p className="text-gray-400 font-extralight text-sm">Your Embedded AI Pod</p>
                </div>
                <div>
                  <div className="text-2xl font-extralight mb-4 text-white">2.</div>
                  <h3 className="text-base font-medium text-white mb-2">Mission-Aligned KPIs</h3>
                  <p className="text-gray-400 font-extralight text-sm">Defining Success Together</p>
                </div>
                <div>
                  <div className="text-2xl font-extralight mb-4 text-white">3.</div>
                  <h3 className="text-base font-medium text-white mb-2">Mutual Investment</h3>
                  <p className="text-gray-400 font-extralight text-sm">Shared Risk & Reward</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Dedicated Teams - Mobile */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-extralight mb-6 text-white">1.</div>
              <h3 className="text-xl sm:text-2xl font-medium text-white mb-6">
                Dedicated Teams: Your Embedded AI Pod
              </h3>
              <p className="text-base font-extralight text-gray-300 leading-relaxed mb-8">
                From the moment we engage, we deploy a dedicated "pod" of elite Dooor talent to work exclusively on your mission. This isn't an outsourced support team; they are your partners in innovation.
              </p>
            </motion.div>

            <motion.img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
              alt="Dedicated team collaboration"
              className="w-full h-48 object-cover rounded-2xl grayscale mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />

            <div className="space-y-6">
              <motion.div 
                className="flex items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <CheckCircle className="h-6 w-6 text-white mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-medium mb-2">Forward-Deployed Engineers & AI Scientists</h4>
                  <p className="text-gray-400 font-extralight text-sm">
                    Our technical experts work directly with your operational and IT teams, ensuring seamless integration and real-time problem-solving.
                  </p>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <CheckCircle className="h-6 w-6 text-white mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-medium mb-2">Executive Sponsorship</h4>
                  <p className="text-gray-400 font-extralight text-sm">
                    Each partnership has direct oversight from Dooor's founders, guaranteeing strategic alignment and swift decision-making.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission-Aligned KPIs - Mobile */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Mission-aligned KPIs"
              className="w-full h-48 object-cover rounded-2xl grayscale mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            />

            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-extralight mb-6 text-white">2.</div>
              <h3 className="text-xl sm:text-2xl font-medium text-white mb-6">
                Mission-Aligned KPIs: Defining Success Together
              </h3>
              <p className="text-base font-extralight text-gray-300 leading-relaxed mb-8">
                We begin every partnership by defining what success looks like, not for us, but for you. Our engagement is governed by clear, measurable Key Performance Indicators tied directly to your business outcomes.
              </p>
            </motion.div>

            <div className="space-y-6">
              <motion.div 
                className="flex items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <CheckCircle className="h-6 w-6 text-white mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-medium mb-2">Focus on Outcomes, Not Outputs</h4>
                  <p className="text-gray-400 font-extralight text-sm">
                    We measure success by the value we create (e.g., hours of clinical time saved, reduction in financial fraud, improved operational efficiency), not by the number of software features we ship.
                  </p>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <CheckCircle className="h-6 w-6 text-white mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-medium mb-2">Transparent Governance</h4>
                  <p className="text-gray-400 font-extralight text-sm">
                    A Joint Steering Committee with leaders from both organizations meets regularly to track progress against KPIs and ensure the project remains on course.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mutual Investment - Mobile */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-extralight mb-6 text-white">3.</div>
              <h3 className="text-xl sm:text-2xl font-medium text-white mb-6">
                Mutual Investment: A Foundation of Shared Risk & Reward
              </h3>
              <p className="text-base font-extralight text-gray-300 leading-relaxed mb-8">
                Our financial model is designed to cement our role as a true partner. The engagement starts with a co-development fee that secures your dedicated Dooor team and covers the bespoke development work required to tailor our platform for you.
              </p>
            </motion.div>

            <motion.img 
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2084&q=80"
              alt="Mutual investment partnership"
              className="w-full h-48 object-cover rounded-2xl grayscale mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />

            <div className="space-y-6">
              <motion.div 
                className="flex items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <CheckCircle className="h-6 w-6 text-white mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-medium mb-2">De-Risked for You</h4>
                  <p className="text-gray-400 font-extralight text-sm">
                    This model ensures you have a committed, world-class team focused solely on your success.
                  </p>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <CheckCircle className="h-6 w-6 text-white mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-medium mb-2">Ensures Our Commitment</h4>
                  <p className="text-gray-400 font-extralight text-sm">
                    It provides us with the resources to go above and beyond, investing our best talent and technology into solving your biggest challenges.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Who We Partner With - Mobile */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl font-extralight mb-6">
                We Seek Visionary Leaders in <span className="text-gray-400">Demanding Industries</span>
              </h2>
              <p className="text-base text-gray-400 font-extralight">
                Our co-development model is intensive and requires deep commitment. Therefore, we are selective in our partnerships. We seek to align with organizations that are:
              </p>
            </motion.div>

            <div className="space-y-6">
              <motion.div 
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Shield className="h-10 w-10 text-white mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-4">Leaders in Regulated Industries</h3>
                <p className="text-gray-400 font-extralight leading-relaxed text-sm">
                  Visionaries in sectors like healthcare, finance, and government who understand that trust and security are non-negotiable.
                </p>
              </motion.div>

              <motion.div 
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Target className="h-10 w-10 text-white mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-4">Facing Complex, High-Stakes Challenges</h3>
                <p className="text-gray-400 font-extralight leading-relaxed text-sm">
                  Organizations with ambitious goals that cannot be solved by off-the-shelf technology.
                </p>
              </motion.div>

              <motion.div 
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Users className="h-10 w-10 text-white mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-4">Committed to True Collaboration</h3>
                <p className="text-gray-400 font-extralight leading-relaxed text-sm">
                  Partners who are willing to engage deeply, share insights, and build together for the long term.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Call to Action - Mobile */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-2xl sm:text-3xl font-extralight mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Let's Build Your <span className="text-gray-400">Strategic Advantage.</span>
            </motion.h2>
            
            <motion.p 
              className="text-base font-extralight text-gray-400 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              If you are ready to move beyond traditional vendor relationships and are looking for a dedicated partner to help solve your most critical challenges with Verifiable AI, let's begin the conversation.
            </motion.p>
            
            <motion.button
              onClick={handleEmailContact}
              className="bg-white text-black px-6 py-3 rounded-full text-base font-medium hover:bg-gray-200 transition-all inline-flex items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="h-4 w-4 mr-3" />
              <a href="/contact">
              Start the Conversation
              </a>
              <ArrowRight className="h-4 w-4 ml-3" />
            </motion.button>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
} 