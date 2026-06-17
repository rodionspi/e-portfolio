import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Education } from "@/components/sections/education"
import { Skills } from "@/components/sections/skills"
import { Languages } from "@/components/sections/languages"
import { Projects } from "@/components/sections/projects"
import { GithubStats } from "@/components/sections/github-stats"
import { Achievements } from "@/components/sections/achievements"
import { SoftSkills } from "@/components/sections/soft-skills"
import { References } from "@/components/sections/references"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"
import { ProtectedFiles } from "@/components/sections/protected-files"

export default function Page() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Languages />
        <Projects />
        <GithubStats />
        <Achievements />
        <SoftSkills />
        <References />
        <Contact />
        <ProtectedFiles />
      </main>
      <Footer />
    </div>
  )
}
