"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const NAV_ITEMS = [
  { name: "Welcome", href: "#welcome" },
  { name: "Skills", href: "#skills" },
  { name: "Hobby", href: "#hobby" },
  { name: "Works", href: "#works" },
  { name: "About Me", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const isUserClick = useRef(false);

  // Animate the blue pill to the active item
  const movePillTo = useCallback((index: number) => {
    const item = itemRefs.current[index];
    const pill = pillRef.current;
    const nav = navRef.current;
    if (!item || !pill || !nav) return;

    const navRect = nav.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    const targetLeft = itemRect.left - navRect.left;
    const targetWidth = itemRect.width;

    // Fluid / elastic spring animation
    gsap.to(pill, {
      x: targetLeft,
      width: targetWidth,
      opacity: 1,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  }, []);

  // IntersectionObserver to detect active section on scroll
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (isUserClick.current) return; // Skip during manual click scroll

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(handleIntersect, {
        rootMargin: "-40% 0px -55% 0px", // Active when section is roughly centered
        threshold: 0,
      });
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Move the pill whenever activeSection changes
  useEffect(() => {
    if (activeSection === null) return;

    const index = NAV_ITEMS.findIndex(
      (item) => item.href.replace("#", "") === activeSection
    );
    if (index !== -1) {
      movePillTo(index);
    }
  }, [activeSection, movePillTo]);

  // Text slide-in animation on initial mount
  useGSAP(() => {
    // Stagger slide-in for nav item text
    const items = itemRefs.current.filter(Boolean);
    gsap.fromTo(
      items,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.06,
        duration: 0.5,
        ease: "power3.out",
        delay: 0.1,
      }
    );
  }, { scope: navRef });

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    index: number
  ) => {
    e.preventDefault();
    const sectionId = href.replace("#", "");

    // Set user click flag to prevent observer from overriding
    isUserClick.current = true;
    setActiveSection(sectionId);
    movePillTo(index);

    const target = document.querySelector(href);
    if (target) {
      const top = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }

    // Re-enable observer after scroll finishes
    setTimeout(() => {
      isUserClick.current = false;
    }, 1200);
  };

  return (
    <nav
      id="main-nav"
      ref={navRef}
      style={{ opacity: 0, transform: "translateX(-50%) translateY(-40px)" }}
      className="fixed top-6 left-1/2 z-[100] flex items-center gap-1 px-2 py-1.5 bg-black/20 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl"
    >
      {/* Sliding blue pill indicator */}
      <div
        ref={pillRef}
        className="absolute top-1.5 left-0 h-[calc(100%-12px)] rounded-full pointer-events-none z-0"
        style={{
          opacity: 0,
          width: 0,
          background: "var(--accent)",
          filter: "blur(0.5px)",
          boxShadow: "0 0 20px rgba(56, 116, 255, 0.4), 0 0 40px rgba(56, 116, 255, 0.15)",
        }}
      />

      {NAV_ITEMS.map((item, i) => (
        <a
          key={item.name}
          ref={(el) => { itemRefs.current[i] = el; }}
          href={item.href}
          onClick={(e) => scrollToSection(e, item.href, i)}
          className={`relative z-10 nav-capsule px-4 py-2 text-xs md:text-sm font-medium rounded-full whitespace-nowrap transition-colors duration-300 ${
            activeSection === item.href.replace("#", "")
              ? "text-white"
              : "text-white/50 hover:text-white/80"
          }`}
          style={{ opacity: 0 }}
        >
          {item.name}
        </a>
      ))}
    </nav>
  );
}
