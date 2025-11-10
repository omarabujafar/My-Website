"use client"

import React, { useEffect, useRef, useId, CSSProperties } from 'react'
import './GlassSurface.css'

/**
 * Props interface for the GlassSurface component.
 * All properties are optional to allow maximum flexibility for different use cases.
 */
interface GlassSurfaceProps {
  /** Content to be rendered inside the glass surface. */
  children?: React.ReactNode
  /** Width of the glass surface (number in px or string with units). Default is "auto". */
  width?: number | string
  /** Height of the glass surface (number in px or string with units). Default is "auto". */
  height?: number | string
  /** Border radius in pixels. Default is 16. */
  borderRadius?: number
  /** Border width multiplier. Default is 0.07. */
  borderWidth?: number
  /** Brightness percentage for the glass effect. Default is 50. */
  brightness?: number
  /** Opacity of the glass surface (0-1). Default is 0.93. */
  opacity?: number
  /** Blur amount in pixels. Default is 11. */
  blur?: number
  /** Displacement amount for the distortion effect. Default is 0. */
  displace?: number
  /** Background opacity (0-1). Default is 0. */
  backgroundOpacity?: number
  /** Saturation multiplier. Default is 1. */
  saturation?: number
  /** Distortion scale value. Default is -180. */
  distortionScale?: number
  /** Red channel offset. Default is 0. */
  redOffset?: number
  /** Green channel offset. Default is 10. */
  greenOffset?: number
  /** Blue channel offset. Default is 20. */
  blueOffset?: number
  /** X channel selector ('R' | 'G' | 'B' | 'A'). Default is 'R'. */
  xChannel?: 'R' | 'G' | 'B' | 'A'
  /** Y channel selector ('R' | 'G' | 'B' | 'A'). Default is 'G'. */
  yChannel?: 'R' | 'G' | 'B' | 'A'
  /** CSS mix-blend-mode value. Default is 'difference'. */
  mixBlendMode?: string
  /** Additional CSS classes to apply. */
  className?: string
  /** Additional inline styles to apply. */
  style?: CSSProperties
}

/**
 * GlassSurface component that creates a glassmorphic effect using SVG filters.
 * Provides a flexible, reusable glass surface that can be used for navigation bars,
 * buttons, cards, modals, and other UI elements.
 *
 * Features:
 * - Automatic fallback for browsers that don't support SVG backdrop filters
 * - Responsive to size changes via ResizeObserver
 * - Highly customizable visual properties
 * - Minimal layout opinions - adapts to content
 */
