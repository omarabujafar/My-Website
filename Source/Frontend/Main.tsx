import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from '@Universal/Components/ThemeProvider/ThemeProvider'
import { LoadingProvider } from '@Universal/Components/LoadingScreen/LoadingContext'
import { reportWebVitals } from '@Universal/Utils'
import './Index.css'

/**
 * ASCII art banner for "OMAR ABU" displayed in browser console.
 * Provides a stylized developer signature on site load.
 */
const consoleBannerOmarAbuAsciiArt = `
 ██████╗ ███╗   ███╗ █████╗ ██████╗      █████╗ ██████╗ ██╗   ██╗
██╔═══██╗████╗ ████║██╔══██╗██╔══██╗    ██╔══██╗██╔══██╗██║   ██║
██║   ██║██╔████╔██║███████║██████╔╝    ███████║██████╔╝██║   ██║
██║   ██║██║╚██╔╝██║██╔══██║██╔══██╗    ██╔══██║██╔══██╗██║   ██║
╚██████╔╝██║ ╚═╝ ██║██║  ██║██║  ██║    ██║  ██║██████╔╝╚██████╔╝
 ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝    ╚═╝  ╚═╝╚═════╝  ╚═════╝
`

/**
 * ASCII art banner for "JAFAR" displayed in browser console.
 * Continues the stylized developer signature on site load.
 */
const consoleBannerJafarAsciiArt = `
         ██╗     █████╗     ███████╗     █████╗     ██████╗
         ██║    ██╔══██╗    ██╔════╝    ██╔══██╗    ██╔══██╗
         ██║    ███████║    █████╗      ███████║    ██████╔╝
    ██   ██║    ██╔══██║    ██╔══╝      ██╔══██║    ██╔══██╗
    ╚█████╔╝    ██║  ██║    ██║         ██║  ██║    ██║  ██║
     ╚════╝     ╚═╝  ╚═╝    ╚═╝         ╚═╝  ╚═╝    ╚═╝  ╚═╝
`

// Display console banner with styled text (default color for first part, indigo for second part).
console.log(
  '%c' + consoleBannerOmarAbuAsciiArt + '%c' + consoleBannerJafarAsciiArt,
  'color: inherit',
  'color: #6366f1; font-weight: bold'
)

/**
 * Application entry point.
 * Renders the React application with strict mode enabled.
 * Wraps App in ThemeProvider and LoadingProvider for global state management.
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark">
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </ThemeProvider>
  </React.StrictMode>,
)

/**
 * PERFORMANCE: Enable Web Vitals monitoring in development.
 * Logs performance metrics to console for optimization tracking.
 */
if (import.meta.env?.DEV) {
  reportWebVitals()
}
