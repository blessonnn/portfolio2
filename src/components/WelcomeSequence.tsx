"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const languages = [
  "Welcome",
  "Bienvenido",
  "Bienvenue",
  "Willkommen",
  "Benvenuto",
  "ようこそ",
  "환영합니다",
  "欢迎"
];

const FRAME_COUNT = 28;

export default function WelcomeSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);

  // Preload images to avoid flickering on scroll
  useEffect(() => {
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new window.Image();
      const frameNum = i.toString().padStart(3, "0");
      img.src = `/welcome-section/ezgif-frame-${frameNum}.jpg`;
    }
  }, []);

  useGSAP(() => {
    if (!containerRef.current || !textRef.current || !imgRef.current || !imgContainerRef.current) return;

    gsap.fromTo(imgContainerRef.current,
      {
        width: "24vw",
        height: "16vh",
        top: "0%",
        xPercent: -50,
        yPercent: 0,
        borderRadius: "0px",
      },
      {
        width: "100vw",
        height: "100vh",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
        borderRadius: "0px",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom bottom", // Scrubs through the container's height
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            
            // Map progress to language array index
            const textIndex = Math.min(
              Math.floor(progress * languages.length),
              languages.length - 1
            );
            
            // Map progress to image frame (1 to 28)
            const frameIndex = Math.min(
              Math.floor(progress * FRAME_COUNT) + 1,
              FRAME_COUNT
            );
            
            if (textRef.current && textRef.current.innerText !== languages[textIndex]) {
              textRef.current.innerText = languages[textIndex];
            }

            if (imgRef.current) {
              const frameStr = frameIndex.toString().padStart(3, "0");
              const newSrc = `/welcome-section/ezgif-frame-${frameStr}.jpg`;
              if (!imgRef.current.src.endsWith(newSrc)) {
                 imgRef.current.src = newSrc;
              }
            }
          }
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full h-[250vh] relative z-20 bg-black">
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
        
        {/* Background Image Sequence */}
        <div 
          ref={imgContainerRef}
          className="absolute left-1/2 overflow-hidden mix-blend-screen pointer-events-none z-0"
        >
          <img 
            ref={imgRef}
            src="/welcome-section/ezgif-frame-001.jpg"
            alt="Welcome background sequence"
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        {/* Text Layer */}
        <h2 
          ref={textRef} 
          className="relative z-10 text-4xl md:text-6xl lg:text-8xl font-bold uppercase tracking-widest text-white transition-opacity duration-300 drop-shadow-2xl"
        >
          Welcome
        </h2>
      </div>
    </div>
  );
}
