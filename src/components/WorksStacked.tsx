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
    title: "Portfolio", 
    color: "#B366FF", 
    text: "text-white",
    github: "https://github.com/blessonnn/valentine",
    description: "An interactive storytelling platform where users can create and share branched narratives with immersive audio-visuals.",
    techStack: ["Vue.js", "Howler.js", "GSAP", "Firebase"],
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
  const [activeTab, setActiveTab] = useState<{ id: string, tab: string } | null>(null);

  const handleTabClick = (workId: string, tab: string) => {
    if (tab === "code") {
      const work = WORKS.find(w => w.id === workId);
      if (work?.github) window.open(work.github, "_blank");
      return;
    }
    setActiveTab({ id: workId, tab });
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
                      onClick={() => handleTabClick(work.id, tab)}
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
                <div className="absolute inset-0 z-50 flex items-center justify-center p-6 md:p-20 animate-pop-up">
                  {/* Close Button */}
                  <button 
                    onClick={closeTab}
                    className="absolute top-10 right-10 md:top-16 md:right-16 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center z-[60] hover:scale-110 transition-transform shadow-2xl"
                  >
                    <span className="text-2xl font-bold">×</span>
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
                      <div className="flex flex-wrap justify-center gap-4 md:gap-8 bg-black/10 backdrop-blur-md p-12 rounded-3xl border border-white/10 shadow-2xl">
                        {work.techStack.map((tech) => (
                          <span 
                            key={tech} 
                            className={`px-8 py-4 rounded-2xl border border-black/10 text-xl md:text-3xl font-black ${work.text} bg-white/20 hover:scale-105 transition-transform cursor-default`}
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
        @keyframes pop-up {
          from {
            transform: translateY(100vh);
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
        .animate-pop-up {
          animation: pop-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
};

export default WorksStacked;

