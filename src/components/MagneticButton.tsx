"use client";

import { useRef, ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function MagneticButton({ children, className = "", onClick }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    if (!buttonRef.current) return;
    
    const xTo = gsap.quickTo(buttonRef.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(buttonRef.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = buttonRef.current!.getBoundingClientRect();
      
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      // Calculate distance from center
      const distance = Math.sqrt(x * x + y * y);
      
      // If mouse is within a certain distance, move the button towards it
      if (distance < 100) { // proximity radius
        xTo(x * 0.4); // strength of magnetic pull
        yTo(y * 0.4);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    // Attach listener to window so it detects proximity even when not hovering the button directly
    window.addEventListener("mousemove", handleMouseMove);
    buttonRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (buttonRef.current) {
        buttonRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, { scope: buttonRef });

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-white transition-colors duration-300 bg-[#111] hover:bg-[var(--accent)] border border-[var(--accent)] hover:border-transparent ${className}`}
      style={{ zIndex: 10 }}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
