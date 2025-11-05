"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function ScreenRecord() {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [recordingState, setRecordingState] = useState("idle");
  // Format seconds to MM:SS
  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes}:${secs < 10 ? "0" + secs : secs}`;
  };

  // Handle timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timerActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timerActive]);

  // Handle recording state changes
  useEffect(() => {
    if (recording) {
      setTimerActive(true);
    } else {
      setTimerActive(false);
    }
  }, [recording]);

  return (
    <motion.div
      transition={{ type: "spring", bounce: 0.5 }}
      className="flex w-72 items-center justify-between gap-2 p-4"
    >
      <div className="gap-2 space-y-1 text-white">
        <motion.div
          animate={
            recording
              ? {
                  opacity: recording ? [0.5, 1, 0.5] : 1,
                }
              : {}
          }
          transition={
            recording
              ? {
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              : {}
          }
          className="flex items-center gap-1"
        >
          <div className="size-3 rounded-full bg-red-500" />
          <p className="text-red-500">{formatTime(seconds)}</p>
        </motion.div>
        <div className="w-30 relative flex h-5 items-center justify-center">
          <AnimatePresence initial={false} mode="popLayout">
            {recordingState !== "saved" ? (
              <motion.h1
                key="screeeeen"
                initial={{ opacity: 0, scale: 0.85, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.85, filter: "blur(4px)" }}
                transition={{ type: "spring", duration: 1.5, bounce: 0.5 }}
                className="absolute w-full text-sm"
              >
                Screen Recording
              </motion.h1>
            ) : (
              <motion.h1
                key="screeeeeeeeen"
                initial={{ opacity: 0, scale: 0.85, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.85, filter: "blur(4px)" }}
                transition={{ type: "spring", duration: 1.5, bounce: 0.5 }}
                className="absolute w-full text-sm"
              >
                Recording Saved
              </motion.h1>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="flex justify-end">
        <CircularProgressLoader
          recording={recording}
          setRecording={setRecording}
          recordingState={recordingState}
          setRecordingState={setRecordingState}
        />
      </div>
    </motion.div>
  );
}

function CircularProgressLoader({
  setRecording,
  recordingState,
  setRecordingState,
}: any) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setRecordingState("record");
      setRecording(true);
    }, 1000);
    const timer2 = setTimeout(() => {
      setRecordingState("saved");
      setRecording(false);
    }, 12500);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  const size = 50;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, bounce: 0.5 }}
      className="relative"
    >
      <motion.div
        key="latest"
        initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
        transition={{ type: "spring", duration: 1, bounce: 0.5 }}
        className="relative flex size-10 cursor-pointer items-center justify-center"
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setRecordingState("saved");
          setRecording(false);
        }}
      >
        <svg className="relative z-10 size-10 text-white" viewBox="0 0 50 50">
          <motion.circle
            strokeLinecap="round"
            initial={{
              rotate: 0,
              pathLength: 0.93,
              pathOffset: 0,
            }}
            animate={{
              rotate: recordingState === "record" ? 360 : 0,
              pathLength: recordingState === "record" ? 0.93 : 1,
              opacity: recordingState === "idle" ? 1 : 0.5,
              transition: {
                rotate:
                  recordingState === "record"
                    ? {
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "linear",
                      }
                    : {
                        duration: 0,
                      },
              },
            }}
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
        </svg>
        <motion.div
          initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
          animate={{
            opacity: recordingState === "record" ? 0.7 : 1,
            scale: recordingState === "saved" ? 3.5 : 1.2,
            filter: "blur(0px)",
          }}
          exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
          transition={{ type: "spring", duration: 1, bounce: 0.5 }}
          className="absolute z-20 size-3.5 overflow-hidden rounded-sm bg-red-500"
        >
          {recordingState === "saved" && (
            <img src="/mac/japan.webp" alt="japan" />
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
