import React from 'react'
import PageTransition from '@Universal/Components/PageTransition/PageTransition'
import './ProjectsPage.css'

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
