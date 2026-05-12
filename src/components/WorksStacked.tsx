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
    description: "A real-time Health IoT dashboard monitoring system. It processes vital health metrics from sensors and uses ML to predict potential health risks.",
    techStack: ["Next.js", "Flask", "Python", "MQTT", "Machine Learning"],
    image: "/images/projects/vitalpulse.png",
    demo: "https://www.w3schools.com/html/mov_bbb.mp4" // Placeholder video
  },
  { 
    id: "pixelvault", 
    title: "Pixelvault", 
    color: "#F4FF38", 
    text: "text-black",
    github: "https://github.com/blessonnn/pixelvault",
    description: "A decentralized gallery for digital art and assets, focusing on high-performance rendering and secure asset management.",
    techStack: ["React", "Three.js", "Web3.js", "Solidity", "TailwindCSS"],
    image: "/images/projects/pixelvault.png",
    demo: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  { 
    id: "lastpage", 
    title: "Lastpage", 
    color: "#FFFFFF", 
    text: "text-black",
    github: "https://github.com/blessonnn/lastpage",
    description: "An AI-powered reading assistant that summarizes long articles and organizes your digital library with semantic search.",
    techStack: ["Next.js", "OpenAI API", "Pinecone", "LangChain"],
    image: "/images/projects/lastpage.png",
    demo: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  { 
    id: "trackie", 
    title: "Trackie", 
    color: "#FF6B6B", 
    text: "text-white",
    github: "https://github.com/blessonnn/trackie",
    description: "Personal finance and habit tracker with gamified features to help users maintain their goals and financial health.",
    techStack: ["React Native", "Firebase", "D3.js", "Redux Toolkit"],
    image: "/images/projects/trackie.png",
    demo: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  { 
    id: "valentine", 
    title: "Valentine", 
    color: "#B366FF", 
    text: "text-white",
    github: "https://github.com/blessonnn/valentine",
    description: "An interactive storytelling platform where users can create and share branched narratives with immersive audio-visuals.",
    techStack: ["Vue.js", "Howler.js", "GSAP", "Firebase"],
    image: "/images/projects/valentine.png",
    demo: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
];

const WorksStacked = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [activeTabs, setActiveTabs] = useState<Record<string, string>>({});

  const handleTabClick = (workId: string, tab: string) => {
    if (tab === "code") {
      const work = WORKS.find(w => w.id === workId);
      if (work?.github) window.open(work.github, "_blank");
      return;
    }
    setActiveTabs(prev => ({ ...prev, [workId]: tab }));
  };

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

        // Slide up animation
        tl.to(card, {
          yPercent: 0,
          ease: "none",
          onStart: () => {
            // Animate items inside when card starts appearing
            const items = card.querySelectorAll(".reveal-item");
            gsap.fromTo(items, 
              { y: 50, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power4.out", overwrite: "auto" }
            );
          }
        });
      });
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
        className="text-[15vw] leading-none font-bold tracking-tighter text-white/5 z-0"
      >
        WORKS
      </h2>

      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {WORKS.map((work, i) => {
          const currentTab = activeTabs[work.id] || "images";
          
          return (
            <div
              key={work.id}
              className="work-card absolute top-0 left-0 w-full h-screen shadow-[0_-20px_50px_rgba(0,0,0,0.3)] flex flex-col pointer-events-auto overflow-hidden"
              style={{ 
                backgroundColor: work.color, 
                zIndex: i + 10 
              }}
            >
              {/* Top Section: Title & Tabs */}
              <div className="w-full px-6 md:px-16 pt-12 md:pt-24 pb-8 border-b border-black/5">
                <h3 className={`text-5xl md:text-8xl font-bold uppercase tracking-tighter ${work.text} mb-6 reveal-item`}>
                  {work.title}
                </h3>
                
                {/* Navigation Links */}
                <div className="flex flex-wrap gap-4 md:gap-8 reveal-item">
                  {["code", "images", "demo", "description", "tech stack"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleTabClick(work.id, tab)}
                      className={`text-sm md:text-lg font-bold uppercase tracking-widest transition-all duration-300 hover:opacity-100 ${
                        currentTab === tab && tab !== "code" ? "opacity-100 border-b-2 border-current" : "opacity-40"
                      } ${work.text}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Content Section: Dynamic Reveal */}
              <div className="flex-1 w-full relative overflow-hidden p-6 md:p-16 flex items-center justify-center">
                <div 
                  key={`${work.id}-${currentTab}`}
                  className="w-full h-full flex flex-col items-center justify-center animate-slide-up"
                >
                  {currentTab === "images" && (
                    <div className="relative w-full h-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl">
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
                    <div className="relative w-full h-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl bg-black">
                      <video 
                        src={work.demo} 
                        autoPlay 
                        loop 
                        muted 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {currentTab === "description" && (
                    <div className={`max-w-3xl text-center ${work.text}`}>
                      <p className="text-xl md:text-4xl font-medium leading-tight">
                        {work.description}
                      </p>
                    </div>
                  )}

                  {currentTab === "tech stack" && (
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                      {work.techStack.map((tech) => (
                        <span 
                          key={tech} 
                          className={`px-6 py-3 rounded-full border border-black/10 text-lg md:text-2xl font-bold ${work.text} bg-white/10 backdrop-blur-sm`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
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
        .animate-slide-up {
          animation: slide-up 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
      `}</style>
    </section>
  );
};

export default WorksStacked;

