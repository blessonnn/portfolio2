"use client";

import { useRef } from "react";
import { Mail } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GithubIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
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
  { label: "Gmail", href: "mailto:hello@example.com", icon: <Mail size={24} /> },
  { label: "Github", href: "https://github.com", icon: <GithubIcon /> },
  { label: "Instagram", href: "https://instagram.com", icon: <InstagramIcon /> },
  { label: "Behance", href: "https://behance.net", icon: <BehanceIcon /> },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      ".blesson-char",
      { y: "120%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="contact" className="w-full bg-[#3874FF] pt-24 pb-12 px-6 md:px-12 flex flex-col justify-between min-h-[60vh] rounded-t-[2rem]">
      <div className="flex flex-col mb-16">
        <h1 
          className="text-[12vw] leading-none text-black uppercase tracking-tighter flex overflow-hidden"
          style={{ fontFamily: "'Martian Mono', monospace" }}
        >
          {"Blesson".split("").map((char, index) => (
            <span key={index} className="blesson-char inline-block">
              {char}
            </span>
          ))}
        </h1>
        <p 
          className="text-black text-2xl md:text-5xl font-medium mt-6 tracking-tight" 
          style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
        >
          let's connect
        </p>
      </div>

      <div className="mt-auto flex flex-col gap-6 md:gap-10">
        <hr className="border-black/30 border-t" />
        
        <div className="flex flex-wrap gap-8 md:gap-16 justify-start items-center w-full">
          {links.map((link) => (
            <a 
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center text-black font-semibold uppercase text-xl md:text-2xl tracking-wider cursor-pointer"
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
  );
}
