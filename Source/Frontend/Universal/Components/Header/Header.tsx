import React from 'react'
import Navigation from '@Universal/Components/Navigation/Navigation'
import LogoDark from '@Assets/Icons/Portfolio Logo/Static/Static Logo (Dark Mode).svg'
import './Header.css'

/**
 * Site-wide header component with sticky positioning.
 * Contains the navigation bar and maintains consistent header across all pages.
 */
const Header: React.FC = () => {
  return (
    <header className="site-header">
      <Navigation />
      <div className="header-logo">
        <img src={LogoDark} alt="Omar's Logo" />
      </div>
    </header>
  )
}

export default Header
