import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { ANIMATION_TIMINGS } from '@Universal/Constants'

/**
 * Context type for loading state management.
 */
interface LoadingContextType {
  /** Whether the initial loading animation is currently active. */
  isLoading: boolean
}

/**
 * Context for managing global loading state across the application.
 * Used to coordinate loading screen visibility with other components.
 */
const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

/**
 * Custom hook to access loading context.
 * Must be used within a LoadingProvider component.
 *
 * @throws Error if used outside of LoadingProvider.
 * @returns The loading context containing isLoading state.
 */
export const useLoading = () => {
  const loadingContext = useContext(LoadingContext)
  if (loadingContext === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return loadingContext
}

/**
 * Props interface for LoadingProvider component.
 */
interface LoadingProviderProps {
  /** Child components that will have access to loading context. */
  children: ReactNode
}

/**
 * Loading provider component that manages global loading state.
 * Displays loading screen for a fixed duration and prevents scrolling during load.
 * Automatically sets isLoading to false after the configured duration.
 */
export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoadingActive, setIsLoadingActive] = useState(true)

  // Set loading to false after the configured duration (matches LoadingScreen timing).
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoadingActive(false)
    }, ANIMATION_TIMINGS.LOADING_CONTEXT_DURATION_MS)

    // Cleanup timer on unmount.
    return () => clearTimeout(loadingTimer)
  }, [])

  // Prevent scrolling and lock body position while loading screen is active.
  useEffect(() => {
    if (isLoadingActive) {
      // Lock scroll by fixing body position.
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      // Restore normal scrolling after loading completes.
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }

    // Cleanup: ensure scroll is restored on unmount.
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [isLoadingActive])

  return (
    <LoadingContext.Provider value={{ isLoading: isLoadingActive }}>
      {children}
    </LoadingContext.Provider>
  )
}
