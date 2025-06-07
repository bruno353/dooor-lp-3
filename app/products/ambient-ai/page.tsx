'use client'

import { motion } from 'framer-motion'
import { Brain, Shield, Zap, Database, CheckCircle, Clock, Globe } from 'lucide-react'
import Navigation from '../../../components/Navigation'
import Footer from '../../../components/Footer'

export default function AmbientAI() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium inline-block mb-6">
                DOCUMENTATION
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Ambient AI <span className="text-gradient">Clinical Documentation</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                Effortless Notes, More Patient Time. Our Ambient AI listens securely to patient consultations, generates accurate clinical notes in real time, and integrates seamlessly with your existing EHR.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-white px-8 py-4 rounded-full text-lg font-medium"
                >
                  Request Demo
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-gray-400 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  View Documentation
                </motion.button>
              </div>
              
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-cyan-400 mb-2">90%+</div>
                  <div className="text-sm text-gray-400">Accuracy Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400 mb-2">2-3h</div>
                  <div className="text-sm text-gray-400">Time Saved Daily</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-400 mb-2">48h</div>
                  <div className="text-sm text-gray-400">Implementation</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                <img 
                  src="/api/placeholder/600/400" 
                  alt="Ambient AI Dashboard" 
                  className="w-full rounded-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Floating background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Key Features</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Advanced AI capabilities designed specifically for Brazilian healthcare workflows
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-gray-800 rounded-2xl p-8"
            >
              <Globe className="h-12 w-12 text-blue-400 mb-6" />
              <h3 className="text-xl font-bold mb-4">Real-time, Multilingual Documentation</h3>
              <p className="text-gray-300">
                Supports Portuguese and English with medical terminology recognition, ensuring accurate transcription of clinical conversations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gray-800 rounded-2xl p-8"
            >
              <CheckCircle className="h-12 w-12 text-green-400 mb-6" />
              <h3 className="text-xl font-bold mb-4">90%+ Accuracy</h3>
              <p className="text-gray-300">
                Advanced NLP models trained on medical conversations deliver exceptional accuracy with minimal editing required.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-gray-800 rounded-2xl p-8"
            >
              <Shield className="h-12 w-12 text-cyan-400 mb-6" />
              <h3 className="text-xl font-bold mb-4">LGPD-Compliant Data Handling</h3>
              <p className="text-gray-300">
                TEE-powered security ensures patient data never leaves secure environments, meeting all Brazilian privacy requirements.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gray-800 rounded-2xl p-8"
            >
              <Zap className="h-12 w-12 text-yellow-400 mb-6" />
              <h3 className="text-xl font-bold mb-4">No Workflow Disruption</h3>
              <p className="text-gray-300">
                Seamlessly integrates with existing clinical workflows without requiring training or behavior changes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-gray-800 rounded-2xl p-8"
            >
              <Database className="h-12 w-12 text-purple-400 mb-6" />
              <h3 className="text-xl font-bold mb-4">EHR Integration</h3>
              <p className="text-gray-300">
                Direct integration with major Brazilian EHR systems including Tasy, MV Soul, and Philips Tasy.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-gray-800 rounded-2xl p-8"
            >
              <Clock className="h-12 w-12 text-orange-400 mb-6" />
              <h3 className="text-xl font-bold mb-4">Rapid Deployment</h3>
              <p className="text-gray-300">
                Full implementation in 48 hours with minimal IT infrastructure requirements and ongoing support.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">How It Works</h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="bg-blue-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto lg:mx-0 mb-6">
                <span className="text-2xl font-bold text-blue-400">1</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Secure Listening</h3>
              <p className="text-gray-300 text-lg">
                With patient consent, our ambient AI securely captures and processes conversation audio using TEE technology.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-cyan-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-cyan-400">2</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">AI Processing</h3>
              <p className="text-gray-300 text-lg">
                Advanced NLP models extract clinical information and generate structured documentation in real-time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center lg:text-right"
            >
              <div className="bg-green-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto lg:mx-0 mb-6">
                <span className="text-2xl font-bold text-green-400">3</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">EHR Integration</h3>
              <p className="text-gray-300 text-lg">
                Generated notes are automatically formatted and integrated into your existing EHR system for immediate use.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Documentation Process?</h2>
            <p className="text-xl text-gray-300 mb-8">
              See how Dooor's Ambient AI can save your clinicians 2-3 hours per day while improving documentation quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-white px-8 py-4 rounded-full text-lg font-medium">
                Schedule Demo
              </button>
              <button className="border border-gray-400 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors">
                Contact Sales
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 