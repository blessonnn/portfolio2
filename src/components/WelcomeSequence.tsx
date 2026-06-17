"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const fontConfigs = [
  {
    // Config 1: Doto (dotted modern) - Heavy vs Light
    line1Style: { fontFamily: "var(--font-doto)", fontWeight: "900", textTransform: "uppercase" as const, letterSpacing: "0.05em", lineHeight: 1.0 },
    line2Style: { fontFamily: "var(--font-doto)", fontWeight: "300", textTransform: "lowercase" as const, letterSpacing: "0.02em", lineHeight: 1.0 },
    line1Class: "text-white text-[clamp(3.5rem,11vw,12rem)] leading-[0.9] text-center select-none",
    line2Class: "text-neutral-300 text-[clamp(4rem,13vw,14rem)] leading-[0.9] text-center select-none",
  },
  {
    // Config 2: Instrument Serif - Light Italic vs Bold
    line1Style: { fontFamily: "var(--font-instrument)", fontWeight: "300", fontStyle: "italic", textTransform: "lowercase" as const, lineHeight: 1.0 },
    line2Style: { fontFamily: "var(--font-instrument)", fontWeight: "700", textTransform: "uppercase" as const, letterSpacing: "0.05em", lineHeight: 1.0 },
    line1Class: "text-neutral-400 text-[clamp(3.5rem,11vw,12rem)] leading-[0.9] text-center select-none",
    line2Class: "text-white text-[clamp(4rem,13vw,14rem)] leading-[0.9] text-center select-none",
  },
  {
    // Config 3: Martian Mono - Light vs Extra Bold
    line1Style: { fontFamily: "var(--font-mono)", fontWeight: "300", textTransform: "lowercase" as const, letterSpacing: "0.02em", lineHeight: 1.0 },
    line2Style: { fontFamily: "var(--font-mono)", fontWeight: "800", textTransform: "uppercase" as const, letterSpacing: "0.1em", lineHeight: 1.0 },
    line1Class: "text-neutral-400 text-[clamp(3.2rem,10vw,11rem)] leading-[0.9] text-center select-none",
    line2Class: "text-white text-[clamp(3.8rem,12vw,13rem)] leading-[0.9] text-center select-none",
  },
  {
    // Config 4: Playfair Display - Regular Uppercase vs Black Italic
    line1Style: { fontFamily: "var(--font-playfair)", fontWeight: "400", textTransform: "uppercase" as const, letterSpacing: "0.15em", lineHeight: 1.0 },
    line2Style: { fontFamily: "var(--font-playfair)", fontWeight: "900", fontStyle: "italic", textTransform: "lowercase" as const, lineHeight: 1.0 },
    line1Class: "text-neutral-300 text-[clamp(3.5rem,11vw,12rem)] leading-[0.9] text-center select-none",
    line2Class: "text-white text-[clamp(4rem,13vw,14rem)] leading-[0.9] text-center select-none",
  },
  {
    // Config 5: Syne - Ultra Bold Solid vs Regular Outline
    line1Style: { fontFamily: "var(--font-syne)", fontWeight: "800", textTransform: "uppercase" as const, letterSpacing: "-0.01em", lineHeight: 1.0 },
    line2Style: { fontFamily: "var(--font-syne)", fontWeight: "400", textTransform: "uppercase" as const, letterSpacing: "0.15em", WebkitTextStroke: "1px rgba(255,255,255,0.8)", color: "transparent", lineHeight: 1.0 },
    line1Class: "text-white text-[clamp(3.5rem,11vw,12rem)] leading-[0.9] text-center select-none",
    line2Class: "text-transparent text-[clamp(4rem,13vw,14rem)] leading-[0.9] text-center select-none",
  }
];

const LOOP_COUNT = 1;

export default function WelcomeSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<HTMLDivElement[]>([]);
  const slideRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !slideRef.current) return;

    const totalSteps = fontConfigs.length * LOOP_COUNT;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      }
    });

    const fadeDuration = 0.03; // Faster fade transition
    const stepDuration = 1 / totalSteps; // 0.20 of scroll progress
    const holdDuration = stepDuration - fadeDuration; // 0.17 of scroll progress

    for (let index = 0; index < totalSteps; index++) {
      const showStart = index * stepDuration;

      if (index === 0) {
        // Starts visible
        gsap.set(textRefs.current[index], { opacity: 1, y: 0 });
        
        // Fades out towards the end of its block
        tl.to(textRefs.current[index], {
          opacity: 0,
          y: -10,
          duration: fadeDuration,
          ease: "power2.inOut"
        }, showStart + holdDuration);
      } else if (index === totalSteps - 1) {
        // Fades in at the start of its block, stays visible
        tl.fromTo(textRefs.current[index],
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: fadeDuration, ease: "power2.inOut" },
          showStart - fadeDuration / 2
        );
      } else {
        // Fades in
        tl.fromTo(textRefs.current[index],
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: fadeDuration, ease: "power2.inOut" },
          showStart - fadeDuration / 2
        );
        // Fades out
        tl.to(textRefs.current[index], {
          opacity: 0,
          y: -10,
          duration: fadeDuration,
          ease: "power2.inOut"
        }, showStart + holdDuration);
      }
    }

  }, { scope: containerRef });

  return (
    <div id="welcome" ref={containerRef} className="w-full h-[500vh] relative z-20 bg-black">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Center alignment container */}
        <div
          ref={slideRef}
          className="absolute inset-0 w-full h-full flex items-center justify-center"
        >
          {/* Centered Text Wrapper */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 md:px-8">
            {Array.from({ length: LOOP_COUNT }).flatMap((_, loopIdx) =>
              fontConfigs.map((config, index) => {
                const globalIndex = loopIdx * fontConfigs.length + index;
                return (
                  <div
                    key={globalIndex}
                    ref={(el) => {
                      if (el) textRefs.current[globalIndex] = el;
                    }}
                    className="absolute w-full flex flex-col items-center justify-center text-center select-none pointer-events-none"
                    style={{
                      opacity: globalIndex === 0 ? 1 : 0,
                      transform: globalIndex === 0 ? "translateY(0px)" : "translateY(10px)"
                    }}
                  >
                    <span className={config.line1Class} style={config.line1Style}>HEy,all</span>
                    <span className={config.line2Class} style={config.line2Style}>welcome.</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
