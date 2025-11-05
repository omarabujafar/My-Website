import { motion } from 'framer-motion'

export function FindMy() {
  return (
    <div className="flex w-[284px] items-center gap-2 py-3 pl-3.5 pr-5">
      <motion.button
        aria-label="Pause timer"
        whileTap={{ scale: 0.9 }}
        className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#1A5B3D]"
      >
        <motion.div
          animate={{ scale: 1.3 }}
          transition={{
            scale: {
              repeat: Infinity,
              repeatType: 'loop',
              type: 'spring',
              stiffness: 333, // Higher = harder hit
              damping: 20, // Lower = longer bounce back
              mass: 3,
            },
          }}
          className="absolute size-3 rounded-full bg-[#87fcdc] shadow-[0px_0px_45px_10px_rgba(148,255,222,1)]"
        />

        <motion.div
          className="absolute size-3.5 rounded-full border-[0.5px] border-[#87fcdc] shadow-[0px_0px_45px_10px_rgba(148,255,222,1)]"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 3.1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            scale: {
              repeat: Infinity,
              repeatType: 'loop',
              type: 'spring',
              stiffness: 267, // Higher = harder hit
              damping: 50, // Lower = longer bounce back
              mass: 3,
            },
          }}
        />
        <motion.div className="absolute size-3.5 rounded-full border-[0.5px] border-[#87fcdc] shadow-[0px_0px_45px_10px_rgba(148,255,222,1)]" />
      </motion.button>
      <p className="ml-2 font-medium text-white">Find My iphone gxuri</p>
    </div>
  )
}
