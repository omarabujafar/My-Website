import React from 'react'
import PageTransition from '@Universal/Components/PageTransition/PageTransition'
import './AboutPage.css'

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
