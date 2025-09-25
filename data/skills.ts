export type SkillsMap = Record<string, string[]>;

export const skills: SkillsMap = {
  Frontend: ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "Framer Motion"],
  Backend: ["Node.js", "Express", "GraphQL", "REST APIs"],
  Database: ["PostgreSQL", "Prisma", "Supabase"],
  DevOps: ["Docker", "CI/CD", "Vercel", "GitHub Actions"],
  Tools: ["Git", "VS Code", "Figma", "Postman"],
};

export default skills;