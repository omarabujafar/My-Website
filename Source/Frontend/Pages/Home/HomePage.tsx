import React, { useState, useEffect } from 'react'
import PageTransition from '@Universal/Components/PageTransition/PageTransition'
import PhotoCircle from '@Universal/Components/PhotoCircle/PhotoCircle'
import IconCarousel from '@Universal/Components/IconCarousel/IconCarousel'
import Threads from '@Universal/Components/Threads/Threads'
import HeroOrb from '@Universal/Components/HeroOrb/HeroOrb'
import SplitText from '@Universal/Components/SplitText/SplitText'
import './HomePage.css'

const HomePage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'))

  // Thread color: white in dark mode, dark bg color (#05000f) in light mode
  const threadColor: [number, number, number] = isDarkMode
    ? [1, 1, 1]
    : [5/255, 0/255, 15/255]

  // HeroOrb colors: match thread colors with slightly lighter backgrounds
  const heroOrbColors = isDarkMode
    ? {
        bg: "oklch(12% 0.02 264.695)",  // Slightly lighter than dark background #05000f
        c1: "oklch(100% 0 0)",          // White (matching dark mode threads)
        c2: "oklch(100% 0 0)",          // White
        c3: "oklch(100% 0 0)",          // White
      }
    : {
        bg: "oklch(95% 0.005 264.695)", // Slightly lighter than light background #ECECF1
        c1: "oklch(10% 0.02 264.695)",  // Dark #05000f (matching light mode threads)
        c2: "oklch(10% 0.02 264.695)",  // Dark #05000f
        c3: "oklch(10% 0.02 264.695)",  // Dark #05000f
      }

  useEffect(() => {
    // Wait for PageTransition to complete before triggering hero animations
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 250) // Delay matches page transition duration

    return () => clearTimeout(timer)
  }, [])

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

  return (
    <PageTransition>
      <div className="home-page">
        <section className="hero-section">
          <div className="hero-threads-container">
            <Threads
              color={threadColor}
              amplitude={1}
              distance={0}
              enableMouseInteraction={true}
            />
          </div>
          <div className="hero-content">
            <div className={`hero-stack ${isLoaded ? 'loaded' : ''}`}>
              <div className="hero-orb-container">
                <HeroOrb
                  size="400px"
                  animationDuration={15}
                  colors={heroOrbColors}
                  className="hero-hero-orb"
                />
              </div>
              <div className="hero-photo-container">
                <PhotoCircle />
              </div>
              <div className={`hero-text ${isLoaded ? 'loaded' : ''}`}>
                <SplitText
                  text="Hey, I'm Omar."
                  tag="h1"
                  className="hero-heading"
                  delay={120}
                  duration={0.8}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="center"
                />
                <SplitText
                  text="Developing impactful solutions with intentional simplicity."
                  tag="p"
                  className="hero-subtitle"
                  delay={50}
                  duration={0.5}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="center"
                />
                <IconCarousel />
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}

export default HomePage
