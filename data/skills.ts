import React from "react";
import { 
  IconBrandReact,
  IconBrandNextjs,
  IconBrandJavascript,
  IconBrandTypescript,
  IconBrandTailwind,
  IconBrandFramerMotion,
  IconBrandNodejs,
  IconBrandGraphql,
  IconBrandPrisma,
  IconBrandSupabase,
  IconBrandDocker,
  IconBrandVercel,
  IconBrandGithub,
  IconBrandGit,
  IconBrandVscode,
  IconBrandFigma,
  IconApi,
  IconServer,
  IconDatabase
} from "@tabler/icons-react";

// Custom PostgreSQL icon component (using CDN image)
const IconPostgresql = ({ className, size = 24, stroke = 1.5 }: { className?: string; size?: number; stroke?: number }) => {
  return React.createElement(
    'img',
    {
      src: 'https://img.icons8.com/ios/100/postgreesql.png',
      alt: 'PostgreSQL',
      width: size,
      height: size,
      className: className,
      style: { filter: 'brightness(0) invert(1)' }
    }
  );
};

// Custom Express icon component
const IconExpress = ({ className, size = 24, stroke = 1.5 }: { className?: string; size?: number; stroke?: number }) => {
  return React.createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'currentColor',
      className: className
    },
    React.createElement('path', {
      d: 'M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 010 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z'
    })
  );
};

// Custom Postman icon component
const IconPostman = ({ className, size = 24, stroke = 1.5 }: { className?: string; size?: number; stroke?: number }) => {
  return React.createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'currentColor',
      className: className
    },
    React.createElement('path', {
      d: 'M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.428 6.573.843 12.587-3.801 13.428-10.374C24.744 6.955 20.101.943 13.527.099zm2.471 7.485a.855.855 0 0 0-.593.25l-4.453 4.453-.307-.307-.643-.643c4.389-4.376 5.18-4.418 5.996-3.753zm-4.863 4.861l4.44-4.44a.62.62 0 1 1 .847.903l-4.699 4.125-.588-.588zm.33.694l-1.1.238a.06.06 0 0 1-.067-.032.06.06 0 0 1 .01-.073l.645-.645.512.512zm-2.803-.459l1.172-1.172.879.878-1.979.426a.074.074 0 0 1-.085-.039.072.072 0 0 1 .013-.093zm-3.646 6.058a.076.076 0 0 1-.069-.083.077.077 0 0 1 .022-.046h.002l.946-.946 1.222 1.222-2.123-.147zm2.425-1.256a.228.228 0 0 0-.117.256l.203.865a.125.125 0 0 1-.211.117h-.003l-.934-.934-.294-.295 3.762-3.758 1.82-.393.874.874c-1.255 1.102-2.971 2.201-5.1 3.268zm5.279-3.428h-.002l-.839-.839 4.699-4.125a.952.952 0 0 0 .119-.127c-.148 1.345-2.029 3.245-3.977 5.091zm3.657-6.46l-.003-.002a1.822 1.822 0 0 1 2.459-2.684l-1.61 1.613a.119.119 0 0 0 0 .169l1.247 1.247a1.817 1.817 0 0 1-2.093-.343zm2.578 0a1.714 1.714 0 0 1-.271.218h-.001l-1.207-1.207 1.533-1.533c.661.72.637 1.832-.054 2.522zM18.855 6.05a.143.143 0 0 0-.053.157.416.416 0 0 1-.053.45.14.14 0 0 0 .023.197.141.141 0 0 0 .084.03.14.14 0 0 0 .106-.05.691.691 0 0 0 .087-.751.138.138 0 0 0-.194-.033z'
    })
  );
};

export interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string; size?: number; stroke?: number }>; // Tabler icon component
  color?: string; // Optional color for dark/light mode customization
}

export type SkillsMap = Record<string, Skill[]>;

export const skills: SkillsMap = {
  Frontend: [
    { name: "React", icon: IconBrandReact, color: "text-white" },
    { name: "Next.js", icon: IconBrandNextjs, color: "text-white" },
    { name: "JavaScript", icon: IconBrandJavascript, color: "text-white" },
    { name: "TypeScript", icon: IconBrandTypescript, color: "text-white" },
    { name: "Tailwind CSS", icon: IconBrandTailwind, color: "text-white" },
    { name: "Framer Motion", icon: IconBrandFramerMotion, color: "text-white" }
  ],
  Backend: [
    { name: "Node.js", icon: IconBrandNodejs, color: "text-white" },
    { name: "Express", icon: IconExpress, color: "text-white" },
    { name: "GraphQL", icon: IconBrandGraphql, color: "text-white" },
    { name: "REST APIs", icon: IconApi, color: "text-white" }
  ],
  Database: [
    { name: "PostgreSQL", icon: IconPostgresql, color: "text-white" },
    { name: "Prisma", icon: IconBrandPrisma, color: "text-white" },
    { name: "Supabase", icon: IconBrandSupabase, color: "text-white" }
  ],
  DevOps: [
    { name: "Docker", icon: IconBrandDocker, color: "text-white" },
    { name: "Vercel", icon: IconBrandVercel, color: "text-white" },
    { name: "GitHub Actions", icon: IconBrandGithub, color: "text-white" }
  ],
  Tools: [
    { name: "Git", icon: IconBrandGit, color: "text-white" },
    { name: "VS Code", icon: IconBrandVscode, color: "text-white" },
    { name: "Figma", icon: IconBrandFigma, color: "text-white" },
    { name: "Postman", icon: IconPostman, color: "text-white" }
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