"use client";

import { motion } from "framer-motion";

const SKILL_CATEGORIES = [
  {
    title: "Technical & Programming Languages",
    color: "#FFC338", // Warm Gold
    skills: [
      "C Programming",
      "Python",
      "Java",
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "React.js / React",
      "SQL",
      "MySQL"
    ]
  },
  {
    title: "Core Concepts & Engineering",
    color: "#B366FF", // Purple
    skills: [
      "Data Structures",
      "Object-Oriented Programming (OOP)",
      "Database Management Systems (DBMS)",
      "RESTful APIs",
      "Scikit-Learn (Machine Learning)",
      "IoT Integration",
      "Natural Language Processing (NLP)",
      "LSB Steganography",
      "OpenCV (Computer Vision)"
    ]
  },
  {
    title: "Developer & Framework Tools",
    color: "#4D9FFF", // Blue
    skills: [
      "VS Code",
      "Google Cloud",
      "Git & GitHub",
      "Firebase & Firebase Firestore",
      "Vite",
      "Flask",
      "Streamlit",
      "Tailwind CSS",
      "Framer Motion",
      "OpenStreetMap API"
    ]
  },
  {
    title: "Creative & UI/UX Design",
    color: "#FF6B6B", // Coral
    skills: [
      "UI/UX Wireframing",
      "Minimalist Interface Design",
      "Figma",
      "Framer",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Affinity Designer",
      "Digital Illustration",
      "Drawing"
    ]
  },
  {
    title: "Audio Engineering",
    color: "#F4FF38", // Lime
    skills: [
      "FL Studio (DAW)",
      "Sound Design",
      "Digital Audio Synthesis",
      "Music (Ukulele, Keyboard)"
    ]
  },
  {
    title: "Professional & Soft Skills",
    color: "#33FFB8", // Teal
    skills: [
      "Communication",
      "Leadership",
      "Adaptability"
    ]
  }
];

export default function SkillsSection() {
  return (
    <div className="w-full">
      {/* Vertical List Container */}
      <div className="flex flex-col w-full relative">
        {SKILL_CATEGORIES.map((category, idx) => {
          // Join skills with a consistent separator for the marquee text
          const skillsString = category.skills.join("   •   ");
          
          // Calculate a uniform slow speed duration based on length
          const duration = skillsString.length * 0.35;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: "easeOut" }}
              className="group relative w-full h-24 md:h-28 border-b border-white/10 overflow-hidden cursor-pointer flex items-center"
            >
              {/* Hover color fill background */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
                style={{ backgroundColor: category.color }}
              />

              {/* Left and Right Black Gradients (50% opacity fading to transparent) */}
              <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-black/50 to-transparent pointer-events-none z-20" />
              <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-black/50 to-transparent pointer-events-none z-20" />

              {/* Layer 1: Category Title (Visible by default, slides out to the right on hover) */}
              <div 
                className="absolute inset-x-0 w-full h-full flex items-center justify-between px-6 md:px-12 z-10 transition-all duration-750 ease-[cubic-bezier(0.16,1,0.3,1)] transform group-hover:translate-x-[20vw] group-hover:opacity-0 pointer-events-none"
              >
                <h3 className="text-xl md:text-3xl font-medium text-white transition-colors duration-300">
                  {category.title}
                </h3>
                <span className="text-2xl text-white opacity-80 transition-colors duration-300">
                  &rarr;
                </span>
              </div>

              {/* Layer 2: Skills Marquee (Hidden by default, slides in from the left to right on hover) */}
              <div 
                className="absolute inset-0 w-full h-full flex items-center z-10 transition-all duration-750 ease-[cubic-bezier(0.16,1,0.3,1)] transform -translate-x-[20vw] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 pointer-events-none overflow-hidden"
              >
                <div 
                  className="flex whitespace-nowrap w-max animate-marquee-ltr text-2xl md:text-3xl font-bold text-black uppercase tracking-wider"
                  style={{ animationDuration: `${duration}s` }}
                >
                  {/* Repeated blocks to support seamless wide displays */}
                  <span className="px-8">{skillsString} &nbsp; &bull; &nbsp;</span>
                  <span className="px-8">{skillsString} &nbsp; &bull; &nbsp;</span>
                  <span className="px-8">{skillsString} &nbsp; &bull; &nbsp;</span>
                  <span className="px-8">{skillsString} &nbsp; &bull; &nbsp;</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
