import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import HomePage from '@Pages/Home/HomePage'
import AboutPage from '@Pages/About/AboutPage'
import ProjectsPage from '@Pages/Projects/ProjectsPage'
import BlogPage from '@Pages/Blog/BlogPage'
import ContactPage from '@Pages/Contact/ContactPage'
import Layout from '@Universal/Components/Layout/Layout'
import LoadingScreen from '@Universal/Components/LoadingScreen/LoadingScreen'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
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
