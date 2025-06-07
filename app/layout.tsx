import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

export const metadata = {
  title: 'Dooor - Humanizing Healthcare with AI',
  description: 'Dooor delivers next-generation artificial intelligence solutions that empower clinicians, optimize operations, and put the human connection back at the center of care.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
} 