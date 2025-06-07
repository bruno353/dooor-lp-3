'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface AnimatedGridProps {
  opacity?: number
  className?: string
  visible?: boolean
  zIndex?: number
}

const AnimatedGrid = ({ 
  opacity = 0, 
  className = "", 
  visible = true, 
  zIndex = 5 
}: AnimatedGridProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [time, setTime] = useState(0)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Set initial dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    // Animation loop for time-based effects
    let animationFrame: number
    const animate = () => {
      setTime(Date.now())
      animationFrame = requestAnimationFrame(animate)
    }
    animate()

    const handleMouseMove = (e: MouseEvent) => {
      // Use window coordinates directly since the grid is fixed and covers the whole screen
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Listen to mouse events on the entire window
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  // Generate grid with dramatic distortion
  const gridSize = 50
  const cols = Math.ceil(dimensions.width / gridSize) + 2
  const rows = Math.ceil(dimensions.height / gridSize) + 2

  const calculateDistortion = (x: number, y: number) => {
    const distance = Math.sqrt(
      Math.pow(mousePosition.x - x, 2) + Math.pow(mousePosition.y - y, 2)
    )
    const maxDistance = 150
    const strength = Math.max(0, 1 - distance / maxDistance)
    
    // Much more subtle wave effects
    const wave1 = Math.sin(distance * 0.04 - time * 0.002) * strength * 8
    const wave2 = Math.cos(distance * 0.06 - time * 0.0015) * strength * 5
    const wave3 = Math.sin(distance * 0.03 + time * 0.001) * strength * 3
    
    const totalWave = wave1 + wave2 + wave3
    
    // Calculate direction from mouse with less randomness
    const angle = Math.atan2(y - mousePosition.y, x - mousePosition.x)
    const perpAngle = angle + Math.PI / 2
    
    const offsetX = Math.cos(angle) * totalWave + Math.cos(perpAngle) * totalWave * 0.2
    const offsetY = Math.sin(angle) * totalWave + Math.sin(perpAngle) * totalWave * 0.2
    
    return { offsetX, offsetY, strength }
  }

  const renderDistortedDots = () => {
    const dots: JSX.Element[] = []
    
    for (let i = -1; i < rows; i++) {
      for (let j = -1; j < cols; j++) {
        const baseX = j * gridSize
        const baseY = i * gridSize
        const { offsetX, offsetY, strength } = calculateDistortion(baseX, baseY)
        
        const finalX = baseX + offsetX
        const finalY = baseY + offsetY
        
        const distance = Math.sqrt(
          Math.pow(mousePosition.x - baseX, 2) + Math.pow(mousePosition.y - baseY, 2)
        )
        const maxDistance = 180
        const proximity = Math.max(0, 1 - distance / maxDistance)
        const scale = 1 + proximity * 0.8 + strength * 0.5

        if (proximity > 0.2) {
          dots.push(
            <motion.div
              key={`dot-${i}-${j}`}
              className="absolute bg-white rounded-full"
              style={{
                left: finalX - 1.5,
                top: finalY - 1.5,
                width: 3,
                height: 3,
              }}
              animate={{
                opacity: proximity * (0.4 + strength * 0.4),
                scale: scale,
                boxShadow: `0 0 ${5 + strength * 15}px rgba(255, 255, 255, ${0.2 + strength * 0.3})`,
                filter: `blur(${strength * 0.5}px)`,
              }}
              transition={{
                duration: 0.1,
                ease: 'easeOut',
              }}
            />
          )
        }
      }
    }
    
    return dots
  }

  const renderDistortionWaves = () => {
    const waves: JSX.Element[] = []
    const waveCount = 3
    
    for (let i = 0; i < waveCount; i++) {
      const radius = 30 + i * 25
      const delay = i * 0.3
      
      waves.push(
        <motion.div
          key={`wave-${i}`}
          className="absolute rounded-full border border-white/10"
          style={{
            left: mousePosition.x - radius,
            top: mousePosition.y - radius,
            width: radius * 2,
            height: radius * 2,
            pointerEvents: 'none',
          }}
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.4, 0.05, 0.4],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: delay,
          }}
        />
      )
    }
    
    return waves
  }

  const renderGridLines = () => {
    const lines: JSX.Element[] = []
    
    // Create curved grid lines using SVG paths
    for (let i = 0; i <= rows; i++) {
      const y = i * gridSize
      let pathData = `M 0 ${y}`
      
      for (let x = 0; x <= dimensions.width; x += 10) {
        const { offsetY } = calculateDistortion(x, y)
        const curveY = y + offsetY
        pathData += ` L ${x} ${curveY}`
      }
      
      lines.push(
        <path
          key={`h-line-${i}`}
          d={pathData}
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="1"
          fill="none"
          className="absolute"
        />
      )
    }
    
    // Vertical lines
    for (let j = 0; j <= cols; j++) {
      const x = j * gridSize
      let pathData = `M ${x} 0`
      
      for (let y = 0; y <= dimensions.height; y += 10) {
        const { offsetX } = calculateDistortion(x, y)
        const curveX = x + offsetX
        pathData += ` L ${curveX} ${y}`
      }
      
      lines.push(
        <path
          key={`v-line-${j}`}
          d={pathData}
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="1"
          fill="none"
          className="absolute"
        />
      )
    }
    
    return lines
  }

  return (
    <div
      ref={gridRef}
      className={`absolute ${visible ? '' : 'hidden'} ${className}`}
      style={{ zIndex: zIndex, opacity: opacity }}
    >
      {/* SVG for curved grid lines */}
      <svg 
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      >
        {dimensions.width > 0 && renderGridLines()}
      </svg>
      
      {/* Distorted dots */}
      {dimensions.width > 0 && renderDistortedDots()}
      
      {/* Distortion waves */}
      {renderDistortionWaves()}
      
      {/* Main distortion field indicator - much more subtle */}
      {/* <motion.div
        className="absolute rounded-full border border-white/20"
        style={{
          left: mousePosition.x - 60,
          top: mousePosition.y - 60,
          width: 120,
          height: 120,
          pointerEvents: 'none',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      /> */}
      
      {/* Floating geometric shapes with more subtle distortion */}
      {/* <motion.div
        className="absolute w-64 h-64 border-2 border-white/20 rounded-full"
        style={{
          left: '10%',
          top: '20%',
        }}
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
          x: Math.sin(mousePosition.x * 0.005) * 15,
          y: Math.cos(mousePosition.y * 0.005) * 15,
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
          scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          x: { duration: 0.4, ease: 'easeOut' },
          y: { duration: 0.4, ease: 'easeOut' },
        }}
      /> */}
      
      {/* <motion.div
        className="absolute w-96 h-96 border-2 border-white/15"
        style={{
          right: '15%',
          bottom: '30%',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
        }}
        animate={{
          rotate: -360,
          borderRadius: [
            '30% 70% 70% 30% / 30% 30% 70% 70%',
            '70% 30% 30% 70% / 70% 70% 30% 30%',
            '50% 50% 50% 50% / 50% 50% 50% 50%',
            '30% 70% 70% 30% / 30% 30% 70% 70%',
          ],
          x: Math.cos(mousePosition.x * 0.002) * 20,
          y: Math.sin(mousePosition.y * 0.002) * 20,
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
          borderRadius: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
          x: { duration: 0.6, ease: 'easeOut' },
          y: { duration: 0.6, ease: 'easeOut' },
        }}
      /> */}

      {/* <motion.div
        className="absolute w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-lg border border-white/30"
        style={{
          left: '60%',
          top: '15%',
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          rotate: [0, 180, 360],
          scale: 1 + Math.abs(Math.sin(mousePosition.x * 0.001)) * 0.2,
        }}
        transition={{
          y: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
          x: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
          scale: { duration: 0.5, ease: 'easeOut' },
        }}
      /> */}
    </div>
  )
}

export default AnimatedGrid 