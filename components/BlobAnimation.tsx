'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface BlobAnimationProps {
  opacity?: number
  className?: string
  visible?: boolean
  zIndex?: number
  color?: string
}

const BlobAnimation = ({ 
  opacity = 0.3, 
  className = "", 
  visible = true, 
  zIndex = 1,
  color = "white"
}: BlobAnimationProps) => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    let animationFrame: number
    const animate = () => {
      setTime(Date.now())
      animationFrame = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  // Generate a circular cylindrical path that contorts
  const generateCircularWormPath = () => {
    const t = time * 0.0003 // Very slow movement
    const points = 60 // Number of points around the circle for smoothness
    const baseRadiusX = 45 // Horizontal radius (smaller to fit width)
    const baseRadiusY = 520 // Much larger vertical radius to cover full page height
    const thickness = 3 // Increased thickness for better visibility
    
    let outerPath = ""
    let innerPath = ""
    
    for (let i = 0; i <= points; i++) {
      const angle = (i / points) * Math.PI * 2
      
      // Base elliptical position (much more vertical)
      const baseX = 50 + Math.cos(angle) * baseRadiusX
      const baseY = 50 + Math.sin(angle) * baseRadiusY
      
      // Add multiple contortion waves that move around the ellipse
      const distortion1 = Math.sin(angle * 3 + t * 2) * 12  // Increased distortion
      const distortion2 = Math.cos(angle * 5 + t * 1.5) * 8  // Increased distortion
      const distortion3 = Math.sin(angle * 2 + t * 2.5) * 5  // Increased distortion
      const distortion4 = Math.cos(angle * 7 + t * 1.8) * 3  // Increased distortion
      
      // Apply distortions to the radius
      const totalDistortionX = (distortion1 + distortion2 + distortion3 + distortion4) * 0.6
      const totalDistortionY = (distortion1 + distortion2 + distortion3 + distortion4) * 1.0
      
      const distortedRadiusX = baseRadiusX + totalDistortionX
      const distortedRadiusY = baseRadiusY + totalDistortionY
      
      // Calculate final position
      const finalX = 50 + Math.cos(angle) * distortedRadiusX
      const finalY = 50 + Math.sin(angle) * distortedRadiusY
      
      // Vary thickness around the ellipse for organic look
      const thicknessVariation = Math.sin(angle * 4 + t * 3) * 3
      const currentThickness = thickness + thicknessVariation
      
      // Calculate inner and outer points (perpendicular to the ellipse)
      const normalX = Math.cos(angle)
      const normalY = Math.sin(angle)
      
      const outerX = finalX + normalX * currentThickness
      const outerY = finalY + normalY * currentThickness
      const innerX = finalX - normalX * currentThickness
      const innerY = finalY - normalY * currentThickness
      
      if (i === 0) {
        outerPath += `M ${outerX} ${outerY}`
        innerPath += `M ${innerX} ${innerY}`
      } else {
        outerPath += ` L ${outerX} ${outerY}`
        innerPath = `L ${innerX} ${innerY} ` + innerPath
      }
    }
    
    // Create closed path by connecting outer and inner ellipses
    const completePath = outerPath + " " + innerPath + " Z"
    return completePath
  }

  if (!visible) return null

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex, opacity }}
    >
      <svg 
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 300"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Enhanced gradient for cylindrical 3D effect */}
          <linearGradient id="cylinderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.1" />
            <stop offset="15%" stopColor={color} stopOpacity="0.4" />
            <stop offset="35%" stopColor={color} stopOpacity="0.8" />
            <stop offset="50%" stopColor={color} stopOpacity="1.0" />
            <stop offset="65%" stopColor={color} stopOpacity="0.8" />
            <stop offset="85%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0.1" />
          </linearGradient>
          
          {/* Secondary gradient for depth layers */}
          <radialGradient id="depthGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.6" />
            <stop offset="30%" stopColor={color} stopOpacity="0.8" />
            <stop offset="70%" stopColor={color} stopOpacity="0.5" />
            <stop offset="100%" stopColor={color} stopOpacity="0.2" />
          </radialGradient>
          
          {/* Increased blur filter for softer, more organic look */}
          <filter id="cylinderBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" />
          </filter>
          
          {/* Additional blur for background layer */}
          <filter id="backgroundBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
          </filter>
        </defs>
        
        {/* Background blur layer for depth */}
        <motion.path
          d={generateCircularWormPath()}
          fill="url(#depthGradient)"
          filter="url(#backgroundBlur)"
          opacity="0.3"
          transform="scale(1.1)"
          animate={{
            d: generateCircularWormPath()
          }}
          transition={{
            duration: 0.1,
            ease: "linear"
          }}
        />
        
        {/* Main cylindrical worm with gradient */}
        <motion.path
          d={generateCircularWormPath()}
          fill="url(#cylinderGradient)"
          filter="url(#cylinderBlur)"
          animate={{
            d: generateCircularWormPath()
          }}
          transition={{
            duration: 0.1,
            ease: "linear"
          }}
        />
        
        {/* Highlight layer for cylindrical shine */}
        <motion.path
          d={generateCircularWormPath()}
          fill="url(#cylinderGradient)"
          opacity="0.4"
          transform="scale(0.85)"
          filter="url(#cylinderBlur)"
          animate={{
            d: generateCircularWormPath()
          }}
          transition={{
            duration: 0.1,
            ease: "linear"
          }}
        />
      </svg>
    </div>
  )
}

export default BlobAnimation 