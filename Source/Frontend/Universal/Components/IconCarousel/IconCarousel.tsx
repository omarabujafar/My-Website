import React from 'react'
import { motion } from 'framer-motion'
import './IconCarousel.css'

/**
 * Technology icons data for the carousel.
 * Each icon represents a programming language or framework.
 */
const technologyIconsData = [
  { src: '/Assets/Icons/Hero Icons/JavaScript.svg', alt: 'JavaScript' },
  { src: '/Assets/Icons/Hero Icons/Java.svg', alt: 'Java' },
  { src: '/Assets/Icons/Hero Icons/Swift.svg', alt: 'Swift' },
  { src: '/Assets/Icons/Hero Icons/React.svg', alt: 'React' },
  { src: '/Assets/Icons/Hero Icons/Dart.svg', alt: 'Dart/Flutter' },
  { src: '/Assets/Icons/Hero Icons/Framer.svg', alt: 'Framer' },
  { src: '/Assets/Icons/Hero Icons/CSharp.svg', alt: 'C#' },
  { src: '/Assets/Icons/Hero Icons/Python.svg', alt: 'Python' },
]

/**
 * IconCarousel component that displays a continuously scrolling technology icon strip.
 * Features infinite horizontal animation with seamless looping.
 * Icons are duplicated to create the illusion of an endless carousel.
 */
const IconCarousel: React.FC = () => {
  // Duplicate the icons array three times to create seamless infinite loop effect.
  const duplicatedTechnologyIcons = [...technologyIconsData, ...technologyIconsData, ...technologyIconsData]

  // Calculate animation distance based on icon dimensions and spacing.
  const individualIconWidthInPixels = 40
  const spacingGapWidthInPixels = 24 // Equivalent to 1.5rem.
  const singleIconSetWidthInPixels = technologyIconsData.length * (individualIconWidthInPixels + spacingGapWidthInPixels)

  return (
    <div className="icon-carousel-container">
      <div className="icon-carousel-wrapper">
        {/* Animated track that translates horizontally for scrolling effect. */}
        <motion.div
          className="icon-carousel-track"
          animate={{
            x: [0, -singleIconSetWidthInPixels],
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
          {duplicatedTechnologyIcons.map((technologyIcon, iconIndex) => (
            <div key={iconIndex} className="icon-carousel-item">
              <img src={technologyIcon.src} alt={technologyIcon.alt} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Left gradient overlay to fade icons at the start. */}
      <div className="icon-carousel-fade-left"></div>

      {/* Right gradient overlay to fade icons at the end. */}
      <div className="icon-carousel-fade-right"></div>
    </div>
  )
}

export default IconCarousel
