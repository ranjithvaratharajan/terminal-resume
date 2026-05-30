"use client";

import { useEffect, useRef } from "react";

export default function CreativeArt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    
    // Mouse interaction
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();

    // Configuration for the "Silk Ribbons"
    const lines = 12; // Number of overlapping lines
    const segments = 100; // Resolution of the curves

    const draw = () => {
      if (!ctx || !canvas) return;
      
      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // Clear with slight trailing effect for smoothness, though we are redrawing completely
      ctx.clearRect(0, 0, width, height);
      
      // Subtle gradient for the lines
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, "rgba(59, 130, 246, 0.1)"); // Blue
      gradient.addColorStop(0.5, "rgba(139, 92, 246, 0.3)"); // Purple
      gradient.addColorStop(1, "rgba(236, 72, 153, 0.1)"); // Pink

      ctx.lineWidth = 1;
      
      // Draw flowing silk lines
      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        ctx.strokeStyle = gradient;
        
        for (let x = 0; x <= segments; x++) {
          const xPos = (x / segments) * width;
          
          // Complex sine wave math for beautiful fluid motion
          const noise1 = Math.sin((xPos * 0.002) + time + i * 0.1);
          const noise2 = Math.cos((xPos * 0.005) - time * 0.8 + i * 0.2);
          
          // Influence from mouse position
          const mouseInfluenceY = (mouseY - height / 2) * 0.2;
          
          const yOffset = (noise1 * 40) + (noise2 * 60) + mouseInfluenceY * Math.sin(xPos * 0.01 + time);
          
          const yPos = centerY + yOffset + (i - lines / 2) * 15;

          if (x === 0) {
            ctx.moveTo(xPos, yPos);
          } else {
            // Add slight bezier smoothing between points (simulated by dense segments)
            ctx.lineTo(xPos, yPos);
          }
        }
        ctx.stroke();
      }

      time += 0.005; // Speed of the fluid motion
      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleResize = () => {
      setCanvasSize();
    };

    draw();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-60" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
      {/* Soft overlay gradient to blend the art into the white background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white pointer-events-none" />
    </div>
  );
}
