"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const WORKS = [
  { 
    id: "vitalpulse", 
    title: "VitalPulse", 
    color: "#FFC338", 
    text: "text-black",
    github: "https://github.com/blessonnn/Health_IoT_Project",
    description: "VitalPulse is an AI-powered healthcare diagnostic platform that blends real-time IoT hardware metrics with user-reported data. The system reads immediate physical vitals (like heart rate, temperature, and SpO2) alongside clinical symptoms to predict potential diseases and instantly provide preliminary health suggestions.\n\nFeaturing an Apple-inspired minimalist interface, it uses smart heuristics to dynamically prioritize relevant symptoms based on current vital signs and includes a natural language processing layer that automatically extracts medical data from plain-English descriptions. Under the hood, a decoupled Flask backend runs a high-accuracy Random Forest classification model to deliver lightning-fast, data-driven diagnostic insights.",
    techStack: [
      "Minimalist Glassmorphism",
      "Inter Typography",
      "Streamlit",
      "Streamlit-Lottie",
      "Requests",
      "Flask",
      "Python 3",
      "RESTful API (JSON)",
      "Scikit-Learn",
      "Pandas",
      "Joblib"
    ],
    image: "/images/projects/vitalpulse.png",
    demo: "https://www.w3schools.com/html/mov_bbb.mp4" // Placeholder video
  },
  { 
    id: "pixelvault", 
    title: "Pixelvault", 
    color: "#F4FF38", 
    text: "text-black",
    github: "https://github.com/blessonnn/pixelvault",
    description: "PixelVault is an advanced web application dedicated to secure image steganography, providing an intuitive and visually elegant platform for concealing sensitive data within digital media. By embedding encrypted information directly into the least significant bits (LSB) of image files, PixelVault allows users to achieve covert, completely undetectable communication.\n\nThe application prioritizes data security and structural integrity, ensuring that the visual quality of the carrier image remains visually indistinguishable from the original, even after data encoding. Built with a highly responsive, modern frontend, it streamlines the complex process of encoding and decoding secret layers within digital images.",
    techStack: [
      "HTML5",
      "CSS3 (Grid & Flexbox Layouts)",
      "Vanilla JavaScript",
      "Python 3",
      "Pillow (PIL)",
      "NumPy",
      "Flask",
      "Git / GitHub Pages"
    ],
    image: "/images/projects/pixelvault.png",
    demo: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  { 
    id: "lastpage", 
    title: "Lastpage", 
    color: "#FFFFFF", 
    text: "text-black",
    github: "https://github.com/blessonnn/lastpage",
    description: "Lastpage is a highly interactive, responsive digital yearbook application custom-built for graduating classes to celebrate, connect, and preserve memories. Designed with a premium, modern glassmorphism aesthetic and fluid motion graphics, the platform serves as a collaborative space where students can create personalized profile cards, upload media assets, and exchange digital signatures and farewell messages.\n\nThe application utilizes a sophisticated client-side state machine to handle seamless view transitions and incorporates a robust, role-based access control flow. This infrastructure powers both the secure student portal—where users manage their media and dynamic message boards—and a dedicated administrative dashboard built for real-time content moderation and platform management.",
    techStack: [
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "Glassmorphism UI Components",
      "Firebase (Hosting)",
      "Firebase Realtime Database / Firestore",
      "Firebase Authentication (Role-Based Access)"
    ],
    image: "/images/projects/lastpage.png",
    demo: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  { 
    id: "trackie", 
    title: "Trackie", 
    color: "#FF6B6B", 
    text: "text-white",
    github: "https://github.com/blessonnn/trackie",
    description: "The College Bus Tracking System is a real-time full-stack transit monitoring platform engineered to streamline campus fleet coordination and improve commuter safety. The system architecture integrates live geospatial visualization via the OpenStreetMap API to map and monitor precise fleet coordinates continuously.\n\nBuilt with a structured MySQL database layer to manage complex entities like interconnected routes, dynamic schedules, and driver assignments, the platform ensures data consistency across the network. It features a custom backend logic engine that implements strict, role-based access control tiers tailored specifically for administrative oversight, driver updates, and student accessibility.",
    techStack: [
      "Responsive Web Interface",
      "OpenStreetMap API / Leaflet.js",
      "Geospatial Live UI Components",
      "Python 3",
      "Custom Routing & Geofencing Logic",
      "MySQL",
      "Relational Database Schema (Routes, Vehicles, Accounts)",
      "Role-Based Access Control (RBES)"
    ],
    image: "/images/projects/trackie.png",
    demo: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  { 
    id: "valentine", 
    title: "Portfolio", 
    color: "#B366FF", 
    text: "text-white",
    github: "https://github.com/blessonnn/valentine",
    description: "Portfolio v2 is a high-end, premium digital showroom designed with a minimalist, monochromatic visual identity to highlight a strong focus on creative UI/UX direction and motion graphics. Rejecting generic templates, the platform features a custom-engineered architecture that balances Apple-inspired spatial aesthetics with bleeding-edge web performance.\n\nThe user experience is anchored by ultra-fluid interactive elements, including kinetic hero section image reveals, smart magnetic hover states, and dynamic project layout components. Leveraging GSAP and Lenis smooth scrolling to establish high-fidelity, scroll-driven visual storytelling, the portfolio flawlessly bridges technical engineering with exceptional digital craftsmanship.",
    techStack: [
      "Next.js (App Router / React)",
      "TypeScript",
      "Tailwind CSS",
      "High-contrast Monochromatic System",
      "GSAP (GreenSock Animation Platform)",
      "ScrollTrigger (Scroll-Driven Interactive Timelines)",
      "Lenis (Smooth Scroll Integration)",
      "Vercel",
      "Git / GitHub"
    ],
    image: "/images/projects/valentine.png",
    demo: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
];

const BlockRevealText = ({ text }: { text: string }) => {
  return (
    <>
      {text.split('\n').map((line, lineIndex) => (
        <React.Fragment key={lineIndex}>
          {line.split(' ').map((word, wordIndex) => (
            <span key={`${lineIndex}-${wordIndex}`} className="word-container relative inline-block overflow-hidden mx-[0.1em] align-bottom">
              <span className="opacity-0 reveal-word inline-block">{word}</span>
              <span className="absolute top-0 left-0 w-full h-full bg-black reveal-block origin-left transform scale-x-0 z-10"></span>
            </span>
          ))}
          {lineIndex < text.split('\n').length - 1 && <br />}
        </React.Fragment>
      ))}
    </>
  );
};

const BlockRevealParagraph = ({ text }: { text: string }) => {
  return (
    <>
      {text.split('\n\n').map((paragraph, index) => (
        <span key={index} className="word-container relative block overflow-hidden mb-4 last:mb-0 w-full">
          <span className="opacity-0 reveal-word block text-justify whitespace-pre-wrap">{paragraph}</span>
          <span className="absolute top-0 left-0 w-full h-full bg-black reveal-block origin-left transform scale-x-0 z-10"></span>
        </span>
      ))}
    </>
  );
};

const WorksStacked = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [activeTab, setActiveTab] = useState<{ id: string, tab: string, x?: number, y?: number } | null>(null);

  const handleTabClick = (workId: string, tab: string, e?: React.MouseEvent) => {
    if (tab === "code") {
      const work = WORKS.find(w => w.id === workId);
      if (work?.github) window.open(work.github, "_blank");
      return;
    }
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    if (e) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }
    setActiveTab({ id: workId, tab, x, y });
  };

  const closeTab = () => setActiveTab(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=5000",
          pin: true,
          scrub: 1,
        },
      });

      const cards = gsap.utils.toArray<HTMLElement>(".work-card");

      cards.forEach((card, index) => {
        // Initial state
        gsap.set(card, { yPercent: 100 });

        let animationTriggered = false;

        // Slide up animation
        tl.to(card, {
          yPercent: 0,
          ease: "none",
          onUpdate: function () {
            if (this.progress() >= 0.5 && !animationTriggered) {
              animationTriggered = true;
              
              // Animate word-by-word block reveal
              const wordContainers = card.querySelectorAll(".word-container");
              if (wordContainers.length > 0) {
                const revealTl = gsap.timeline({ overwrite: "auto" });
                wordContainers.forEach((container, i) => {
                  const block = container.querySelector(".reveal-block");
                  const word = container.querySelector(".reveal-word");
                  const delay = i * 0.03; // stagger fast
                  
                  revealTl.to(block, { scaleX: 1, duration: 0.25, ease: "power2.inOut" }, delay);
                  revealTl.set(word, { opacity: 1 }, delay + 0.125);
                  revealTl.set(block, { transformOrigin: "right" }, delay + 0.25);
                  revealTl.to(block, { scaleX: 0, duration: 0.25, ease: "power2.inOut" }, delay + 0.25);
                });
              }

              // Animate other standard reveal-items (like buttons)
              const standardItems = card.querySelectorAll(".reveal-item");
              if (standardItems.length > 0) {
                gsap.fromTo(standardItems, 
                  { y: 50, opacity: 0 },
                  { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power4.out", overwrite: "auto" }
                );
              }
            } else if (this.progress() < 0.1 && animationTriggered) {
              // Reset the animation if scrolled back down
              animationTriggered = false;
              const words = card.querySelectorAll(".reveal-word");
              const blocks = card.querySelectorAll(".reveal-block");
              gsap.set(words, { opacity: 0 });
              gsap.set(blocks, { scaleX: 0, transformOrigin: "left" });
              
              const standardItems = card.querySelectorAll(".reveal-item");
              gsap.set(standardItems, { opacity: 0, y: 50 });
            }
          }
        });
      });

      // Animate the WORKS title letters
      gsap.fromTo(".works-char", 
        { y: 200, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1, 
          duration: 1.2, 
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="works"
      className="relative w-full h-screen bg-[#0a0a0a] text-white overflow-hidden flex items-center justify-center"
    >
      <h2
        ref={titleRef}
        className="text-[15vw] leading-none font-bold tracking-tighter z-0 flex overflow-hidden absolute pointer-events-none"
      >
        {"WORKS".split("").map((char, i) => (
          <span 
            key={i} 
            className="works-char inline-block"
          >
            {char}
          </span>
        ))}
      </h2>

      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {WORKS.map((work, i) => {
          const isPopOverActive = activeTab?.id === work.id;
          const currentTab = activeTab?.tab || null;
          
          return (
            <div
              key={work.id}
              className="work-card absolute top-0 left-0 w-full h-screen shadow-[0_-20px_50px_rgba(0,0,0,0.3)] flex flex-col pointer-events-auto overflow-hidden p-6 md:p-24"
              style={{ 
                backgroundColor: work.color, 
                zIndex: i + 10 
              }}
            >
              {/* Main Content Area */}
              <div className={`w-full h-full flex flex-col items-center justify-center transition-all duration-700 ${isPopOverActive ? 'blur-2xl scale-95 opacity-40' : 'blur-0 scale-100 opacity-100'}`}>
                <h3 className={`text-7xl md:text-[10vw] font-bold uppercase tracking-tighter ${work.text} mb-4 text-center leading-none`}>
                  <BlockRevealText text={work.title} />
                </h3>
                
                <p className={`text-sm md:text-base font-medium font-['Helvetica',_sans-serif] text-justify max-w-4xl mb-12 opacity-80 ${work.text}`}>
                  <BlockRevealParagraph text={work.description} />
                </p>
                
                {/* Horizontal Navigation Stack */}
                <div className="flex flex-wrap gap-4 md:gap-6 reveal-item justify-center items-center">
                  {["code", "images", "demo", "tech stack"].map((tab) => (
                    <button
                      key={tab}
                      onClick={(e) => handleTabClick(work.id, tab, e)}
                      className={`text-sm md:text-base font-bold uppercase tracking-widest px-6 py-3 rounded-full transition-colors duration-300 shadow-sm hover:shadow-lg ${
                        work.id === 'vitalpulse'
                          ? 'bg-black text-white hover:bg-[#FFE7A3] hover:text-black'
                          : work.id === 'pixelvault'
                          ? 'bg-black text-white hover:bg-[#F2FF84] hover:text-black'
                          : work.id === 'trackie'
                          ? 'bg-white text-black hover:bg-[#FF9E9E] hover:text-black'
                          : work.id === 'valentine'
                          ? 'bg-white text-black hover:bg-[#E0B0FF] hover:text-black'
                          : 'bg-white text-black hover:bg-black hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pop-Over Overlay */}
              {isPopOverActive && (
                <div 
                  className="absolute inset-0 z-50 flex items-center justify-center p-6 md:p-20 animate-expand-out"
                  style={activeTab?.x !== undefined ? { transformOrigin: `${activeTab.x}px ${activeTab.y}px` } : undefined}
                >
                  {/* Close Button */}
                  <button 
                    onClick={closeTab}
                    className="absolute top-8 right-8 md:top-12 md:right-12 w-12 h-12 rounded-full flex items-center justify-center z-[60] hover:scale-110 transition-all shadow-lg border border-white/30 text-white bg-transparent mix-blend-difference hover:bg-white/10"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>

                  <div className="w-full h-full max-w-6xl relative flex items-center justify-center">
                    {currentTab === "images" && (
                      <div className="relative w-full aspect-[4/3] md:h-full rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
                        <Image 
                          src={work.image} 
                          alt={work.title} 
                          fill 
                          className="object-cover"
                          priority
                        />
                      </div>
                    )}

                    {currentTab === "demo" && (
                      <div className="relative w-full aspect-[4/3] md:h-full rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.5)] bg-black">
                        <video 
                          src={work.demo} 
                          autoPlay 
                          loop 
                          muted 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {currentTab === "tech stack" && (
                      <div className="flex flex-wrap justify-center gap-3 md:gap-6 bg-black/10 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
                        {work.techStack.map((tech) => (
                          <span 
                            key={tech} 
                            className={`px-4 py-2 md:px-6 md:py-3 rounded-xl border border-black/10 text-sm md:text-lg font-bold ${work.text} bg-white/20 hover:scale-105 transition-transform cursor-default`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes expand-out {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
        .animate-expand-out {
          animation: expand-out 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
};

export default WorksStacked;

