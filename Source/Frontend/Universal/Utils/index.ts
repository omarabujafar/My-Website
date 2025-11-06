/**
 * Utility functions used across the application.
 * This file contains common helper functions for formatting, validation, and text manipulation.
 */

/**
 * Formats an ISO date string into a human-readable format.
 *
 * @param date - The ISO date string to format (e.g., "2024-01-15").
 * @returns A formatted date string in the format "Month Day, Year" (e.g., "January 15, 2024").
 *
 * @example
 * formatDate("2024-01-15") // Returns "January 15, 2024"
 */
export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Calculates the estimated reading time for a given text.
 * Uses an average reading speed of 200 words per minute.
 *
 * @param text - The text content to analyze.
 * @returns The estimated reading time in minutes, rounded up to the nearest integer.
 *
 * @example
 * calculateReadingTime("This is a sample text...") // Returns estimated minutes
 */
export const calculateReadingTime = (text: string): number => {
  const wordsPerMinute = 200
  const wordCount = text.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

/**
 * Truncates a text string to a specified maximum length and appends an ellipsis.
 * If the text is shorter than or equal to the maximum length, returns the original text.
 *
 * @param text - The text string to truncate.
 * @param maxLength - The maximum allowed length before truncation.
 * @returns The truncated text with an ellipsis, or the original text if within max length.
 *
 * @example
 * truncateText("This is a long text", 10) // Returns "This is a..."
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

/**
 * Validates an email address using a regular expression pattern.
 * Checks for basic email format: localpart@domain.extension
 *
 * @param email - The email address string to validate.
 * @returns True if the email matches the expected format, false otherwise.
 *
 * @example
 * validateEmail("user@example.com") // Returns true
 * validateEmail("invalid-email") // Returns false
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * PERFORMANCE: Reports Web Vitals metrics to console in development.
 * Monitors key performance metrics: LCP, FID, CLS, FCP, TTFB.
 * Uses the native Performance API to track critical user experience metrics.
 *
 * @example
 * reportWebVitals() // Call once in Main.tsx to enable monitoring
 */
export const reportWebVitals = (): void => {
  if (typeof window === 'undefined' || !window.performance) return

  // Only log in development mode
  const isDevelopment = import.meta.env?.DEV ?? true

  // Largest Contentful Paint (LCP) - measures loading performance
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    const lastEntry = entries[entries.length - 1] as any
    if (isDevelopment) {
      console.log('LCP (Largest Contentful Paint):', lastEntry.renderTime || lastEntry.loadTime, 'ms')
    }
  })
  lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })

  // First Input Delay (FID) - measures interactivity
  const fidObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    entries.forEach((entry: any) => {
      if (isDevelopment) {
        console.log('FID (First Input Delay):', entry.processingStart - entry.startTime, 'ms')
      }
    })
  })
  fidObserver.observe({ type: 'first-input', buffered: true })

  // Cumulative Layout Shift (CLS) - measures visual stability
  let clsValue = 0
  const clsObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    entries.forEach((entry: any) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value
      }
    })
    if (isDevelopment) {
      console.log('CLS (Cumulative Layout Shift):', clsValue)
    }
  })
  clsObserver.observe({ type: 'layout-shift', buffered: true })

  // First Contentful Paint (FCP)
  const fcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    entries.forEach((entry) => {
      if (entry.name === 'first-contentful-paint' && isDevelopment) {
        console.log('FCP (First Contentful Paint):', entry.startTime, 'ms')
      }
    })
  })
  fcpObserver.observe({ type: 'paint', buffered: true })

  // Time to First Byte (TTFB)
  const navigationEntries = performance.getEntriesByType('navigation')
  if (navigationEntries.length > 0) {
    const navigationEntry = navigationEntries[0] as PerformanceNavigationTiming
    const ttfb = navigationEntry.responseStart - navigationEntry.requestStart
    if (isDevelopment) {
      console.log('TTFB (Time to First Byte):', ttfb, 'ms')
    }
  }
}
