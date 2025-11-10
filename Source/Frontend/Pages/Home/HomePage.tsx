import React from 'react'
import HeroProfile from '@Universal/Components/HeroProfile/HeroProfile'
import './HomePage.css'
import '@Universal/Components/Layout.css'
/* ============================================================
   HERO SECTION
   ============================================================ */
const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <div className="layout-header">
      </div>
      <div className="home-hero">
        <HeroProfile
          size="400px"
          animationDuration={15}
        />
        <div className="home-text-container">
          <h1 className="home-heading">Hey, I'm Omar.</h1>
          <p className="home-subheading">Developing impactful solutions with intentional simplicity.</p>
        </div>
      </div>
      <div style={{ height: '2000px', padding: '2rem', backgroundColor: '#1a1a1a' }}>
        <h2 style={{ color: 'white' }}>Temporary Content for Scroll Testing</h2>
        <p style={{ color: 'white' }}>Scroll down to test the fixed header...</p>
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
