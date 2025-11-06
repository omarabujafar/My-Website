import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'

import { Airdrop, AirdropMini } from './Components/Airdrop'
import { FindMy } from './Components/FindMy'
import { LowBattery } from './Components/LowBattery'
import { Music } from './Components/Music'
import { Phone } from './Components/Phone'
import { Record } from './Components/Record'
import { Ring } from './Components/Ring'
import { ScreenRecord } from './Components/ScreenRecord'
import { Timer } from './Components/Timer'

/**
 * Spring animation bounce intensity values for different view transitions.
 * Lower values create less bounce, higher values create more pronounced spring effects.
 * Each key represents a transition between two views (e.g., "timer-ring" is timer to ring).
 */
const SPRING_BOUNCE_ANIMATION_VARIANTS = {
  idle: 0.5,
  'ring-idle': 0.5,
  'timer-ring': 0.35,
  'ring-timer': 0.35,
  'timer-idle': 0.3,
  'idle-timer': 0.3,
  'idle-ring': 0.5,
  'music-timer': 0.2,
  'music-ring': 0.2,
  'aridrop-ring': 0.2,
  'aridrop-timer': 0.2,
  'aridrop-record': 0.2,
  'music-record': 0.2,
  'music-airdrop': 0.2,
  'airdrop-airdropMini': 0.2,
  'airdropMini-airdrop': 0.2,
}

/**
 * Props interface for DynamicIsland component.
 */
interface DynamicIslandProps {
  /** Current view state determining which content to display. */
  view: string
  /** Variant key for determining spring animation bounce intensity. */
  variantKey: string
}

/**
 * Props interface for Options component.
 */
interface OptionsProps {
  /** Current view state. */
  view: string
  /** Function to update the current view. */
  setView: (viewName: string) => void
  /** Function to update the variant key for animations. */
  setVariantKey: (variantKeyName: string) => void
}

/**
 * DynamicIsland component inspired by iPhone's Dynamic Island feature.
 * Displays different interactive views (ring, timer, music, etc.) with smooth spring animations.
 * The component morphs between states with customizable bounce effects.
 */
export const DynamicIsland: React.FC<DynamicIslandProps> = ({
  view,
  variantKey,
}) => {
  /**
   * Memoized content renderer that selects which view to display.
   * Prevents unnecessary re-renders when view hasn't changed.
   */
  const currentViewContent = useMemo(() => {
    switch (view) {
      case 'ring':
        return <Ring />
      case 'record':
        return <Record />
      case 'timer':
        return <Timer />
      case 'music':
        return <Music />
      case 'airdrop':
        return <Airdrop setView={undefined} />
      case 'airdropMini':
        return <AirdropMini />
      case 'lowBattery':
        return <LowBattery />
      case 'phone':
        return <Phone />
      case 'findmy':
        return <FindMy />
      case 'screenRecord':
        return <ScreenRecord />
      case 'idle':
        return <div className="h-[25px] w-[190px]" />
    }
  }, [view])

  // Get bounce intensity for current transition, defaulting to 0.2 if not defined.
  const currentBounceIntensity =
    SPRING_BOUNCE_ANIMATION_VARIANTS[variantKey as keyof typeof SPRING_BOUNCE_ANIMATION_VARIANTS] || 0.2

  return (
    <motion.div
      layout
      transition={{
        type: 'spring',
        bounce: currentBounceIntensity,
      }}
      style={{ borderRadius: 32 }}
      className="dynamic-island-capsule mx-auto w-fit min-w-[190px] overflow-hidden rounded-full bg-black shadow-lg"
    >
      {/* Inner animated container for content transitions. */}
      <motion.div
        transition={{
          type: 'spring',
          bounce: currentBounceIntensity,
        }}
        initial={{
          scale: 0.9,
          opacity: 0,
          filter: 'blur(5px)',
          originX: 0.5,
          originY: 0.5,
        }}
        animate={{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          originX: 0.5,
          originY: 0.5,
          transition: {
            delay: 0.05,
          },
        }}
        key={view}
      >
        {currentViewContent}
      </motion.div>
    </motion.div>
  )
}

/**
 * Options component that provides a draggable control panel for the DynamicIsland.
 * Allows users to switch between different island views (ring, timer, music, etc.).
 * Features a drag handle and reset button with animated icon.
 */
export const Options: React.FC<OptionsProps> = ({
  view,
  setView,
  setVariantKey,
}) => {
  /**
   * Available view options for the Dynamic Island.
   */
  const availableDynamicIslandViews = [
    'idle',
    'ring',
    'timer',
    'record',
    'music',
    'airdrop',
    'airdropMini',
    'lowBattery',
    'phone',
    'findmy',
    'screenRecord',
  ]

  /**
   * Handles view button click with transition animation.
   * Goes to idle state first, then transitions to selected view after delay.
   */
  const handleViewButtonClick = (selectedViewName: string) => {
    if (selectedViewName === 'idle') {
      setView('idle')
      setVariantKey('idle')
      return
    }
    setView('idle')
    setTimeout(() => setView(selectedViewName), 500)
    setVariantKey(`${view}-${selectedViewName}`)
  }

  /**
   * Resets Dynamic Island to idle state.
   */
  const handleResetToIdleClick = () => {
    setView('idle')
    setVariantKey('idle')
  }

  return (
    <motion.div
      drag
      className="border-foreground/10 bg-muted2 relative flex w-[245px] flex-col gap-3 rounded-3xl border p-3 backdrop-blur-sm"
    >
      {/* Header with drag handle and reset button. */}
      <div className="flex items-center justify-between">
        {/* Drag handle icon. */}
        <span className="size-4 cursor-grab active:cursor-grabbing">
          <svg className="size-4 opacity-50" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="9" r="1"/>
            <circle cx="19" cy="9" r="1"/>
            <circle cx="5" cy="9" r="1"/>
            <circle cx="12" cy="15" r="1"/>
            <circle cx="19" cy="15" r="1"/>
            <circle cx="5" cy="15" r="1"/>
          </svg>
        </span>

        {/* Reset button with rotating refresh icon on hover. */}
        <p
          onClick={handleResetToIdleClick}
          className="hover:bg-muted3 group flex cursor-pointer items-center justify-center gap-2 rounded-lg px-2 py-1 text-sm opacity-50"
        >
          Options
          <span className="group-active:-rotate-360 rotate-0 cursor-pointer transition-all duration-300 group-hover:rotate-90">
            <svg className="size-4 opacity-50" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 2v6h-6"/>
              <path d="M3 12a9 9 0 0 1 15-6.7L21 8"/>
              <path d="M3 22v-6h6"/>
              <path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>
            </svg>
          </span>
        </p>
      </div>

      {/* View selection buttons. */}
      <div className="flex flex-wrap justify-center gap-2 pt-2">
        {availableDynamicIslandViews.map((viewOptionName) => (
          <button
            type="button"
            className="bg-muted3 text-foreground flex-1 rounded-xl px-2.5 py-1.5 text-xs"
            onClick={() => handleViewButtonClick(viewOptionName)}
            key={viewOptionName}
          >
            {viewOptionName}
          </button>
        ))}
      </div>
    </motion.div>
  )
}

/**
 * Dynamic Island Animation Component — v1.0.0
 *
 * This implementation follows the process taught in the Animations.dev course by Emil Kowalski, with additional components and modifications by the author.
 * We respect the original creators. This is an inspired rebuild with our own taste and does not claim any ownership.
 * Built with Motion for React to recreate the iPhone Dynamic Island animations.
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.in
 * Twitter: https://x.com/Gur__vi
 */
