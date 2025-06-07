'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Target, Eye, Users, Heart, Shield, Zap, Mail, ChevronDown } from 'lucide-react'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import BlobAnimation from '../../components/BlobAnimation'

export default function Company() {
  const videoRef = useRef<HTMLVideoElement>(null)

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

  const handleEmailContact = () => {
    window.location.href = 'mailto:thiago@dooor.ai?subject=Career Opportunity at Dooor'
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute opacity-100 inset-0" style={{ zIndex: 2 }}>
          <video
            ref={videoRef}
            src="/9153-217588676_small.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="text-4xl lg:text-8xl font-extralight mb-12 leading-tight text-transparent bg-gradient-to-b from-gray-100 to-gray-400/50 bg-clip-text">
              The Company Building the Future of{' '}
              <span className="text-gray-400">Verifiable AI</span>
            </h1>
            
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-extralight mb-8 text-white">
                We are building the infrastructure for the next generation of AI.
              </h2>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/10 text-left">
                <blockquote className="text-xl lg:text-2xl font-extralight text-gray-300 leading-relaxed italic">
                  "The power of artificial intelligence will redefine every industry. But this power demands a new foundation—one built not on hype, but on mathematical proof, data sovereignty, and unwavering trust. At Dooor, our single focus is to build this foundation."
                </blockquote>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          style={{ zIndex: 10 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className="h-8 w-8 text-white/60" />
          </motion.div>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="py-4 mt-36 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/10"
            >
              <div className="flex items-center mb-8">
                <Target className="h-8 w-8 text-white mr-4" />
                <h2 className="text-2xl font-medium text-white">Our Mission</h2>
              </div>
              <h3 className="text-2xl lg:text-3xl font-extralight text-white leading-relaxed">
                To empower organizations to transform their wisdom into value, while maintaining absolute sovereignty over their data and models.
              </h3>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/10"
            >
              <div className="flex items-center mb-8">
                <Eye className="h-8 w-8 text-white mr-4" />
                <h2 className="text-2xl font-medium text-white">Our Vision</h2>
              </div>
              <p className="text-xl font-extralight text-gray-300 leading-relaxed">
                We envision a future where the most critical decisions in society are enhanced by artificial intelligence that is fully{' '}
                <strong className="text-white">transparent</strong>,{' '}
                <strong className="text-white">provably honest</strong>, and{' '}
                <strong className="text-white">securely under the control</strong> of its owner. We are creating a world where AI doesn't just provide answers, but also provides the proof.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-extralight mb-8">
              From Two Worlds, <span className="text-gray-400">One Vision</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/10"
          >
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-xl font-extralight text-gray-300 leading-relaxed mb-6">
                Dooor was born at the intersection of two vastly different worlds: the demanding, high-stakes environment of heavy industry and the fast-paced, cutting-edge innovation of decentralized technology.
              </p>
              
              <p className="text-lg font-extralight text-gray-300 leading-relaxed mb-6">
                Our CEO, Thiago Castroneves, spent over a decade designing, negotiating, and implementing complex, mission-critical solutions for the global steel industry. This experience forged a deep understanding of the real-world challenges faced by large enterprises: where security, reliability, and operational integrity are paramount. Transitioning to the world of Web3, he reviewed over 700 projects, searching for technologies with the potential to solve problems at an institutional grade.
              </p>
              
              <p className="text-lg font-extralight text-gray-300 leading-relaxed mb-6">
                The breakthrough came with project #725 and its founder, Bruno Laureano. Bruno, a pioneering young engineer, had developed an award-winning AI agent, but faced the classic enterprise adoption problem: companies would not risk their sensitive intellectual property with an outside provider. In response, he engineered an elegant solution: a decentralized orchestration and compute layer that allowed his AI to run in a trustlessly private and secure "space."
              </p>
              
              <p className="text-lg font-extralight text-gray-300 leading-relaxed mb-6">
                Thiago saw the immense, untapped potential. Bruno had solved the privacy issue for a single use case; together, they realized his architecture could become the bridge for the entire AI ecosystem. It could be a new standard, a secure layer allowing the world's most innovative open-source models to be used by the world's most demanding enterprises with absolute privacy and IP protection.
              </p>
              
              <p className="text-lg font-extralight text-gray-300 leading-relaxed mb-6">
                This was the opening for <strong className="text-white">Dooor.</strong> The triple 'O' a manifesto for a new, unconventional way of enabling collaboration.
              </p>
              
              <p className="text-lg font-extralight text-gray-300 leading-relaxed mb-6">
                But one critical question remained. If the AI operates in total privacy, how can its outputs be trusted? What prevents malicious or flawed information? The answer led to our final architectural layer and our core identity: Zero-Knowledge Proofs. By adding the power of cryptographic verification, we evolved from a private AI platform to the world's first OS for <strong className="text-white">Verifiable AI</strong>.
              </p>
              
              <p className="text-lg font-extralight text-gray-300 leading-relaxed">
                Today, our multi-layered architecture is complete: a one-of-a-kind mesh that makes it possible to trust the outputs of AI, not by seeing the data, but by seeing the proof.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Team */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-extralight mb-8">
              The <span className="text-gray-400">Team</span>
            </h2>
            <p className="text-xl text-gray-400 font-extralight">
              Dooor is led by its founders, who bring a combined expertise in full-stack development, enterprise architecture, and user-centric design.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Thiago */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
            >
              <div className="flex items-start space-x-6 mb-6">
                <img 
                  src="/thiago.png" 
                  alt="Thiago Castroneves"
                  className="w-20 h-20 rounded-2xl grayscale object-cover"
                />
                <div>
                  <h3 className="text-xl font-medium text-white mb-1">Thiago Castroneves</h3>
                  <p className="text-gray-400 font-extralight">Co-Founder & Chief Executive Officer</p>
                </div>
              </div>
              <p className="text-gray-300 font-extralight leading-relaxed">
                Thiago Castroneves is the Co-Founder and CEO of Dooor. He brings a rare perspective to enterprise AI, forged over 15 years designing and implementing mission-critical operational solutions for industrial giant Enviri (formerly Harsco). In roles spanning engineering, innovation, and business development, he developed a deep understanding of the security, reliability, and complexity challenges faced by large-scale, regulated organizations.
              </p>
              <p className="text-gray-300 font-extralight leading-relaxed mt-4">
                Seeking new models for innovation, Thiago transitioned to the decentralized technology space, where he served as Head of Business Development for the Moonbeam Foundation. There, he cultivated the ecosystem by evaluating over 700 technology projects, giving him an unparalleled market view. This unique journey—from the realities of heavy industry to the frontier of Web3—led him to co-found Dooor, with the mission of bridging the gap and providing enterprises with AI that is not only powerful, but also provably trustworthy.
              </p>
            </motion.div>

            {/* Bruno */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
            >
              <div className="flex items-start space-x-6 mb-6">
                <img 
                  src="/bruno.jpeg" 
                  alt="Bruno Laureano"
                  className="w-20 h-20 rounded-2xl grayscale object-cover"
                />
                <div>
                  <h3 className="text-xl font-medium text-white mb-1">Bruno Laureano</h3>
                  <p className="text-gray-400 font-extralight">Co-Founder & Chief Technology Officer</p>
                </div>
              </div>
              <p className="text-gray-300 font-extralight leading-relaxed">
                Bruno Laureano is the Co-Founder and CTO of Dooor and the original architect of its Verifiable AI platform. A pioneering engineer in agentic AI, Bruno first developed an award-winning AI auditing agent for GitHub. When faced with the critical enterprise adoption barrier—the risk of sharing sensitive IP—he engineered the elegant decentralized architecture that became the core of Dooor.
              </p>
              <p className="text-gray-300 font-extralight leading-relaxed mt-4">
                His work solves the fundamental problem of how to make third-party AI safely usable within secure enterprise environments. With deep expertise in decentralized systems, applied cryptography, and full-stack development, Bruno leads the technical vision to build AI frameworks that are scalable, efficient, and fundamentally secure by design.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Principles */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-extralight mb-8">
              What We <span className="text-gray-400">Stand For</span>
            </h2>
            <p className="text-xl text-gray-400 font-extralight">
              Our culture and our code are guided by a core set of principles.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center"
            >
              <h3 className="text-lg font-medium text-white mb-4">Human-First</h3>
              <p className="text-gray-400 font-extralight text-sm leading-relaxed">
                Technology must serve its users. We are committed to building powerful tools that are intuitive, accessible, and designed to augment human potential, not replace it.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center"
            >
              <h3 className="text-lg font-medium text-white mb-4">Composed & Disciplined</h3>
              <p className="text-gray-400 font-extralight text-sm leading-relaxed">
                We believe in quiet excellence. Our design philosophy favors minimalism, clarity, and robust performance over superficial features. We build things that work, reliably and elegantly.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center"
            >
              <h3 className="text-lg font-medium text-white mb-4">Empowering by Default</h3>
              <p className="text-gray-400 font-extralight text-sm leading-relaxed">
                Our goal is to empower our partners and users. We provide the tools and frameworks that give them control, ownership, and the freedom to innovate on their own terms.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center"
            >
              <h3 className="text-lg font-medium text-white mb-4">Transparent by Design</h3>
              <p className="text-gray-400 font-extralight text-sm leading-relaxed">
                We believe trust is earned through transparency. From our open communication with partners to the auditable nature of our platform, we are committed to building in the clear.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Careers */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-extralight mb-8">
              Join Us in Building <span className="text-gray-400">the Future</span>
            </h2>
            <p className="text-xl text-gray-400 font-extralight mb-12 leading-relaxed">
              We are always looking for brilliant, mission-driven individuals who are passionate about solving the most important challenges in technology. If you are an expert in decentralized systems, applied cryptography, or enterprise AI, we would love to hear from you.
            </p>
            <motion.button
              onClick={handleEmailContact}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-200 transition-all inline-flex items-center"
            >
              <Mail className="h-5 w-5 mr-3" />
              Explore Opportunities
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 