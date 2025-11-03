import React, { useState, useEffect } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import './LoadingScreen.css'
import signatureLoop from '@Assets/Icons/Portfolio Logo/Animated/Dark Mode/Signature Loop.lottie'

const LoadingScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // After 5.2 seconds, start fading out
    const fadeOutTimer = setTimeout(() => {
      setIsExiting(true)
    }, 5200)

    // After fade out completes (5.2s + 0.8s fade), hide completely at 6s
    const hideTimer = setTimeout(() => {
      setIsVisible(false)
    }, 6000)

    return () => {
      clearTimeout(fadeOutTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <div className={`loading-screen ${isExiting ? 'loading-screen--exiting' : ''}`}>
      <div className="loading-screen__content">
        <DotLottieReact
          src={signatureLoop}
          autoplay
          className="loading-screen__logo"
        />
      </div>
    </div>
  )
}

export default LoadingScreen
