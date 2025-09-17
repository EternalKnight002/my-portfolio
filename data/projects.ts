export type Project = {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  href?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    slug: 'project-one',
    title: 'Project One',
    description: 'A short one-liner describing the goal and impact.',
    tech: ['Next.js', 'TypeScript', 'Postgres'],
    href: 'https://github.com/your/repo',
    demo: '#'
  },
  {
    slug: 'project-two',
    title: 'Project Two',
    description: 'Another project showing system design and results.',
    tech: ['React', 'Node', 'Docker'],
    href: 'https://github.com/your/repo2',
    demo: '#'
  }
];