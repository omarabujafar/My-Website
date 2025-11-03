import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from '@Universal/Components/ThemeProvider/ThemeProvider'
import { LoadingProvider } from '@Universal/Components/LoadingScreen/LoadingContext'
import './Index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark">
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
