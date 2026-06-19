"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";

/* ──────────────────────────────────────────────
   Project Data — names derived from image filenames
   ────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: "vitalpulse",
    title: "vitalpulse",
    image: "/works/vitalpulse.png",
    github: "https://github.com/blessonnn/Health_IoT_Project",
  },
  {
    id: "lastpage",
    title: "lastpage",
    image: "/works/lastpage.png",
    github: "https://github.com/blessonnn/lastpage",
  },
  {
    id: "trackie",
    title: "trackie",
    image: "/works/trackie.png",
    github: "https://github.com/blessonnn/trackie",
  },
  {
    id: "portfolio2",
    title: "portfolio2",
    image: "/works/portfolio2.png",
    github: "https://github.com/blessonnn/portfolio2",
  },
];

const TOTAL = PROJECTS.length;

/* ──────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────── */
function wrapOffset(index: number, active: number, total: number): number {
  let diff = index - active;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

/** When collapsed (pre-unfold) all cards stack at center */
function getCollapsedStyle(index: number): React.CSSProperties {
  return {
    transform: `translateX(0px) translateZ(${-index * 8}px) rotateY(0deg) scale(${1 - index * 0.02})`,
    opacity: 1 - index * 0.1,
    zIndex: 10 - index,
    pointerEvents: "none" as const,
  };
}

/** After unfold — full 3D carousel positions */
function getCardStyle(offset: number): React.CSSProperties {
  const absOff = Math.abs(offset);
  const isBackCard = absOff === 2; // For 4-card carousel, offset 2 / -2 represents the card exactly behind the active card

  const rotateY = isBackCard ? 0 : offset * 35;
  const translateX = isBackCard ? 0 : offset * 260;
  const translateZ = isBackCard ? -350 : -absOff * 200;
  const scale = isBackCard ? 0.6 : Math.max(1 - absOff * 0.18, 0.55);
  // Hide the back card (opacity = 0) so it doesn't break the layout symmetry and transitions smoothly
  const opacity = isBackCard ? 0 : Math.max(1 - absOff * 0.4, 0.12);
  const zIndex = 10 - absOff;

  return {
    transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
    opacity,
    zIndex,
    pointerEvents: offset === 0 ? ("auto" as const) : ("none" as const),
  };
}

type SlideDir = "left" | "right" | "none";

/* ══════════════════════════════════════════════
   Component
   ══════════════════════════════════════════════ */
const WorkCarousel: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [hasUnfolded, setHasUnfolded] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDir, setSlideDir] = useState<SlideDir>("none");
  const [prevIndex, setPrevIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const TRANSITION_MS = 700;

  /* ── Intersection Observer — detect viewport entry ── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          // Delay unfold so the stacked state is visible first
          setTimeout(() => setHasUnfolded(true), 600);
          observer.unobserve(el);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* ── Navigate ── */
  const navigate = useCallback(
    (direction: "prev" | "next") => {
      if (isTransitioning || !hasUnfolded) return;
      setIsTransitioning(true);
      setPrevIndex(activeIndex);
      setSlideDir(direction === "next" ? "left" : "right");

      const next =
        direction === "next"
          ? (activeIndex + 1) % TOTAL
          : (activeIndex - 1 + TOTAL) % TOTAL;

      setActiveIndex(next);

      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
        setSlideDir("none");
      }, TRANSITION_MS);
    },
    [activeIndex, isTransitioning, hasUnfolded]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  /* ── Keyboard nav ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") navigate("prev");
      if (e.key === "ArrowRight") navigate("next");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate]);

  /* ── Title animation classes ── */
  const getTitleExitClass = () => {
    if (slideDir === "left") return "wc-title-exit-left";
    if (slideDir === "right") return "wc-title-exit-right";
    return "";
  };
  const getTitleEnterClass = () => {
    if (slideDir === "left") return "wc-title-enter-from-right";
    if (slideDir === "right") return "wc-title-enter-from-left";
    return "";
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="work-carousel-container"
    >
      {/* ── "WORKS" Section Heading ── */}
      <h2 className={`wc-section-heading ${inView ? "wc-heading-visible" : ""}`}>
        {"WORKS".split("").map((char, i) => (
          <span
            key={i}
            className="wc-heading-char"
            style={{ transitionDelay: `${i * 0.07 + 0.1}s` }}
          >
            {char}
          </span>
        ))}
      </h2>

      {/* ── Background Title (large, behind carousel) ── */}
      <div className="wc-title-layer" aria-hidden="true">
        {isTransitioning && (
          <span
            key={`exit-${prevIndex}`}
            className={`wc-bg-title ${getTitleExitClass()}`}
          >
            {PROJECTS[prevIndex].title}
          </span>
        )}
        <span
          key={`enter-${activeIndex}`}
          className={`wc-bg-title ${isTransitioning ? getTitleEnterClass() : "wc-title-visible"}`}
        >
          {PROJECTS[activeIndex].title}
        </span>
      </div>

      {/* ── 3D Carousel Stage ── */}
      <div className={`wc-stage ${inView ? "wc-stage-entered" : ""}`}>
        <div className="wc-track">
          {PROJECTS.map((project, i) => {
            const offset = wrapOffset(i, activeIndex, TOTAL);

            // Before unfold: all stacked at center. After: full 3D spread.
            const style = hasUnfolded
              ? getCardStyle(offset)
              : getCollapsedStyle(i);

            const isActive = offset === 0 && hasUnfolded;

            return (
              <div
                key={project.id}
                className={`wc-card ${hasUnfolded ? "wc-card-unfolded" : "wc-card-collapsed"}`}
                style={style}
              >
                {/* Card image — 3:4 ratio container */}
                <div className="wc-card-inner">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 60vw, 320px"
                    style={{ objectFit: "cover" }}
                    loading="lazy"
                  />
                  <div className="wc-card-shine" />
                  <div className="wc-card-bottom-blur" />

                  {/* Name + DETAILS overlay — centered on image */}
                  <div className={`wc-card-info ${isActive && !isTransitioning ? "wc-info-visible" : ""}`}>
                    <h3 className="wc-project-name">{project.title}</h3>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="wc-details-btn"
                    >
                      <span className="wc-btn-text">Details</span>
                      <svg
                        className="wc-btn-icon"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 18L15 12L9 6"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Navigation Arrows ── */}
      <div className={`wc-nav ${hasUnfolded ? "wc-nav-visible" : ""}`}>
        <button
          className="wc-nav-btn"
          onClick={() => navigate("prev")}
          aria-label="Previous project"
          disabled={isTransitioning || !hasUnfolded}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          className="wc-nav-btn"
          onClick={() => navigate("next")}
          aria-label="Next project"
          disabled={isTransitioning || !hasUnfolded}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      </div>

      {/* ══════════════════════════════════════════════
          Scoped Styles
          ══════════════════════════════════════════════ */}
      <style jsx>{`
        /* ─── ISOLATION WRAPPER ─── */
        .work-carousel-container {
          all: initial;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 100%;
          min-height: 100vh;
          padding: 80px 20px 60px;
          background: #0a0a0a;
          overflow: hidden;
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          color: #ffffff;
          box-sizing: border-box;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        .work-carousel-container *,
        .work-carousel-container *::before,
        .work-carousel-container *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        /* ─── "WORKS" HEADING ─── */
        .wc-section-heading {
          position: relative;
          z-index: 2;
          display: flex;
          overflow: hidden;
          font-size: clamp(3rem, 10vw, 8rem);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1;
          color: #ffffff;
          margin-bottom: 50px;
          text-transform: uppercase;
          user-select: none;
        }

        .wc-heading-char {
          display: inline-block;
          transform: translateY(120%);
          opacity: 0;
          transition:
            transform 0.9s cubic-bezier(0.25, 1, 0.5, 1),
            opacity 0.9s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .wc-heading-visible .wc-heading-char {
          transform: translateY(0);
          opacity: 1;
        }

        /* ─── BACKGROUND TITLE (behind carousel) ─── */
        .wc-title-layer {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -55%);
          z-index: 1;
          pointer-events: none;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .wc-bg-title {
          font-size: clamp(4rem, 14vw, 14rem);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.04em;
          line-height: 1;
          color: rgba(255, 255, 255, 0.04);
          white-space: nowrap;
          position: absolute;
          user-select: none;
          will-change: transform, opacity;
        }

        .wc-title-visible {
          opacity: 1;
          transform: translateX(0) scale(1);
        }

        .wc-title-enter-from-right {
          animation: wc-slide-in-right 0.7s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        @keyframes wc-slide-in-right {
          0%   { opacity: 0; transform: translateX(100px) scale(0.94); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }

        .wc-title-enter-from-left {
          animation: wc-slide-in-left 0.7s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        @keyframes wc-slide-in-left {
          0%   { opacity: 0; transform: translateX(-100px) scale(0.94); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }

        .wc-title-exit-left {
          animation: wc-slide-out-left 0.7s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        @keyframes wc-slide-out-left {
          0%   { opacity: 1; transform: translateX(0) scale(1); }
          100% { opacity: 0; transform: translateX(-100px) scale(0.94); }
        }

        .wc-title-exit-right {
          animation: wc-slide-out-right 0.7s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        @keyframes wc-slide-out-right {
          0%   { opacity: 1; transform: translateX(0) scale(1); }
          100% { opacity: 0; transform: translateX(100px) scale(0.94); }
        }

        /* ─── 3D STAGE ─── */
        .wc-stage {
          position: relative;
          z-index: 5;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1400px;
          perspective-origin: center center;
          /* Entry: slide up + fade in */
          opacity: 0;
          transform: translateY(60px);
          transition:
            opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1) 0.2s,
            transform 0.8s cubic-bezier(0.25, 1, 0.5, 1) 0.2s;
        }

        .wc-stage-entered {
          opacity: 1;
          transform: translateY(0);
        }

        /* Track — sized for 3:4 ratio cards */
        .wc-track {
          position: relative;
          width: 240px;
          height: 320px;
          transform-style: preserve-3d;
        }
        @media (min-width: 640px) {
          .wc-track {
            width: 300px;
            height: 400px;
          }
        }
        @media (min-width: 1024px) {
          .wc-track {
            width: 340px;
            height: 454px;
          }
        }

        /* ─── CARDS ─── */
        .wc-card {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          will-change: transform, opacity;
        }

        .wc-card-collapsed {
          transition:
            transform 0.6s cubic-bezier(0.25, 1, 0.5, 1),
            opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .wc-card-unfolded {
          transition:
            transform 0.8s cubic-bezier(0.22, 1, 0.36, 1),
            opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* 3:4 ratio image container */
        .wc-card-inner {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          border-radius: 14px;
          overflow: hidden;
          box-shadow:
            0 24px 64px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(255, 255, 255, 0.05);
          background: #111;
          flex-shrink: 0;
        }

        .wc-card-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1) 0%,
            transparent 45%,
            transparent 55%,
            rgba(255, 255, 255, 0.03) 100%
          );
          pointer-events: none;
          z-index: 2;
        }

        .wc-card-bottom-blur {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 40%;
          pointer-events: none;
          z-index: 3;
          background: transparent;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          mask-image: linear-gradient(to top, black 0%, transparent 100%);
          -webkit-mask-image: linear-gradient(to top, black 0%, transparent 100%);
        }

        /* ─── PROJECT NAME + DETAILS (centered overlay on image) ─── */
        .wc-card-info {
          position: absolute;
          inset: 0;
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px; /* Reduced gap between project title and details */
          opacity: 0;
          transform: scale(0.94);
          transition:
            opacity 0.5s cubic-bezier(0.25, 1, 0.5, 1),
            transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
          pointer-events: none;
        }

        .wc-info-visible {
          opacity: 1;
          transform: scale(1);
          pointer-events: auto;
        }

        /* Project name — large, heavy */
        .wc-project-name {
          font-size: clamp(1.6rem, 4vw, 2.6rem);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.02em; /* Tight letter spacing for bold titles */
          color: #000000;
          line-height: 1.1;
          text-align: center;
          user-select: none;
          /* Removed text-shadow for a clean flat design */
        }

        /* Details button — Apple-inspired text link style with pop up and fade in reveal */
        .wc-details-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 0; /* Clear vertical touch area, no block background padding */
          border: none;
          background: transparent;
          color: #000000; /* Keep the link text black */
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          font-size: 0.95rem; /* Clean text link readability */
          font-weight: 500;
          line-height: 1.2;
          letter-spacing: -0.03em; /* Tight letter spacing */
          text-transform: none;
          text-decoration: none;
          cursor: pointer;
          
          /* Initial state for revealing animation */
          opacity: 0;
          transform: translateY(16px);
          
          /* Transition for entrance reveal and hover */
          transition:
            opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
            color 0.2s ease;
        }

        /* Reveal animation triggered when parent is visible */
        .wc-info-visible .wc-details-btn {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.15s; /* Smooth pop up stagger delay */
        }

        .wc-btn-icon {
          display: inline-block;
          margin-left: 2px;
          opacity: 0.8;
          color: #000000;
          transition: transform 0.25s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.2s ease;
        }

        .wc-details-btn:hover {
          color: #000000;
          opacity: 1;
        }

        .wc-details-btn:hover .wc-btn-icon {
          opacity: 1;
          transform: translateX(4px); /* Apple-style clean slide chevron on hover */
        }

        .wc-details-btn:active {
          opacity: 0.6;
        }

        /* ─── NAVIGATION ARROWS ─── */
        .wc-nav {
          position: relative;
          z-index: 8;
          margin-top: 72px; /* Added gap between carousel and navigation buttons */
          display: flex;
          gap: 14px;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transform: translateY(16px);
          transition:
            opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1),
            transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .wc-nav-visible {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.3s;
        }

        .wc-nav-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.13);
          background: rgba(255, 255, 255, 0.02);
          color: rgba(255, 255, 255, 0.55);
          cursor: pointer;
          transition:
            background 0.35s ease,
            border-color 0.35s ease,
            color 0.35s ease,
            transform 0.35s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .wc-nav-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.3);
          color: #ffffff;
          transform: scale(1.1);
        }

        .wc-nav-btn:active {
          transform: scale(0.92);
        }

        .wc-nav-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .wc-nav-btn svg {
          display: block;
        }

        /* ─── AMBIENT GLOW ─── */
        .work-carousel-container::before {
          content: "";
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.025) 0%,
            transparent 70%
          );
          top: 55%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 0;
        }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 639px) {
          .work-carousel-container {
            padding: 60px 16px 40px;
          }
          .wc-section-heading {
            font-size: clamp(2.4rem, 14vw, 4rem);
            margin-bottom: 36px;
          }
          .wc-bg-title {
            font-size: clamp(3rem, 18vw, 5.5rem);
          }
          .wc-card-info {
            gap: 2px;
          }
          .wc-project-name {
            font-size: 1.1rem;
          }
          .wc-details-btn {
            padding: 6px 0;
            font-size: 0.85rem;
          }
          .wc-nav {
            margin-top: 48px; /* Increased gap on mobile */
          }
          .wc-nav-btn {
            width: 42px;
            height: 42px;
          }
        }
      `}</style>
    </section>
  );
};

export default WorkCarousel;
