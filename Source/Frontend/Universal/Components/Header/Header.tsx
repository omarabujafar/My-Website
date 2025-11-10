import React from 'react'
import Navigation from '@Universal/Components/Navigation/Navigation'
import './Header.css'

/**
 * Site-wide header component with sticky positioning.
 * Contains the navigation bar and maintains consistent header across all pages.
 */
const Header: React.FC = () => {
  return (
    <header className="site-header">
      <Navigation />
    </header>
  )
}

export default Header
