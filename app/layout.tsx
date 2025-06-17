import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

export const metadata = {
  title: 'CrossFi - Blockchain-based Decentralized Finance',
  description: 'CrossFi is a platform that enables payments, lending, and borrowing in a decentralized manner.',
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