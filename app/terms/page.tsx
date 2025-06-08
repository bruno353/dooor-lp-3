'use client'

import React from 'react'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default function Terms() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extralight mb-4">
              Terms of <span className="text-gray-400">Use</span>
            </h1>
          </div>

          {/* Content */}
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-gray-400 font-extralight mb-8">
              <strong>Last Updated:</strong> June 8th, 2025
            </p>

            <section className="mb-12">
              <h2 className="text-2xl font-extralight text-white mb-6">1. Agreement to Terms</h2>
              <p className="text-gray-300 font-extralight leading-relaxed">
                By accessing our website or engaging in a Co-Development Partnership with Dooor, you agree to be bound by these Terms of Use. These Terms govern your relationship with Dooor and your use of our enterprise platform, which serves as the OS for Verifiable AI.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-extralight text-white mb-6">2. Our Services & Partnership Model</h2>
              <p className="text-gray-300 font-extralight leading-relaxed mb-4">
                Dooor provides the foundational infrastructure for regulated industries to build and deploy private, ownable, and auditable AI solutions. Our services include access to our core Verifiable AI platform and our suite of solutions, including Kenna™, Veris™, and others.
              </p>
              <p className="text-gray-300 font-extralight leading-relaxed mb-6">
                Our primary go-to-market strategy is a <strong className="text-white">Co-Development Partnership Model</strong>. This is not a simple software license sale. This model is a structured framework that includes:
              </p>
              <ul className="space-y-4 mb-6">
                <li className="text-gray-300 font-extralight leading-relaxed">
                  <strong className="text-white">Dedicated Teams:</strong> We deploy a dedicated "pod" of elite Dooor engineers and AI scientists who work exclusively with the partner as an extension of their team.
                </li>
                <li className="text-gray-300 font-extralight leading-relaxed">
                  <strong className="text-white">Mission-Aligned KPIs:</strong> Success is defined by measurable business outcomes, not software features, and is governed by a Joint Steering Committee.
                </li>
                <li className="text-gray-300 font-extralight leading-relaxed">
                  <strong className="text-white">Mutual Investment:</strong> Engagements begin with a co-development fee that secures the dedicated Dooor team and covers the bespoke development work, de-risking the project and aligning incentives.
                </li>
              </ul>
              <p className="text-gray-300 font-extralight leading-relaxed">
                The specific scope, fees, and deliverables of any partnership will be detailed in a separate Co-Development Agreement. For example, a pilot project may involve a one-time co-development fee and a monthly per-user license fee for a defined period.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-extralight text-white mb-6">3. Intellectual Property</h2>
              <ul className="space-y-4">
                <li className="text-gray-300 font-extralight leading-relaxed">
                  <strong className="text-white">Dooor IP:</strong> Dooor retains all rights, title, and interest in and to its core platform, proprietary technology (including but not limited to our Verifiable AI framework, Zero-Knowledge Proofs implementation, and decentralized orchestration layer), and our foundational solutions like Kenna™ and Veris™.
                </li>
                <li className="text-gray-300 font-extralight leading-relaxed">
                  <strong className="text-white">Partner IP:</strong> Our partners retain absolute sovereignty and ownership over their data.
                </li>
                <li className="text-gray-300 font-extralight leading-relaxed">
                  <strong className="text-white">Co-Developed IP:</strong> Ownership of any bespoke solutions or new intellectual property created during a Co-Development Partnership will be governed by the specific terms of the Co-Development Agreement between Dooor and the partner.
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-extralight text-white mb-6">4. Acceptable Use</h2>
              <p className="text-gray-300 font-extralight leading-relaxed">
                You agree not to use our services for any unlawful purpose or to in any way compromise the security or integrity of our Verifiable AI platform. You may not reverse engineer, decompile, or attempt to discover the source code of our proprietary technology.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-extralight text-white mb-6">5. Confidentiality</h2>
              <p className="text-gray-300 font-extralight leading-relaxed">
                Given the deep integration of our Co-Development Partnerships, both parties will likely be exposed to confidential information. Both Dooor and its partners agree to maintain the confidentiality of such information as outlined in their specific Co-Development Agreement.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-extralight text-white mb-6">6. Disclaimers and Limitation of Liability</h2>
              <p className="text-gray-300 font-extralight leading-relaxed mb-4">
                Our services are provided on an "as-is" and "as-available" basis. However, our entire model is built on providing mission-critical solutions for large enterprises where reliability and integrity are paramount. Our Verifiable AI platform is designed to provide mathematical proof of the integrity of AI-generated results.
              </p>
              <p className="text-gray-300 font-extralight leading-relaxed">
                IN NO EVENT SHALL DOOOR BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR GOODWILL.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-extralight text-white mb-6">7. Long-Term Strategic Alliance</h2>
              <p className="text-gray-300 font-extralight leading-relaxed">
                A successful pilot partnership is intended to be the first phase of a long-term strategic alliance, potentially leading to broader network deployment and even a strategic investment, such as a Right of First Offer (ROFO) to lead or participate in a future funding round.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-extralight text-white mb-6">8. Governing Law</h2>
              <p className="text-gray-300 font-extralight leading-relaxed">
                These Terms shall be governed by the laws of [Insert Jurisdiction, e.g., Brazil], without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-extralight text-white mb-6">9. Contact Us</h2>
              <p className="text-gray-300 font-extralight leading-relaxed">
                If you have any questions about these Terms, please contact us at:{' '}
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