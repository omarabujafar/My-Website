import React, { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@Universal/Utils/cn'
import { useTheme } from '../ThemeProvider/ThemeProvider'
import { ThemeToggleButton5 } from './ThemeToggleButton5'
import './ThemeToggle.css'

/**
 * Animation variant type for view transition effects.
 */
type AnimationVariant = 'circle' | 'rectangle'

/**
 * Animation start position type for view transition effects.
 */
type AnimationStart = 'center' | 'bottom-up'

/**
 * Props interface for ThemeToggle component.
 */
interface ThemeToggleProps {
  /** Additional CSS classes to apply to the toggle button. */
  className?: string
}

/**
 * Theme toggle component that switches between light and dark modes.
 * Features a smooth circular reveal animation using the View Transitions API.
 * Syncs with the global theme context and persists user preference.
 */
export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [isDarkModeActive, setIsDarkModeActive] = useState(false)
  const transitionAnimationVariant: AnimationVariant = 'circle'
  const transitionAnimationStart: AnimationStart = 'bottom-up'

  // Sync local dark mode state with resolved theme from context.
  useEffect(() => {
    setIsDarkModeActive(resolvedTheme === 'dark')
  }, [resolvedTheme])

  /**
   * Creates and injects CSS styles for the view transition animation.
   * Defines a circular reveal animation that expands from the top center.
   * The animation adapts based on the current theme (light/dark).
   */
  const createViewTransitionAnimation = useCallback(() => {
    const viewTransitionStylesContent = `
      ::view-transition-group(root) {
        animation-duration: 0.8s;
        animation-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);
      }

      ::view-transition-new(root) {
        animation-name: reveal-light;
      }

      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: none;
        z-index: -1;
      }

      .dark::view-transition-new(root) {
        animation-name: reveal-dark;
      }

      ::view-transition-new(root) {
        animation-name: reveal-light;
      }

      .dark::view-transition-new(root) {
        animation-name: reveal-dark;
      }

      @keyframes reveal-dark {
        from {
          clip-path: circle(0% at 50% 0%);
        }
        to {
          clip-path: circle(150% at 50% 0%);
        }
      }

      @keyframes reveal-light {
        from {
           clip-path: circle(0% at 50% 0%);
        }
        to {
          clip-path: circle(150% at 50% 0%);
        }
      }
    `

    // Find existing style element or create a new one.
    let transitionStyleElement = document.getElementById('theme-transition-styles') as HTMLStyleElement

    if (!transitionStyleElement) {
      transitionStyleElement = document.createElement('style')
      transitionStyleElement.id = 'theme-transition-styles'
      document.head.appendChild(transitionStyleElement)
    }

    transitionStyleElement.textContent = viewTransitionStylesContent
  }, [])

  /**
   * Handles theme toggle button click.
   * Triggers the view transition animation and switches between light and dark themes.
   * Falls back to immediate theme switch if View Transitions API is not available.
   */
  const handleThemeToggleClick = useCallback(() => {
    setIsDarkModeActive(!isDarkModeActive)
    createViewTransitionAnimation()

    /**
     * Switches the theme in the global context.
     * Called within the view transition animation for smooth visual effect.
     */
    const applyThemeSwitch = () => {
      setTheme(theme === 'light' ? 'dark' : 'light')
    }

    // Use View Transitions API if available, otherwise fallback to direct switch.
    if (!document.startViewTransition) {
      applyThemeSwitch()
      return
    }

    document.startViewTransition(applyThemeSwitch)
  }, [theme, setTheme, isDarkModeActive, createViewTransitionAnimation])

  return (
    <ThemeToggleButton5
      isDark={isDarkModeActive}
      onClick={handleThemeToggleClick}
      className={cn('theme-toggle', className)}
    />
  )
}
