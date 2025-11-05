"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Icons } from "@/components/v1/_components/Icons";

export function Phone() {
  const [isRecording, setIsRecording] = useState(true);
  const [time, setTime] = useState(1);

  const bars = 18;

  const getRandomHeights = () => {
    return Array.from({ length: bars }, () => Math.random() * 0.8 + 0.2);
  };

  const [heights, setHeights] = useState(getRandomHeights());
  const [heights2, setHeights2] = useState(getRandomHeights());

  useEffect(() => {
    if (isRecording) {
      // Waveform update interval - every 100ms
      const waveformIntervalId = setInterval(() => {
        setHeights(getRandomHeights());
        setHeights2(getRandomHeights());
      }, 100);

      // Timer update interval - every 1000ms (1 second)
      const timerIntervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);

      return () => {
        clearInterval(waveformIntervalId);
        clearInterval(timerIntervalId);
      };
    }
  }, [isRecording]);

  const formatTime = (seconds: any) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(4px)" }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
      }}
      exit={{ opacity: 0, filter: "blur(4px)" }}
      className="relative flex h-7 w-[220px] items-center justify-between rounded-full px-2.5 shadow-sm"
    >
      <div className="flex items-center gap-1 font-medium">
        <motion.div
          animate={{
            rotate: [0, 20, -15, 12.5, -10, 10, -7.5, 7.5, -5, 5, 0],
          }}
        >
          <Icons.phone className="size-4 text-[#2FD057]" />
        </motion.div>
        <span className="text-xs font-semibold tabular-nums text-[#2FD057]">
          {formatTime(time)}
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, filter: "blur(4px)" }}
        animate={{
          opacity: 1,
          filter: "blur(0px)",
        }}
        exit={{ opacity: 0, filter: "blur(4px)" }}
        transition={{ type: "spring", bounce: 0.35 }}
        className="absolute right-4 z-20 flex h-[18px] w-full items-center justify-end gap-0.5 rounded-full"
      >
        {/* Waveform visualization */}
        {heights.map((height, index) => (
          <motion.div
            key={index}
            className="w-[1px] rounded-full bg-[#2FD057]"
            initial={{ height: 0 }}
            animate={{
              height: Math.max(0, height * 14),
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 10,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
