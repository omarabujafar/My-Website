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

const BOUNCE_VARIANTS = {
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

interface DynamicIslandProps {
  view: string
  variantKey: string
}

interface OptionsProps {
  view: string
  setView: (v: string) => void
  setVariantKey: (v: string) => void
}

export const DynamicIsland: React.FC<DynamicIslandProps> = ({
  view,
  variantKey,
}) => {
  const content = useMemo(() => {
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

  return (
    <motion.div
      layout
      transition={{
        type: 'spring',
        bounce:
          BOUNCE_VARIANTS[variantKey as keyof typeof BOUNCE_VARIANTS] || 0.2,
      }}
      style={{ borderRadius: 32 }}
      className="dynamic-island-capsule mx-auto w-fit min-w-[190px] overflow-hidden rounded-full bg-black shadow-lg"
    >
      <motion.div
        transition={{
          type: 'spring',
          bounce:
            BOUNCE_VARIANTS[variantKey as keyof typeof BOUNCE_VARIANTS] || 0.2,
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
        {content}
      </motion.div>
    </motion.div>
  )
}

export const Options: React.FC<OptionsProps> = ({
  view,
  setView,
  setVariantKey,
}) => {
  return (
    <motion.div
      drag
      className="border-foreground/10 bg-muted2 relative flex w-[245px] flex-col gap-3 rounded-3xl border p-3 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between">
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
        <p
          onClick={() => {
            setView('idle')
            setVariantKey('idle')
          }}
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
      <div className="flex flex-wrap justify-center gap-2 pt-2">
        {[
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
        ].map((v) => (
          <button
            type="button"
            className="bg-muted3 text-foreground flex-1 rounded-xl px-2.5 py-1.5 text-xs"
            onClick={() => {
              if (v === 'idle') {
                setView('idle')
                setVariantKey('idle')
                return
              }
              setView('idle')
              setTimeout(() => setView(v), 500)
              setVariantKey(`${view}-${v}`)
            }}
            key={v}
          >
            {v}
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
