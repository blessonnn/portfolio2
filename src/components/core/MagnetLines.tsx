"use client";

import React, { useRef, useEffect } from "react";
import "./MagnetLines.css";

interface MagnetLinesProps {
  rows?: number;
  columns?: number;
  containerSize?: string;
  lineColor?: string;
  lineWidth?: string;
  lineHeight?: string;
  baseAngle?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function MagnetLines({
  rows = 9,
  columns = 9,
  containerSize = "80vmin",
  lineColor = "#efefef",
  lineWidth = "1vmin",
  lineHeight = "6vmin",
  baseAngle = -10,
  className = "",
  style = {},
}: MagnetLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll("span");
    if (!items.length) return;

    // Cache coordinates to prevent layout thrashing (forced reflow) on pointermove
    let cachedCenters: { x: number; y: number }[] = [];

    const updateCenters = () => {
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      cachedCenters = Array.from(items).map((item) => {
        const rect = item.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2 + scrollX,
          y: rect.top + rect.height / 2 + scrollY,
        };
      });
    };

    // Initialize centers
    updateCenters();

    // Re-calculate centers on window resize to ensure correct alignment
    window.addEventListener("resize", updateCenters);

    const updatePositions = (x: number, y: number) => {
      items.forEach((item, index) => {
        const center = cachedCenters[index];
        if (!center) return;

        const b = x - center.x;
        const a = y - center.y;
        const c = Math.sqrt(a * a + b * b) || 1;
        const r = ((Math.acos(b / c) * 180) / Math.PI) * (y > center.y ? 1 : -1);

        item.style.setProperty("--rotate", `${r}deg`);
      });
    };

    const onPointerMove = (e: PointerEvent) => {
      // Use page coordinates to match document-relative cached centers
      updatePositions(e.clientX + window.scrollX, e.clientY + window.scrollY);
    };

    window.addEventListener("pointermove", onPointerMove);

    // Initial position logic (pointing at middle element center)
    const middleIndex = Math.floor(items.length / 2);
    const middleCenter = cachedCenters[middleIndex];
    if (middleCenter) {
      updatePositions(middleCenter.x, middleCenter.y);
    }

    return () => {
      window.removeEventListener("resize", updateCenters);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [rows, columns]);

  const total = rows * columns;
  const spans = Array.from({ length: total }, (_, i) => (
    <span
      key={i}
      style={{
        "--rotate": `${baseAngle}deg`,
        backgroundColor: lineColor,
        width: lineWidth,
        height: lineHeight,
      } as React.CSSProperties}
    />
  ));

  return (
    <div
      ref={containerRef}
      className={`magnetLines-container ${className}`}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: containerSize,
        height: containerSize,
        ...style,
      }}
    >
      {spans}
    </div>
  );
}
