"use client";

import { useRef } from "react";
import { Mail } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FaultyTerminal from "./core/FaultyTerminal";
import ASCIIText from "./core/ASCIIText";

gsap.registerPlugin(ScrollTrigger);

const GithubIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const DribbbleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
    <path d="M21.75 12.83c-3.13-1.45-6-1.17-11.18 2.08-3.03 1.91-5.42 4.74-6.9 8.24" />
    <path d="M7.6 3.5c2.4 4.5 3.6 7.6 3.5 12.4" />
  </svg>
);

const BehanceIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 10c0-1.5 1-2.5 3-2.5s3 1 3 2.5v.5H6" />
    <path d="M6 14c0 1.5 1 2.5 3 2.5s3-1 3-2.5v-.5H6" />
    <path d="M3 6h6v12H3z" />
    <path d="M15 8h6" />
    <path d="M15 11c0-1.5 1.5-2.5 3-2.5s3 1 3 2.5-1.5 2.5-3 2.5h-3v-5" />
    <path d="M15 16c0 1.5 1.5 2.5 3 2.5s3-1 3-2.5-1.5-2.5-3-2.5h-3v5" />
  </svg>
);

const links = [
  { label: "Email", href: "mailto:blezzzon@gmail.com", icon: <Mail size={24} /> },
  { label: "Github", href: "https://github.com/blessonnn", icon: <GithubIcon /> },
  { label: "Dribbble", href: "https://dribbble.com/blesson--j-f", icon: <DribbbleIcon /> },
  { label: "Behance", href: "https://www.behance.net/monuyt", icon: <BehanceIcon /> },
];

const NAV_ITEMS = [
  { name: "Welcome", href: "#welcome" },
  { name: "Skills", href: "#skills" },
  { name: "Hobby", href: "#hobbies" },
  { name: "Works", href: "#works" },
  { name: "About Me", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(
      ".connect-char",
      { y: "120%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 1.2,
        stagger: 0.05,
        ease: "power4.out",
      }
    );
  }, { scope: sectionRef });

  return (
    <div className="bg-white w-full">
      <section
        ref={sectionRef}
        id="contact"
        className="relative w-full bg-[#0a0a0a] pt-24 pb-12 px-6 md:px-12 flex flex-col justify-between min-h-[60vh] rounded-t-[2rem] overflow-hidden"
      >
        {/* FaultyTerminal shader background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <FaultyTerminal
            scale={1.2}
            gridMul={[2, 1]}
            digitSize={1.4}
            timeScale={0.4}
            pause={false}
            scanlineIntensity={0.4}
            glitchAmount={1.2}
            flickerAmount={0.8}
            noiseAmp={0.1}
            chromaticAberration={1.5}
            dither={0.1}
            curvature={0.1}
            tint="#3874FF"
            mouseReact={true}
            mouseStrength={0.4}
            pageLoadAnimation={false}
            brightness={0.8}
          />
        </div>

        <div className="relative z-10 flex flex-col mb-16 w-full">
          <div className="flex flex-col md:flex-row justify-between md:items-end w-full gap-8">
            <div className="relative w-full max-w-[800px] h-[22vw] min-h-[120px] md:min-h-[220px] overflow-hidden select-none">
              <ASCIIText
                text="Blesson"
                enableWaves={false}
                asciiFontSize={8}
                textColor="#ffffff"
                planeBaseHeight={15}
              />
            </div>
            
            <div className="hidden md:flex flex-col gap-2 items-end mb-0 translate-y-2 md:translate-y-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative text-white text-sm uppercase tracking-widest font-bold group/navlink overflow-hidden pb-1"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#3874FF] transform scale-x-0 group-hover/navlink:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left" />
                </a>
              ))}
            </div>
          </div>
          <p 
            className="text-white text-2xl md:text-5xl font-medium mt-6 tracking-tight flex overflow-hidden" 
            style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          >
            {"let's connect".split("").map((char, index) => (
              <span key={index} className="connect-char inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>
        </div>

        <div className="relative z-10 mt-auto flex flex-col gap-6 md:gap-10">
          <hr className="border-white/20 border-t" />
          
          <div className="flex flex-wrap gap-8 md:gap-16 justify-start items-center w-full">
            {links.map((link) => (
              <a 
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center text-white font-semibold uppercase text-xl md:text-2xl tracking-wider cursor-pointer"
              >
                <span className="overflow-hidden flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] w-0 opacity-0 -translate-x-4 group-hover:w-10 group-hover:opacity-100 group-hover:translate-x-0">
                  {link.icon}
                </span>
                <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
