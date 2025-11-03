import React, { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@Universal/Utils/cn'
import { useTheme } from '../ThemeProvider/ThemeProvider'
import './ThemeToggle.css'
import DarkIcon from '@Assets/Icons/Navbar Icons/Dark.svg'
import LightIcon from '@Assets/Icons/Navbar Icons/Light.svg'

type AnimationVariant = 'circle' | 'rectangle'
type AnimationStart = 'center' | 'bottom-up'

export const ThemeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [isDark, setIsDark] = useState(false)
  const variant: AnimationVariant = 'circle'
  const start: AnimationStart = 'bottom-up'

  useEffect(() => {
    setIsDark(resolvedTheme === 'dark')
  }, [resolvedTheme])

  const createAnimation = useCallback(() => {
    const css = `
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
        filter: blur(0px);
        animation-name: reveal-light;
      }

      .dark::view-transition-new(root) {
        filter: blur(0px);
        animation-name: reveal-dark;
      }

      @keyframes reveal-dark {
        from {
          clip-path: circle(0% at 50% 100%);
          filter: blur(12px);
        }
        to {
          clip-path: circle(150% at 50% 100%);
          filter: blur(0px);
        }
      }

      @keyframes reveal-light {
        from {
           clip-path: circle(0% at 50% 100%);
           filter: blur(12px);
        }
        to {
          clip-path: circle(150% at 50% 100%);
          filter: blur(0px);
        }
      }
    `

    let styleElement = document.getElementById('theme-transition-styles') as HTMLStyleElement

    if (!styleElement) {
      styleElement = document.createElement('style')
      styleElement.id = 'theme-transition-styles'
      document.head.appendChild(styleElement)
    }

    styleElement.textContent = css
  }, [])

  const toggleTheme = useCallback(() => {
    setIsDark(!isDark)
    createAnimation()

    const switchTheme = () => {
      setTheme(theme === 'light' ? 'dark' : 'light')
    }

    if (!document.startViewTransition) {
      switchTheme()
      return
    }

    document.startViewTransition(switchTheme)
  }, [theme, setTheme, isDark, createAnimation])

  return (
    <button
      type="button"
      className={cn('theme-toggle', className)}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      <div className="theme-toggle-icon-wrapper">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.img
              key="dark"
              src={DarkIcon}
              alt="Dark mode"
              className="theme-toggle-icon"
              initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0.0, 0.2, 1]
              }}
            />
          ) : (
            <motion.img
              key="light"
              src={LightIcon}
              alt="Light mode"
              className="theme-toggle-icon"
              initial={{ rotate: 180, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -180, opacity: 0, scale: 0.5 }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0.0, 0.2, 1]
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </button>
  )
}
