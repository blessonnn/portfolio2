"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const wrapperRef = useRef<HTMLElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const blackScreenRef = useRef<HTMLDivElement>(null);
  const myPortfolioTextRef = useRef<HTMLDivElement>(null);

  const leftTextRef = useRef<HTMLHeadingElement>(null);
  const rightTextRef = useRef<HTMLHeadingElement>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);

  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).toUpperCase();
      setCurrentTime(formatted);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    if (!wrapperRef.current || !windowRef.current) return;

    const wrapper = wrapperRef.current;

    // ----- Initial Black Screen Fade -----
    gsap.to(blackScreenRef.current, {
      opacity: 0,
      duration: 0.5,
      delay: 0.1,
      ease: "power2.out",
      onComplete: () => {
        if (blackScreenRef.current) blackScreenRef.current.style.display = 'none';
      }
    });

    // ----- ScrollTrigger Expansion and Text Animation -----
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: "+=200%", // Pin for exactly 200vh of scroll
        pin: true,
        pinSpacing: false, // Prevents GSAP from adding padding so the manual spacer works
        scrub: 1,
      }
    });

    // 1. Expand the window (0 to 1.0s) -> 0 to 100vh of scroll
    tl.to(windowRef.current, {
      width: "100%",
      height: "100%",
      duration: 1.0,
      ease: "power2.inOut"
    }, 0);

    // Fade out "My Portfolio" text
    tl.to(myPortfolioTextRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power2.in"
    }, 0);

    // 2. Existing text appears along with picture (0.5s to 1.0s)
    if (leftTextRef.current && rightTextRef.current) {
      tl.to([leftTextRef.current.children[0], rightTextRef.current.children[0]], {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      }, 0.5);
    }

    if (bottomTextRef.current) {
      tl.to(bottomTextRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      }, 0.5);
    }

    // Reveal Navbar at Stage 2 (along with text)
    const navEl = document.getElementById("main-nav");
    if (navEl) {
      tl.to(navEl, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.inOut"
      }, 0.5);
    }

    // As the user scrolls from 100vh to 200vh, the next section slides up and covers the sticky hero.
    // Exactly during this phase (1.0s to 2.0s), the text moves towards the center.
    if (leftTextRef.current && rightTextRef.current) {
      tl.to(leftTextRef.current, { x: "15vw", ease: "none", duration: 1.0 }, 1.0)
        .to(rightTextRef.current, { x: "-15vw", ease: "none", duration: 1.0 }, 1.0);
    }

  }, { scope: wrapperRef });

  return (
    <>
      <section
        ref={wrapperRef}
        className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-[#f5f5f5] z-0"
      >
        {/* Initial Black Screen */}
        <div ref={blackScreenRef} className="absolute inset-0 bg-black z-50 pointer-events-none" />

        {/* The Expanding Window */}
        <div
          ref={windowRef}
          className="relative w-[280px] h-[380px] md:w-[400px] md:h-[500px] overflow-hidden z-20"
        >
          {/* Inner Container: always 100vw/100vh, centered so it matches screen coordinates */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] bg-black">

            {/* Background Image (me1.png) */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <Image
                src="/images/hero/me1.png"
                alt="Hero background"
                fill
                className="object-cover opacity-90"
                priority
              />
            </div>

            {/* Typography layer */}
            <div className="absolute w-full h-full inset-0 pointer-events-none flex items-center justify-between px-[2%] md:px-[4%] z-20">
              <div className="overflow-hidden pr-8 pb-4 flex-shrink-0">
                <h1 ref={leftTextRef} className="text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-wider text-black leading-none md:leading-none lg:leading-none">
                  <span className="inline-block translate-y-[100%] opacity-0 drop-shadow-md">BLESSON<br />JF</span>
                </h1>
              </div>
              <div className="overflow-hidden pl-8 pb-4 text-right flex-shrink-0">
                <h1 ref={rightTextRef} className="text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-wider text-black leading-none md:leading-none lg:leading-none">
                  <span className="inline-block translate-y-[100%] opacity-0 drop-shadow-md">FRONTEND<br />DEVELOPER</span>
                </h1>
              </div>
            </div>

            {/* Bottom Left Info Layer */}
            <div className="absolute bottom-4 md:bottom-8 left-[2%] md:left-[4%] z-20 pointer-events-none overflow-hidden">
              <div ref={bottomTextRef} className="flex flex-col text-black text-xs md:text-sm font-bold uppercase tracking-wider translate-y-[100%] opacity-0">
                <span className="leading-none m-0 p-0">KERALA</span>
                <span className="leading-none m-0 p-0">{currentTime}</span>
              </div>
            </div>

          </div>
        </div>

        {/* "My Portfolio" Text positioned absolutely relative to wrapper so it stays below the window initially */}
        <div ref={myPortfolioTextRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[210px] md:translate-y-[280px] z-10">
          <p className="italic text-sm text-gray-800 tracking-wider" style={{ fontFamily: '"Instrument Serif", serif' }}>My Portfolio</p>
        </div>

      </section>

      {/* Manual Spacer: delays the next section from sliding over the Hero by 100vh */}
      <div className="w-full h-[100vh] pointer-events-none bg-transparent" />
    </>
  );
}
