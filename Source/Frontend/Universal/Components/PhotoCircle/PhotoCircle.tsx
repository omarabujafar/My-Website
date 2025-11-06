import React, { memo } from 'react'
import './PhotoCircle.css'
import heroPhoto from '@Assets/Images/Omar/Hero Photo.jpg'

/**
 * PhotoCircle component that displays a circular profile photo.
 * Features a styled circular frame with consistent dimensions.
 * Used on the homepage hero section.
 * PERFORMANCE: Optimized with memo, image decoding, and fetchpriority for faster load.
 */
const PhotoCircle: React.FC = () => {
  return (
    <div className="photo-circle">
      <img
        src={heroPhoto}
        alt="Omar Abu Jafar"
        loading="eager"
        decoding="async"
        fetchpriority="high"
      />
    </div>
  )
}

/**
 * PERFORMANCE: Export memoized PhotoCircle component.
 * This component has no props and never needs to re-render.
 */
export default memo(PhotoCircle)
