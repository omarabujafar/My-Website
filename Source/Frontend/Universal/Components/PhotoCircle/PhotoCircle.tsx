import React from 'react'
import './PhotoCircle.css'
import heroPhoto from '@Assets/Images/Omar/Hero Photo.jpg'

const PhotoCircle: React.FC = () => {
  return (
    <div className="photo-circle">
      <img src={heroPhoto} alt="Omar Abu Jafar" />
    </div>
  )
}

export default PhotoCircle
