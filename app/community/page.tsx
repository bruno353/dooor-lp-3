'use client'

import React, { useState } from 'react'

export default function Community() {
  const [isLoading, setIsLoading] = useState(true)

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black">
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white">Loading Dooor community...</p>
          </div>
        </div>
      )}

      {/* Iframe em tela cheia */}
      <iframe
        src="https://www.dooor.ai/"
        width="100%"
        height="100%"
        frameBorder="0"
        onLoad={handleIframeLoad}
        className="w-full h-full"
        title="Dooor Community"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />
    </div>
  )
} 