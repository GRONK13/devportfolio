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
    technologies: [ "React", "TailwindCSS", "JavaScript", "Express", "Prisma", "PostgreSQL"],
    githubUrl: "https://github.com/unclejambo/JA-car-rental-system",
    liveUrl: "https://jrs-front.vercel.app/",
    isFeatured: true,
  },
  {
    id: 2,
    title: "Lost & Found Portal for USC DCSIM Students",
    description: "A dedicated platform designed to make it easier for USC DCSIM students to report found belongings and recover lost items. The system provides a simple, student-friendly way to log reports, browse listed items, and manage claims securely. By streamlining communication between finders and owners, the portal fosters accountability, trust, and community support within the department.",
    image: "/lost-and-found.jpeg",
    technologies: [ "Next", "TailwindCSS", "JavaScript", "Supabase"],
    githubUrl: "https://github.com/GRONK13/lost-and-found",
    liveUrl: "https://lost-n-found.dcism.org/",
    isFeatured: true,
  },
];