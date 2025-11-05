import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { lazy, Suspense } from 'react'
import HomePage from '@Pages/Home/HomePage'
import Layout from '@Universal/Components/Layout/Layout'
import LoadingScreen from '@Universal/Components/LoadingScreen/LoadingScreen'

// Lazy load non-critical pages
const AboutPage = lazy(() => import('@Pages/About/AboutPage'))
const ProjectsPage = lazy(() => import('@Pages/Projects/ProjectsPage'))
const BlogPage = lazy(() => import('@Pages/Blog/BlogPage'))
const ContactPage = lazy(() => import('@Pages/Contact/ContactPage'))

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={null}>
        <Routes location={location} key={location.pathname}>
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

function App() {
  return (
    <>
      <LoadingScreen />
      <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </Router>
    </>
  )
}

export default App
