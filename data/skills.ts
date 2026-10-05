export type SkillCategory = "Frontend" | "Backend" | "Database" | "DevOps" | "Tools";

export interface Skill {
  name: string;
  category: SkillCategory;
  iconSlug: string;
  color?: string;
}

export type SkillsMap = Record<SkillCategory, Skill[]>;

export const skillsList: Skill[] = [
  // Frontend
  { name: "React", category: "Frontend", iconSlug: "react", color: "text-white" },
  { name: "Next.js", category: "Frontend", iconSlug: "nextjs", color: "text-white" },
  { name: "JavaScript", category: "Frontend", iconSlug: "javascript", color: "text-white" },
  { name: "TypeScript", category: "Frontend", iconSlug: "typescript", color: "text-white" },
  { name: "Tailwind CSS", category: "Frontend", iconSlug: "tailwind", color: "text-white" },
  { name: "Framer Motion", category: "Frontend", iconSlug: "framermotion", color: "text-white" },

  // Backend
  { name: "Node.js", category: "Backend", iconSlug: "nodejs", color: "text-white" },
  { name: "Express.js", category: "Backend", iconSlug: "express", color: "text-white" },
  { name: "GraphQL", category: "Backend", iconSlug: "graphql", color: "text-white" },
  { name: "REST APIs", category: "Backend", iconSlug: "rest", color: "text-white" },

  // Database
  { name: "PostgreSQL", category: "Database", iconSlug: "postgresql", color: "text-white" },
  { name: "Prisma", category: "Database", iconSlug: "prisma", color: "text-white" },
  { name: "Supabase", category: "Database", iconSlug: "supabase", color: "text-white" },

  // DevOps
  { name: "Docker", category: "DevOps", iconSlug: "docker", color: "text-white" },
  { name: "Vercel", category: "DevOps", iconSlug: "vercel", color: "text-white" },
  { name: "GitHub Actions", category: "DevOps", iconSlug: "github", color: "text-white" },

  // Tools
  { name: "Git", category: "Tools", iconSlug: "git", color: "text-white" },
  { name: "VS Code", category: "Tools", iconSlug: "vscode", color: "text-white" },
  { name: "Figma", category: "Tools", iconSlug: "figma", color: "text-white" },
  { name: "Postman", category: "Tools", iconSlug: "postman", color: "text-white" },
];

export const skills: SkillsMap = {
  Frontend: skillsList.filter((s) => s.category === "Frontend"),
  Backend: skillsList.filter((s) => s.category === "Backend"),
  Database: skillsList.filter((s) => s.category === "Database"),
  DevOps: skillsList.filter((s) => s.category === "DevOps"),
  Tools: skillsList.filter((s) => s.category === "Tools"),
};

// Helper function to get skill names as strings
export const getSkillNames = (): Record<string, string[]> => {
  const skillNames: Record<string, string[]> = {};
  Object.entries(skills).forEach(([category, list]) => {
    skillNames[category] = list.map((skill) => skill.name);
  });
  return skillNames;
};

export default skills;