"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Record() {
  const [isRecording, setIsRecording] = useState(true);
  const [time, setTime] = useState(1);

  const bars = 16;

  const getRandomHeights = () => {
    return Array.from({ length: bars }, () => Math.random() * 0.8 + 0.2);
  };

  const [heights, setHeights] = useState(getRandomHeights());

  useEffect(() => {
    if (isRecording) {
      // Waveform update interval - every 100ms
      const waveformIntervalId = setInterval(() => {
        setHeights(getRandomHeights());
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
    <motion.div className="relative flex h-7 w-[200px] items-center justify-between rounded-full px-2.5 shadow-sm">
      <motion.div
        initial={{ opacity: 0, filter: "blur(4px)" }}
        animate={{
          opacity: 1,
          filter: "blur(0px)",
        }}
        exit={{ opacity: 0, filter: "blur(4px)" }}
        transition={{ type: "spring", bounce: 0.35 }}
        className="flex h-[18px] w-full items-center gap-0.5 rounded-full"
      >
        {/* Waveform visualization */}
        {heights.map((height, index) => (
          <motion.div
            key={index}
            className="w-[3px] rounded-full bg-[#FD4F30]"
            initial={{ height: 4 }}
            animate={{
              height: Math.max(4, height * 14),
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 10,
            }}
          />
        ))}
      </motion.div>

      <div className="ml-auto flex items-center">
        <span className="text-xs font-medium tabular-nums text-[#FD4F30]">
          {formatTime(time)}
        </span>
      </div>
    </motion.div>
  );
}
