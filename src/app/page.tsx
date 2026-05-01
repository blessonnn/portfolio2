import Hero from "@/components/Hero";
import SectionReveal from "@/components/SectionReveal";
import WelcomeSequence from "@/components/WelcomeSequence";
import ProjectsAccordion from "@/components/ProjectsAccordion";
import MagneticButton from "@/components/MagneticButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      
      <div className="w-full flex flex-col items-center relative z-20 bg-black">
        <WelcomeSequence />

        <SectionReveal title="Skills">
          <div className="flex flex-wrap gap-4 mt-8">
            {["Next.js (App Router)", "TypeScript", "Tailwind CSS", "GSAP 3", "ScrollTrigger", "Lenis", "WebGL", "Framer Motion"].map((skill) => (
              <span key={skill} className="px-6 py-3 border border-gray-800 rounded-full text-gray-300 hover:border-[var(--accent)] hover:text-white transition-colors duration-300 bg-[#0a0a0a]">
                {skill}
              </span>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal title="Projects">
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
