import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '@Universal/Components/ThemeProvider/ThemeProvider'
import Navigation from '../Navigation/Navigation'
import logoLight from '@Assets/Icons/Portfolio Logo/Static/Static Logo (Light Mode).svg'
import logoDark from '@Assets/Icons/Portfolio Logo/Static/Static Logo (Dark Mode).svg'
import './Header.css'

const Header: React.FC = () => {
  const { resolvedTheme } = useTheme()
  const logo = resolvedTheme === 'dark' ? logoDark : logoLight

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src={logo} alt="Omar Abu Jafar" />
        </Link>
        <Navigation />
      </div>
    </header>
  )
}

export default Header
