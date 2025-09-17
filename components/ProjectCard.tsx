import React from "react";

type Props = {
  title: string;
  description: string;
  tech?: string[];
  href?: string;
};

export default function ProjectCard({ title, description, tech = [], href = "#" }: Props) {
  return (
    <a href={href} className="block p-6 border rounded-lg hover:shadow-md transition">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tech.map((t) => (
          <span key={t} className="text-xs px-2 py-1 bg-gray-100 rounded">{t}</span>
        ))}
      </div>
    </a>
  );
}
