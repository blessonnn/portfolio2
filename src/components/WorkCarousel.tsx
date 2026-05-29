"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";

/* ──────────────────────────────────────────────
   Project Data
   ────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: "vitalpulse",
    title: "VitalPulse",
    image: "/works/vitalpulse.png",
    github: "https://github.com/blessonnn/Health_IoT_Project",
  },
  {
    id: "lastpage",
    title: "Lastpage",
    image: "/works/lastpage.png",
    github: "https://github.com/blessonnn/lastpage",
  },
  {
    id: "trackie",
    title: "Trackie",
    image: "/works/trackie.png",
    github: "https://github.com/blessonnn/trackie",
  },
  {
    id: "portfolio",
    title: "Portfolio",
    image: "/works/portfolio2.png",
    github: "https://github.com/blessonnn/portfolio2",
  },
];

const TOTAL = PROJECTS.length;

/* ──────────────────────────────────────────────
   Helpers — compute card transform for position
   ────────────────────────────────────────────── */
function getCardStyle(offset: number): React.CSSProperties {
  // offset: 0 = center, -1 = immediate left, +1 = immediate right, etc.
  // We wrap to [-2..+2] (with 4 items, max offset is ±2)
  const absOff = Math.abs(offset);

  const rotateY = offset * 32; // degrees — left cards get positive, right get negative
  const translateX = offset * 280; // px horizontal spread
  const translateZ = -absOff * 180; // push back in Z
  const scale = Math.max(1 - absOff * 0.18, 0.55);
  const opacity = Math.max(1 - absOff * 0.35, 0.15);
  const zIndex = 10 - absOff;

  return {
    transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
    opacity,
    zIndex,
    pointerEvents: offset === 0 ? "auto" : "none",
  } as React.CSSProperties;
}

/* ──────────────────────────────────────────────
   Wrap offset to nearest position in range
   ────────────────────────────────────────────── */
