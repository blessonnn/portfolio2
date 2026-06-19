"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function WelcomeSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const blurOverlayRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !textRef.current || !blurOverlayRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      }
    });

    // 1. Animate background blur on the overlay covering the hero section
    tl.fromTo(blurOverlayRef.current,
      { backdropFilter: "blur(0px)", webkitBackdropFilter: "blur(0px)" },
      { backdropFilter: "blur(8px)", webkitBackdropFilter: "blur(8px)", duration: 0.4, ease: "power2.out" },
      0
    )
    .to(blurOverlayRef.current, {
      duration: 0.2 // Hold state
    })
    .to(blurOverlayRef.current,
      { backdropFilter: "blur(0px)", webkitBackdropFilter: "blur(0px)", duration: 0.4, ease: "power2.in" },
      0.6
    );

    // 2. Animate the Welcome text moving from bottom offscreen to center, then exiting offscreen top
    tl.fromTo(textRef.current,
      { y: "100vh", opacity: 0 },
      { y: "0vh", opacity: 1, duration: 0.4, ease: "power2.out" },
      0
    )
    .to(textRef.current, {
      duration: 0.2 // Hold state
    })
    .to(textRef.current,
      { y: "-100vh", opacity: 0, duration: 0.4, ease: "power2.in" },
      0.6
    );

  }, { scope: containerRef });

  return (
    <div id="welcome" ref={containerRef} className="w-full h-[250vh] relative z-20 bg-transparent">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Backdrop blur overlay to blur the sticky Hero behind it */}
        <div 
          ref={blurOverlayRef} 
          className="absolute inset-0 w-full h-full pointer-events-none z-0" 
          style={{ backdropFilter: "blur(0px)", WebkitBackdropFilter: "blur(0px)" }}
        />

        <div className="absolute inset-0 w-full h-full flex items-center justify-center z-10">
          <div className="relative w-full h-full flex flex-col items-center justify-center px-4 md:px-8">
            <div
              ref={textRef}
              className="text-[#3874ff] text-[clamp(6rem,28vw,50rem)] font-black uppercase tracking-tighter select-none pointer-events-none text-center leading-none font-supertalls"
              style={{
                fontFamily: "'Supertalls', sans-serif",
                color: '#3874ff',
                transform: "translateY(100vh)"
              }}
            >
              Welcome
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


