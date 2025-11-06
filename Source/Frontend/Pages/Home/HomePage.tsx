import React, { useState, useEffect, useMemo, memo, useCallback } from 'react'
import PageTransition from '@Universal/Components/PageTransition/PageTransition'
import PhotoCircle from '@Universal/Components/PhotoCircle/PhotoCircle'
import IconCarousel from '@Universal/Components/IconCarousel/IconCarousel'
import Threads from '@Universal/Components/Threads/Threads'
import HeroOrb from '@Universal/Components/HeroOrb/HeroOrb'
import SplitText from '@Universal/Components/SplitText/SplitText'
import { ANIMATION_TIMINGS } from '@Universal/Constants'
import './HomePage.css'

/**
 * HomePage component that displays the landing hero section.
 * Features animated threads background, profile photo, hero text with split animation,
 * and technology icon carousel. Adapts colors based on current theme.
 * PERFORMANCE: Optimized with useMemo and useCallback for expensive computations and stable references.
 */
const HomePage: React.FC = () => {
  const [isHeroContentLoaded, setIsHeroContentLoaded] = useState(false)
  const [isDarkModeActive, setIsDarkModeActive] = useState(document.documentElement.classList.contains('dark'))

  /**
   * Thread color configuration based on current theme.
   * Dark mode: White threads [1, 1, 1]
   * Light mode: Very dark purple threads matching background #05000f
   * PERFORMANCE: Memoized to prevent array recreation on every render.
   */
  const threadsColorRgbNormalized: [number, number, number] = useMemo(() =>
    isDarkModeActive
      ? [1, 1, 1]
      : [5/255, 0/255, 15/255],
    [isDarkModeActive]
  )

  /**
   * HeroOrb gradient colors that adapt to the current theme.
   * Colors are specified in OKLCH color space for perceptual uniformity.
   * Background colors are slightly lighter than the page background for subtle depth.
   * PERFORMANCE: Memoized to prevent object recreation on every render.
   */
  const heroOrbGradientColors = useMemo(() =>
    isDarkModeActive
      ? {
          bg: "oklch(12% 0.02 264.695)",  // Slightly lighter than dark background #05000f.
          c1: "oklch(100% 0 0)",          // Pure white (matching dark mode threads).
          c2: "oklch(100% 0 0)",          // Pure white.
          c3: "oklch(100% 0 0)",          // Pure white.
        }
      : {
          bg: "oklch(95% 0.005 264.695)", // Slightly lighter than light background #ECECF1.
          c1: "oklch(10% 0.02 264.695)",  // Very dark purple #05000f (matching light mode threads).
          c2: "oklch(10% 0.02 264.695)",  // Very dark purple #05000f.
          c3: "oklch(10% 0.02 264.695)",  // Very dark purple #05000f.
        },
    [isDarkModeActive]
  )

  // Wait for page transition to complete before triggering hero animations.
  useEffect(() => {
    const heroAnimationDelayTimer = setTimeout(() => {
      setIsHeroContentLoaded(true)
    }, ANIMATION_TIMINGS.PAGE_TRANSITION_DELAY_MS)

    // Cleanup timer on unmount.
    return () => clearTimeout(heroAnimationDelayTimer)
  }, [])

  // PERFORMANCE: Memoize theme change handler to prevent recreation on every render.
  const handleThemeChange = useCallback(() => {
    setIsDarkModeActive(document.documentElement.classList.contains('dark'))
  }, [])

  // Watch for theme changes using MutationObserver and update dark mode state.
  useEffect(() => {
    /**
     * Observes document element class changes to detect theme switches.
     * Updates component state when the 'dark' class is added or removed.
     */
    const themeChangeObserver = new MutationObserver(handleThemeChange)

    // Monitor only the 'class' attribute for changes.
    themeChangeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    // Cleanup: disconnect observer when component unmounts.
    return () => themeChangeObserver.disconnect()
  }, [handleThemeChange])

  return (
    <PageTransition>
      <div className="home-page">
        <section className="hero-section">
          {/* Animated threads background layer. */}
          <div className="hero-threads-container">
            <Threads
              color={threadsColorRgbNormalized}
              amplitude={1}
              distance={0}
              enableMouseInteraction={true}
            />
          </div>

          {/* Main hero content with layered elements. */}
          <div className="hero-content">
            <div className={`hero-stack ${isHeroContentLoaded ? 'loaded' : ''}`}>
              {/* Gradient orb background effect. */}
              <div className="hero-orb-container">
                <HeroOrb
                  size="400px"
                  animationDuration={15}
                  colors={heroOrbGradientColors}
                  className="hero-hero-orb"
                />
              </div>

              {/* Profile photo circle. */}
              <div className="hero-photo-container">
                <PhotoCircle />
              </div>

              {/* Hero text content with split text animations. */}
              <div className={`hero-text ${isHeroContentLoaded ? 'loaded' : ''}`}>
                {/* Main heading with character-by-character animation. */}
                <SplitText
                  text="Hey, I'm Omar."
                  tag="h1"
                  className="hero-heading"
                  delay={120}
                  duration={0.8}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="center"
                />

                {/* Subtitle with character-by-character animation. */}
                <SplitText
                  text="Developing impactful solutions with intentional simplicity."
                  tag="p"
                  className="hero-subtitle"
                  delay={50}
                  duration={0.5}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="center"
                />

                {/* Technology icons carousel. */}
                <IconCarousel />
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}

/**
 * PERFORMANCE: Export memoized HomePage component to prevent unnecessary re-renders.
 * Since HomePage has no props, it will only re-render when internal state changes.
 */
export default memo(HomePage)
