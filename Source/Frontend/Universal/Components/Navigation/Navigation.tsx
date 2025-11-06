import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Navigation.css'
import GlassSurface from '../GlassSurface/GlassSurface'
import { ThemeToggle } from '../ThemeToggle/ThemeToggle'
import { useLoading } from '../LoadingScreen/LoadingContext'
import { ANIMATION_TIMINGS } from '@Universal/Constants'
import HomeIcon from '@Assets/Icons/Navbar Icons/Home.svg'
import AboutIcon from '@Assets/Icons/Navbar Icons/About.svg'
import WorkIcon from '@Assets/Icons/Navbar Icons/Work.svg'
import BlogIcon from '@Assets/Icons/Navbar Icons/Blog.svg'
import ContactIcon from '@Assets/Icons/Navbar Icons/Contact.svg'

/**
 * Navigation component that displays a floating navigation bar with active indicator.
 * Features a glassmorphic design with smooth animations and theme toggle integration.
 * The active indicator smoothly animates between navigation items based on the current route.
 */
const Navigation: React.FC = () => {
  const currentLocation = useLocation()
  const { isLoading } = useLoading()
  const [activeNavigationIndex, setActiveNavigationIndex] = useState(0)
  const [indicatorHorizontalPosition, setIndicatorHorizontalPosition] = useState(0)
  const navigationListRef = useRef<HTMLUListElement>(null)
  const navigationContainerRef = useRef<HTMLDivElement>(null)

  // Navigation items configuration with paths, icons, and labels.
  const navigationItems = [
    { path: '/', icon: HomeIcon, label: 'Home' },
    { path: '/projects', icon: WorkIcon, label: 'Work' },
    { path: '/about', icon: AboutIcon, label: 'About' },
    { path: '/blog', icon: BlogIcon, label: 'Blog' },
    { path: '/contact', icon: ContactIcon, label: 'Contact' },
  ]

  // Update active navigation index when the route changes.
  useEffect(() => {
    const matchingNavigationIndex = navigationItems.findIndex(
      item => item.path === currentLocation.pathname
    )
    if (matchingNavigationIndex !== -1) {
      setActiveNavigationIndex(matchingNavigationIndex)
    }
  }, [currentLocation.pathname, navigationItems])

  // Calculate and update the horizontal position of the active indicator.
  useEffect(() => {
    /**
     * Calculates the horizontal position of the active indicator based on the active navigation item.
     * Centers the indicator below the currently active navigation link.
     */
    const updateIndicatorHorizontalPosition = () => {
      if (navigationListRef.current && navigationContainerRef.current) {
        const navigationListItems = navigationListRef.current.children
        if (navigationListItems[activeNavigationIndex]) {
          const activeNavigationItem = navigationListItems[activeNavigationIndex] as HTMLElement
          const activeLink = activeNavigationItem.querySelector('.nav-link') as HTMLElement

          if (activeLink) {
            const containerBoundingRect = navigationContainerRef.current.getBoundingClientRect()
            const linkBoundingRect = activeLink.getBoundingClientRect()

            // Calculate center position of the link relative to container, offset by indicator half-width (21px).
            const indicatorCenterPosition =
              linkBoundingRect.left - containerBoundingRect.left + linkBoundingRect.width / 2 - 21

            setIndicatorHorizontalPosition(indicatorCenterPosition)
          }
        }
      }
    }

    // Use requestAnimationFrame to ensure DOM is fully painted before measuring.
    const animationFrameId = requestAnimationFrame(() => {
      updateIndicatorHorizontalPosition()
    })

    // Also update after a short delay to catch any layout shifts from fonts or animations.
    const delayTimerId = setTimeout(
      updateIndicatorHorizontalPosition,
      ANIMATION_TIMINGS.NAVIGATION_INDICATOR_DELAY_MS
    )

    // Update indicator position on window resize to maintain correct alignment.
    window.addEventListener('resize', updateIndicatorHorizontalPosition)

    return () => {
      cancelAnimationFrame(animationFrameId)
      clearTimeout(delayTimerId)
      window.removeEventListener('resize', updateIndicatorHorizontalPosition)
    }
  }, [activeNavigationIndex, isLoading])

  // Hide navigation during loading screen.
  if (isLoading) {
    return null
  }

  return (
    <motion.nav
      className="navigation"
      initial={{ y: -100, opacity: 0, x: '-50%' }}
      animate={{ y: 0, opacity: 1, x: '-50%' }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] // Custom cubic-bezier easing for smooth entrance.
      }}
      style={{ x: '-50%' }}
    >
      <GlassSurface
        width={340}
        height={60}
        borderRadius={16}
        backgroundOpacity={0.1}
        saturation={1}
        borderWidth={0.07}
        brightness={50}
        opacity={0.93}
        blur={11}
        displace={0.5}
        distortionScale={-180}
        redOffset={0}
        greenOffset={10}
        blueOffset={20}
        className="navigation-glass"
      >
        <div className="navigation-content" ref={navigationContainerRef}>
          {/* Active indicator that slides horizontally to highlight the current page. */}
          <div
            className="nav-indicator"
            style={{
              transform: `translateX(${indicatorHorizontalPosition}px) translateY(-50%)`
            }}
          />

          <ul className="nav-list" ref={navigationListRef}>
            {navigationItems.map((navigationItem) => (
              <li key={navigationItem.path} className="nav-item">
                <Link
                  to={navigationItem.path}
                  className={`nav-link ${
                    currentLocation.pathname === navigationItem.path ? 'nav-link--active' : ''
                  }`}
                  aria-label={navigationItem.label}
                >
                  <img
                    src={navigationItem.icon}
                    alt={navigationItem.label}
                    className="nav-icon"
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Visual divider between navigation and theme toggle. */}
          <div className="nav-divider" />

          {/* Theme toggle button for switching between light and dark modes. */}
          <ThemeToggle className="nav-theme-toggle" />
        </div>
      </GlassSurface>
    </motion.nav>
  )
}

export default Navigation
