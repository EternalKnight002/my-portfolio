// components/SkillsSection.tsx
'use client'
import { motion } from 'framer-motion'
import { skills, techStack } from '../data/skills'

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold">Skills & Tech Stack</h2>
        <p className="mt-3 text-gray-600 max-w-2xl">
          Core skills I use daily and technologies I work with.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-medium">Skills</h3>
            <div className="mt-4 grid gap-3">
              {skills.map((s) => (
                <motion.div
                  key={s.name}
                  initial={{ y: 8, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-between p-4 border rounded-md"
                >
                  <div className="font-medium">{s.name}</div>
                  <div className="text-sm text-gray-500">{s.level}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-medium">Tech Stack</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {techStack.map((t) => (
                <motion.span
                  key={t}
                  initial={{ scale: 0.98, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  className="px-3 py-1 rounded-full bg-gray-100 text-sm"
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
