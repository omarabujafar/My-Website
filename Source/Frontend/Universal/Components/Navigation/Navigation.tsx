import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Navigation.css'
import GlassSurface from '../GlassSurface/GlassSurface'
import { ThemeToggle } from '../ThemeToggle/ThemeToggle'
import { useLoading } from '../LoadingScreen/LoadingContext'
import HomeIcon from '@Assets/Icons/Navbar Icons/Home.svg'
import AboutIcon from '@Assets/Icons/Navbar Icons/About.svg'
import WorkIcon from '@Assets/Icons/Navbar Icons/Work.svg'
import BlogIcon from '@Assets/Icons/Navbar Icons/Blog.svg'
import ContactIcon from '@Assets/Icons/Navbar Icons/Contact.svg'

const Navigation: React.FC = () => {
  const location = useLocation()
  const { isLoading } = useLoading()
  const [activeIndex, setActiveIndex] = useState(0)
  const [indicatorPosition, setIndicatorPosition] = useState(0)
  const navListRef = useRef<HTMLUListElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const navItems = [
    { path: '/', icon: HomeIcon, label: 'Home' },
    { path: '/projects', icon: WorkIcon, label: 'Work' },
    { path: '/about', icon: AboutIcon, label: 'About' },
    { path: '/blog', icon: BlogIcon, label: 'Blog' },
    { path: '/contact', icon: ContactIcon, label: 'Contact' },
  ]

  useEffect(() => {
    const currentIndex = navItems.findIndex(item => item.path === location.pathname)
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex)
    }
  }, [location.pathname])

  useEffect(() => {
    const updateIndicatorPosition = () => {
      if (navListRef.current && containerRef.current) {
        const navItems = navListRef.current.children
        if (navItems[activeIndex]) {
          const activeItem = navItems[activeIndex] as HTMLElement
          const link = activeItem.querySelector('.nav-link') as HTMLElement
          if (link) {
            const containerRect = containerRef.current.getBoundingClientRect()
            const linkRect = link.getBoundingClientRect()
            const position = linkRect.left - containerRect.left + linkRect.width / 2 - 21
            setIndicatorPosition(position)
          }
        }
      }
    }

    // Use requestAnimationFrame to ensure DOM is fully painted
    const rafId = requestAnimationFrame(() => {
      updateIndicatorPosition()
    })

    // Also update after a short delay to catch any layout shifts
    const timeoutId = setTimeout(updateIndicatorPosition, 100)

    window.addEventListener('resize', updateIndicatorPosition)
    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(timeoutId)
      window.removeEventListener('resize', updateIndicatorPosition)
    }
  }, [activeIndex, isLoading])

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
        ease: [0.25, 0.46, 0.45, 0.94]
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
        <div className="navigation-content" ref={containerRef}>
          <div
            className="nav-indicator"
            style={{ transform: `translateX(${indicatorPosition}px) translateY(-50%)` }}
          />
          <ul className="nav-list" ref={navListRef}>
          {navItems.map((item, index) => (
            <li key={item.path} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'nav-link--active' : ''}`}
                aria-label={item.label}
              >
                <img src={item.icon} alt={item.label} className="nav-icon" />
              </Link>
            </li>
          ))}
          </ul>
          <div className="nav-divider" />
          <ThemeToggle className="nav-theme-toggle" />
        </div>
      </GlassSurface>
    </motion.nav>
  )
}

export default Navigation
