"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function FloatingScrollButton() {
  const { scrollYProgress } = useScroll();

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Magnetic state
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = buttonRef.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.4, y: middleY * 0.4 });
  };

  const resetPosition = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0.8,
        pointerEvents: isVisible ? "auto" : "none"
      }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-8 right-8 z-[100]"
    >
      <motion.button
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={resetPosition}
        onClick={scrollToTop}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group"
        aria-label="Scroll to top"
      >
        {/* Background track */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 p-1" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="46"
            className="stroke-gray-100 fill-none"
            strokeWidth="4"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="46"
            className="stroke-blue-600 fill-none"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ pathLength }}
          />
        </svg>

        {/* Arrow icon */}
        <motion.div
          animate={{ y: isHovered ? -2 : 0 }}
          className="relative text-gray-900 z-10"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.div>
      </motion.button>
    </motion.div>
  );
}
