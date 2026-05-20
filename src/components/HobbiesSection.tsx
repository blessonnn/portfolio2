"use client";

import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const HOBBIES = [
  {
    id: "photography",
    title: "Photography",
    color: "#FFFFFF",
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
    images: [
      "/images/musical-instruments/me-guitar.png",
      "/images/musical-instruments/me-keyboard.png",
      "/images/musical-instruments/me-ukulele.png",
    ],
  },
];

const StepperProgress = ({ active }: { active: boolean }) => {
  return (
    <div className="relative flex items-center justify-between w-24 md:w-32 h-6 pointer-events-none select-none">
      {/* Background Line */}
      <div 
        className={`absolute left-0 right-0 h-[2px] z-0 transition-colors duration-300 ${
          active ? "bg-black/20" : "bg-white/20"
        }`} 
      />
      
      {/* Animated Progress Line */}
      <div 
        className={`absolute left-0 h-[2px] bg-black z-0 origin-left transition-all duration-1000 ease-out ${
          active ? "w-[66%]" : "w-0"
        }`}
        style={{ transitionDelay: active ? "100ms" : "0ms" }}
      />
      
      {/* 4 Dots */}
      <div className="absolute inset-0 flex justify-between items-center z-10">
        {/* Dot 1 */}
        <div 
          className={`w-3 h-3 rounded-full border transition-all duration-300 ${
            active ? "bg-black border-black" : "bg-transparent border-white/40"
          }`}
          style={{ transitionDelay: active ? "100ms" : "0ms" }}
        />
        {/* Dot 2 */}
        <div 
          className={`w-3 h-3 rounded-full border transition-all duration-300 ${
            active ? "bg-black border-black" : "bg-transparent border-white/40"
          }`}
          style={{ transitionDelay: active ? "400ms" : "0ms" }}
        />
        {/* Dot 3 */}
        <div 
          className={`w-3 h-3 rounded-full border transition-all duration-300 ${
            active ? "bg-black border-black" : "bg-transparent border-white/40"
          }`}
          style={{ transitionDelay: active ? "700ms" : "0ms" }}
        />
        {/* Dot 4 */}
        <div 
          className={`w-3 h-3 rounded-full border transition-all duration-300 ${
            active ? "bg-transparent border-black" : "bg-transparent border-white/40"
          }`}
        />
      </div>
    </div>
  );
};

const HobbiesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [activeHobby, setActiveHobby] = useState<string | null>(null);
  const [inProgressId, setInProgressId] = useState<string | null>(null);
  const [clickedRowRect, setClickedRowRect] = useState<DOMRect | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const gridOverlayRef = useRef<HTMLDivElement>(null);
  const gridContentRef = useRef<HTMLDivElement>(null);
  const hasOpenedHobby = useRef(false);

  const handleHobbyClick = (id: string, e: React.MouseEvent) => {
    if (["drawing", "sound-designing"].includes(id)) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setInProgressId(id);
      timeoutRef.current = setTimeout(() => {
        setInProgressId(null);
      }, 2500);
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      setClickedRowRect(rect);
      setActiveHobby(id);
      hasOpenedHobby.current = true;
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

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

  const handleCloseGrid = () => {
    if (!gridOverlayRef.current || !gridContentRef.current) {
      setActiveHobby(null);
      setClickedRowRect(null);
      return;
    }

    gsap.timeline()
      .to(gridContentRef.current, {
        opacity: 0,
        y: -40,
        duration: 0.25,
        ease: "power2.in"
      })
      .to(gridOverlayRef.current, {
        y: "-100%",
        duration: 0.45,
        ease: "power3.inOut"
      }, "-=0.1")
      .to("#navbar-container", {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.25")
      .add(() => {
        setActiveHobby(null);
        setClickedRowRect(null);
        gsap.set(gridOverlayRef.current, { y: "0%" });
      });
  };

  useEffect(() => {
    if (activeHobby === null && hasOpenedHobby.current) {
      const listItems = containerRef.current?.querySelectorAll(".hobby-list-item");
      if (listItems && listItems.length > 0) {
        gsap.fromTo(listItems,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out", overwrite: "auto" }
        );
      }
    }
  }, [activeHobby]);

  useGSAP(() => {
    if (activeHobby && clickedRowRect && gridOverlayRef.current && gridContentRef.current) {
      gsap.killTweensOf([gridOverlayRef.current, gridContentRef.current, "#navbar-container"]);

      gsap.set(gridOverlayRef.current, {
        top: clickedRowRect.top,
        height: clickedRowRect.height,
        opacity: 1
      });
      gsap.set(gridContentRef.current, {
        opacity: 0,
        y: 30
      });

      gsap.timeline()
        .to("#navbar-container", {
          opacity: 0,
          pointerEvents: "none",
          duration: 0.3,
          ease: "power2.out"
        }, 0)
        .to(gridOverlayRef.current, {
          top: 0,
          height: "100vh",
          duration: 0.8,
          ease: "power4.inOut",
          onComplete: () => {
            ScrollTrigger.refresh();
          }
        }, 0)
        .to(gridContentRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        }, "-=0.2");
    }
  }, { dependencies: [activeHobby, clickedRowRect] });

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
        {activeHobby === null && (
          /* List View */
          <div className="flex-1 flex flex-col justify-center w-full relative">
            {HOBBIES.map((hobby) => {
              const isInProgress = inProgressId === hobby.id;

              return (
                <div
                  key={hobby.id}
                  onClick={(e) => handleHobbyClick(hobby.id, e)}
                  className="hobby-list-item group relative border-b border-white/20 py-5 md:py-6 cursor-pointer overflow-hidden transition-colors"
                >
                  {/* Random color hover background */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ backgroundColor: hobby.color }}
                  />

                  {/* Text Content */}
                  <div className="relative z-10 flex items-center justify-between px-6 md:px-12">
                    <div className="relative h-12 md:h-16 flex items-center w-full overflow-hidden">
                      {/* Original Title */}
                      <h3 className={`absolute left-0 text-4xl md:text-6xl font-medium text-white group-hover:text-black transition-all duration-500 transform ${isInProgress ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
                        {hobby.title}
                      </h3>
                      {/* "In Progress" Message */}
                      <h3 className={`absolute left-0 text-4xl md:text-6xl font-medium text-white group-hover:text-black transition-all duration-500 transform ${isInProgress ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                        In Progress
                      </h3>
                    </div>
                    <div className="relative w-24 md:w-32 h-6 flex items-center justify-end">
                      {/* Default Arrow */}
                      <span className={`absolute right-0 text-3xl opacity-0 group-hover:opacity-100 group-hover:text-black transition-all duration-300 -translate-x-4 group-hover:translate-x-0 ${isInProgress ? 'opacity-0 scale-0 pointer-events-none' : ''}`}>
                        &rarr;
                      </span>

                      {/* Stepper Progress Bar */}
                      {["drawing", "sound-designing"].includes(hobby.id) && (
                        <div className={`absolute right-0 transition-all duration-500 transform ${isInProgress ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-50 translate-x-4 pointer-events-none'}`}>
                          <StepperProgress active={isInProgress} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Grid View (Fixed Overlay rendered via Portal) */}
      {activeHobby !== null && typeof window !== "undefined" && createPortal(
        <div 
          ref={gridOverlayRef}
          className="fixed left-0 right-0 z-[200] text-black flex flex-col overflow-hidden"
          style={{ 
            backgroundColor: HOBBIES.find((h) => h.id === activeHobby)?.color || "#ffffff",
            top: clickedRowRect ? `${clickedRowRect.top}px` : "0px",
            height: clickedRowRect ? `${clickedRowRect.height}px` : "100vh",
            opacity: clickedRowRect ? 0 : 1
          }}
        >
          <div ref={gridContentRef} className="w-full h-full flex flex-col overflow-hidden relative">
            {/* Header / Back Button */}
            <div className="w-full max-w-7xl mx-auto px-4 md:px-12 pt-8 pb-4 flex items-center justify-between z-10 shrink-0">
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleCloseGrid(); }}
                className="px-6 py-2 bg-black text-white text-xl md:text-2xl font-medium rounded-full hover:bg-black/80 transition-colors flex items-center gap-2 cursor-pointer shadow-2xl"
              >
                &larr; Back
              </button>
              <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-black">
                {HOBBIES.find((h) => h.id === activeHobby)?.title}
              </h3>
            </div>

            {/* Scrollable Grid Container */}
            <div 
              id="hobby-scroll-container"
              className="flex-1 w-full overflow-y-auto no-scrollbar pb-32"
              data-lenis-prevent="true"
            >
              <div className="max-w-7xl mx-auto w-full px-4 md:px-12">
                {activeHobby === "musical-instruments" ? (
                  <div className="flex flex-col gap-12 md:gap-16 max-w-4xl mx-auto w-full">
                    {HOBBIES.find((h) => h.id === activeHobby)?.images.map((src, i) => (
                      <a
                        href={src}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={i}
                        className="hobby-image-item relative w-full overflow-hidden transition-all duration-300 block shadow-md hover:shadow-2xl hover:-translate-y-1"
                      >
                        <img
                          src={src}
                          alt={`Hobby img ${i}`}
                          className="w-full h-auto object-contain"
                          loading="lazy"
                        />
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="group grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 w-full">
                    {HOBBIES.find((h) => h.id === activeHobby)?.images.map((src, i) => (
                      <a
                        href={src}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={i}
                        className="hobby-image-item relative aspect-[3/4] bg-gray-100 overflow-hidden rounded-none transition-all duration-300 block shadow-sm hover:shadow-xl hover:-translate-y-1"
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
                )}
              </div>
            </div>

            {/* Bottom Gaussian Linear Gradient Blur Overlay (50% Opacity) */}
            <div
              className="absolute bottom-0 left-0 w-full pointer-events-none z-20"
              style={{
                height: "15vh",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                maskImage: "linear-gradient(to top, black 0%, black 20%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to top, black 0%, black 20%, transparent 100%)",
                opacity: 0.5
              }}
            />

            {/* Bottom Black Linear Gradient Overlay (50% Opacity) */}
            <div
              className="absolute bottom-0 left-0 w-full pointer-events-none z-30 bg-gradient-to-t from-black to-transparent"
              style={{
                height: "15vh",
                opacity: 0.5
              }}
            />
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default HobbiesSection;
