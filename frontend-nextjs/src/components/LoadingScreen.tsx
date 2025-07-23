'use client'

import { useEffect, useState } from 'react'

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          // Start fade out after loading completes
          setTimeout(() => {
            setIsVisible(false)
            // Call onComplete after fade out animation
            setTimeout(onComplete, 800)
          }, 500)
          return 100
        }
        return prev + Math.random() * 15 + 5 // Random increment for realistic feel
      })
    }, 150)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-white flex items-center justify-center transition-all duration-800 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="text-center">
        {/* Logo/Name */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">
            CUONG LE
          </h1>
          <p className="text-gray-600 text-sm uppercase tracking-wider">
            New Site Coming Soon
          </p>
        </div>

        {/* Loading Progress */}
        <div className="w-64 mx-auto">
          {/* Progress Bar */}
          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mb-4">
            <div 
              className="h-full bg-gray-900 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Progress Text */}
          <p className="text-xs text-gray-500">
            Loading... {Math.round(progress)}%
          </p>
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-1 mt-6">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  )
}