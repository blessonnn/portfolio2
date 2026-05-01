"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useGSAP(() => {
    if (!containerRef.current || !circleRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => setIsComplete(true),
    });

    // Draw the circle
    tl.fromTo(
      circleRef.current,
      { strokeDashoffset: 126 },
      {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut",
      }
    )
    // Add a slight pause
    .to({}, { duration: 0.3 })
    // Slide up the preloader screen
    .to(containerRef.current, {
      yPercent: -100,
      duration: 1,
      ease: "expo.inOut",
    });

    // Continuous rotation for the SVG
    gsap.to(circleRef.current, {
      rotation: 360,
      duration: 1.5,
      repeat: -1,
      ease: "none",
      transformOrigin: "50% 50%",
    });

  }, { scope: containerRef });

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
    >
      <svg width="80" height="80" viewBox="0 0 50 50" className="overflow-visible">
        <circle
          ref={circleRef}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="white"
          strokeWidth="4"
          strokeDasharray="126"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
