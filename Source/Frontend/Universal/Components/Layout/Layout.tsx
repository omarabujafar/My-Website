import React, { useState } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { DynamicIsland, Options } from '@Universal/Components/DynamicIsland/DynamicIsland'
import './Layout.css'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [view, setView] = useState('idle')
  const [variantKey, setVariantKey] = useState('idle')

  return (
    <div className="layout">
      <Header />
      <div className="dynamic-island-wrapper">
        <DynamicIsland view={view} variantKey={variantKey} />
        <Options view={view} setView={setView} setVariantKey={setVariantKey} />
      </div>
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
