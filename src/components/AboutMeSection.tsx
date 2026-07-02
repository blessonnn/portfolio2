"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagnetLines from "./core/MagnetLines";

gsap.registerPlugin(ScrollTrigger);

export default function AboutMeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  const bioText = `I am a designer driven by the intersection of minimalism and functionality. With a focus on creating clean, high-impact visual experiences, I specialize in UI/UX design and creative storytelling. While my technical background is rooted in Computer Science, my true passion lies in the creative process—turning complex ideas into intuitive, aesthetically balanced designs. I thrive on projects that demand a sharp eye for detail, whether it's building modern web interfaces, producing music, or capturing the world through a moody, minimalist lens.`;

  const words = bioText.split(" ");

  useGSAP(() => {
    if (!sectionRef.current || !maskRef.current || !textRef.current || !imageRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse",
      }
    });

    // Mask reveal animation
    tl.to(maskRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut"
    });

    // Image slight scale up reveal
    tl.from(imageRef.current, {
      scale: 1.1,
      duration: 1.5,
      ease: "power2.out"
    }, "<");

    // Block reveal animation for the heading lines
    const headingBlocks = gsap.utils.toArray(".about-heading-block") as HTMLElement[];
    const headingTexts = gsap.utils.toArray(".about-heading-text") as HTMLElement[];

    headingBlocks.forEach((block, index) => {
      const text = headingTexts[index];
      const lineTl = gsap.timeline();
      
      lineTl.to(block, {
        scaleX: 1,
        duration: 0.5,
        ease: "power3.inOut"
      })
      .set(text, { opacity: 1 })
      .to(block, {
        transformOrigin: "right",
        scaleX: 0,
        duration: 0.5,
        ease: "power3.inOut"
      });

      // Add each line animation to the main timeline with a slight overlap
      tl.add(lineTl, index === 0 ? "-=0.8" : "-=0.7");
    });

    // Word by word reveal
    tl.from(".about-word", {
      opacity: 0,
      y: 20,
      stagger: 0.015,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.4");

    // Background text scroll animation (bottom-right entry to left)
    gsap.fromTo(bgTextRef.current,
      { xPercent: 20, yPercent: 50, opacity: 0 },
      {
        xPercent: -50,
        yPercent: 0,
        opacity: 0.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        }
      }
    );

    // Image reveal animation using clip-path for performance and to prevent Next.js image warnings
    gsap.to(".second-image", {
      clipPath: "inset(0% 0% 0% 0%)",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "top top",
        scrub: true,
      }
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="about" className="relative py-24 px-6 md:px-12 bg-white flex items-center justify-start min-h-screen overflow-hidden">

      {/* Background Magnet Lines Animation */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-30 flex items-center justify-center overflow-hidden">
        <MagnetLines
          rows={12}
          columns={18}
          containerSize="100%"
          lineColor="#3874FF"
          lineWidth="0.4vmin"
          lineHeight="3.5vmin"
          baseAngle={0}
        />
      </div>

      {/* Large Background Text Roll */}
      <div
        ref={bgTextRef}
        className="absolute bottom-0 right-0 whitespace-nowrap text-[15vw] md:text-[25vw] font-black text-[#3874FF] pointer-events-none select-none z-0 tracking-tighter uppercase opacity-40 flex"
      >
        {[...Array(5)].map((_, i) => (
          <span key={i}>ABOUT ME &nbsp;</span>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 md:grid-cols-[auto_1fr] gap-0 items-center">

        {/* Left Side: Image with Mask */}
        <div className="relative overflow-hidden group justify-self-start">
          <div ref={imageRef} className="relative aspect-[4/5] w-[150px] md:w-[220px] rounded-none overflow-hidden bg-gray-100">
            {/* Base Image */}
            <Image
              src="/about-me/about-me-portfolio.jpg"
              alt="Blesson J.F"
              fill
              sizes="(max-width: 768px) 150px, 220px"
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              priority
            />
            {/* Second Image that reveals on scroll */}
            <div 
              className="second-image absolute inset-0 w-full h-full overflow-hidden z-20" 
              style={{ clipPath: "inset(0% 0% 100% 0%)" }}
            >
               <Image
                src="/about-me/childish copy.png"
                alt="Blesson J.F Alternate"
                fill
                sizes="(max-width: 768px) 150px, 220px"
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
          </div>
          {/* Grey Mask (Initial reveal) */}
          <div
            ref={maskRef}
            className="absolute inset-0 bg-[#e0e0e0] z-30"
          />
        </div>

        <div ref={textRef} className="flex flex-col gap-6 md:pl-20">
          <h2 className="text-2xl md:text-4xl font-bold text-black uppercase tracking-tighter leading-none flex flex-col gap-1 items-start">
            <span className="relative inline-block overflow-hidden py-1">
              <span className="about-heading-text inline-block opacity-0">
                Creative Designer &
              </span>
              <span className="about-heading-block absolute inset-0 bg-[#3874FF] origin-left scale-x-0" />
            </span>
            <span className="relative inline-block overflow-hidden py-1">
              <span className="about-heading-text inline-block opacity-0">
                Tech Enthusiast
              </span>
              <span className="about-heading-block absolute inset-0 bg-[#3874FF] origin-left scale-x-0" />
            </span>
          </h2>

          <div className="flex flex-wrap gap-x-[0.4em] gap-y-0 max-w-2xl">
            {words.map((word, index) => (
              <span
                key={index}
                className="about-word relative inline-block text-sm md:text-lg font-medium text-black/80 leading-none group/word py-1"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover/word:text-[#3874FF]">
                  {word}
                </span>
                <span className="absolute inset-0 bg-[#3874FF]/10 scale-x-0 origin-left transition-transform duration-300 ease-out group-hover/word:scale-x-100 -z-0" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
