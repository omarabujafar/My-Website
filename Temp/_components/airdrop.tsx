"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Icons } from "./Icons";

export function AirdropMini() {
  const [progress, setProgress] = useState(0);
  return (
    <motion.div
      transition={{ type: "spring", bounce: 0.5 }}
      className="flex w-[284px] items-center gap-2 p-4"
    >
      <div className="flex w-full gap-2">
        <motion.button
          aria-label="Pause timer"
          whileTap={{ scale: 0.9 }}
          className="relative flex h-10 w-10 items-center justify-center"
        >
          <Icons.airDrop className="size-15 text-[#159BF4]" />
          <img
            src="/mac/user.png"
            className="absolute -right-1 bottom-0 size-6"
            alt=""
          />
        </motion.button>
        <div className="mt-4 flex w-full items-center gap-1 font-medium text-white">
          <h1 className="h-full text-sm">AirDrop</h1>
          <p className="text-xs">1 photo</p>
        </div>
        <CircularProgressLoader progress={progress} setProgress={setProgress} />
      </div>
    </motion.div>
  );
}
export function Airdrop({ setView }: any) {
  return (
    <motion.div className="flex w-[284px] items-center gap-2 p-4">
      <div className="fcc gap-4">
        <div className="flex w-full justify-between">
          <div className="w-2/3">
            <motion.button
              aria-label="Pause timer"
              whileTap={{ scale: 0.9 }}
              className="relative flex h-10 w-10 items-center justify-center"
            >
              <Icons.airDrop className="size-15 text-[#159BF4]" />

              <img
                src="/mac/user.png"
                className="absolute -right-1 bottom-0 size-6"
                alt=""
              />
            </motion.button>
            <div className="text-white">
              <h1 className="text-sm font-medium">AirDrop</h1>
              <p className="mr-4 text-xs leading-4">
                {" "}
                Gxuri would like to share 23 photos
              </p>
            </div>
          </div>
          <div className="h-24 w-24 overflow-hidden rounded-2xl">
            <img
              src="/mac/japan.webp"
              className="size-full object-cover"
              alt=""
            />
          </div>
        </div>
        <div className="flex w-full gap-2 font-medium">
          <motion.button
            onClick={() => {
              setView("idle");
            }}
            whileTap={{ scale: 0.9 }}
            className="w-1/2 rounded-full bg-neutral-700 py-1.5 text-white"
          >
            Decline
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setView("idle");
              setTimeout(() => setView("airdropMini"), 500);
            }}
            className="w-1/2 rounded-full bg-[#012B59] py-1 text-[#159BF4]"
          >
            Accept
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function CircularProgressLoader({ progress, setProgress }: any) {
  useEffect(() => {
    const timer25 = setTimeout(() => {
      setProgress(25);
    }, 600);

    const timer50 = setTimeout(() => {
      setProgress(50);
    }, 1700);

    const timer75 = setTimeout(() => {
      setProgress(75);
    }, 2100);

    const timer100 = setTimeout(() => {
      setProgress(100);
    }, 2400);

    const timer105 = setTimeout(() => {
      setProgress(105);
    }, 2700);

    // Clean up timers
    return () => {
      clearTimeout(timer25);
      clearTimeout(timer50);
      clearTimeout(timer75);
      clearTimeout(timer100);
      clearTimeout(timer105);
    };
  }, []);

  const size = 50;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;

  const progressAnimation = {
    pathLength: progress / 100,
    pathOffset: 0,
    opacity: 1,
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, bounce: 0.5 }}
      className="relative"
    >
      <AnimatePresence mode="popLayout">
        {progress > 100 ? (
          <motion.button
            key="exit"
            whileTap={{ scale: 0.8 }}
            initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
            transition={{ type: "spring", duration: 1, bounce: 0.5 }}
            aria-label="Exit"
            className="flex h-10 min-w-10 items-center justify-center rounded-full bg-[#3C3D3C] px-2 text-white transition-colors hover:bg-[#4A4B4A]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M18 8h-2c-.55 0-1 .45-1 1s.45 1 1 1h2v11H6V10h2c.55 0 1-.45 1-1s-.45-1-1-1H6c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2"
              />
              <path
                fill="currentColor"
                d="M12 16c.55 0 1-.45 1-1V5h1.79c.45 0 .67-.54.35-.85l-2.79-2.79c-.2-.2-.51-.2-.71 0L8.85 4.15a.5.5 0 0 0 .36.85H11v10c0 .55.45 1 1 1"
              />
            </svg>
          </motion.button>
        ) : (
          <motion.div
            key="share"
            initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
            transition={{ type: "spring", duration: 1, bounce: 0.5 }}
            className="relative flex items-center justify-center"
          >
            <svg
              className="relative size-10 text-[#159BF4]"
              viewBox="0 0 50 50"
            >
              {/* Background circle */}
              <circle
                className="opacity-40"
                strokeWidth={strokeWidth}
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx={size / 2}
                cy={size / 2}
              />
              {/* Progress circle with framer motion */}
              <motion.circle
                strokeLinecap="round"
                initial={{ pathLength: 0, pathOffset: 0 }}
                animate={progressAnimation}
                transition={{ type: "spring", duration: 1, bounce: 0.2 }}
                strokeWidth={strokeWidth}
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx={size / 2}
                cy={size / 2}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
              />
            </svg>
            <motion.div
              initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1.2, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
              transition={{ type: "spring", duration: 1, bounce: 0.5 }}
              className="absolute size-3.5 rounded-sm bg-[#159BF4]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
