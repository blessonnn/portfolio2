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

const heyLanguages = [
  "Hey",
  "Hola",
  "Salut",
  "Hallo",
  "Ciao",
  "やあ",
  "안녕",
  "你好"
];

const allLanguages = [
  "All",
  "Todos",
  "Tous",
  "Alle",
  "Tutti",
  "みんな",
  "여러분",
  "大家"
];

const FRAME_COUNT = 40;

export default function WelcomeSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const heyRef = useRef<HTMLHeadingElement>(null);
  const allRef = useRef<HTMLHeadingElement>(null);
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
    if (!containerRef.current || !textRef.current || !imgRef.current || !imgContainerRef.current || !heyRef.current || !allRef.current) return;

    // Background Image Animation
    gsap.fromTo(imgContainerRef.current,
      {
        width: "24vw",
        height: "16vh",
        top: "100%",
        xPercent: -50,
        yPercent: -100, // Anchored at the bottom
        borderRadius: "0px",
      },
      {
        width: "100vw",
        height: "100vh",
        top: "50%",
        xPercent: -50,
        yPercent: -50, // Moves to center
        borderRadius: "0px",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center", 
          end: "bottom bottom",
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

            if (heyRef.current && heyRef.current.innerText !== heyLanguages[textIndex]) {
              heyRef.current.innerText = heyLanguages[textIndex];
            }

            if (allRef.current && allRef.current.innerText !== allLanguages[textIndex]) {
              allRef.current.innerText = allLanguages[textIndex];
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

    // "Hey" Text Animation (Sliding from left)
    gsap.fromTo(heyRef.current,
      { x: "-38vw", opacity: 1 },
      { 
        x: "-1.5rem", 
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom bottom",
          scrub: true,
        }
      }
    );

    // "All" Text Animation (Sliding from right)
    gsap.fromTo(allRef.current,
      { x: "38vw", opacity: 1 },
      { 
        x: "1.5rem", 
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom bottom",
          scrub: true,
        }
      }
    );

  }, { scope: containerRef });

  return (
    <div id="welcome" ref={containerRef} className="w-full h-[350vh] relative z-20 bg-black">
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
        <div className="relative z-10 flex flex-col items-center">
          {/* Top Converging Text */}
          <div className="flex items-center justify-center mb-2 md:mb-4">
             <h2 
              ref={heyRef} 
              className="text-3xl md:text-5xl lg:text-7xl font-bold uppercase tracking-wider text-white/80 drop-shadow-2xl"
            >
              Hey
            </h2>
            <h2 
              ref={allRef} 
              className="text-3xl md:text-5xl lg:text-7xl font-bold uppercase tracking-wider text-white/80 drop-shadow-2xl"
            >
              All
            </h2>
          </div>

          {/* Main Welcome Text */}
          <h2 
            ref={textRef} 
            className="text-4xl md:text-6xl lg:text-8xl font-bold uppercase tracking-wider text-white drop-shadow-2xl"
          >
            Welcome
          </h2>
        </div>
      </div>
    </div>
  );
}
