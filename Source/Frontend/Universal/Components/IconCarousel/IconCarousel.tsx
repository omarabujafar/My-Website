import React from 'react'
import { motion } from 'framer-motion'
import './IconCarousel.css'

const icons = [
  { src: '/Assets/Icons/Hero Icons/JavaScript.svg', alt: 'JavaScript' },
  { src: '/Assets/Icons/Hero Icons/Java.svg', alt: 'Java' },
  { src: '/Assets/Icons/Hero Icons/Swift.svg', alt: 'Swift' },
  { src: '/Assets/Icons/Hero Icons/React.svg', alt: 'React' },
  { src: '/Assets/Icons/Hero Icons/Dart.svg', alt: 'Dart/Flutter' },
  { src: '/Assets/Icons/Hero Icons/Framer.svg', alt: 'Framer' },
  { src: '/Assets/Icons/Hero Icons/CSharp.svg', alt: 'C#' },
  { src: '/Assets/Icons/Hero Icons/Python.svg', alt: 'Python' },
]

const IconCarousel: React.FC = () => {
  // Duplicate the icons array multiple times for seamless looping
  const duplicatedIcons = [...icons, ...icons, ...icons]

  // Calculate the width of one set: icon width (40px) + gap (1.5rem = 24px) = 64px per icon
  const iconWidth = 40
  const gapWidth = 24 // 1.5rem
  const singleSetWidth = icons.length * (iconWidth + gapWidth)

  return (
    <div className="icon-carousel-container">
      <div className="icon-carousel-wrapper">
        <motion.div
          className="icon-carousel-track"
          animate={{
            x: [0, -singleSetWidth],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {duplicatedIcons.map((icon, index) => (
            <div key={index} className="icon-carousel-item">
              <img src={icon.src} alt={icon.alt} />
            </div>
          ))}
        </motion.div>
      </div>
      {/* Gradient overlays for fade effect */}
      <div className="icon-carousel-fade-left"></div>
      <div className="icon-carousel-fade-right"></div>
    </div>
  )
}

export default IconCarousel
