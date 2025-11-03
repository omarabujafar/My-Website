import React from 'react'
import PageTransition from '@Universal/Components/PageTransition/PageTransition'
import './ContactPage.css'

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
