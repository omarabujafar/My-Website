import React from 'react'
import PageTransition from '@Universal/Components/PageTransition/PageTransition'
import './ContactPage.css'

/**
 * ContactPage component that provides ways to get in touch with Omar.
 * Includes contact form, email, and social media links.
 * Wrapped in PageTransition for smooth navigation animations.
 */
const ContactPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="contact-page">
        <h1>Contact Page</h1>
        <p>Get in touch with Omar</p>
      </div>
    </PageTransition>
  )
}

export default ContactPage
