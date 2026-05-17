"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// "Hey there, welcome!" in 8 languages
const welcomeTexts = [
  "Hey there, welcome!",        // English
  "สวัสดี ยินดีต้อนรับ!",           // Thai
  "Salut, bienvenue !",          // French
  "!مرحباً، أهلاً وسهلاً",        // Arabic
  "やあ、ようこそ！",               // Japanese
  "안녕, 환영해!",                  // Korean
  "Привет, добро пожаловать!",   // Russian
  "嗨，欢迎！",                     // Mandarin Chinese
];

const IMAGE_COUNT = 5;

export default function WelcomeSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);

  // Preload all images
  useEffect(() => {
    for (let i = 1; i <= IMAGE_COUNT; i++) {
      const img = new window.Image();
      img.src = `/welcome-section/image${i}.png`;
    }
  }, []);

  useGSAP(() => {
    if (!containerRef.current || !textRef.current || !imgRef.current || !imgContainerRef.current) return;

    // Total languages = 8, images loop through 5 images multiple times across the scroll
    // We want: image slides in from bottom → reaches top → images cycle with text changes → ends

    // Phase 1: Image slides in from below viewport to fill screen
    // Phase 2: Images cycle + text animates through languages
    // Both driven by a single scrubbed timeline

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;

          // Phase 1: 0–0.15 → slide in (no text/image change yet)
          // Phase 2: 0.15–1.0 → text + image cycling
          if (progress < 0.15) {
            // During slide-in, show first text and first image
            if (textRef.current && textRef.current.innerText !== welcomeTexts[0]) {
              textRef.current.innerText = welcomeTexts[0];
            }
          } else {
            // Map 0.15–1.0 to 0–1 for text/image cycling
            const cycleProgress = (progress - 0.15) / 0.85;

            // Text: cycle through all 8 languages
            const textIndex = Math.min(
              Math.floor(cycleProgress * welcomeTexts.length),
              welcomeTexts.length - 1
            );
            if (textRef.current && textRef.current.innerText !== welcomeTexts[textIndex]) {
              textRef.current.innerText = welcomeTexts[textIndex];
            }

            // Images: loop through 5 images multiple times to cover all 8 text transitions
            // Use modulo to loop: each text change gets an image change
            const imageIndex = (textIndex % IMAGE_COUNT) + 1;
            if (imgRef.current) {
              const newSrc = `/welcome-section/image${imageIndex}.png`;
              if (!imgRef.current.src.endsWith(newSrc)) {
                imgRef.current.src = newSrc;
              }
            }
          }
        }
      }
    });

    // Phase 1: Slide image container from below viewport to fill screen
    tl.fromTo(imgContainerRef.current,
      {
        yPercent: 100,
        scale: 0.6,
        borderRadius: "24px",
      },
      {
        yPercent: 0,
        scale: 1,
        borderRadius: "0px",
        duration: 0.15,
        ease: "power2.out",
      },
      0
    );

    // Text fade in
    tl.fromTo(textRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.08, ease: "power2.out" },
      0.08
    );

  }, { scope: containerRef });

  return (
    <div id="welcome" ref={containerRef} className="w-full h-[500vh] relative z-20 bg-black">
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">

        {/* Full-screen Image Container */}
        <div
          ref={imgContainerRef}
          className="absolute inset-0 w-full h-full overflow-hidden z-0"
        >
          <img
            ref={imgRef}
            src="/welcome-section/image1.png"
            alt="Welcome background"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Centered Text */}
        <h2
          ref={textRef}
          className="relative z-10 text-2xl md:text-4xl lg:text-5xl font-semibold text-white text-center px-8 drop-shadow-2xl tracking-wide"
          style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
        >
          Hey there, welcome!
        </h2>
      </div>
    </div>
  );
}
