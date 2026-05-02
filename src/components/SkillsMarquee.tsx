'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ROW1 = [
  { name: "Next.js", color: "#FF5733" },
  { name: "TypeScript", color: "#3388FF" },
  { name: "Tailwind CSS", color: "#33FFB8" },
  { name: "GSAP 3", color: "#A833FF" },
  { name: "ScrollTrigger", color: "#FF3366" },
  { name: "Lenis", color: "#33E6FF" },
  { name: "WebGL", color: "#66FF33" },
];

const ROW2 = [
  { name: "Framer Motion", color: "#FFC133" },
  { name: "React", color: "#FF33A8" },
  { name: "Node.js", color: "#33FF57" },
  { name: "GraphQL", color: "#3357FF" },
  { name: "Docker", color: "#FF5733" },
  { name: "AWS", color: "#FF8C33" },
  { name: "MongoDB", color: "#47FF33" },
];

export default function SkillsMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<{name: string, color: string} | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    let xPercent = -50;
    let direction = 1; // 1 = left to right, -1 = right to left
    const baseSpeed = 0.05;
    let currentSpeed = baseSpeed;
    let animationFrameId: number;

    const animate = () => {
      if (xPercent >= 0) {
        xPercent = -50;
      } else if (xPercent <= -50) {
        xPercent = 0;
      }

      if (row1Ref.current) gsap.set(row1Ref.current, { xPercent });
      if (row2Ref.current) gsap.set(row2Ref.current, { xPercent });

      xPercent += currentSpeed * direction;
      
      // Decay speed back to base
      if (currentSpeed > baseSpeed) {
        currentSpeed -= 0.05; // speed decay
      } else {
        currentSpeed = baseSpeed;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        // If scrolling down, direction = 1 (moves right), speed increases
        // If scrolling up, direction = -1 (moves left)
        if (self.direction === 1) {
          direction = 1;
        } else {
          direction = -1;
        }
        
        const mappedSpeed = Math.min(Math.abs(velocity) / 1000, 1);
        currentSpeed = Math.max(mappedSpeed, baseSpeed);
      }
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      trigger.kill();
    };
  }, []);

  const handleHover = (e: React.MouseEvent, skill: { name: string, color: string }) => {
    setHoveredSkill(skill);
  };

  const handleLeave = () => {
    setHoveredSkill(null);
  };


  return (
    <div className="w-full overflow-hidden py-10 relative flex flex-col gap-6" ref={containerRef}>
      <div ref={row1Ref} className="flex gap-6 w-max items-center pr-6">
        {[...ROW1, ...ROW1, ...ROW1, ...ROW1].map((skill, idx) => (
          <div
            key={`${skill.name}-${idx}`}
            onMouseEnter={(e) => handleHover(e, skill)}
            onMouseLeave={handleLeave}
            className={`px-8 py-4 border border-gray-800 rounded-full transition-all duration-300 bg-[#0a0a0a] whitespace-nowrap cursor-pointer hover:bg-[#3874ff] hover:text-black hover:border-[#3874ff] flex-shrink-0 text-xl md:text-2xl font-medium shadow-sm hover:shadow-[0_0_20px_rgba(56,116,255,0.4)] ${hoveredSkill && hoveredSkill.name !== skill.name ? 'text-gray-600' : 'text-gray-300'}`}
          >
            {skill.name}
          </div>
        ))}
      </div>
      <div ref={row2Ref} className="flex gap-6 w-max items-center pr-6 ml-[-5vw]">
        {[...ROW2, ...ROW2, ...ROW2, ...ROW2].map((skill, idx) => (
          <div
            key={`${skill.name}-${idx}`}
            onMouseEnter={(e) => handleHover(e, skill)}
            onMouseLeave={handleLeave}
            className={`px-8 py-4 border border-gray-800 rounded-full transition-all duration-300 bg-[#0a0a0a] whitespace-nowrap cursor-pointer hover:bg-[#3874ff] hover:text-black hover:border-[#3874ff] flex-shrink-0 text-xl md:text-2xl font-medium shadow-sm hover:shadow-[0_0_20px_rgba(56,116,255,0.4)] ${hoveredSkill && hoveredSkill.name !== skill.name ? 'text-gray-600' : 'text-gray-300'}`}
          >
            {skill.name}
          </div>
        ))}
      </div>

    </div>
  );
}
