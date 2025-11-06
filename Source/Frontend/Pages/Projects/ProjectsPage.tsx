import React from 'react'
import PageTransition from '@Universal/Components/PageTransition/PageTransition'
import './ProjectsPage.css'

/**
 * ProjectsPage component that showcases Omar's portfolio of work.
 * Displays project cards with descriptions, technologies, and links.
 * Wrapped in PageTransition for smooth navigation animations.
 */
const ProjectsPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="projects-page">
        <h1>Projects Page</h1>
        <p>Explore Omar's portfolio of work</p>
      </div>
    </PageTransition>
  )
}

export default ProjectsPage
