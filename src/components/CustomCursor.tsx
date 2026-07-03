"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hoverType, setHoverType] = useState<string | null>(null);

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

      const target = e.target as HTMLElement | null;
      const hoverElement = target?.closest("[data-cursor]");
      const nextType = hoverElement ? hoverElement.getAttribute("data-cursor") : null;
      setHoverType((prev) => (prev !== nextType ? nextType : prev));
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center custom-cursor-wrapper"
      style={{
        left: "0px",
        top: "0px",
        // Initialize way off-screen so it's hidden before first mouse move
        transform: "translate3d(-100px, -100px, 0)", 
        width: hoverType === "details" ? "88px" : "8px",
        height: hoverType === "details" ? "36px" : "8px",
        borderRadius: hoverType === "details" ? "18px" : "50%",
        backgroundColor: "var(--accent)", // #3874ff
        borderColor: "var(--accent)",
        borderWidth: "1px",
        borderStyle: "solid",
        transition: "width 0.25s cubic-bezier(0.25, 1, 0.5, 1), height 0.25s cubic-bezier(0.25, 1, 0.5, 1), border-radius 0.25s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.25s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.25s cubic-bezier(0.25, 1, 0.5, 1)",
        boxShadow: hoverType === "details" ? "0 10px 25px -5px rgba(56, 116, 255, 0.4)" : "none"
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Details Text */}
        <span
          className="text-white uppercase font-bold tracking-wider absolute"
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "9px",
            opacity: hoverType === "details" ? 1 : 0,
            transform: hoverType === "details" ? "scale(1)" : "scale(0.5)",
            transition: "opacity 0.2s ease, transform 0.2s ease",
          }}
        >
          Details
        </span>
      </div>
    </div>
  );
}



