// components/ExploringSection.tsx
'use client'
import { motion } from 'framer-motion'

export default function ExploringSection() {
  const list = [
    'Learning advanced Kubernetes patterns',
    'Exploring Rust for backend services',
    'Diving into edge computing & serverless patterns',
    'Reading about distributed tracing and observability'
  ]

  return (
    <section id="exploring" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold">What I will be Exploring Next</h2>
        <p className="mt-3 text-gray-600 max-w-2xl">Short experiments and learning focus.</p>

        <div className="mt-8 grid gap-4">
          {list.map((item, i) => (
            <motion.div
              key={item}
              initial={{ x: -8, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="p-4 border rounded-md"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
