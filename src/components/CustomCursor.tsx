"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cursorRef.current) return;

    // Center the cursor correctly using GSAP's percentage offsets
    // This prevents the "stopping a few distance away" bug caused by GSAP overwriting CSS transforms.
    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });

    // Use GSAP quickTo for a smooth trailing effect
    const xTo = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.5,
      ease: "power4.out",
    });
    const yTo = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.5,
      ease: "power4.out",
    });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-[var(--accent)] pointer-events-none z-[9999] flex items-center justify-center"
      style={{
        left: "0px",
        top: "0px",
        // Initialize way off-screen so it's hidden before first mouse move
        transform: "translate3d(-100px, -100px, 0)", 
      }}
    >
      {/* Inner dot that also trails the main cursor movement */}
      <div className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full"></div>
    </div>
  );
}
