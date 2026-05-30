"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MagneticText from "./MagneticText";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial state
    if (document.documentElement.classList.contains("dark-theme")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDark(true);
    }
  }, []);

  const toggleDarkMode = (e: React.MouseEvent) => {
    const isDarkNow = document.documentElement.classList.contains("dark-theme");
    const willBeDark = !isDarkNow;

    const x = e.clientX;
    const y = e.clientY;

    // Check if View Transitions API is supported
    if (!document.startViewTransition) {
      document.documentElement.classList.toggle("dark-theme");
      setIsDark(willBeDark);
      return;
    }

    document.documentElement.style.setProperty("--click-x", `${x}px`);
    document.documentElement.style.setProperty("--click-y", `${y}px`);
    document.documentElement.classList.remove("dark-transition", "light-transition");
    document.documentElement.classList.add(willBeDark ? "dark-transition" : "light-transition");

    const transition = document.startViewTransition(() => {
      document.documentElement.classList.toggle("dark-theme");
      setIsDark(willBeDark);
    });

    transition.finished.then(() => {
      document.documentElement.classList.remove("dark-transition", "light-transition");
    });
  };

  return (
    <MagneticText>
      <button
        onClick={toggleDarkMode}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-900 border border-gray-200"
        aria-label="Toggle dark mode"
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ duration: 0.5, ease: "backOut" }}
        >
          {isDark ? (
            // Sun icon for dark mode (which will be inverted to look right!)
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            // Moon icon for light mode
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </motion.div>
      </button>
    </MagneticText>
  );
}
