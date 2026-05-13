import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

import SectionReveal from "@/components/SectionReveal";
import WorksStacked from "@/components/WorksStacked";
import SkillsMarquee from "@/components/SkillsMarquee";
import SmoothScroll from "@/components/SmoothScroll";
import HobbiesSection from "@/components/HobbiesSection";
import AboutMeSection from "@/components/AboutMeSection";
import ContactSection from "@/components/ContactSection";
export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">

      {/* Top gradient blur overlay — fixed, covers top ~10% of viewport */}
      <div
        className="fixed top-0 left-0 w-full z-[99] pointer-events-none"
        style={{
          height: "10vh",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          maskImage: "linear-gradient(to bottom, black 0%, black 30%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 30%, transparent 100%)",
        }}
      />

      <SmoothScroll>
        <Navbar />
        <Hero />

        <SectionReveal title="Skills" id="skills">
          <SkillsMarquee />
        </SectionReveal>

        <HobbiesSection />

        <WorksStacked />

        <AboutMeSection />

        <ContactSection />
      </SmoothScroll>
    </main>
  );
}
