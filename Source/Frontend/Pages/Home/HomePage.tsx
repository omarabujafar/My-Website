import React from 'react'
import PageTransition from '@Universal/Components/PageTransition/PageTransition'
import Orb from '@Universal/Components/Orb/Orb'
import './HomePage.css'

const HomePage: React.FC = () => {
  return (
    <PageTransition>
      <div className="home-page">
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-orb-container">
              <Orb
                hoverIntensity={0.3}
                rotateOnHover={false}
                hue={0}
                forceHoverState={false}
              />
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}

export default HomePage
