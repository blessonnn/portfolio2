"use client";

import { useEffect, useRef } from "react";

export default function CustomScrollIndicator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const squareRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!squareRef.current) return;
      
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Calculate progress from 0 to 1
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      
      // The line is 120px tall, square is 4px. Max movement is 116px.
      const yPos = progress * 116;
      
      squareRef.current.style.transform = `translateY(${yPos}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initialize position
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-[50] pointer-events-none mix-blend-difference"
    >
      <svg width="8" height="120" viewBox="0 0 8 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="4" y1="0" x2="4" y2="120" stroke="white" strokeWidth="1" strokeOpacity="0.4" />
        <rect ref={squareRef} x="2" y="0" width="4" height="4" fill="white" />
      </svg>
    </div>
  );
}
