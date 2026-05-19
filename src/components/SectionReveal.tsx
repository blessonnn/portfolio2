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
  titleColor?: string;
  revealFromBehind?: boolean;
}

export default function SectionReveal({ 
  children, 
  title, 
  fullWidth = false, 
  id,
  titleColor,
  revealFromBehind = false
}: SectionRevealProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !titleRef.current) return;

    if (revealFromBehind) {
      // 1. Fade in section wrapper (no Y shift to avoid offsetting the title's entry)
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // 2. Title slides down from behind the welcome section (y: -180 -> 0)
      gsap.fromTo(
        titleRef.current,
        { y: -180, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // 3. Content container slides up from the bottom
      const contentEl = sectionRef.current.querySelector(".section-content-wrapper");
      if (contentEl) {
        gsap.fromTo(
          contentEl,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentEl,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }
    } else {
      // Standard SectionReveal slide up
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
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Title color change animation
    const targetColor = titleColor || "var(--accent)";
    const startColor = titleColor === "white" ? "#222222" : "#1a1a1a";

    gsap.fromTo(
      titleRef.current,
      { color: startColor }, 
      {
        color: targetColor, 
        duration: 1.0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%", 
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section 
      id={id}
      ref={sectionRef} 
      className={`relative z-10 py-32 ${fullWidth ? 'w-full' : 'px-6 md:px-12 max-w-7xl mx-auto'}`}
    >
      <h2
        ref={titleRef}
        className={`text-4xl md:text-6xl font-bold mb-16 tracking-tight transition-colors duration-300 ${fullWidth ? 'px-6 md:px-12' : ''}`}
      >
        {title}
      </h2>
      <div className="w-full section-content-wrapper">{children}</div>
    </section>
  );
}
