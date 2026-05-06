"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const PROJECTS = [
  { id: 1, title: "Cyber Protocol", category: "Web3 App", color: "#FFC338" },
  { id: 2, title: "Neon Dashboard", category: "Fintech UI", color: "#F4FF38" },
  { id: 3, title: "Void Analytics", category: "Data Viz", color: "#FFFFFF" },
  { id: 4, title: "Pulse E-commerce", category: "Storefront", color: "#0A0D14" },
  { id: 5, title: "Quantum AI", category: "Machine Learning", color: "#FF6B6B" },
];

export default function ProjectsAccordion() {
  const [activeId, setActiveId] = useState(3); // Center card initially active
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const cards = gsap.utils.toArray<HTMLElement>(".project-card", containerRef.current);

    cards.forEach((card, i) => {
      const id = i + 1;
      const isActive = id === activeId;

      gsap.to(card, {
        flex: isActive ? 4 : 1,
        duration: 0.8,
        ease: "expo.out",
        filter: isActive ? "grayscale(0%)" : "grayscale(100%)",
      });

      // Animate text elements inside the card
      const content = card.querySelector(".project-content");
      if (content) {
        gsap.to(content, {
          opacity: isActive ? 1 : 0,
          y: isActive ? 0 : 20,
          duration: 0.4,
          delay: isActive ? 0.2 : 0,
        });
      }
    });
  }, { scope: containerRef, dependencies: [activeId] });

  return (
    <div
      ref={containerRef}
      className="flex flex-col md:flex-row w-full h-[80vh] min-h-[600px] gap-0 px-2 md:px-4 overflow-hidden"
    >
      {PROJECTS.map((project) => (
        <div
          key={project.id}
          className="project-card relative cursor-pointer overflow-hidden"
          style={{ backgroundColor: project.color }}
          onMouseEnter={() => setActiveId(project.id)}
        >
          {/* Gradient to ensure white text is readable against light backgrounds */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none opacity-80" />
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
             <span className="text-6xl font-bold tracking-widest rotate-90 md:rotate-0">{project.id}</span>
          </div>

          <div className="project-content absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col justify-end pointer-events-none opacity-0 translate-y-5">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-[var(--accent)] font-medium uppercase tracking-wider text-sm">{project.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
