import React, { useState, useEffect } from 'react'
import Threads from '../Threads/Threads'
import './Footer.css'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'))

  useEffect(() => {
    // Watch for theme changes
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'))
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  // Thread color: white in light mode (dark footer), dark in dark mode (white footer)
  const threadColor: [number, number, number] = isDarkMode
    ? [5/255, 0/255, 15/255]
    : [1, 1, 1]

  return (
    <footer className="footer">
      {/* Threads background with SVG mask */}
      <div className="footer-plasma-wrapper">
        <Threads
          color={threadColor}
          amplitude={1}
          distance={0}
          enableMouseInteraction={true}
        />
      </div>

      <div className="footer-container">
        <div className="footer-bottom">
          <div className="footer-copyright-container">
            <p className="footer-copyright">
              © {currentYear} Omar Abu Jafar.
            </p>
          </div>
          <div className="footer-links">
            <a href="/privacy" className="footer-link">Privacy Policy</a>
            <a href="/terms" className="footer-link">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
