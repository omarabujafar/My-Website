import { motion } from 'framer-motion'
import * as React from 'react'

interface ElasticSliderProps {
  value: number
  onChange: (value: number) => void
  max: number
}

export const ElasticSlider: React.FC<ElasticSliderProps> = ({
  value,
  onChange,
  max,
}) => {
  const [isDragging, setIsDragging] = React.useState(false)
  const sliderRef = React.useRef<HTMLDivElement>(null)

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true)
    updateValue(e)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      updateValue(e)
    }
  }

  const handlePointerUp = () => {
    setIsDragging(false)
  }

  const updateValue = (e: React.PointerEvent) => {
    if (!sliderRef.current) return

    const rect = sliderRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(1, x / rect.width))
    const newValue = Math.round(percentage * max)
    onChange(newValue)
  }

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('pointerup', handlePointerUp as any)
      return () => {
        document.removeEventListener('pointerup', handlePointerUp as any)
      }
    }
  }, [isDragging])

  const percentage = (value / max) * 100

  return (
    <div
      ref={sliderRef}
      className="relative h-1 w-full cursor-pointer rounded-full bg-neutral-700"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
    >
      <motion.div
        className="absolute left-0 top-0 h-full rounded-full bg-neutral-300"
        style={{ width: `${percentage}%` }}
        layout
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
      <motion.div
        className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full bg-white"
        style={{ left: `calc(${percentage}% - 6px)` }}
        layout
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      />
    </div>
  )
}
