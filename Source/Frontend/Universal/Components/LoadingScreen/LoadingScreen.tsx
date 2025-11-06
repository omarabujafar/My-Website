import React, { useState, useEffect } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import './LoadingScreen.css'
import signatureLoopDark from '@Assets/Icons/Portfolio Logo/Animated/Dark Mode/Signature Loop.lottie'
import signatureLoopLight from '@Assets/Icons/Portfolio Logo/Animated/Light Mode/Signature Loop.lottie'

// Helper to get initial theme from localStorage or system preference
const getInitialDarkMode = (): boolean => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    return savedTheme === 'dark'
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

const LoadingScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(getInitialDarkMode)

  useEffect(() => {
    // Watch for theme changes
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'))
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Create the view transition animation styles
    const createExitAnimation = () => {
      const css = `
        ::view-transition-group(root) {
          animation-duration: 0.8s;
          animation-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);
        }

        ::view-transition-old(root),
        .dark::view-transition-old(root) {
          animation: none;
          z-index: -1;
        }

        ::view-transition-new(root) {
          animation-name: loading-reveal;
        }

        .dark::view-transition-new(root) {
          animation-name: loading-reveal;
        }

        @keyframes loading-reveal {
          from {
            clip-path: circle(0% at 50% 50%);
          }
          to {
            clip-path: circle(150% at 50% 50%);
          }
        }
      `

      let styleElement = document.getElementById('loading-transition-styles') as HTMLStyleElement

      if (!styleElement) {
        styleElement = document.createElement('style')
        styleElement.id = 'loading-transition-styles'
        document.head.appendChild(styleElement)
      }

      styleElement.textContent = css
    }

    // After 5.2 seconds, start transitioning out
    const exitTimer = setTimeout(() => {
      createExitAnimation()

      const handleExit = () => {
        setIsExiting(true)
        // After transition completes, hide completely
        setTimeout(() => {
          setIsVisible(false)
        }, 800)
      }

      if (!document.startViewTransition) {
        handleExit()
      } else {
        document.startViewTransition(handleExit)
      }
    }, 5200)

    return () => {
      clearTimeout(exitTimer)
    }
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <div className={`loading-screen ${isExiting ? 'loading-screen--exiting' : ''}`}>
      <div className="loading-screen__content">
        <DotLottieReact
          src={isDarkMode ? signatureLoopDark : signatureLoopLight}
          autoplay
          className="loading-screen__logo"
        />
      </div>
    </div>
  )
}

export default LoadingScreen
