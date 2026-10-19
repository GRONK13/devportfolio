export interface TimelineItem {
  title: string;
  org: string;
  period: string;
  summary: string;
  highlights?: string[];
}

export const work: TimelineItem[] = [
  {
    title: "Software Developer Intern",
    org: "Talleco JobTarget",
    period: "Oct 2025 – Mar 2026",
    summary: "Developed and maintained web applications using modern technologies.",
  },
];

export const education: TimelineItem[] = [
  {
    title: "BS Information Technology",
    org: "University of San Carlos",
    period: "2021 – 2026",
    summary:
      "Algorithms, data structures, networking, and web development fundamentals.",
    highlights: [
      "Internal Relations Officer, GDGoC USC Talamban (2025)",
      "Deployed a personal portfolio with Next.js and Vercel",
      "Used Supabase for backend storage and team workflows",
      "Built a to-do app with React and Capacitor",
    ],
  },
  {
    title: "High School Diploma, STEM",
    org: "Sacred Heart School – Ateneo de Cebu",
    period: "2015 – 2021",
    summary: "Science, technology, engineering, and math with hands-on research projects.",
    highlights: [
      "Built a first portfolio with HTML, CSS, and JavaScript (2017)",
      "Learned C programming fundamentals (2020)",
    ],
  },
];
