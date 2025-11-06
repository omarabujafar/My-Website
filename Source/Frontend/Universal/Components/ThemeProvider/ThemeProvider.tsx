import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: Theme
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: Theme
}

// Helper function to get system theme
const getSystemTheme = (): Theme => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

// Helper function to get initial theme
const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem('theme') as Theme | null
  if (savedTheme) {
    return savedTheme
  }
  return getSystemTheme()
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'dark'
}) => {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)
  const [resolvedTheme, setResolvedTheme] = useState<Theme>(getInitialTheme)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Set initial theme
    const initialTheme = getInitialTheme()
    setThemeState(initialTheme)
    setResolvedTheme(initialTheme)

    // Apply immediately to DOM
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(initialTheme)

    setIsInitialized(true)
  }, [defaultTheme])

  useEffect(() => {
    // Only update DOM and localStorage when theme changes AFTER initialization
    if (!isInitialized) return

    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    localStorage.setItem('theme', theme)
    setResolvedTheme(theme)
  }, [theme, isInitialized])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
