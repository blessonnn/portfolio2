"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PillNav from "./core/PillNav";

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  { label: "Welcome", href: "#welcome" },
  { label: "Skills", href: "#skills" },
  { label: "Hobby", href: "#hobby" },
  { label: "Works", href: "#works" },
  { label: "About Me", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const isUserClick = useRef(false);

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

  // Show/Hide on scroll using GSAP ScrollTrigger
  useGSAP(() => {
    const showNav = gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, paused: true, duration: 0.3, ease: "power2.out" }
    );

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        // Only show after scrolling past the first section (e.g. > window height)
        if (self.scroll() > window.innerHeight * 0.8) {
          if (self.direction === -1) {
            showNav.play(); // Show on scroll up
          } else {
            showNav.reverse(); // Hide on scroll down
          }
        } else {
          showNav.reverse(); // Hidden in Hero section
        }
      },
    });
  }, { scope: navRef });

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const sectionId = href.replace("#", "");

    // Set user click flag to prevent observer from overriding
    isUserClick.current = true;
    setActiveSection(sectionId);

    const target = document.querySelector(href);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY;
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
    <div
      id="navbar-container"
      ref={navRef}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[100]"
      style={{ opacity: 0, transform: "translateY(-100px)" }}
    >
      <PillNav
        items={NAV_ITEMS}
        activeHref={activeSection ? `#${activeSection}` : undefined}
        onItemClick={(e, href) => scrollToSection(e, href)}
        baseColor="#3874FF"
        pillColor="rgba(255, 255, 255, 0.08)"
        pillTextColor="#ffffff"
        hoveredPillTextColor="#ffffff"
        initialLoadAnimation={false}
      />
    </div>
  );
}
