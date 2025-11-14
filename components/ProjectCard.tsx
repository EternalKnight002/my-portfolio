// components/ProjectCard.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";


type Props = {
  slug?: string;
  title: string;
  description: string;
  tech?: string[];
  demo?: string;
  source?: string;
  image: string;
  comingSoon?: boolean;
};

export default function ProjectCard({
  title,
  description,
  tech = [],
  demo,
  source,
  image,
  comingSoon,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`relative h-full flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm hover:shadow-xl transition ${comingSoon ? "opacity-90" : ""
        }`}
    >
      {comingSoon && (
        <div className="absolute top-3 left-3 z-20">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-semibold bg-white/90 rounded-full shadow-sm">
            🚧 Coming Soon
          </span>
        </div>
      )}

      {/* ---- FIXED image wrapper: explicit heights (responsive) ---- */}
      <div className="relative w-full overflow-hidden bg-gray-50 group" style={{ minHeight: 192 }}>
        {/* If you prefer Tailwind classes: use "h-48 md:h-56 lg:h-48" instead of inline style */}
        {isLoading && (
          <div className="absolute inset-0 z-10">
            <div className="h-full w-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          </div>
        )}

        <div
          className={`absolute inset-0 transition-transform duration-500 ${isLoading ? "" : "group-hover:scale-105"
            }`}
        >
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={`object-cover object-center transition-opacity duration-500 z-0 ${isLoading ? "opacity-0" : "opacity-100"
              } ${comingSoon ? "brightness-90" : ""}`}
            onLoad={() => setIsLoading(false)}
            unoptimized
          />
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 justify-between">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="mt-2 text-sm text-gray-600">{description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {tech.map((t) => (
              <span
                key={t}
                className="shimmer-hover relative z-10 text-xs px-2 py-1 bg-gray-100 rounded"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {!comingSoon && (
          <div className="mt-4 flex gap-3">
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noreferrer"
                className="text-sm px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition shimmer-hover"
              >
                Live Demo
              </a>
            )}
            {source && (
              <a
                href={source}
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-4 right-4 p-2 rounded-full border bg-white text-gray-700 shadow-sm hover:bg-gray-100 transition flex items-center justify-center"
                aria-label="GitHub Source Code"
              >
                <FaGithub size={20} />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