const GlassSurface: React.FC<GlassSurfaceProps> = ({
  children,
  width = 'auto',
  height = 'auto',
  borderRadius = 16,
  borderWidth = 0.07,
  brightness = 50,
  opacity = 0.93,
  blur = 11,
  displace = 0,
  backgroundOpacity = 0,
  saturation = 1,
  distortionScale = -180,
  redOffset = 0,
  greenOffset = 10,
  blueOffset = 20,
  xChannel = 'R',
  yChannel = 'G',
  mixBlendMode = 'difference',
  className = '',
  style = {}
}) => {
  const uniqueId = useId().replace(/:/g, '-')
  const filterId = `glass-filter-${uniqueId}`
  const redGradId = `red-grad-${uniqueId}`
  const blueGradId = `blue-grad-${uniqueId}`

  const containerRef = useRef<HTMLDivElement>(null)
  const feImageRef = useRef<SVGFEImageElement>(null)
  const redChannelRef = useRef<SVGFEDisplacementMapElement>(null)
  const greenChannelRef = useRef<SVGFEDisplacementMapElement>(null)
  const blueChannelRef = useRef<SVGFEDisplacementMapElement>(null)
  const gaussianBlurRef = useRef<SVGFEGaussianBlurElement>(null)

  /**
   * Generates an SVG displacement map for the glass distortion effect.
   * The map is dynamically created based on the current size of the container.
   */
  const generateDisplacementMap = (): string => {
    const rect = containerRef.current?.getBoundingClientRect()
    const actualWidth = rect?.width || 400
    const actualHeight = rect?.height || 200
    const edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5)

    const svgContent = `
      <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="black"></rect>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${redGradId})" />
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${mixBlendMode}" />
        <rect x="${edgeSize}" y="${edgeSize}" width="${actualWidth - edgeSize * 2}" height="${actualHeight - edgeSize * 2}" rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)" />
      </svg>
    `

    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`
  }

  /**
   * Updates the SVG displacement map with current parameters.
   */
  const updateDisplacementMap = (): void => {
    feImageRef.current?.setAttribute('href', generateDisplacementMap())
  }

  // Update displacement map and filter attributes when props change.
  useEffect(() => {
    updateDisplacementMap()

    // Update displacement map channel offsets.
    ;[
      { ref: redChannelRef, offset: redOffset },
      { ref: greenChannelRef, offset: greenOffset },
      { ref: blueChannelRef, offset: blueOffset }
    ].forEach(({ ref, offset }) => {
      if (ref.current) {
        ref.current.setAttribute('scale', (distortionScale + offset).toString())
        ref.current.setAttribute('xChannelSelector', xChannel)
        ref.current.setAttribute('yChannelSelector', yChannel)
      }
    })

    gaussianBlurRef.current?.setAttribute('stdDeviation', displace.toString())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    width,
    height,
    borderRadius,
    borderWidth,
    brightness,
    opacity,
    blur,
    displace,
    distortionScale,
    redOffset,
    greenOffset,
    blueOffset,
    xChannel,
    yChannel,
    mixBlendMode
  ])

  // Observe container size changes and update displacement map accordingly.
  useEffect(() => {
    if (!containerRef.current) return

    const resizeObserver = new ResizeObserver(() => {
      // Defer update to next frame to ensure accurate measurements.
      setTimeout(updateDisplacementMap, 0)
    })

    resizeObserver.observe(containerRef.current)

    return () => {
      resizeObserver.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update displacement map when width or height changes explicitly.
  useEffect(() => {
    setTimeout(updateDisplacementMap, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height])

  /**
   * Checks if the browser supports SVG filters in backdrop-filter.
   * Falls back to standard glassmorphism for Safari and Firefox.
   */
  const supportsSVGFilters = (): boolean => {
    const isWebkit = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
    const isFirefox = /Firefox/.test(navigator.userAgent)

    if (isWebkit || isFirefox) {
      return false
    }

    const div = document.createElement('div')
    div.style.backdropFilter = `url(#${filterId})`
    return div.style.backdropFilter !== ''
  }

  const containerStyle: CSSProperties = {
    ...style,
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: `${borderRadius}px`,
    '--glass-frost': backgroundOpacity,
    '--glass-saturation': saturation,
    '--filter-id': `url(#${filterId})`
  } as CSSProperties

  return (
    <div
      ref={containerRef}
      className={`glass-surface ${supportsSVGFilters() ? 'glass-surface--svg' : 'glass-surface--fallback'} ${className}`}
      style={containerStyle}
    >
      {/* SVG filter definition for glass distortion effect. */}
      <svg className="glass-surface__filter" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
            {/* Displacement map source image. */}
            <feImage ref={feImageRef} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />

            {/* Red channel displacement and extraction. */}
            <feDisplacementMap ref={redChannelRef} in="SourceGraphic" in2="map" id="redchannel" result="dispRed" />
            <feColorMatrix
              in="dispRed"
              type="matrix"
              values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="red"
            />

            {/* Green channel displacement and extraction. */}
            <feDisplacementMap
              ref={greenChannelRef}
              in="SourceGraphic"
              in2="map"
              id="greenchannel"
              result="dispGreen"
            />
            <feColorMatrix
              in="dispGreen"
              type="matrix"
              values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="green"
            />

            {/* Blue channel displacement and extraction. */}
            <feDisplacementMap ref={blueChannelRef} in="SourceGraphic" in2="map" id="bluechannel" result="dispBlue" />
            <feColorMatrix
              in="dispBlue"
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
              result="blue"
            />

            {/* Blend color channels and apply blur. */}
            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="output" />
            <feGaussianBlur ref={gaussianBlurRef} in="output" stdDeviation="0.7" />
          </filter>
        </defs>
      </svg>

      {/* Content container - inherits dimensions from parent. */}
      <div className="glass-surface__content">{children}</div>
    </div>
  )
}

export default GlassSurface
