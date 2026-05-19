"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const fontConfigs = [
  {
    // Config 1: Doto (dotted modern) - Heavy vs Light
    line1Style: { fontFamily: "var(--font-doto)", fontWeight: "900", textTransform: "uppercase" as const, letterSpacing: "0.05em", lineHeight: 1.0 },
    line2Style: { fontFamily: "var(--font-doto)", fontWeight: "300", textTransform: "lowercase" as const, letterSpacing: "0.02em", lineHeight: 1.0 },
    line1Class: "text-white text-lg md:text-xl lg:text-2xl",
    line2Class: "text-neutral-300 text-2xl md:text-3xl lg:text-4xl",
  },
  {
    // Config 2: Instrument Serif - Light Italic vs Bold
    line1Style: { fontFamily: "var(--font-instrument)", fontWeight: "300", fontStyle: "italic", textTransform: "lowercase" as const, lineHeight: 1.0 },
    line2Style: { fontFamily: "var(--font-instrument)", fontWeight: "700", textTransform: "uppercase" as const, letterSpacing: "0.05em", lineHeight: 1.0 },
    line1Class: "text-neutral-400 text-base md:text-lg lg:text-xl",
    line2Class: "text-white text-3xl md:text-4xl lg:text-5xl",
  },
  {
    // Config 3: Martian Mono - Light vs Extra Bold
    line1Style: { fontFamily: "var(--font-mono)", fontWeight: "300", textTransform: "lowercase" as const, letterSpacing: "0.02em", lineHeight: 1.0 },
    line2Style: { fontFamily: "var(--font-mono)", fontWeight: "800", textTransform: "uppercase" as const, letterSpacing: "0.1em", lineHeight: 1.0 },
    line1Class: "text-neutral-400 text-sm md:text-base lg:text-lg",
    line2Class: "text-white text-2xl md:text-3xl lg:text-4xl",
  },
  {
    // Config 4: Playfair Display - Regular Uppercase vs Black Italic
    line1Style: { fontFamily: "var(--font-playfair)", fontWeight: "400", textTransform: "uppercase" as const, letterSpacing: "0.15em", lineHeight: 1.0 },
    line2Style: { fontFamily: "var(--font-playfair)", fontWeight: "900", fontStyle: "italic", textTransform: "lowercase" as const, lineHeight: 1.0 },
    line1Class: "text-neutral-300 text-lg md:text-xl lg:text-2xl",
    line2Class: "text-white text-2xl md:text-3xl lg:text-4xl",
  },
  {
    // Config 5: Syne - Ultra Bold Solid vs Regular Outline
    line1Style: { fontFamily: "var(--font-syne)", fontWeight: "800", textTransform: "uppercase" as const, letterSpacing: "-0.01em", lineHeight: 1.0 },
    line2Style: { fontFamily: "var(--font-syne)", fontWeight: "400", textTransform: "uppercase" as const, letterSpacing: "0.15em", WebkitTextStroke: "1px rgba(255,255,255,0.8)", color: "transparent", lineHeight: 1.0 },
    line1Class: "text-white text-lg md:text-xl lg:text-2xl",
    line2Class: "text-transparent text-2xl md:text-3xl lg:text-4xl",
  }
];

const IMAGE_COUNT = 5;
const LOOP_COUNT = 2;

export default function WelcomeSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<HTMLDivElement[]>([]);
  const imgRef = useRef<HTMLImageElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);

  // Preload all images
  useEffect(() => {
    for (let i = 1; i <= IMAGE_COUNT; i++) {
      const img = new window.Image();
      img.src = `/welcome-section/image${i}.png`;
    }
  }, []);

  useGSAP(() => {
    if (!containerRef.current || !imgRef.current || !slideRef.current) return;

    const totalSteps = fontConfigs.length * LOOP_COUNT;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;

          // Images: loop through 5 images in sync with the config steps (modulo 5)
          const stepIndex = Math.min(
            Math.floor(progress * totalSteps),
            totalSteps - 1
          );
          const imageIndex = (stepIndex % IMAGE_COUNT) + 1;
          if (imgRef.current) {
            const newSrc = `/welcome-section/image${imageIndex}.png`;
            if (!imgRef.current.src.endsWith(newSrc)) {
              imgRef.current.src = newSrc;
            }
          }
        }
      }
    });

    // Create a beautiful cross-fade animation for the 10 configurations (2 loops of 5)
    const fadeDuration = 0.03; // Faster fade transition (increased speed)
    const stepDuration = 1 / totalSteps; // 0.10 of scroll progress
    const holdDuration = stepDuration - fadeDuration; // 0.07 of scroll progress

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

        {/* Sliding panel that rises from bottom */}
        <div
          ref={slideRef}
          className="absolute inset-0 w-full h-full flex items-center justify-center"
        >
          {/* Full-bleed background image */}
          <img
            ref={imgRef}
            src="/welcome-section/image1.png"
            alt="Welcome background"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/45 z-[1]" />

          {/* Centered Text Wrapper */}
          <div className="relative z-10 w-full max-w-lg h-32 flex items-center justify-center">
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
                    <span className={config.line1Class} style={config.line1Style}>Hey all,</span>
                    <span className={config.line2Class} style={config.line2Style}>welcome</span>
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
