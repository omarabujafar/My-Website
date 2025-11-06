import React, { useState, useEffect, useMemo, memo } from 'react'
import Threads from '../Threads/Threads'
import './Footer.css'

/**
 * Footer component that displays copyright information, links, and an animated thread background.
 * Features a dynamic Threads background that changes color based on the current theme.
 * Uses MutationObserver to detect theme changes and update the thread colors accordingly.
 * PERFORMANCE: Memoized to prevent unnecessary re-renders.
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()
  const [isDarkModeActive, setIsDarkModeActive] = useState(
    document.documentElement.classList.contains('dark')
  )

  // Watch for theme changes using MutationObserver and update dark mode state.
  useEffect(() => {
    /**
     * Observes changes to the document element's class attribute to detect theme switches.
     * Updates component state when the 'dark' class is added or removed.
     */
    const themeChangeObserver = new MutationObserver(() => {
      setIsDarkModeActive(document.documentElement.classList.contains('dark'))
    })

    // Observe only the 'class' attribute for changes.
    themeChangeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    // Cleanup: disconnect observer when component unmounts.
    return () => themeChangeObserver.disconnect()
  }, [])

  /**
   * Thread color configuration based on current theme.
   * Light mode (dark footer): White threads [1, 1, 1]
   * Dark mode (white footer): Very dark purple threads [5/255, 0/255, 15/255]
   * PERFORMANCE: Memoized to prevent array recreation on every render.
   */
  const threadsColorRgb: [number, number, number] = useMemo(() =>
    isDarkModeActive
      ? [5 / 255, 0 / 255, 15 / 255] // Very dark purple for dark mode.
      : [1, 1, 1], // White for light mode.
    [isDarkModeActive]
  )

  return (
    <footer className="footer">
      {/* Animated threads background layer with SVG mask applied via CSS. */}
      <div className="footer-plasma-wrapper">
        <Threads
          color={threadsColorRgb}
          amplitude={1}
          distance={0}
          enableMouseInteraction={true}
        />
      </div>

      {/* Footer content container with copyright and links. */}
      <div className="footer-container">
        <div className="footer-bottom">
          {/* Copyright notice with dynamic year. */}
          <div className="footer-copyright-container">
            <p className="footer-copyright">
              © {currentYear} Omar Abu Jafar.
            </p>
          </div>

          {/* Footer navigation links. */}
          <div className="footer-links">
            <a href="/privacy" className="footer-link">
              Privacy Policy
            </a>
            <a href="/terms" className="footer-link">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/**
 * PERFORMANCE: Export memoized Footer component.
 * This prevents re-renders when parent components update but Footer props haven't changed.
 */
export default memo(Footer)
