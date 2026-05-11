"use client";

import { useState, useEffect } from "react";

export default function Preloader() {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const text = "Blesson Portfolio";

  useEffect(() => {
    let i = 0;
    // We want the total animation to be around 2 seconds.
    // Typing 17 characters. Let's do 60ms per character (total ~1s).
    // Then wait 1s before disappearing.
    const typingInterval = setInterval(() => {
      setDisplayedText(text.substring(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(typingInterval);
      }
    }, 60);

    const completeTimeout = setTimeout(() => {
      setIsComplete(true);
    }, 2000);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(completeTimeout);
    };
  }, []);

  if (isComplete) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <h1 
        className="text-white text-[25px]"
        style={{ fontFamily: "'Martian Mono', monospace" }}
      >
        {displayedText}
        <span className="animate-pulse">_</span>
      </h1>
    </div>
  );
}
