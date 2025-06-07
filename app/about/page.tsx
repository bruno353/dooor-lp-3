'use client'

import { motion } from 'framer-motion'
import { Shield, Users, Globe, Award } from 'lucide-react'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Who We Are
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Dooor is a healthcare technology company dedicated to transforming patient care and clinical workflows with advanced, ethical, and compliant AI.
            </p>
          </motion.div>
        </div>
        
        {/* Floating background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-300 mb-6">
                Our mission is to help providers spend less time on screens and more time with patients—restoring the human touch in every healthcare interaction.
              </p>
              <p className="text-lg text-gray-300 mb-8">
                We believe that technology should enhance, not replace, the doctor-patient relationship. Every solution we build is designed with clinicians at the center, ensuring that AI serves as a powerful ally in delivering compassionate, personalized care.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">2-3h</div>
                  <div className="text-sm text-gray-400">Time saved per day</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">90%+</div>
                  <div className="text-sm text-gray-400">Documentation accuracy</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gray-800 rounded-2xl p-8">
                <img 
                  src="/api/placeholder/500/400" 
                  alt="Healthcare Team" 
                  className="w-full rounded-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Why Dooor?</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-gray-900 rounded-2xl p-8 h-full">
                <Users className="h-16 w-16 text-blue-400 mx-auto mb-6" />
                <h3 className="text-xl font-bold mb-4">Clinician-Centric</h3>
                <p className="text-gray-300">
                  Designed with and for healthcare professionals who understand real workflow challenges.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-gray-900 rounded-2xl p-8 h-full">
                <Shield className="h-16 w-16 text-cyan-400 mx-auto mb-6" />
                <h3 className="text-xl font-bold mb-4">Humanized AI</h3>
                <p className="text-gray-300">
                  Technology that enhances—not replaces—the doctor-patient relationship.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center"
            >
              <div className="bg-gray-900 rounded-2xl p-8 h-full">
                <Globe className="h-16 w-16 text-green-400 mx-auto mb-6" />
                <h3 className="text-xl font-bold mb-4">Local Expertise</h3>
                <p className="text-gray-300">
                  Portuguese language models and full LGPD compliance for the Brazilian market.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center"
            >
              <div className="bg-gray-900 rounded-2xl p-8 h-full">
                <Award className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
                <h3 className="text-xl font-bold mb-4">Scalable</h3>
                <p className="text-gray-300">
                  Proven in large, complex hospital networks across Brazil and Latin America.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Healthcare infrastructure built by the world's best</h2>
            <div className="flex flex-wrap justify-center gap-4 text-lg text-gray-300">
              <span>engineers.</span>
              <span>designers.</span>
              <span>security engineers.</span>
              <span>healthcare experts.</span>
              <span>innovators.</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-800 rounded-2xl p-12 text-center"
          >
            <h3 className="text-2xl font-bold mb-6">Ready to transform your healthcare organization?</h3>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's build the future of healthcare, together. Contact us to see how Dooor can revolutionize your clinical workflows.
            </p>
            <button className="btn-primary text-white px-8 py-4 rounded-full text-lg font-medium">
              Contact Us
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 