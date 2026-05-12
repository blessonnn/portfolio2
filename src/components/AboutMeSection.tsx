"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DETAILS = [
  { label: "NAME", value: "BLESSON J.F" },
  { label: "DOB", value: "23-02-2004" },
  { label: "POB", value: "TRIVANDRUM, KERALA" },
  { label: "AGE", value: "22" },
  { label: "GENDER", value: "M" },
];

export default function AboutMeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGlitched, setIsGlitched] = useState(false);

  useGSAP(() => {
    if (!sectionRef.current || !cardRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      }
    });

    // Initial reveal
    tl.fromTo(cardRef.current, 
      { opacity: 0, scale: 0.9, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power4.out" }
    );

    // Trigger glitch effect briefly
    tl.call(() => {
      setIsGlitched(true);
      setTimeout(() => setIsGlitched(false), 800);
    });

    // Staggered reveal of details
    tl.from(".id-detail", {
      opacity: 0,
      x: -20,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.4");

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="about" className="py-24 px-6 md:px-12 flex items-center justify-center min-h-screen bg-black">
      <div 
        ref={cardRef}
        className={`relative w-full max-w-4xl bg-[#1a1a1a] rounded-xl overflow-hidden border-2 border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.05)] transition-all duration-300 ${isGlitched ? 'animate-glitch' : ''}`}
      >
        {/* ID Card Header */}
        <div className="w-full bg-gradient-to-r from-blue-900/40 to-black/40 px-8 py-4 border-b border-white/10 flex justify-between items-center">
          <span className="text-xs font-mono tracking-widest text-blue-400 uppercase">National Identity Card</span>
          <span className="text-[10px] font-mono text-white/30 uppercase">Secure / Verified / 001</span>
        </div>

        {/* Card Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-8 md:p-12 items-center">
          
          {/* Left Side: Details */}
          <div className="md:col-span-7 space-y-6">
            {DETAILS.map((detail, index) => (
              <div key={detail.label} className="id-detail border-l-2 border-blue-500/50 pl-6 py-1">
                <label className="block text-[10px] font-mono text-blue-400/60 tracking-[0.2em] mb-1">
                  {detail.label}
                </label>
                <p className="text-xl md:text-2xl font-mono text-white tracking-tight uppercase">
                  {detail.value}
                </p>
              </div>
            ))}
            
            {/* Hologram-like stamp */}
            <div className="pt-4 opacity-20 select-none pointer-events-none">
              <div className="inline-block border-2 border-white px-4 py-1 rotate-[-12deg] rounded text-sm font-bold tracking-tighter">
                ORIGINAL COPY
              </div>
            </div>
          </div>

          {/* Right Side: Photo */}
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] w-full rounded-lg overflow-hidden border-2 border-white/10 grayscale hover:grayscale-0 transition-all duration-700">
              {/* Scanline Overlay */}
              <div className="absolute inset-0 z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none" />
              
              <Image 
                src="/about-me/about-me-portfolio.png"
                alt="Portrait"
                fill
                className="object-cover"
                priority
              />
              
              {/* Signature Overlay */}
              <div className="absolute bottom-4 right-4 z-20 opacity-40 mix-blend-difference">
                <span className="font-serif italic text-white text-sm">Blesson J.F</span>
              </div>
            </div>
            
            {/* Barcode */}
            <div className="mt-6 flex flex-col items-center opacity-40">
              <div className="w-full h-8 bg-[repeating-linear-gradient(90deg,#fff,#fff_2px,#000_2px,#000_4px)]" />
              <span className="text-[8px] font-mono mt-1 tracking-[0.5em]">2302200422M001</span>
            </div>
          </div>
          
        </div>
        
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      <style jsx>{`
        @keyframes glitch {
          0% { clip-path: inset(80% 0 0 0); transform: translate(-5px, 5px); }
          10% { clip-path: inset(10% 0 85% 0); transform: translate(5px, -5px); }
          20% { clip-path: inset(80% 0 0 0); transform: translate(-5px, 5px); }
          30% { clip-path: inset(10% 0 85% 0); transform: translate(5px, -5px); }
          40% { clip-path: inset(50% 0 30% 0); transform: translate(-5px, 5px); }
          50% { clip-path: inset(30% 0 50% 0); transform: translate(5px, -5px); }
          60% { clip-path: inset(50% 0 30% 0); transform: translate(-5px, 5px); }
          70% { clip-path: inset(30% 0 50% 0); transform: translate(5px, -5px); }
          80% { clip-path: inset(80% 0 0 0); transform: translate(-5px, 5px); }
          90% { clip-path: inset(10% 0 85% 0); transform: translate(5px, -5px); }
          100% { clip-path: inset(0 0 0 0); transform: translate(0); }
        }
        .animate-glitch {
          animation: glitch 0.4s cubic-bezier(.25,.46,.45,.94) infinite;
        }
      `}</style>
    </section>
  );
}

