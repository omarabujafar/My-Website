"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { ElasticSlider } from "@/components/ui/slider";

export function Music() {
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(1);
  const totalDuration = 120; // 2 minutes
  const bars = 6;

  const getRandomHeights = () => {
    return Array.from({ length: bars }, () => Math.random() * 0.8 + 0.2);
  };

  const [heights, setHeights] = useState(getRandomHeights());

  useEffect(() => {
    if (!isPaused) {
      // Waveform update interval
      const waveformIntervalId = setInterval(() => {
        setHeights(getRandomHeights());
      }, 100);

      // Timer update interval
      const timerIntervalId = setInterval(() => {
        setTime((prevTime) =>
          prevTime < totalDuration ? prevTime + 1 : prevTime,
        );
      }, 1000);

      return () => {
        clearInterval(waveformIntervalId);
        clearInterval(timerIntervalId);
      };
    }
  }, [isPaused, totalDuration]);

  const [toggle, setToggle] = useState(false);

  const formatTime = (seconds: any) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const timeRemaining = totalDuration - time;

  return (
    <div className="h-fit w-[284px] p-5">
      <div>
        <div className="flex items-center gap-2">
          <div className="perspective-1000 relative size-14">
            <motion.div
              initial={{
                rotateY: 0,
                rotate: 30,
                scale: 0.5,
              }}
              onClick={() => setToggle((x) => !x)}
              animate={{
                rotateY: toggle ? 0 : 180,
                rotate: 0,
                scale: 1,
              }}
              transition={{
                type: "spring",
                bounce: 0.5,
                duration: 2,
              }}
              whileTap={{ scale: 0.8 }}
              className="relative size-14 rounded-2xl"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <div className="backface-hidden absolute size-full rounded-2xl bg-gradient-to-b from-indigo-400 to-cyan-400" />
              <div
                className="backface-hidden absolute size-full rounded-2xl bg-gradient-to-b from-orange-600 via-pink-300 to-blue-300"
                style={{ transform: "rotateY(180deg)" }}
              />
            </motion.div>
          </div>
          <div className="h-full text-lg font-medium text-white">
            <h1 className="leading-5">Glow</h1>
            <p className="leading-5">Echo</p>
          </div>
          <div className="absolute right-7">
            <motion.div className="flex h-[18px] w-full items-center gap-0.5 rounded-full">
              {/* Waveform visualization */}
              {heights.map((height, index) => (
                <motion.div
                  key={index}
                  className="w-[3px] rounded-full bg-blue-400"
                  initial={{ height: 4 }}
                  animate={{
                    height: isPaused ? 4 : Math.max(4, height * 14),
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 10,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm">
          <p className="tabular-nums">{formatTime(time)}</p>

          <ElasticSlider
            value={time}
            onChange={(newTime: any) => setTime(newTime)}
            max={totalDuration}
          />

          <p className="tabular-nums">-{formatTime(timeRemaining)}</p>
        </div>
        <div className="mt-4 flex justify-center gap-8">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="size-6 text-neutral-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              style={{ transform: "scaleX(-1)" }}
            >
              <g fill="currentColor">
                <path d="M7.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696z" />
                <path d="M15.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C8.713 12.69 8 12.345 8 11.692V4.308c0-.653.713-.998 1.233-.696z" />
              </g>
            </svg>
          </motion.button>
          <motion.button
            aria-label="Toggle play/pause"
            onClick={() => setIsPaused((p) => !p)}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence initial={false} mode="wait">
              {isPaused ? (
                <motion.svg
                  key="play"
                  viewBox="0 0 12 14"
                  fill="none"
                  className="size-5 fill-current text-neutral-300"
                >
                  <path d="M0.9375 13.2422C1.25 13.2422 1.51562 13.1172 1.82812 12.9375L10.9375 7.67188C11.5859 7.28906 11.8125 7.03906 11.8125 6.625C11.8125 6.21094 11.5859 5.96094 10.9375 5.58594L1.82812 0.3125C1.51562 0.132812 1.25 0.015625 0.9375 0.015625C0.359375 0.015625 0 0.453125 0 1.13281V12.1172C0 12.7969 0.359375 13.2422 0.9375 13.2422Z" />
                </motion.svg>
              ) : (
                <motion.svg
                  key="pause"
                  viewBox="0 0 10 13"
                  fill="none"
                  className="size-5 fill-current text-neutral-300"
                >
                  <path d="M1.03906 12.7266H2.82031C3.5 12.7266 3.85938 12.3672 3.85938 11.6797V1.03906C3.85938 0.328125 3.5 0 2.82031 0H1.03906C0.359375 0 0 0.359375 0 1.03906V11.6797C0 12.3672 0.359375 12.7266 1.03906 12.7266ZM6.71875 12.7266H8.49219C9.17969 12.7266 9.53125 12.3672 9.53125 11.6797V1.03906C9.53125 0.328125 9.17969 0 8.49219 0H6.71875C6.03125 0 5.67188 0.359375 5.67188 1.03906V11.6797C5.67188 12.3672 6.03125 12.7266 6.71875 12.7266Z" />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="size-6 text-neutral-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <g fill="currentColor">
                <path d="M7.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696z" />
                <path d="M15.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C8.713 12.69 8 12.345 8 11.692V4.308c0-.653.713-.998 1.233-.696z" />
              </g>
            </svg>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
