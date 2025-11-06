import React from 'react'
import PageTransition from '@Universal/Components/PageTransition/PageTransition'
import './BlogPage.css'

/**
 * BlogPage component that displays blog articles and writings.
 * Features Omar's thoughts on software engineering, technology, and development.
 * Wrapped in PageTransition for smooth navigation animations.
 */
const BlogPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="blog-page">
        <h1>Blog Page</h1>
        <p>Read Omar's thoughts on software engineering and technology</p>
      </div>
    </PageTransition>
  )
}

export default BlogPage
