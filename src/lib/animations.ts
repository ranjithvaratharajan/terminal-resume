"use client";

import { useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────
// GSAP Animation Utilities
// ─────────────────────────────────────────────────────

/**
 * Hook to register GSAP ScrollTrigger animations on an element.
 * Provides a ref to attach to the target element.
 */
export function useScrollReveal<T extends HTMLElement>(
  options: {
    y?: number;
    x?: number;
    opacity?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
    childSelector?: string;
    start?: string;
    once?: boolean;
  } = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let cleanup: (() => void) | undefined;

    // Dynamically import GSAP to avoid SSR issues
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        const {
          y = 40,
          x = 0,
          opacity = 0,
          duration = 0.8,
          delay = 0,
          stagger = 0.1,
          childSelector,
          start = "top 88%",
          once = true,
        } = options;

        const targets = childSelector ? el.querySelectorAll(childSelector) : el;

        gsap.set(targets, { opacity, y, x });

        const tween = gsap.to(targets, {
          opacity: 1,
          y: 0,
          x: 0,
          duration,
          delay,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: once
              ? "play none none none"
              : "play none none reverse",
          },
        });

        cleanup = () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });
    });

    return () => cleanup?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.y, options.x, options.opacity, options.duration, options.delay, options.stagger, options.childSelector, options.start, options.once]);

  return ref;
}

/**
 * Hook for hero text character stagger animation (on page load, not scroll).
 */
export function useCharacterReveal<T extends HTMLElement>(
  options: {
    duration?: number;
    stagger?: number;
    delay?: number;
  } = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let cleanup: (() => void) | undefined;

    import("gsap").then(({ gsap }) => {
      const { duration = 0.6, stagger = 0.03, delay = 0.2 } = options;

      // Wrap each character in a span
      const text = el.textContent || "";
      el.innerHTML = text
        .split("")
        .map((char) =>
          char === " "
            ? '<span class="inline-block">&nbsp;</span>'
            : `<span class="inline-block" style="opacity:0;transform:translateY(30px)">${char}</span>`
        )
        .join("");

      const chars = el.querySelectorAll("span");

      const tween = gsap.to(chars, {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        delay,
        ease: "power3.out",
      });

      cleanup = () => tween.kill();
    });

    return () => cleanup?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.duration, options.stagger, options.delay]);

  return ref;
}

/**
 * Hook for word-by-word reveal animation.
 */
export function useWordReveal<T extends HTMLElement>(
  options: {
    duration?: number;
    stagger?: number;
    delay?: number;
  } = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let cleanup: (() => void) | undefined;

    import("gsap").then(({ gsap }) => {
      const { duration = 0.5, stagger = 0.04, delay = 0.5 } = options;

      const text = el.textContent || "";
      el.innerHTML = text
        .split(" ")
        .map(
          (word) =>
            `<span class="inline-block overflow-hidden"><span class="inline-block" style="opacity:0;transform:translateY(100%)">${word}</span></span>`
        )
        .join('<span class="inline-block">&nbsp;</span>');

      const words = el.querySelectorAll(
        "span > span"
      );

      const tween = gsap.to(words, {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        delay,
        ease: "power3.out",
      });

      cleanup = () => tween.kill();
    });

    return () => cleanup?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.duration, options.stagger, options.delay]);

  return ref;
}

/**
 * Hook for line-by-line text reveal on scroll.
 */
export function useLineReveal<T extends HTMLElement>(
  options: {
    duration?: number;
    stagger?: number;
    start?: string;
  } = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let cleanup: (() => void) | undefined;

    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        const {
          duration = 0.6,
          stagger = 0.08,
          start = "top 85%",
        } = options;

        // Split by sentences
        const text = el.innerHTML;
        const sentences = text.split(/(?<=[.!?])\s+/);
        el.innerHTML = sentences
          .map(
            (s) =>
              `<span class="block overflow-hidden"><span class="block" style="opacity:0;transform:translateY(100%)">${s}</span></span>`
          )
          .join(" ");

        const lines = el.querySelectorAll("span > span");

        const tween = gsap.to(lines, {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: "play none none none",
          },
        });

        cleanup = () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });
    });

    return () => cleanup?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.duration, options.stagger, options.start]);

  return ref;
}
