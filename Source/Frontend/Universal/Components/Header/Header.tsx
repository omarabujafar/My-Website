import React from 'react'
import Navigation from '../Navigation/Navigation'
import './Header.css'

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>Omar Abu Jafar</h1>
        </div>
        <Navigation />
      </div>
    </header>
  )
}

export default Header
