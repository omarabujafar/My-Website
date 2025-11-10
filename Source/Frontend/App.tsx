import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { lazy, Suspense } from 'react'
import HomePage from '@Pages/Home/HomePage'
import LoadingScreen from '@Universal/Components/LoadingScreen/LoadingScreen'

/**
 * Lazy-loaded page components for code splitting.
 * These pages are loaded on-demand to improve initial bundle size and performance.
 */
const AboutPage = lazy(() => import('@Pages/About/AboutPage'))
const ProjectsPage = lazy(() => import('@Pages/Projects/ProjectsPage'))
const BlogPage = lazy(() => import('@Pages/Blog/BlogPage'))
const ContactPage = lazy(() => import('@Pages/Contact/ContactPage'))

/**
 * AnimatedRoutes component that handles route transitions with Framer Motion.
 * Wraps all routes in AnimatePresence for smooth page transition animations.
 * Uses Suspense for lazy-loaded components with no fallback UI.
 */
function AnimatedRoutes() {
  const currentLocation = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={null}>
        <Routes location={currentLocation} key={currentLocation.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

/**
 * Main App component that sets up routing.
 * Includes loading screen overlay and router configuration with future flags enabled.
 */
function App() {
  return (
    <>
      {/* Initial loading screen overlay. */}
      <LoadingScreen />

      {/* Main router with future compatibility flags enabled. */}
      <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <AnimatedRoutes />
      </Router>
    </>
  )
}

export default App
