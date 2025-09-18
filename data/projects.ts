// data/projects.ts

export type Project = {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  href?: string;
  demo?: string;
  source?: string;
  image: string;
  comingSoon?: boolean;
};

export const projects: Project[] = [
  {
    slug: "log-analytics",
    title: "Real-Time Log Analytics Platform",
    description:
      "A lightweight, cloud-native alternative to Datadog/ELK. Collect, process, and visualize logs in real time.",
    tech: ["Go", "AWS Kinesis", "Lambda", "DynamoDB", "React"],
    image: "/projects/log-analytics.png",
    comingSoon: true,
  },
  {
    slug: "api-gateway",
    title: "High-Performance API Gateway",
    description:
      "A mini Kong/AWS API Gateway clone with routing, authentication, rate limiting, and monitoring.",
    tech: ["Go", "Redis", "DynamoDB", "AWS ECS", "Grafana"],
    image: "/projects/api-gateway.png",
    comingSoon: true,
  },
  {
    slug: "task-queue",
    title: "Distributed Task Queue / Job Scheduler",
    description:
      "A mini Celery/Sidekiq clone for background jobs like emails, reports, and image processing.",
    tech: ["Go", "AWS SQS", "DynamoDB", "React", "Kubernetes"],
    image: "/projects/task-queue.png",
    comingSoon: true,
  },
  {
    slug: "mern-dashboard",
    title: "MERN Admin Dashboard",
    description:
      "Full-stack dashboard with authentication, CRUD, data visualization, and optional real-time IoT monitoring.",
    tech: ["MongoDB", "Express.js", "React", "Node.js", "Redux"],
    image: "/projects/mern-dashboard.png",
    comingSoon: true,
  },
  {
    slug: "employee-analytics",
    title: "Java Employee Management & Analytics",
    description:
      "Enterprise-style HR dashboard with Spring Boot, React, and AI-powered analytics for attrition prediction.",
    tech: ["Java", "Spring Boot", "React", "PostgreSQL", "Docker"],
    image: "/projects/employee-analytics.png",
    comingSoon: true,
  },
  {
    slug: "portfolio",
    title: "Personal Portfolio Website",
    description:
      "The website you're browsing now — built with Next.js, TailwindCSS, and Framer Motion.",
    tech: ["Next.js", "TailwindCSS", "Framer Motion"],
    image: "/projects/portfolio.png",
    demo: "https://my-portfolio.vercel.app",
    source: "https://github.com/EternalKnight002/my-portfolio",
  },
];
