import Hero from "@/components/Hero";
import SectionReveal from "@/components/SectionReveal";
import WelcomeSequence from "@/components/WelcomeSequence";
import ProjectsAccordion from "@/components/ProjectsAccordion";
import MagneticButton from "@/components/MagneticButton";
import SkillsMarquee from "@/components/SkillsMarquee";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      
      <div className="w-full flex flex-col items-center relative z-20 bg-black">
        <WelcomeSequence />

        <SectionReveal title="Skills" fullWidth>
          <div className="mt-8 overflow-hidden w-full">
            <SkillsMarquee />
          </div>
        </SectionReveal>

        <SectionReveal title="Projects" fullWidth>
          <ProjectsAccordion />
        </SectionReveal>

        <SectionReveal title="Contact">
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h3 className="text-3xl md:text-5xl font-bold mb-8">Let&apos;s build something extraordinary.</h3>
            <p className="text-gray-400 mb-12 max-w-lg">
              Have a project in mind or just want to chat about creative development? 
              Drop me a message and let&apos;s make it happen.
            </p>
            <MagneticButton className="text-xl px-12 py-6">
              Contact Me
            </MagneticButton>
          </div>
        </SectionReveal>
      </div>

      <footer className="w-full py-8 text-center text-gray-600 text-sm border-t border-gray-900 mt-20">
        <p>&copy; {new Date().getFullYear()} Creative Developer. All rights reserved.</p>
      </footer>
    </main>
  );
}
