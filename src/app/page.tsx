import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WelcomeSequence from "@/components/WelcomeSequence";
import SectionReveal from "@/components/SectionReveal";
import ProjectsAccordion from "@/components/ProjectsAccordion";
import SkillsMarquee from "@/components/SkillsMarquee";
import SmoothScroll from "@/components/SmoothScroll";


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

        <SectionReveal title="Hobby" id="hobby">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Photography', desc: 'Capturing moments through a digital lens.' },
              { title: 'Traveling', desc: 'Exploring diverse cultures and landscapes.' },
              { title: 'Gaming', desc: 'Analyzing mechanics and immersive storytelling.' }
            ].map((hobby) => (
              <div key={hobby.title} className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                <h3 className="text-2xl font-bold mb-4">{hobby.title}</h3>
                <p className="text-gray-400">{hobby.desc}</p>
              </div>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal title="Works" id="works" fullWidth>
          <ProjectsAccordion />
        </SectionReveal>

        <SectionReveal title="About Me" id="about">
          <div className="max-w-3xl">
            <p className="text-xl md:text-2xl leading-relaxed text-gray-300">
              I am a passionate creative developer focused on building immersive digital experiences. 
              With a strong foundation in frontend technologies and a keen eye for design, 
              I strive to bridge the gap between functionality and aesthetics.
            </p>
          </div>
        </SectionReveal>

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
