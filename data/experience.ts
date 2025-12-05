export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements?: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  description: string;
  gpa?: string;
  honors?: string[];
}

export const professionalExperience: ExperienceItem[] = [
  {
    title: "Software Developer Intern",
    company: "Talleco JobTarget",
    period: "Oct 2025 - Current",
    description: "I am currently interning as a Software Developer at Talleco JobTarget, where I am involved in developing and maintaining web applications using modern technologies."
  },
];

export const education: EducationItem[] = [
  {
    degree: "Bachelor of Science in Information Technology",
    institution: "University of San Carlos",
    period: "2021 - 2026",
    description: "Comprehensive study of information technology fundamentals including algorithms, data structures, and web development.",
    gpa: "TBD",
    honors: [
      "Internal Relations Officer of GDGoC (USC Talamban) 2025",
      "Deployed personal portfolio using Next.js and Vercel",
      "Explored Supabase for backend storage and team workflows",
      "Created a Todo App using React and Capacitor",
    ]
  },
  {
    degree: "Highschool Diploma - STEM Strand",
    institution: "Sacred Heart School - Ateneo de Cebu",
    period: "2015 - 2021",
    description: "Focused curriculum emphasizing science, technology, engineering, and mathematics, with hands-on projects and research work.",
    honors: [
      "Built first Portfolio using HTML, CSS, and JavaScript (2017)",
      "Learned basics of C Programming (2020)",
    ]
  },
  {
    degree: "Elementary Education",
    institution: "San Roque College De Cebu",
    period: "2009 - 2015",
    description: "Completed foundational education with a focus on core subjects including mathematics, science, and language arts.",
    honors: [
      "Math Wizard Award (2015)"
    ]
  }
];