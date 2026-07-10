export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  isFeatured: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Mobile-First Car Rental Booking Management and Information System for J&A Car Rental",
    description: "A full-stack mobile-first car rental booking management system with user authentication, booking management, and payment integration.",
    image: "/J&A.png",
    technologies: ["React", "TailwindCSS", "JavaScript", "Express", "Prisma", "PostgreSQL"],
    githubUrl: "https://github.com/unclejambo/JA-car-rental-system",
    liveUrl: "https://ja-car-rental-system.vercel.app/",
    isFeatured: true,
  },
  {
    id: 2,
    title: "Lost & Found Portal for USC DCSIM Students",
    description: "A platform for USC DCISM students to report found items and recover lost belongings with ease.",
    image: "/lost-and-found.jpeg",
    technologies: ["Next", "TailwindCSS", "JavaScript", "Supabase"],
    githubUrl: "https://github.com/GRONK13/lost-and-found",
    liveUrl: "https://lost-n-found.dcism.org/",
    isFeatured: true,
  },
  {
    id: 3,
    title: "BalanceFlow",
    description: "BalanceFlow is a real-time ledger and compliance system built with modern engineering practices. It computes dynamic balance sheets conforming to GAAP accounting principles, audits double-entry balance discrepancies, and features an automated document ingestion workflow that simulates smart OCR invoice-to-account classification.",
    image: "",
    technologies: ["Next", "C#", "ASP.NET Core", "TailwindCSS", "TypeScript", "Supabase", "Framer Motion"],
    githubUrl: "https://github.com/GRONK13/BalanceFlow",
    liveUrl: "https://balance-flow-theta.vercel.app/login",
    isFeatured: true,
  },
  {
    id: 4,
    title: "DevKwest",
    description: "A platform for developers to enhance their skills by developing new projects.",
    image: "/DevKwest.png",
    technologies: ["Next", "TailwindCSS", "TypeScript", "Supabase", "Framer Motion"],
    githubUrl: "https://github.com/nzrnshannen/devkwest",
    liveUrl: "https://devkwest.vercel.app",
    isFeatured: true,
  },
];