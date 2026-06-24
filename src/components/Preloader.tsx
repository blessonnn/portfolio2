"use client";

import { useState, useEffect } from "react";
import { TextScramble } from "@/components/core/text-scramble";

export default function Preloader() {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const completeTimeout = setTimeout(() => {
      setIsComplete(true);
    }, 2000);

    return () => {
      clearTimeout(completeTimeout);
    };
  }, []);

  if (isComplete) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <TextScramble
        as="h1"
        className="text-white text-[25px]"
        style={{ fontFamily: "'Martian Mono', monospace" }}
        duration={1.2}
        speed={0.03}
      >
        Blesson Portfolio
      </TextScramble>
    </div>
  );
}

