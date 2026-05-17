"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// "Hey there, welcome!" in 11 languages
const welcomeTexts = [
  "Hey there, welcome!",          // English
  "!مرحباً، أهلاً وسهلاً",          // Arabic
  "やあ、ようこそ！",                 // Japanese
  "สวัสดี ยินดีต้อนรับ!",             // Thai
  "გამარჯობა, კეთილი იყოს!",      // Georgian
  "안녕, 환영해!",                    // Korean
  "བཀྲ་ཤིས་བདེ་ལེགས།",              // Tibetan
  "မင်္ဂလာပါ ကြိုဆိုပါတယ်!",        // Burmese
  "Γεια, καλώς ήρθες!",           // Greek
  "ሰላም እንኳን ደህና መጣህ!",           // Amharic
  "嗨，欢迎！",                       // Mandarin Chinese
];

const IMAGE_COUNT = 5;

export default function WelcomeSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
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
    if (!containerRef.current || !textRef.current || !imgRef.current || !slideRef.current) return;

    // Phase 1: 0–0.05 → text fades in
    // Phase 2: 0–1.0 → cycling through languages + images looping
    const CYCLE_START = 0;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;

          // Map 0–1.0 for text/image cycling
          const textIndex = Math.min(
            Math.floor(progress * welcomeTexts.length),
            welcomeTexts.length - 1
          );
          if (textRef.current && textRef.current.innerText !== welcomeTexts[textIndex]) {
            textRef.current.innerText = welcomeTexts[textIndex];
          }

          // Images: loop through 5 images using modulo
          const imageIndex = (textIndex % IMAGE_COUNT) + 1;
          if (imgRef.current) {
            const newSrc = `/welcome-section/image${imageIndex}.png`;
            if (!imgRef.current.src.endsWith(newSrc)) {
              imgRef.current.src = newSrc;
            }
          }
        }
      }
    });

    // Text fades in at the start
    tl.fromTo(textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.05, ease: "power2.out" },
      0
    );

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
          <div className="absolute inset-0 bg-black/40 z-[1]" />

          {/* Centered Text */}
          <h2
            ref={textRef}
            className="relative z-10 text-2xl md:text-4xl lg:text-5xl font-light text-white text-center px-8 drop-shadow-2xl tracking-wide"
            style={{ fontFamily: "'Times New Roman', 'Georgia', 'Garamond', serif", opacity: 0, fontWeight: 300 }}
          >
            Hey there, welcome!
          </h2>
        </div>
      </div>
    </div>
  );
}
