"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  const name = "BLESSON JF";

  useGSAP(() => {
    if (!containerRef.current || !textRef.current) return;

    const letters = textRef.current.children;

    const tl = gsap.timeline({
      onComplete: () => setIsComplete(true),
    });

    // Animate letters in
    tl.fromTo(
      letters,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
      }
    )
    // Hold for a moment
    .to(letters, {
      opacity: 0,
      y: -50,
      duration: 0.6,
      stagger: 0.03,
      ease: "power3.in",
      delay: 0.5,
    })
    // Slide up the preloader screen
    .to(containerRef.current, {
      yPercent: -100,
      duration: 1,
      ease: "expo.inOut",
    });
  }, { scope: containerRef });

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
    >
      <div ref={textRef} className="flex overflow-hidden">
        {name.split("").map((char, index) => (
          <span
            key={index}
            className={`text-5xl md:text-7xl font-bold text-white ${char === " " ? "w-4 md:w-8" : ""}`}
            style={{ display: "inline-block" }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
