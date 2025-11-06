import React, { useState, useCallback, memo } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { DynamicIsland, Options } from '@Universal/Components/DynamicIsland/DynamicIsland'
import './Layout.css'

/**
 * Props interface for Layout component.
 */
interface LayoutProps {
  /** Child components to render in the main content area. */
  children: React.ReactNode
}

/**
 * Main layout component that wraps all pages.
 * Provides consistent structure with header, footer, and Dynamic Island.
 * Manages state for Dynamic Island view transitions and variants.
 * PERFORMANCE: Optimized with useCallback to prevent unnecessary prop changes.
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [currentDynamicIslandView, setCurrentDynamicIslandView] = useState('idle')
  const [currentDynamicIslandVariantKey, setCurrentDynamicIslandVariantKey] = useState('idle')

  // PERFORMANCE: Memoize setter functions to prevent Options component re-renders.
  const handleSetView = useCallback((view: string) => {
    setCurrentDynamicIslandView(view)
  }, [])

  const handleSetVariantKey = useCallback((variantKey: string) => {
    setCurrentDynamicIslandVariantKey(variantKey)
  }, [])

  return (
    <div className="layout">
      {/* Site header with logo and navigation. */}
      <Header />

      {/* Dynamic Island interactive component. */}
      <div className="dynamic-island-wrapper">
        <DynamicIsland view={currentDynamicIslandView} variantKey={currentDynamicIslandVariantKey} />
        <Options
          view={currentDynamicIslandView}
          setView={handleSetView}
          setVariantKey={handleSetVariantKey}
        />
      </div>

      {/* Main content area where page content is rendered. */}
      <main className="main-content">
        {children}
      </main>

      {/* Site footer with links and animated background. */}
      <Footer />
    </div>
  )
}

/**
 * PERFORMANCE: Export memoized Layout component.
 * Only re-renders when children prop changes (route changes).
 */
export default memo(Layout)
