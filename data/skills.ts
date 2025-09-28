import React from "react";
import { 
  Code, 
  Database, 
  Server, 
  Globe, 
  Palette, 
  Zap,
  FileCode,
  Braces,
  Layout,
  Settings,
  GitBranch,
  Monitor,
  Figma,
  Mail,
  Container,
  Workflow,
  Cloud,
  Play
} from "lucide-react";

export interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string }>; // Lucide icon component
  color?: string; // Optional color for dark/light mode customization
}

export type SkillsMap = Record<string, Skill[]>;

export const skills: SkillsMap = {
  Frontend: [
    { name: "React", icon: Code, color: "text-blue-500 dark:text-blue-400" },
    { name: "Next.js", icon: Globe, color: "text-gray-800 dark:text-gray-200" },
    { name: "JavaScript", icon: FileCode, color: "text-yellow-500 dark:text-yellow-400" },
    { name: "TypeScript", icon: Braces, color: "text-blue-600 dark:text-blue-400" },
    { name: "Tailwind CSS", icon: Palette, color: "text-teal-500 dark:text-teal-400" },
    { name: "Framer Motion", icon: Zap, color: "text-purple-500 dark:text-purple-400" }
  ],
  Backend: [
    { name: "Node.js", icon: Server, color: "text-green-600 dark:text-green-400" },
    { name: "Express", icon: Settings, color: "text-gray-700 dark:text-gray-300" },
    { name: "GraphQL", icon: Layout, color: "text-pink-500 dark:text-pink-400" },
    { name: "REST APIs", icon: Globe, color: "text-orange-500 dark:text-orange-400" }
  ],
  Database: [
    { name: "PostgreSQL", icon: Database, color: "text-blue-700 dark:text-blue-300" },
    { name: "Prisma", icon: Database, color: "text-indigo-600 dark:text-indigo-400" },
    { name: "Supabase", icon: Database, color: "text-green-500 dark:text-green-400" }
  ],
  DevOps: [
    { name: "Docker", icon: Container, color: "text-blue-600 dark:text-blue-400" },
    { name: "CI/CD", icon: Workflow, color: "text-gray-600 dark:text-gray-400" },
    { name: "Vercel", icon: Cloud, color: "text-black dark:text-white" },
    { name: "GitHub Actions", icon: Play, color: "text-gray-800 dark:text-gray-200" }
  ],
  Tools: [
    { name: "Git", icon: GitBranch, color: "text-red-500 dark:text-red-400" },
    { name: "VS Code", icon: Monitor, color: "text-blue-500 dark:text-blue-400" },
    { name: "Figma", icon: Figma, color: "text-purple-500 dark:text-purple-400" },
    { name: "Postman", icon: Mail, color: "text-orange-600 dark:text-orange-400" }
  ],
};

// Helper function to get skill names as strings (for backward compatibility)
export const getSkillNames = (): Record<string, string[]> => {
  const skillNames: Record<string, string[]> = {};
  Object.entries(skills).forEach(([category, skillList]) => {
    skillNames[category] = skillList.map(skill => skill.name);
  });
  return skillNames;
};

export default skills;