function wrapOffset(index: number, active: number, total: number): number {
  let diff = index - active;
  // Wrap around for infinite loop
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

/* ──────────────────────────────────────────────
   Title transition direction
   ────────────────────────────────────────────── */
type SlideDir = "left" | "right" | "none";

/* ══════════════════════════════════════════════
   Component
   ══════════════════════════════════════════════ */
const WorkCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDir, setSlideDir] = useState<SlideDir>("none");
  const [prevIndex, setPrevIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const TRANSITION_MS = 700; // match CSS duration

  /* ── Navigate ── */
  const navigate = useCallback(
    (direction: "prev" | "next") => {
      if (isTransitioning) return;
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
    [activeIndex, isTransitioning]
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
    <section id="work" className="work-carousel-container">
      {/* ── Background Title ── */}
      <div className="wc-title-layer" aria-hidden="true">
        {/* Exiting title */}
        {isTransitioning && (
          <h2
            key={`exit-${prevIndex}`}
            className={`wc-bg-title ${getTitleExitClass()}`}
          >
            {PROJECTS[prevIndex].title}
          </h2>
        )}
        {/* Active / entering title */}
        <h2
          key={`enter-${activeIndex}`}
          className={`wc-bg-title ${isTransitioning ? getTitleEnterClass() : "wc-title-visible"}`}
        >
          {PROJECTS[activeIndex].title}
        </h2>
      </div>

      {/* ── 3D Carousel Stage ── */}
      <div className="wc-stage">
        <div className="wc-track">
          {PROJECTS.map((project, i) => {
            const offset = wrapOffset(i, activeIndex, TOTAL);
            const style = getCardStyle(offset);

            return (
              <div
                key={project.id}
                className="wc-card"
                style={style}
              >
                <div className="wc-card-inner">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 70vw, 420px"
                    style={{ objectFit: "cover" }}
                    loading="lazy"
                  />
                  <div className="wc-card-shine" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── DETAILS Button (active card only) ── */}
      <div className={`wc-details-wrap ${isTransitioning ? "wc-fade-out" : "wc-fade-in"}`}>
        <a
          href={PROJECTS[activeIndex].github}
          target="_blank"
          rel="noopener noreferrer"
          className="wc-details-btn"
        >
          DETAILS
        </a>
      </div>

      {/* ── Navigation Arrows ── */}
      <div className="wc-nav">
        <button
          className="wc-nav-btn"
          onClick={() => navigate("prev")}
          aria-label="Previous project"
          disabled={isTransitioning}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          className="wc-nav-btn"
          onClick={() => navigate("next")}
          aria-label="Next project"
          disabled={isTransitioning}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      </div>

      {/* ── Scoped Styles ── */}
      <style jsx>{`
        /* ═══════════════════════════════════════════
           ISOLATION WRAPPER
           ═══════════════════════════════════════════ */
        .work-carousel-container {
          all: initial;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 100%;
          min-height: 100vh;
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

        /* ═══════════════════════════════════════════
           BACKGROUND TITLE
           ═══════════════════════════════════════════ */
        .wc-title-layer {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -60%);
          z-index: 1;
          pointer-events: none;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .wc-bg-title {
          font-size: clamp(3.5rem, 12vw, 11rem);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.04em;
          line-height: 1;
          color: rgba(255, 255, 255, 0.06);
          white-space: nowrap;
          position: absolute;
          user-select: none;
          will-change: transform, opacity;
        }

        /* Title states */
        .wc-title-visible {
          opacity: 1;
          transform: translateX(0) scale(1);
        }

        /* ── Enter from right (next) ── */
        .wc-title-enter-from-right {
          animation: wc-slide-in-right 0.7s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        @keyframes wc-slide-in-right {
          0% {
            opacity: 0;
            transform: translateX(120px) scale(0.92);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        /* ── Enter from left (prev) ── */
        .wc-title-enter-from-left {
          animation: wc-slide-in-left 0.7s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        @keyframes wc-slide-in-left {
          0% {
            opacity: 0;
            transform: translateX(-120px) scale(0.92);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        /* ── Exit left (next pressed) ── */
        .wc-title-exit-left {
          animation: wc-slide-out-left 0.7s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        @keyframes wc-slide-out-left {
          0% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateX(-120px) scale(0.92);
          }
        }

        /* ── Exit right (prev pressed) ── */
        .wc-title-exit-right {
          animation: wc-slide-out-right 0.7s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        @keyframes wc-slide-out-right {
          0% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateX(120px) scale(0.92);
          }
        }

        /* ═══════════════════════════════════════════
           3D STAGE
           ═══════════════════════════════════════════ */
        .wc-stage {
          position: relative;
          z-index: 5;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1200px;
          perspective-origin: center center;
        }

        .wc-track {
          position: relative;
          width: 380px;
          height: 260px;
          transform-style: preserve-3d;
        }

        @media (min-width: 640px) {
          .wc-track {
            width: 440px;
            height: 300px;
          }
        }

        @media (min-width: 1024px) {
          .wc-track {
            width: 500px;
            height: 340px;
          }
        }

        /* ═══════════════════════════════════════════
           CARDS
           ═══════════════════════════════════════════ */
        .wc-card {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transition:
            transform 0.7s cubic-bezier(0.25, 1, 0.5, 1),
            opacity 0.7s cubic-bezier(0.25, 1, 0.5, 1);
          will-change: transform, opacity;
        }

        .wc-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 16px;
          overflow: hidden;
          box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.55),
            0 0 0 1px rgba(255, 255, 255, 0.06);
          background: #111;
        }

        .wc-card-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.12) 0%,
            transparent 40%,
            transparent 60%,
            rgba(255, 255, 255, 0.04) 100%
          );
          pointer-events: none;
          z-index: 2;
        }

        /* ═══════════════════════════════════════════
           DETAILS BUTTON
           ═══════════════════════════════════════════ */
        .wc-details-wrap {
          position: relative;
          z-index: 8;
          margin-top: 40px;
          display: flex;
          justify-content: center;
          will-change: opacity, transform;
        }

        .wc-fade-in {
          animation: wc-btn-fade-in 0.5s cubic-bezier(0.25, 1, 0.5, 1) 0.15s both;
        }
        .wc-fade-out {
          opacity: 0;
          transition: opacity 0.15s ease-out;
        }

        @keyframes wc-btn-fade-in {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .wc-details-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 44px;
          border-radius: 999px;
          border: 1.5px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: #ffffff;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition:
            background 0.35s ease,
            border-color 0.35s ease,
            transform 0.35s cubic-bezier(0.25, 1, 0.5, 1),
            box-shadow 0.35s ease;
        }

        .wc-details-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.4);
          transform: scale(1.04);
          box-shadow: 0 8px 30px rgba(255, 255, 255, 0.08);
        }

        .wc-details-btn:active {
          transform: scale(0.97);
        }

        /* ═══════════════════════════════════════════
           NAVIGATION ARROWS
           ═══════════════════════════════════════════ */
        .wc-nav {
          position: relative;
          z-index: 8;
          margin-top: 32px;
          display: flex;
          gap: 16px;
          justify-content: center;
          align-items: center;
        }

        .wc-nav-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.03);
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition:
            background 0.35s ease,
            border-color 0.35s ease,
            color 0.35s ease,
            transform 0.35s cubic-bezier(0.25, 1, 0.5, 1);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .wc-nav-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.35);
          color: #ffffff;
          transform: scale(1.08);
        }

        .wc-nav-btn:active {
          transform: scale(0.93);
        }

        .wc-nav-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .wc-nav-btn svg {
          display: block;
        }

        /* ═══════════════════════════════════════════
           AMBIENT GLOW (subtle atmosphere)
           ═══════════════════════════════════════════ */
        .work-carousel-container::before {
          content: "";
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(56, 116, 255, 0.06) 0%,
            transparent 70%
          );
          top: 50%;
          left: 50%;
          transform: translate(-50%, -55%);
          pointer-events: none;
          z-index: 0;
        }

        /* ═══════════════════════════════════════════
           RESPONSIVE FINE‑TUNE
           ═══════════════════════════════════════════ */
        @media (max-width: 639px) {
          .wc-bg-title {
            font-size: clamp(2.8rem, 16vw, 5rem);
          }
          .wc-details-wrap {
            margin-top: 28px;
          }
          .wc-details-btn {
            padding: 12px 34px;
            font-size: 0.72rem;
          }
          .wc-nav {
            margin-top: 22px;
          }
          .wc-nav-btn {
            width: 44px;
            height: 44px;
          }
        }
      `}</style>
    </section>
  );
};

export default WorkCarousel;
