import React from 'react'
import Header from '@Universal/Components/Header/Header'
import HeroProfile from '@Universal/Components/HeroProfile/HeroProfile'
import IconCarousel from '@Universal/Components/IconCarousel/IconCarousel'
import './HomePage.css'

/* ============================================================
   HOMEPAGE
   ============================================================ */
const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Header />

      {/* ============================================================
           HERO SECTION
           ============================================================ */}
      <div className="home-hero">
        <HeroProfile 
          size="400px"
          animationDuration={15}
        />
        <div className="home-text-container">
          <h1 className="home-heading">Hey, I'm Omar.</h1>
          <p className="home-subheading">Developing impactful solutions with intentional simplicity.</p>
        </div>
        <div className="icon-carousel-container">
          <IconCarousel />
        </div>
      </div>
    </div>
  )
}
/* ============================================================
   WORK SECTION                       
   ============================================================ */



/* ============================================================
   MUSIC SECTION                       
   ============================================================ */



/* ============================================================
   RECOMMENDATIONS SECTION                       
   ============================================================ */



/* ============================================================
   FAQ SECTION                       
   ============================================================ */



/* ============================================================
   END SECTION                       
   ============================================================ */
export default HomePage
