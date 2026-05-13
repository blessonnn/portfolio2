"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function WelcomeSequence() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scaleVal = useRef(15);
  const maskOpacity = useRef(0);

  const drawMask = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    if (maskOpacity.current <= 0) return;

    // Blue fill
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = maskOpacity.current;
    ctx.fillStyle = "#3874FF";
    ctx.fillRect(0, 0, w, h);

    // Punch out text
    ctx.globalCompositeOperation = "destination-out";
    ctx.globalAlpha = 1;
    ctx.fillStyle = "black";

    const baseFontSize = (w / dpr) * 0.12;
    const fontSize = baseFontSize * scaleVal.current;
    ctx.font = `900 ${fontSize}px "Helvetica Neue", Helvetica, Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const gap = fontSize * 0.1;
    ctx.fillText("WELCOME", w / 2, h / 2 - gap);
    ctx.fillText("ALL", w / 2, h / 2 + fontSize * 0.9);

    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
  }, []);

  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      drawMask();
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [drawMask]);

  useGSAP(() => {
    if (!triggerRef.current) return;

    ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const p = self.progress;

        // Phase 1 (0→0.15): Mask morphs in
        if (p < 0.15) {
          maskOpacity.current = p / 0.15;
          scaleVal.current = 15;
        }
        // Phase 2 (0.15→0.7): Text zooms from 15→1
        else if (p < 0.7) {
          maskOpacity.current = 1;
          const zp = (p - 0.15) / 0.55;
          const eased = gsap.parseEase("power2.out")(zp);
          scaleVal.current = gsap.utils.interpolate(15, 1, eased);
        }
        // Phase 3 (0.7→0.85): Hold
        else if (p < 0.85) {
          maskOpacity.current = 1;
          scaleVal.current = 1;
        }
        // Phase 4 (0.85→1.0): Mask fades out
        else {
          maskOpacity.current = 1 - (p - 0.85) / 0.15;
          scaleVal.current = 1;
        }

        // Show/hide wrapper
        if (wrapperRef.current) {
          wrapperRef.current.style.opacity = maskOpacity.current > 0 ? "1" : "0";
          wrapperRef.current.style.pointerEvents = maskOpacity.current > 0 ? "none" : "none";
        }

        drawMask();
      },
    });
  }, { scope: triggerRef });

  return (
    <>
      {/* Scroll trigger — provides scroll distance, visually empty */}
      <div ref={triggerRef} id="welcome" className="w-full h-[300vh]" />

      {/* Fixed canvas overlay — never slides, morphs in-place */}
      <div
        ref={wrapperRef}
        className="fixed inset-0 z-20 pointer-events-none"
        style={{ opacity: 0 }}
      >
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </>
  );
}
