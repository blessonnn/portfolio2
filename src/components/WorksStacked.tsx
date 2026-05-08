"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const WORKS = [
  { id: "vitalpulse", title: "VitalPulse", color: "#FFC338", text: "text-black" },
  { id: "pixelvault", title: "Pixelvault", color: "#F4FF38", text: "text-black" },
  { id: "lastpage", title: "Lastpage", color: "#FFFFFF", text: "text-black" },
  { id: "trackie", title: "Trackie", color: "#FF6B6B", text: "text-black" },
  { id: "valentine", title: "Valentine", color: "#B366FF", text: "text-black" },
];

const WorksStacked = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      // Setup the timeline with scroll scrubbing
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top", // When the section hits the top of the viewport (and the text is precisely centered)
          end: "+=4000", // The amount of scroll distance required to complete the stacking
          pin: true,
          scrub: 1, // Smooth scrubbing
        },
      });

      // Get all cards
      const cards = gsap.utils.toArray<HTMLElement>(".work-card", containerRef.current);

      // Initially set all cards below the screen
      gsap.set(cards, { yPercent: 100 });

      // Animate them sliding up one by one
      cards.forEach((card, index) => {
        tl.to(card, {
          yPercent: 0,
          ease: "none", // Linear ease is critical for a 1:1 scroll feel
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="works"
      className="relative w-full h-screen bg-[#0a0a0a] text-white overflow-hidden flex items-center justify-center"
    >
      {/* Background Centered "WORKS" Heading */}
      <h2
        ref={titleRef}
        className="text-[15vw] leading-none font-bold tracking-tighter text-[var(--accent)] z-0"
      >
        WORKS
      </h2>

      {/* The Overlapping Container */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {WORKS.map((work, i) => (
          <div
            key={work.id}
            className="work-card absolute top-0 left-0 w-full h-screen shadow-[0_-20px_50px_rgba(0,0,0,0.5)] flex flex-col pointer-events-auto"
            style={{ 
              backgroundColor: work.color, 
              zIndex: i + 10 // Ensure proper stacking
            }}
          >
            {/* Project Title at the top */}
            <div className="w-full px-6 md:px-16 pt-12 md:pt-24 pb-8 border-b border-black/10">
              <h3 className={`text-5xl md:text-8xl font-bold uppercase tracking-tighter ${work.text}`}>
                {work.title}
              </h3>
            </div>
            
            {/* Rest of the container for future project images or details */}
            <div className="flex-1 w-full flex items-center justify-center">
              <span className={`text-xl md:text-3xl font-medium opacity-50 ${work.text}`}>
                [Project Content Area]
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorksStacked;
