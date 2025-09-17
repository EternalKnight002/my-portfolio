// components/ProjectsSection.tsx
'use client'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import Image from 'next/image'

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold">Selected Projects</h2>
        <p className="mt-3 text-gray-600 max-w-2xl">Case studies & links to code or live demos.</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {projects.map((p) => (
            <motion.a
              key={p.slug}
              href={p.href ?? '#'}
              target="_blank"
              rel="noreferrer"
              initial={{ y: 8, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="block p-6 bg-white border rounded-lg hover:shadow-md transition"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <div className="text-sm text-gray-500">{p.tech.join(' • ')}</div>
              </div>
              <p className="mt-3 text-gray-600 text-sm">{p.description}</p>
              <div className="mt-4 flex gap-2 flex-wrap">
                {p.tech.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 bg-gray-100 rounded">{t}</span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
