import React from 'react'
import { motion } from 'framer-motion'

/**
 * Props interface for PageTransition component.
 */
interface PageTransitionProps {
  /** Child components to animate during page transitions. */
  children: React.ReactNode
}

/**
 * Animation variants for page transition states.
 * Defines opacity and scale transformations for smooth page transitions.
 */
const pageAnimationVariants = {
  /** Initial state before page enters (slightly scaled down, transparent). */
  initial: {
    opacity: 0,
    scale: 0.99
  },
  /** Final state when page is fully visible (normal scale, opaque). */
  in: {
    opacity: 1,
    scale: 1
  },
  /** Exit state when page is leaving (slightly scaled up, transparent). */
  out: {
    opacity: 0,
    scale: 1.01
  }
}

/**
 * Transition configuration for page animations.
 * Uses custom cubic-bezier easing for smooth, natural movement.
 */
const pageAnimationTransitionConfig = {
  duration: 0.4,
  ease: [0.25, 0.46, 0.45, 0.94]
}

/**
 * Page transition wrapper component that animates page changes.
 * Provides smooth fade and scale effects when navigating between pages.
 * Uses Framer Motion for declarative animation management.
 */
const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageAnimationVariants}
      transition={pageAnimationTransitionConfig}
      style={{
        width: '100%',
        backgroundColor: 'var(--background)',
        minHeight: '100vh'
      }}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition
