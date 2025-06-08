'use client'

import React from 'react'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extralight mb-4">
              Privacy <span className="text-gray-400">Policy</span>
            </h1>
          </div>

          {/* Content */}
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-gray-400 font-extralight mb-8">
              <strong>Last Updated:</strong> June 8th, 2025
            </p>

            <section className="mb-12">
              <h2 className="text-2xl font-extralight text-white mb-6">1. Introduction & Our Mission</h2>
              <p className="text-gray-300 font-extralight leading-relaxed mb-4">
                Welcome to Dooor. We are the enterprise platform for building and deploying Private, Ownable, and Auditable AI solutions. Our mission is to empower organizations to transform their wisdom into value, while maintaining absolute sovereignty over their data and models.
              </p>
              <p className="text-gray-300 font-extralight leading-relaxed">
                This Privacy Policy explains how we handle information in the context of our technology and our Co-Development Partnerships. Our commitment to privacy is not just a policy; it is engineered into the core of our platform through our standard of Verifiable AI.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-extralight text-white mb-6">2. Our Core Privacy Principles: The Verifiable AI Standard</h2>
              <p className="text-gray-300 font-extralight leading-relaxed mb-6">
                Our platform is founded on three pillars that define our approach to data privacy and security:
              </p>
              <ul className="space-y-4 mb-6">
                <li className="text-gray-300 font-extralight leading-relaxed">
                  <strong className="text-white">Private & Ownable:</strong> Our decentralized architecture and self-hosted deployment options are designed to ensure that our partners' data and AI models remain within their own environment and under their absolute control.
                </li>
                <li className="text-gray-300 font-extralight leading-relaxed">
                  <strong className="text-white">Verifiable:</strong> We use Zero-Knowledge Proofs to mathematically prove the integrity of AI-generated results without exposing the underlying sensitive source data. This makes trust a mathematical certainty, not just a belief.
                </li>
                <li className="text-gray-300 font-extralight leading-relaxed">
                  <strong className="text-white">Auditable:</strong> We utilize immutable, blockchain-anchored logs to create a tamper-proof and time-stamped record of every AI action and data interaction, ensuring full auditability.
                </li>
              </ul>
              <p className="text-gray-300 font-extralight leading-relaxed">
                Our architecture is built to be compliant by design with regulations such as Brazil's LGPD and HIPAA.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-extralight text-white mb-6">3. Information We Process</h2>
              <p className="text-gray-300 font-extralight leading-relaxed mb-6">
                As a provider of foundational infrastructure to enterprise partners, we process different types of information:
              </p>
              <ul className="space-y-4">
                <li className="text-gray-300 font-extralight leading-relaxed">
                  <strong className="text-white">Partner Information:</strong> To manage our Co-Development Partnerships, we collect business contact details and other information necessary to manage the partnership, deploy our teams, and define mission-aligned KPIs.
                </li>
                <li className="text-gray-300 font-extralight leading-relaxed">
                  <strong className="text-white">Partner-Controlled Data:</strong> When our partners deploy our solutions, such as the "Kenna™ Al Scribe" or the "Veris™ Integrity Engine," data is generated and processed. This can include highly sensitive information, such as records of doctor-patient conversations, structured clinical notes, and claims data. <strong className="text-white">This data remains under the absolute control of our partner</strong>. We process it within their environment according to our agreement, using our privacy-preserving architecture. Dooor does not own this data.
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-extralight text-white mb-6">4. How We Use Information</h2>
              <p className="text-gray-300 font-extralight leading-relaxed mb-6">
                Our use of information is strictly tied to the services we are co-developing with our partners:
              </p>
              <ul className="space-y-4">
                <li className="text-gray-300 font-extralight leading-relaxed">
                  <strong className="text-white">To Provide and Co-Develop Our Services:</strong> We use information to build and deploy bespoke solutions for our partners. For example, to generate compliant clinical notes with Kenna™ to reduce physician burnout or to use the verifiable data stream from those notes to streamline claims processing and detect fraud with Veris™.
                </li>
                <li className="text-gray-300 font-extralight leading-relaxed">
                  <strong className="text-white">To Ensure Integrity and Security:</strong> We use our core technology to create verifiable audit trails for compliance and security purposes.
                </li>
                <li className="text-gray-300 font-extralight leading-relaxed">
                  <strong className="text-white">To Innovate Responsibly:</strong> For future capabilities like Privacy-Preserving Analytics, our "Augur™" solution is designed to allow partners to run analytics without exposing or pooling raw patient data.
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-extralight text-white mb-6">5. Data Sharing and Sovereignty</h2>
              <p className="text-gray-300 font-extralight leading-relaxed mb-4">
                We do not sell partner or end-user data. Data sharing occurs only as directed by our partners within their own ecosystem, for example, to create synergies between a hospital and its insurance arm.
              </p>
              <p className="text-gray-300 font-extralight leading-relaxed">
                Our long-term vision includes empowering individuals with sovereignty over their own data through solutions like "Guardian™," which would enable patients to have cryptographic ownership of their verifiable medical records.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-extralight text-white mb-6">6. Your Rights and Choices</h2>
              <p className="text-gray-300 font-extralight leading-relaxed">
                If you are an end-user of a Dooor-powered platform (e.g., a physician at a hospital using Kenna™), your data is controlled by the enterprise partner (the hospital). To exercise your rights under applicable data protection laws like LGPD (such as access, correction, or deletion), you should direct your request to that organization.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-extralight text-white mb-6">7. Contact Us</h2>
              <p className="text-gray-300 font-extralight leading-relaxed">
                If you have any questions about this Privacy Policy or our privacy-by-design approach, please contact us at:{' '}
                <a 
                  href="mailto:partnerships@dooor.ai" 
                  className="text-white underline hover:text-gray-300 transition-colors"
                >
                  partnerships@dooor.ai
                </a>.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
} 