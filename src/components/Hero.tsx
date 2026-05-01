"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const circle1Ref = useRef<SVGCircleElement>(null);
  const circle2Ref = useRef<SVGCircleElement>(null);
  const circle3Ref = useRef<SVGCircleElement>(null);
  
  const leftTextRef = useRef<HTMLHeadingElement>(null);
  const rightTextRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !circle1Ref.current || !circle2Ref.current || !circle3Ref.current) return;
    
    const container = containerRef.current;
    const c1 = circle1Ref.current;
    const c2 = circle2Ref.current;
    const c3 = circle3Ref.current;

    // ----- Blob GSAP Setup -----
    gsap.set([c1, c2, c3], { scale: 0, transformOrigin: "50% 50%" });

    const x1To = gsap.quickTo(c1, "cx", { duration: 0.3, ease: "power3.out" });
    const y1To = gsap.quickTo(c1, "cy", { duration: 0.3, ease: "power3.out" });
    
    const x2To = gsap.quickTo(c2, "cx", { duration: 0.7, ease: "power3.out" });
    const y2To = gsap.quickTo(c2, "cy", { duration: 0.7, ease: "power3.out" });
    
    const x3To = gsap.quickTo(c3, "cx", { duration: 1.2, ease: "power3.out" });
    const y3To = gsap.quickTo(c3, "cy", { duration: 1.2, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      x1To(x); y1To(y);
      x2To(x); y2To(y);
      x3To(x); y3To(y);
    };

    const handleMouseEnter = () => {
      gsap.to(c1, { scale: 1, duration: 0.8, ease: "back.out(1.5)" }); 
      gsap.to(c2, { scale: 1, duration: 0.8, ease: "back.out(1.5)", delay: 0.05 }); 
      gsap.to(c3, { scale: 1, duration: 0.8, ease: "back.out(1.5)", delay: 0.1 }); 
    };
    
    const handleMouseLeave = () => {
      gsap.to([c1, c2, c3], { scale: 0, duration: 0.5, ease: "power3.inOut" }); 
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    // ----- Text Reveal Animation -----
    if (leftTextRef.current && rightTextRef.current) {
      gsap.to([leftTextRef.current.children[0], rightTextRef.current.children[0]], {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        delay: 1.8, // Waits for preloader SVG animation + slide up
      });

      // ----- ScrollTrigger Pinning and Text Movement -----
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=100%", // Pin for 100vh of scrolling
          pin: true,
          pinSpacing: false, // The next section slides up over this!
          scrub: 1, // Smooth scrub
        }
      });

      tl.to(leftTextRef.current, { x: "15vw", ease: "none" }, 0)
        .to(rightTextRef.current, { x: "-15vw", ease: "none" }, 0);
    }

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black"
    >
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

      {/* Foreground Image (me2.png) revealed fluidly by SVG mask */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{
          maskImage: 'url(#fluid-mask)',
          WebkitMaskImage: 'url(#fluid-mask)',
        }}
      >
        <Image
          src="/images/hero/me2.png"
          alt="Hero reveal"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Typography layer */}
      <div className="absolute w-full h-full inset-0 pointer-events-none flex items-center justify-between px-[2%] md:px-[4%] z-20">
        <div className="overflow-hidden pr-8 pb-4 flex-shrink-0">
          <h1 ref={leftTextRef} className="text-3xl md:text-5xl lg:text-7xl font-bold uppercase tracking-widest text-black">
            <span className="inline-block translate-y-[100%] opacity-0">BLESSON<br />JF</span>
          </h1>
        </div>
        <div className="overflow-hidden pl-8 pb-4 text-right flex-shrink-0">
          <h1 ref={rightTextRef} className="text-3xl md:text-5xl lg:text-7xl font-bold uppercase tracking-widest text-black">
            <span className="inline-block translate-y-[100%] opacity-0">FRONTEND<br />DEVELOPER</span>
          </h1>
        </div>
      </div>

      {/* SVG Definitions for the true Liquid/Gooey Mask */}
      <svg width="100%" height="100%" className="absolute pointer-events-none z-10 top-0 left-0">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
          
          <mask id="fluid-mask">
            <rect width="100%" height="100%" fill="black" />
            <g filter="url(#goo)">
              <circle ref={circle1Ref} cx="0" cy="0" r="160" fill="white" />
              <circle ref={circle2Ref} cx="0" cy="0" r="110" fill="white" />
              <circle ref={circle3Ref} cx="0" cy="0" r="80" fill="white" />
            </g>
          </mask>
        </defs>
      </svg>
    </section>
  );
}
