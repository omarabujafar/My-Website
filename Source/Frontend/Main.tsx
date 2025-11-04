import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from '@Universal/Components/ThemeProvider/ThemeProvider'
import { LoadingProvider } from '@Universal/Components/LoadingScreen/LoadingContext'
import './Index.css'

// Console banner
const omarAbu = `
 ██████╗ ███╗   ███╗ █████╗ ██████╗      █████╗ ██████╗ ██╗   ██╗
██╔═══██╗████╗ ████║██╔══██╗██╔══██╗    ██╔══██╗██╔══██╗██║   ██║
██║   ██║██╔████╔██║███████║██████╔╝    ███████║██████╔╝██║   ██║
██║   ██║██║╚██╔╝██║██╔══██║██╔══██╗    ██╔══██║██╔══██╗██║   ██║
╚██████╔╝██║ ╚═╝ ██║██║  ██║██║  ██║    ██║  ██║██████╔╝╚██████╔╝
 ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝    ╚═╝  ╚═╝╚═════╝  ╚═════╝
`

const jafar = `
         ██╗     █████╗     ███████╗     █████╗     ██████╗
         ██║    ██╔══██╗    ██╔════╝    ██╔══██╗    ██╔══██╗
         ██║    ███████║    █████╗      ███████║    ██████╔╝
    ██   ██║    ██╔══██║    ██╔══╝      ██╔══██║    ██╔══██╗
    ╚█████╔╝    ██║  ██║    ██║         ██║  ██║    ██║  ██║
     ╚════╝     ╚═╝  ╚═╝    ╚═╝         ╚═╝  ╚═╝    ╚═╝  ╚═╝
`

console.log('%c' + omarAbu + '%c' + jafar, 'color: inherit', 'color: #6366f1; font-weight: bold')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark">
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
