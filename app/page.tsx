import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';

const projects = [
  { title: 'Project One', description: 'Short description.', tech: ['React', 'Node'] },
  { title: 'Project Two', description: 'Another project.', tech: ['Next.js', 'Tailwind'] }
];

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="container mx-auto px-6 py-12">
        <section id="projects">
          <h2 className="text-2xl font-semibold">Selected Projects</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {projects.map((p) => (
              <ProjectCard key={p.title} {...p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
