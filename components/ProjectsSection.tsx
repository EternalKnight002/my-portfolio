// components/ProjectsSection.tsx
"use client";

import { motion } from "framer-motion";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold">Selected Projects</h2>
        <p className="mt-3 text-gray-600 max-w-2xl">
          Case studies, future ideas, and links to code or live demos.
        </p>

        {/* <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <motion.div
              key={p.slug}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <ProjectCard {...p} />
            </motion.div>
          ))}
        </div> */}
        {/* <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
            {projects.map((p) => (
               <motion.div
                  key={p.slug}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="h-full"
                  >
                  <ProjectCard {...p} />
                </motion.div>
                 ))}
          </div> */}
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
              {projects.map((p) => (
              <motion.div
            key={p.slug}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
           viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="h-full"
              >
              <ProjectCard {...p} />
              </motion.div>
                ))}
            </div>


      </div>
    </section>
  );
}
