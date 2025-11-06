import React from 'react'
import PageTransition from '@Universal/Components/PageTransition/PageTransition'
import './AboutPage.css'

/**
 * AboutPage component that displays information about Omar's journey and expertise.
 * This page provides biographical information, skills, and professional background.
 * Wrapped in PageTransition for smooth navigation animations.
 */
const AboutPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="about-page">
        <h1>About Page</h1>
        <p>Learn more about Omar's journey and expertise</p>
      </div>
    </PageTransition>
  )
}

export default AboutPage
