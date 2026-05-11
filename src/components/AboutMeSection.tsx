"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionReveal from "./SectionReveal";

gsap.registerPlugin(ScrollTrigger);

export default function AboutMeSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!contentRef.current || !textRef.current || !imgRef.current) return;

    // Slide up text and image from bottom to top with a slight stagger
    gsap.fromTo(
      [textRef.current, imgRef.current],
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%", // Triggers when the top of the content hits 85% of the viewport height
          toggleActions: "play none none reverse",
        }
      }
    );
  }, { scope: contentRef });

  return (
    <SectionReveal title="About Me" id="about">
      <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
        
        {/* Left Side: Text */}
        <div ref={textRef} className="flex flex-col gap-6">
          <p className="text-xl md:text-2xl leading-relaxed text-gray-300">
            I am a passionate creative developer focused on building immersive digital experiences. 
            With a strong foundation in frontend technologies and a keen eye for design, 
            I strive to bridge the gap between functionality and aesthetics.
          </p>
        </div>

        {/* Right Side: Image */}
        <div ref={imgRef} className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden">
          <Image 
            src="/about-me/about-me-portfolio.png"
            alt="About Me Portrait"
            fill
            className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
        
      </div>
    </SectionReveal>
  );
}
