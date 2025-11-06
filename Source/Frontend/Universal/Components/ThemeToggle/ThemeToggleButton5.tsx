import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@Universal/Utils/cn'

interface ThemeToggleButton5Props {
  isDark: boolean
  onClick: () => void
  className?: string
}

export const ThemeToggleButton5: React.FC<ThemeToggleButton5Props> = ({
  isDark,
  onClick,
  className = '',
}) => {
  return (
    <button
      type="button"
      className={cn(
        'rounded-full transition-all duration-300 active:scale-95 p-2.5',
        isDark ? 'bg-black text-white' : 'bg-white text-black',
        className,
      )}
      onClick={onClick}
      aria-label="Toggle theme"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 32 32"
        className="w-4 h-4"
      >
        <clipPath id="skiper-btn-4">
          <motion.path
            animate={{ y: isDark ? 5 : 0, x: isDark ? -20 : 0 }}
            transition={{ ease: 'easeInOut', duration: 0.35 }}
            d="M0-5h55v37h-55zm32 12a1 1 0 0025 0 1 1 0 00-25 0"
          />
        </clipPath>
        <g clipPath="url(#skiper-btn-4)">
          <circle cx="16" cy="16" r="15" />
        </g>
      </svg>
    </button>
  )
}
