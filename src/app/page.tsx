import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WelcomeSequence from "@/components/WelcomeSequence";
import SectionReveal from "@/components/SectionReveal";
import WorksStacked from "@/components/WorksStacked";
import SkillsMarquee from "@/components/SkillsMarquee";
import SmoothScroll from "@/components/SmoothScroll";
import HobbiesSection from "@/components/HobbiesSection";
import AboutMeSection from "@/components/AboutMeSection";
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
        
        <WelcomeSequence />

        <SectionReveal title="Skills" id="skills">
          <SkillsMarquee />
        </SectionReveal>

        <HobbiesSection />

        <WorksStacked />

        <AboutMeSection />

        <SectionReveal title="Contact" id="contact">
          <div className="flex flex-col gap-6">
            <p className="text-2xl md:text-4xl font-medium">Let's build something amazing together.</p>
            <a href="mailto:hello@example.com" className="text-xl md:text-2xl text-[var(--accent)] hover:underline">
              hello@example.com
            </a>
          </div>
        </SectionReveal>

        <footer className="w-full py-12 text-center text-gray-600 text-sm border-t border-white/5 mt-20">
          <p>&copy; {new Date().getFullYear()} BLESSON JF. All rights reserved.</p>
        </footer>
      </SmoothScroll>
    </main>
  );
}
