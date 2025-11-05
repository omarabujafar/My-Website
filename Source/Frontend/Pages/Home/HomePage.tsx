import React, { useState, useEffect } from 'react'
import PageTransition from '@Universal/Components/PageTransition/PageTransition'
import Orb from '@Universal/Components/Orb/Orb'
import PhotoCircle from '@Universal/Components/PhotoCircle/PhotoCircle'
import IconCarousel from '@Universal/Components/IconCarousel/IconCarousel'
import Threads from '@Universal/Components/Threads/Threads'
import { DynamicIsland, Options } from '@Universal/Components/DynamicIsland/DynamicIsland'
import './HomePage.css'

const HomePage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'))
  const [view, setView] = useState('idle')
  const [variantKey, setVariantKey] = useState('idle')

  // Thread color: white in dark mode, dark bg color (#05000f) in light mode
  const threadColor: [number, number, number] = isDarkMode
    ? [1, 1, 1]
    : [5/255, 0/255, 15/255]

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
        <div className="dynamic-island-wrapper">
          <DynamicIsland view={view} variantKey={variantKey} />
          <Options view={view} setView={setView} setVariantKey={setVariantKey} />
        </div>
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
              <div className="hero-photo-container">
                <PhotoCircle />
              </div>
              <div className="hero-orb-container">
                <Orb
                  hoverIntensity={0.3}
                  rotateOnHover={false}
                  hue={0}
                  forceHoverState={false}
                />
              </div>
              <div className={`hero-text ${isLoaded ? 'loaded' : ''}`}>
                <h1 className="hero-heading">Hey, I'm Omar.</h1>
                <p className="hero-subtitle">
                  Developing impactful solutions with intentional simplicity.
                </p>
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
