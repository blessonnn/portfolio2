"use client";

import { useRef } from "react";
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

export default function WelcomeSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !textRef.current) return;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom", // Scrubs through the container's height
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Map progress to array index
        // We use Math.min to ensure it doesn't exceed the array length at 100% progress
        const index = Math.min(
          Math.floor(progress * languages.length),
          languages.length - 1
        );
        
        if (textRef.current) {
          // Only update the DOM if the word actually changed to save performance
          if (textRef.current.innerText !== languages[index]) {
            textRef.current.innerText = languages[index];
          }
        }
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full h-[250vh] relative z-20 bg-black">
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
        <h2 
          ref={textRef} 
          className="text-4xl md:text-6xl lg:text-8xl font-bold uppercase tracking-widest text-white transition-opacity duration-300"
        >
          Welcome
        </h2>
      </div>
    </div>
  );
}
