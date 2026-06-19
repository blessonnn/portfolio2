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
    ["--card-offset" as any]: index,
    ["--abs-offset" as any]: Math.abs(index),
    opacity: 0,
    zIndex: 1,
    pointerEvents: "none" as const,
  };
}

/** After unfold — 2D carousel positions */
function getCardStyle(offset: number, isWrapping: boolean): React.CSSProperties {
  const absOff = Math.abs(offset);
  const isBackCard = absOff === 2; // Hide the card exactly behind the active card in a 4-card set

  return {
    ["--card-offset" as any]: offset,
    ["--abs-offset" as any]: absOff,
    opacity: isBackCard ? 0 : 1,
    zIndex: offset === 0 ? 10 : 5,
    pointerEvents: offset === 0 ? ("auto" as const) : ("none" as const),
    transition: isWrapping ? "none" : undefined,
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
      {/* ── Background Vertical Grid Lines ── */}
      <div className="wc-grid-lines" aria-hidden="true">
        <div className="wc-grid-line" />
        <div className="wc-grid-line" />
        <div className="wc-grid-line" />
        <div className="wc-grid-line" />
        <div className="wc-grid-line" />
      </div>

      {/* ── Background Horizontal Grid Lines ── */}
      <div className="wc-horizontal-lines" aria-hidden="true">
        <div className="wc-horizontal-line" />
        <div className="wc-horizontal-line" />
        <div className="wc-horizontal-line" />
      </div>

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

      {/* ── Carousel Stage ── */}
      <div className={`wc-stage ${inView ? "wc-stage-entered" : ""}`}>
        <div className="wc-track">
          {PROJECTS.map((project, i) => {
            const offset = wrapOffset(i, activeIndex, TOTAL);
            const prevOffset = wrapOffset(i, prevIndex, TOTAL);
            const isWrapping = isTransitioning && Math.abs(offset - prevOffset) > 1;

            const style = hasUnfolded
              ? getCardStyle(offset, isWrapping)
              : getCollapsedStyle(i);

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
                </div>

                {/* Info below the card */}
                <div className="wc-card-info-below">
                  <h3 className="wc-project-name-below">{project.title}</h3>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wc-details-btn-below"
                  >
                    <span className="wc-btn-text-below">Details</span>
                    <svg
                      className="wc-btn-icon-below"
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
            );
          })}
        </div>

        {/* ── Navigation Arrows (Overlaying the sides of the stage) ── */}
        <div className={`wc-nav ${hasUnfolded ? "wc-nav-visible" : ""}`}>
          <button
            className="wc-nav-btn"
            onClick={() => navigate("prev")}
            aria-label="Previous project"
            disabled={isTransitioning || !hasUnfolded}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            className="wc-nav-btn"
            onClick={() => navigate("next")}
            aria-label="Next project"
            disabled={isTransitioning || !hasUnfolded}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>
        </div>
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
          background: #0a0a0a; /* Black background */
          overflow: hidden;
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          color: #ffffff; /* White text */
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

        /* ─── BACKGROUND VERTICAL GRID LINES ─── */
        .wc-grid-lines {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          display: flex;
          justify-content: space-between;
          pointer-events: none;
          padding: 0 8%;
        }

        .wc-grid-line {
          width: 1px;
          height: 100%;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(255, 255, 255, 0.06) 15%,
            rgba(255, 255, 255, 0.06) 85%,
            transparent
          );
        }

        /* ─── BACKGROUND HORIZONTAL GRID LINES ─── */
        .wc-horizontal-lines {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          pointer-events: none;
          padding: 12% 0;
        }

        .wc-horizontal-line {
          width: 100%;
          height: 1px;
          background: linear-gradient(
            to right,
            transparent,
            rgba(255, 255, 255, 0.06) 15%,
            rgba(255, 255, 255, 0.06) 85%,
            transparent
          );
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
          color: #ffffff; /* White heading */
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

        /* ─── BACKGROUND TITLE ─── */
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
          color: rgba(255, 255, 255, 0.04); /* Light grey title in background */
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

        /* ─── CAROUSEL STAGE ─── */
        .wc-stage {
          position: relative;
          z-index: 5;
          width: 100%;
          max-width: 1300px;
          display: flex;
          align-items: center;
          justify-content: center;
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

        /* Track — sized for 3:4 ratio cards + labels below */
        .wc-track {
          position: relative;
          width: 240px;
          height: 380px;
        }
        @media (min-width: 640px) {
          .wc-track {
            width: 300px;
            height: 460px;
          }
        }
        @media (min-width: 1024px) {
          .wc-track {
            width: 340px;
            height: 530px;
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

          /* Responsive translation based on CSS variables calculated in getCardStyle */
          transform: translateX(calc(var(--card-offset) * 260px)) scale(calc(1 - var(--abs-offset) * 0.08));
          opacity: calc(1 - var(--abs-offset) * 0.35);
          transition:
            transform 0.8s cubic-bezier(0.25, 1, 0.5, 1),
            opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1);
        }

        @media (min-width: 640px) {
          .wc-card {
            transform: translateX(calc(var(--card-offset) * 320px)) scale(calc(1 - var(--abs-offset) * 0.08));
          }
        }

        @media (min-width: 1024px) {
          .wc-card {
            transform: translateX(calc(var(--card-offset) * 380px)) scale(calc(1 - var(--abs-offset) * 0.08));
          }
        }

        .wc-card-collapsed {
          opacity: 0;
          transform: translateX(0px) scale(0.9);
        }

        /* 3:4 ratio image container */
        .wc-card-inner {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          border-radius: 20px; /* Rounded corners like the wireframe */
          overflow: hidden;
          box-shadow:
            0 24px 64px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(255, 255, 255, 0.08); /* Thin border outline */
          background: #111;
          flex-shrink: 0;
          transition:
            transform 0.4s cubic-bezier(0.25, 1, 0.5, 1),
            box-shadow 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }

        /* Image hover translate/zoom effect */
        .wc-card:hover .wc-card-inner {
          transform: translateY(-12px);
          box-shadow:
            0 32px 80px rgba(0, 0, 0, 0.8),
            0 0 0 1.5px rgba(255, 255, 255, 0.15);
        }

        .wc-card-inner :global(img) {
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1) !important;
        }

        .wc-card:hover .wc-card-inner :global(img) {
          transform: scale(1.05);
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

        /* Pure progressive blur on bottom edge of image */
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

        /* ─── INFO BLOCK BELOW CARD ─── */
        .wc-card-info-below {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          text-align: center;
          width: 100%;
        }

        /* Project name — bold, white */
        .wc-project-name-below {
          font-size: clamp(1.2rem, 3vw, 1.8rem);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          color: #ffffff; /* White text */
          line-height: 1.2;
          user-select: none;
        }

        /* Details button — blue action link */
        .wc-details-btn-below {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          color: #3874ff;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .wc-details-btn-below:hover {
          transform: translateY(-1px);
          opacity: 0.8;
        }

        .wc-btn-icon-below {
          display: inline-block;
          transition: transform 0.25s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .wc-details-btn-below:hover .wc-btn-icon-below {
          transform: translateX(4px);
        }

        .wc-details-btn-below:active {
          opacity: 0.6;
        }

        /* ─── NAVIGATION ARROWS ─── */
        .wc-nav {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
          z-index: 20;
          display: flex;
          justify-content: space-between;
          padding: 0 4%;
          pointer-events: none;
          width: 100%;
          opacity: 0;
          transition: opacity 0.6s ease;
        }

        .wc-nav-visible {
          opacity: 1;
          transition-delay: 0.3s;
        }

        .wc-nav-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.15); /* Circular button with border */
          background: rgba(255, 255, 255, 0.05); /* Transparent black bg */
          color: #ffffff; /* White icon */
          cursor: pointer;
          pointer-events: auto;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
          transition:
            background 0.35s ease,
            border-color 0.35s ease,
            transform 0.35s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .wc-nav-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.35);
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
            rgba(255, 255, 255, 0.02) 0%,
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
          .wc-nav {
            padding: 0 2%;
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
