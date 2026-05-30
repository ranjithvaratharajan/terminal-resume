"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const CHARS = "!<>-_\\\\/[]{}—=+*^?#________";

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleOnMount?: boolean;
}

export default function ScrambleText({ text, className = "", scrambleOnMount = true }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = () => {
    let iteration = 0;
    
    clearInterval(intervalRef.current!);
    
    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
      });
      
      if (iteration >= text.length) {
        clearInterval(intervalRef.current!);
      }
      
      iteration += 1 / 3;
    }, 30);
  };

  useEffect(() => {
    if (scrambleOnMount) {
      scramble();
    }
    return () => clearInterval(intervalRef.current!);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.span
      className={`inline-block ${className}`}
      onMouseEnter={() => {
        setIsHovered(true);
        scramble();
      }}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        color: isHovered ? "var(--color-primary, #000)" : "inherit"
      }}
    >
      {displayText}
    </motion.span>
  );
}
