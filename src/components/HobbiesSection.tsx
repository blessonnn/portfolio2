"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const HOBBIES = [
  {
    id: "photography",
    title: "Photography",
    color: "#FFC338",
    images: Array.from({ length: 63 }, (_, i) => `/images/photography/${i + 1}.jpg`),
  },
  {
    id: "graphic-designing",
    title: "Graphic Designing",
    color: "#F4FF38",
    images: Array.from({ length: 21 }, (_, i) => `/images/graphic-designing/${i + 1}.jpg`),
  },
  {
    id: "drawing",
    title: "Drawing",
    color: "#FF6B6B",
    images: Array.from({ length: 1 }, (_, i) => `/images/drawing/${i + 1}.jpg`),
  },
  {
    id: "sound-designing",
    title: "Sound Designing",
    color: "#4D9FFF",
    images: Array.from({ length: 1 }, (_, i) => `/images/sound-designing/${i + 1}.jpg`),
  },
  {
    id: "musical-instruments",
    title: "Musical Instruments",
    color: "#B366FF",
    images: Array.from({ length: 1 }, (_, i) => `/images/musical-instruments/${i + 1}.jpg`),
  },
];

const HobbiesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [activeHobby, setActiveHobby] = useState<string | null>(null);

  useEffect(() => {
    // Handle lenis if it's attached globally
    const lenis = (window as any).lenisInstance;
    
    if (activeHobby !== null) {
      document.body.style.overflow = "hidden";
      if (lenis && typeof lenis.stop === 'function') lenis.stop();
    } else {
      document.body.style.overflow = "";
      if (lenis && typeof lenis.start === 'function') lenis.start();
    }

    return () => {
      document.body.style.overflow = "";
      if (lenis && typeof lenis.start === 'function') lenis.start();
    };
  }, [activeHobby]);

  useGSAP(
    () => {
      // Create the main timeline for the scroll-triggered animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=800", // Shorter scrolling space so it feels less 'stuck'
          pin: true,
          scrub: 1,
        },
      });

      // 1. Animate text entering from the right
      tl.fromTo(
        textRef.current,
        { x: "100vw" },
        {
          x: "0%", // Move to center
          duration: 2,
          ease: "power2.out",
        }
      );

      // 2. Fade out and blur the huge text
      tl.to(
        textRef.current,
        {
          opacity: 0,
          filter: "blur(20px)",
          duration: 1,
          ease: "power1.inOut",
        }
      );

      // 3. Fade in the list/content container
      tl.to(
        contentRef.current,
        {
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.1,
          ease: "power2.out",
        },
        "-=0.5" // Overlap slightly with the text fade out
      );

      // 4. Stagger slide-in the list items from the right
      const listItems = containerRef.current?.querySelectorAll(".hobby-list-item") || [];
      tl.fromTo(
        listItems,
        { x: "50%", opacity: 0 },
        {
          x: "0%",
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      );

    },
    { scope: containerRef }
  );

  useGSAP(() => {
    if (activeHobby) {
      // Set initial state for batching
      gsap.set(".hobby-image-item img", { scale: 0.9, transformOrigin: "center center" });

      ScrollTrigger.batch(".hobby-image-item", {
        scroller: "#hobby-scroll-container",
        start: "top bottom-=40",
        onEnter: (batch) => {
          const imgs = batch.map(el => el.querySelector("img")).filter(Boolean);
          gsap.to(imgs, {
            scale: 1,
            duration: 1.2,
            stagger: 0.08,
            ease: "power3.out",
            overwrite: true
          });
        },
        onLeaveBack: (batch) => {
          const imgs = batch.map(el => el.querySelector("img")).filter(Boolean);
          gsap.to(imgs, {
            scale: 0.9,
            duration: 0.4,
            ease: "power2.in",
            overwrite: true
          });
        }
      });
    }
  }, { dependencies: [activeHobby] });

  return (
    <section
      ref={containerRef}
      id="hobbies"
      className="relative w-full h-screen bg-[#0a0a0a] text-white overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Huge scrolling text */}
      <h2
        ref={textRef}
        className="absolute text-[15vw] leading-none font-bold tracking-tighter whitespace-nowrap will-change-transform z-0"
      >
        HOBBIES
      </h2>

      {/* Content Wrapper (List or Grid) */}
      <div
        ref={contentRef}
        className="absolute inset-0 w-full h-full flex flex-col opacity-0 pointer-events-none z-10 pt-24 px-0 pb-12 overflow-hidden"
      >
        {activeHobby === null ? (
          /* List View */
          <div className="flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full relative">
            {HOBBIES.map((hobby) => (
              <div
                key={hobby.id}
                onClick={() => setActiveHobby(hobby.id)}
                className="hobby-list-item group relative border-b border-white/20 py-5 md:py-6 cursor-pointer overflow-hidden transition-colors"
              >
                {/* Random color hover background */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ backgroundColor: hobby.color }}
                />

                {/* Text Content */}
                <div className="relative z-10 flex items-center justify-between px-6">
                  <h3 className="text-4xl md:text-6xl font-medium text-white group-hover:text-black transition-colors duration-300">
                    {hobby.title}
                  </h3>
                  <span className="text-3xl opacity-0 group-hover:opacity-100 group-hover:text-black transition-all duration-300 -translate-x-4 group-hover:translate-x-0">
                    &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Grid View (Fixed Overlay) */
          <div 
            id="hobby-scroll-container"
            className="fixed inset-0 z-[200] text-black flex flex-col h-screen overflow-y-auto no-scrollbar animate-in fade-in duration-300 transition-colors"
            style={{ backgroundColor: HOBBIES.find((h) => h.id === activeHobby)?.color || "#ffffff" }}
            data-lenis-prevent="true"
          >
            <div className="max-w-7xl mx-auto w-full px-4 md:px-12 pt-8 pb-20">
              {/* Header / Back Button */}
              <div 
                className="flex items-center justify-between mb-8 sticky top-0 z-[999] py-4 transition-colors"
                style={{ backgroundColor: HOBBIES.find((h) => h.id === activeHobby)?.color || "#ffffff" }}
              >
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveHobby(null); }}
                  className="relative z-[1000] px-6 py-2 bg-black text-white text-xl md:text-2xl font-medium rounded-full hover:bg-black/80 transition-colors flex items-center gap-2 cursor-pointer pointer-events-auto shadow-2xl"
                >
                  &larr; Back
                </button>
                <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-black">
                  {HOBBIES.find((h) => h.id === activeHobby)?.title}
                </h3>
              </div>

              {/* Grid Container */}
              <div className="group grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 w-full">
                {HOBBIES.find((h) => h.id === activeHobby)?.images.map((src, i) => (
                  <a
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={i}
                    className="hobby-image-item relative aspect-[3/4] bg-gray-100 overflow-hidden rounded-none group-hover:[&:not(:hover)]:opacity-50 transition-all duration-300 block shadow-sm hover:shadow-xl hover:-translate-y-1"
                  >
                  <img
                    src={src}
                    alt={`Hobby img ${i}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </a>
              ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HobbiesSection;
