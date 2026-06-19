"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function WelcomeSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !textRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      }
    });

    // Elegant scroll animation: starts semi-transparent and smaller,
    // scales up to 1 (filling the section) and becomes opaque,
    // then zooms/scales even larger as it fades out to black.
    tl.fromTo(textRef.current,
      { opacity: 0.1, scale: 0.8 },
      { opacity: 1, scale: 1.0, duration: 0.4, ease: "power2.out" }
    )
    .to(textRef.current, {
      duration: 0.2 // Brief hold at maximum readability
    })
    .to(textRef.current, {
      opacity: 0,
      scale: 1.4,
      duration: 0.4,
      ease: "power2.in"
    });

  }, { scope: containerRef });

  return (
    <div id="welcome" ref={containerRef} className="w-full h-[250vh] relative z-20 bg-black">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 md:px-8">
            <div
              ref={textRef}
              className="text-white text-[clamp(6rem,28vw,50rem)] font-black uppercase tracking-tighter select-none pointer-events-none text-center leading-none font-supertalls"
              style={{
                fontFamily: "'Supertalls', sans-serif"
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

