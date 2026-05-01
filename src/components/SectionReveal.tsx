"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionRevealProps {
  children: React.ReactNode;
  title: string;
}

export default function SectionReveal({ children, title }: SectionRevealProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !titleRef.current) return;

    // Slide up and fade in the whole section
    gsap.fromTo(
      sectionRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Title color change effect
    gsap.fromTo(
      titleRef.current,
      { color: "#333333" }, // dark gray
      {
        color: "var(--accent)", // #3874ff
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 50%", // as it enters the center
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <h2
        ref={titleRef}
        className="text-4xl md:text-6xl font-bold mb-12 tracking-tight transition-colors duration-300"
      >
        {title}
      </h2>
      <div className="w-full">{children}</div>
    </section>
  );
}
