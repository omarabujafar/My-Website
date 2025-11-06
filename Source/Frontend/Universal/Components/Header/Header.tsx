import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '@Universal/Components/ThemeProvider/ThemeProvider'
import Navigation from '../Navigation/Navigation'
import logoLight from '@Assets/Icons/Portfolio Logo/Static/Static Logo (Light Mode).svg'
import logoDark from '@Assets/Icons/Portfolio Logo/Static/Static Logo (Dark Mode).svg'
import './Header.css'

/**
 * Header component that displays the site logo and navigation bar.
 * Logo adapts to the current theme (light or dark mode).
 * Serves as the primary navigation area for the application.
 */
const Header: React.FC = () => {
  const { resolvedTheme } = useTheme()

  // Select logo variant based on current theme.
  const currentLogoSource = resolvedTheme === 'dark' ? logoDark : logoLight

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo link that navigates to homepage. */}
        <Link to="/" className="logo">
          <img src={currentLogoSource} alt="Omar Abu Jafar" />
        </Link>
        {/* Main navigation component. */}
        <Navigation />
      </div>
    </header>
  )
}

export default Header
