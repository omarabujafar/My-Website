import React from 'react'
import DarkVeil from '../DarkVeil'
import './Footer.css'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      {/* DarkVeil background with SVG mask */}
      <div className="footer-plasma-wrapper">
        <DarkVeil
          speed={2.5}
          hueShift={0}
          noiseIntensity={0}
          scanlineFrequency={3.6}
          scanlineIntensity={0}
          warpAmount={3}
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
