import Hero from '../components/Hero'
import SkillsSection from '../components/SkillsSection'
import ProjectsSection from '../components/ProjectsSection'
import ContactSection from '../components/ContactSection'
import { SpeedInsights } from "@vercel/speed-insights/next"
import FutureInterestsSection from '../components/FutureInterestsSection'

export default function Home() {
  return (
    <div>
      <Hero />
      <main id="main">
        <SkillsSection />
        <ProjectsSection />
        <FutureInterestsSection />
        <ContactSection />
      </main>
    </div>
  )
}
