"use client";

import { useEffect, useRef, useState } from "react";

interface InfiniteMarqueeProps {
  children: React.ReactNode;
  speed?: number; // Pixels per second
  pauseOnHover?: boolean;
}

export default function InfiniteMarquee({ children, speed = 40, pauseOnHover = true }: InfiniteMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;
    
    // Duplicate the content to make it seamless
    const scrollerContent = Array.from(scrollerRef.current.children);
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      if (scrollerRef.current) {
        scrollerRef.current.appendChild(duplicatedItem);
      }
    });

    setStart(true);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] ${pauseOnHover ? "hover:[&>div]:[animation-play-state:paused]" : ""}`}
    >
      <div
        ref={scrollerRef}
        className={`flex min-w-full shrink-0 gap-16 py-4 w-max flex-nowrap ${start ? "animate-scroll" : ""}`}
        style={{
          "--animation-duration": `${10000 / speed}s`,
        } as React.CSSProperties}
      >
        {children}
      </div>
    </div>
  );
}
