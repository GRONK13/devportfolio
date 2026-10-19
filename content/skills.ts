export interface SkillGroup {
  name: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  { name: "Frontend", items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Framer Motion"] },
  { name: "Backend", items: ["Node.js", "Express.js", "C# / ASP.NET Core", "REST APIs", "GraphQL"] },
  { name: "Data", items: ["PostgreSQL", "Prisma", "Supabase"] },
  { name: "DevOps & tools", items: ["Docker", "Vercel", "GitHub Actions", "Git", "Postman", "Figma"] },
  { name: "Security & networking", items: ["Security monitoring", "Incident response", "Network intrusion analysis", "Threat detection"] },
];

export const allSkills = skillGroups.flatMap((group) => group.items);
