import Hero from '../components/Hero'
import SkillsSection from '../components/SkillsSection'
import ProjectsSection from '../components/ProjectsSection'
import ExploringSection from '../components/ExploringSection'
import ContactSection from '../components/ContactSection'
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Home() {
  return (
    <div>
      <Hero />
      <main id="main">
        <SkillsSection />
        <ProjectsSection />
        <ExploringSection />
        <ContactSection />
      </main>
    </div>
  )
}
