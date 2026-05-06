"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionRevealProps {
  children: React.ReactNode;
  title: string;
  fullWidth?: boolean;
  id?: string;
}

export default function SectionReveal({ children, title, fullWidth = false, id }: SectionRevealProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !titleRef.current) return;

    // Slide up and fade in the whole section
    gsap.fromTo(
      sectionRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%", // Triggers slightly later for better "filling" feel
          toggleActions: "play none none reverse",
        },
      }
    );

    // Title color change effect
    gsap.fromTo(
      titleRef.current,
      { color: "#1a1a1a" }, 
      {
        color: "var(--accent)", 
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 60%", 
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section 
      id={id}
      ref={sectionRef} 
      className={`py-32 ${fullWidth ? 'w-full' : 'px-6 md:px-12 max-w-7xl mx-auto'}`}
    >
      <h2
        ref={titleRef}
        className={`text-4xl md:text-6xl font-bold mb-16 tracking-tight transition-colors duration-300 ${fullWidth ? 'px-6 md:px-12' : ''}`}
      >
        {title}
      </h2>
      <div className="w-full">{children}</div>
    </section>
  );
}
