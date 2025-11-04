import React, { useState, useEffect } from 'react'
import PageTransition from '@Universal/Components/PageTransition/PageTransition'
import Orb from '@Universal/Components/Orb/Orb'
import PhotoCircle from '@Universal/Components/PhotoCircle/PhotoCircle'
import './HomePage.css'

const HomePage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Wait for PageTransition to complete before triggering hero animations
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 250) // Delay matches page transition duration

    return () => clearTimeout(timer)
  }, [])

  return (
    <PageTransition>
      <div className="home-page">
        <section className="hero-section">
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
            </div>
            <div className={`hero-text ${isLoaded ? 'loaded' : ''}`}>
              <h1 className="hero-heading">Hey, I'm Omar.</h1>
              <p className="hero-subtitle">
                Aiming to develop impactful solutions with infinite simplicity — and cool calculator apps.
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}

export default HomePage
