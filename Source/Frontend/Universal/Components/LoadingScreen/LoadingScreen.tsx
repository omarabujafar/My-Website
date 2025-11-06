import React, { useState, useEffect, useCallback, memo } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import './LoadingScreen.css'
import { ANIMATION_TIMINGS } from '@Universal/Constants'
import signatureLoopDark from '@Assets/Icons/Portfolio Logo/Animated/Dark Mode/Signature Loop.lottie'
import signatureLoopLight from '@Assets/Icons/Portfolio Logo/Animated/Light Mode/Signature Loop.lottie'

/**
 * Determines the initial dark mode state from localStorage or system preferences.
 * Checks localStorage first for saved user preference, falls back to system theme.
 *
 * @returns True if dark mode should be enabled, false otherwise.
 */
const getInitialDarkModeState = (): boolean => {
  const savedThemePreference = localStorage.getItem('theme')
  if (savedThemePreference) {
    return savedThemePreference === 'dark'
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * Loading screen component that displays an animated logo during initial page load.
 * Features a circular reveal transition when exiting using the View Transitions API.
 * Automatically hides after a configured duration and adapts to light/dark themes.
 * PERFORMANCE: Optimized with useCallback and memo to prevent unnecessary re-renders.
 */
const LoadingScreen: React.FC = () => {
  const [isScreenVisible, setIsScreenVisible] = useState(true)
  const [isExitingScreen, setIsExitingScreen] = useState(false)
  const [isDarkModeActive, setIsDarkModeActive] = useState(getInitialDarkModeState)

  // PERFORMANCE: Memoize theme change handler.
  const handleThemeChange = useCallback(() => {
    setIsDarkModeActive(document.documentElement.classList.contains('dark'))
  }, [])

  // Watch for theme changes using MutationObserver and update state accordingly.
  useEffect(() => {
    /**
     * Observes document element class changes to detect theme switches.
     * Updates dark mode state when the 'dark' class is toggled.
     */
    const themeChangeObserver = new MutationObserver(handleThemeChange)

    // Monitor only the 'class' attribute for changes.
    themeChangeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    // Cleanup: disconnect observer on unmount.
    return () => themeChangeObserver.disconnect()
  }, [handleThemeChange])

  // Handle loading screen exit animation after configured duration.
  useEffect(() => {
    /**
     * Creates and injects CSS styles for the view transition exit animation.
     * Defines a circular reveal animation that expands from the center.
     */
    const createCircularRevealAnimation = () => {
      const viewTransitionStyles = `
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

      // Find existing style element or create a new one.
      let transitionStyleElement = document.getElementById('loading-transition-styles') as HTMLStyleElement

      if (!transitionStyleElement) {
        transitionStyleElement = document.createElement('style')
        transitionStyleElement.id = 'loading-transition-styles'
        document.head.appendChild(transitionStyleElement)
      }

      transitionStyleElement.textContent = viewTransitionStyles
    }

    // Start exit transition after the configured loading screen duration.
    const exitAnimationTimer = setTimeout(() => {
      createCircularRevealAnimation()

      /**
       * Handles the exit animation sequence.
       * Sets exiting state and hides screen after fade-out completes.
       */
      const handleScreenExit = () => {
        setIsExitingScreen(true)
        // Hide screen completely after fade-out animation finishes.
        setTimeout(() => {
          setIsScreenVisible(false)
        }, ANIMATION_TIMINGS.LOADING_SCREEN_FADEOUT_MS)
      }

      // Use View Transitions API if available, otherwise fallback to direct exit.
      if (!document.startViewTransition) {
        handleScreenExit()
      } else {
        document.startViewTransition(handleScreenExit)
      }
    }, ANIMATION_TIMINGS.LOADING_SCREEN_DURATION_MS)

    // Cleanup: clear timer on unmount.
    return () => {
      clearTimeout(exitAnimationTimer)
    }
  }, [])

  // Don't render anything if screen is no longer visible.
  if (!isScreenVisible) {
    return null
  }

  return (
    <div className={`loading-screen ${isExitingScreen ? 'loading-screen--exiting' : ''}`}>
      <div className="loading-screen__content">
        {/* Animated logo that adapts to current theme. */}
        <DotLottieReact
          src={isDarkModeActive ? signatureLoopDark : signatureLoopLight}
          autoplay
          className="loading-screen__logo"
        />
      </div>
    </div>
  )
}

/**
 * PERFORMANCE: Export memoized LoadingScreen component.
 * Prevents unnecessary re-renders during app initialization.
 */
export default memo(LoadingScreen)
