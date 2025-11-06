import React, { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@Universal/Utils/cn'
import { useTheme } from '../ThemeProvider/ThemeProvider'
import { ThemeToggleButton5 } from './ThemeToggleButton5'
import './ThemeToggle.css'

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
    <ThemeToggleButton5
      isDark={isDark}
      onClick={toggleTheme}
      className={cn('theme-toggle', className)}
    />
  )
}
