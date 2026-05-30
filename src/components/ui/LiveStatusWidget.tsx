"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function LiveStatusWidget() {
  const [timeString, setTimeString] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    
    const updateClock = () => {
      // Create formatter for IST (Asia/Kolkata)
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setTimeString(formatter.format(new Date()));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return <div className="h-10 w-48 opacity-0"></div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3, duration: 0.8 }}
      className="inline-flex items-center gap-3 px-4 py-2 bg-white/50 backdrop-blur-md border border-gray-200/50 rounded-full shadow-sm"
    >
      <div className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
      </div>
      
      <div className="flex flex-col">
        <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 leading-none mb-0.5">
          Status / Loc
        </span>
        <span className="text-xs font-mono text-gray-700 leading-none">
          Available • IST {timeString}
        </span>
      </div>
    </motion.div>
  );
}
