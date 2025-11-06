import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

/**
 * Theme type representing available color schemes.
 */
type Theme = 'light' | 'dark'

/**
 * Context type for theme management across the application.
 */
interface ThemeContextType {
  /** Current theme value ('light' or 'dark'). */
  theme: Theme
  /** Function to update the theme. */
  setTheme: (theme: Theme) => void
  /** Resolved theme value after processing system preferences and localStorage. */
  resolvedTheme: Theme
}

/**
 * Context for managing global theme state.
 * Used to coordinate theme changes across all components.
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

/**
 * Props interface for ThemeProvider component.
 */
interface ThemeProviderProps {
  /** Child components that will have access to theme context. */
  children: ReactNode
  /** Default theme to use if no saved preference exists. */
  defaultTheme?: Theme
}

/**
 * Retrieves the user's system color scheme preference.
 * Checks the `prefers-color-scheme` media query to determine if dark mode is preferred.
 *
 * @returns 'dark' if the system prefers dark mode, 'light' otherwise.
 */
const getSystemThemePreference = (): Theme => {
  const systemPrefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  return systemPrefersDarkMode ? 'dark' : 'light'
}

/**
 * Determines the initial theme to use on application load.
 * Prioritizes saved localStorage preference, falls back to system preference.
 *
 * @returns The theme to apply on initial load.
 */
const getInitialThemeValue = (): Theme => {
  const savedThemePreference = localStorage.getItem('theme') as Theme | null
  if (savedThemePreference) {
    return savedThemePreference
  }
  return getSystemThemePreference()
}

/**
 * Theme provider component that manages global theme state and persistence.
 * Handles theme initialization from localStorage or system preferences.
 * Applies theme changes to the document element and persists user preferences.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'dark'
}) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(getInitialThemeValue)
  const [resolvedThemeValue, setResolvedThemeValue] = useState<Theme>(getInitialThemeValue)
  const [isThemeInitialized, setIsThemeInitialized] = useState(false)

  // Initialize theme on component mount.
  useEffect(() => {
    const initialThemeValue = getInitialThemeValue()
    setCurrentTheme(initialThemeValue)
    setResolvedThemeValue(initialThemeValue)

    // Apply theme class to document root immediately to prevent flash of wrong theme.
    const documentRootElement = document.documentElement
    documentRootElement.classList.remove('light', 'dark')
    documentRootElement.classList.add(initialThemeValue)

    setIsThemeInitialized(true)
  }, [defaultTheme])

  // Update DOM and localStorage when theme changes after initialization.
  useEffect(() => {
    // Skip updates until the theme has been initialized to prevent double-applying.
    if (!isThemeInitialized) return

    const documentRootElement = document.documentElement
    documentRootElement.classList.remove('light', 'dark')
    documentRootElement.classList.add(currentTheme)
    localStorage.setItem('theme', currentTheme)
    setResolvedThemeValue(currentTheme)
  }, [currentTheme, isThemeInitialized])

  /**
   * Updates the current theme state.
   * Triggers useEffect to apply changes to DOM and localStorage.
   *
   * @param newThemeValue - The new theme to apply.
   */
  const updateTheme = (newThemeValue: Theme) => {
    setCurrentTheme(newThemeValue)
  }

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, setTheme: updateTheme, resolvedTheme: resolvedThemeValue }}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * Custom hook to access theme context.
 * Must be used within a ThemeProvider component.
 *
 * @throws Error if used outside of ThemeProvider.
 * @returns The theme context containing theme state and setter.
 */
export const useTheme = () => {
  const themeContext = useContext(ThemeContext)
  if (themeContext === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return themeContext
}
