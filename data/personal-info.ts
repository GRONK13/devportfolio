export interface CoreValue {
  title: string;
  description: string;
  icon: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  email: string;
  phone: string;
  github: string;
  location: {
    city: string;
    province: string;
    country: string;
    availability: string;
  };
  social: {
    github: string;
    linkedin: string;
    email: string;
  };
  website: {
    url: string;
    domain: string;
  };
  resume: {
    filename: string;
    path: string;
  };
  descriptions: {
    short: string;
    medium: string;
    long: string;
  };
  keywords: string[];
  story: {
    beginning: string;
    current: string;
    personal: string;
  };
  coreValues: CoreValue[];
}

export const personalInfo: PersonalInfo = {
  name: "Gregg Marayan",
  title: "Full Stack Developer",
  subtitle: "Full Stack Developer - Information Technology Graduate at University of San Carlos",
  bio: "Hi, I'm Gregg Marayan, a developer currently exploring Networking and full-stack projects and building real-world experience.",
  email: "gregg.marayan@gmail.com",
  phone: "+63 (992) 531-5378",
  github: "GRONK13",
  location: {
    city: "Taguig City",
    province: "Metro Manila",
    country: "Philippines",
    availability: "Available for remote work"
  },
  social: {
    github: "https://github.com/GRONK13",
    linkedin: "https://linkedin.com/in/gregg-marayan",
    email: "mailto:gregg.marayan@gmail.com"
  },
  website: {
    url: "https://greggmarayan.me",
    domain: "greggmarayan.me"
  },
  resume: {
    filename: "Marayan_Resume.pdf",
    path: "/Marayan_Resume.pdf"
  },
  descriptions: {
    short: "Full Stack Developer at University of San Carlos",
    medium: "Gregg Marayan is a Full Stack Developer. University of San Carlos graduate specializing in full-stack web development with React, Next.js, Node.js, and TypeScript.",
    long: "I'm a recent graduate in Information Technology from the University of San Carlos. I'm eager to explore different areas in tech, from development and system administration to cybersecurity and cloud tools. I enjoy learning through hands-on experience and I'm open to new challenges that help me grow."
  },
  keywords: [
    "Gregg Marayan",
    "Gregg Alexander Marayan",
    "Full Stack Developer",
    "Software Engineer",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    "Node.js Developer",
    "PostgreSQL Developer",
    "Supabase Developer",
    "Docker Developer",
    "Network Administrator",
    "Network Engineer",
    "Computer Networking",
    "Network Security",
    "IT Support Specialist",
    "Technical Support Engineer",
    "Help Desk Support",
    "Systems Administrator",
    "Cloud Computing",
    "Cloud Engineer",
    "Cloud Infrastructure",
    "AWS",
    "Microsoft Azure",
    "Google Cloud Platform",
    "Cybersecurity",
    "Cybersecurity Analyst",
    "Information Security",
    "Security Operations",
    "Vulnerability Assessment",
    "Risk Management",
    "Linux Administration",
    "System Administration",
    "Database Management",
    "REST API Development",
    "Responsive Web Design",
    "University of San Carlos",
    "BS Information Technology",
    "IT Graduate Philippines",
    "Taguig Philippines",
    "Portfolio Website",
    "Software Development"
  ],
  story: {
    beginning: "My journey began during my Senior High School Robotics class, where we tinkered around with microcontrollers and basic programming. This hands-on experience sparked my curiosity and passion for technology, leading me to pursue a degree in Information Technology.",
    current: "As a BS IT graduate at the University of San Carlos, I've been steadily growing my skills through hands-on projects, coursework, and attending workshops and seminars. I enjoy helping teams turn ideas into working solutions, whether it's troubleshooting backend issues, refining UI components, or setting up collaborative workflows. I'm committed to continuous learning and always looking for ways to improve through real-world experience and emerging tech.",
    personal: "When I'm not coding, you can find me playing games such as Tekken 8, and Surroundead, watching movies and series such as Dexter, or exploring new frameworks and tools that can improve development workflows."
  },
  coreValues: [
    {
      title: "Clean Code",
      description: "Writing maintainable, scalable, and self-documenting code with rigorous types.",
      icon: "Code"
    },
    {
      title: "Innovation",
      description: "Finding creative engineering solutions to real-world, complex business workflows.",
      icon: "Lightbulb"
    },
    {
      title: "Collaboration",
      description: "Working effectively with multidisciplinary product teams using Agile methods.",
      icon: "Users"
    },
    {
      title: "Performance",
      description: "Optimizing page load metrics, client rendering pathways, and database calls.",
      icon: "Zap"
    }
  ]
};

// Helper functions for common use cases
export const getFullName = (info: PersonalInfo = personalInfo) => info?.name || "";
export const getEmail = (info: PersonalInfo = personalInfo) => info?.email || "";
export const getPhone = (info: PersonalInfo = personalInfo) => info?.phone || "";
export const getGithubUrl = (info: PersonalInfo = personalInfo) => info?.social?.github || info?.github || "";
export const getLinkedInUrl = (info: PersonalInfo = personalInfo) => info?.social?.linkedin || "";
export const getWebsiteUrl = (info: PersonalInfo = personalInfo) => info?.website?.url || "";
export const getResumeUrl = (info: PersonalInfo = personalInfo) => info?.resume?.path || "";
export const getFullLocation = (info: PersonalInfo = personalInfo) => {
  const loc = info?.location;
  if (!loc) return "";
  const parts = [
    loc.city,
    loc.province,
    loc.country
  ].filter(Boolean);
  return parts.join(", ");
};

export default personalInfo;
