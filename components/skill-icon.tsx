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
  IconDatabase,
  IconCode,
} from "@tabler/icons-react";

interface IconProps {
  className?: string;
  size?: number;
  stroke?: number;
}

// Custom PostgreSQL SVG
function IconPostgresql({ className, size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.93V18h-2v-1.07A6.002 6.002 0 0 1 6 11h2a4 4 0 0 0 4 4 4 4 0 0 0 4-4h2a6.002 6.002 0 0 1-5 5.93z" />
    </svg>
  );
}

// Custom Express SVG
function IconExpress({ className, size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 010 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z" />
    </svg>
  );
}

// Custom Postman SVG
function IconPostman({ className, size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.428 6.573.843 12.587-3.801 13.428-10.374C24.744 6.955 20.101.943 13.527.099zm2.471 7.485a.855.855 0 0 0-.593.25l-4.453 4.453-.307-.307-.643-.643c4.389-4.376 5.18-4.418 5.996-3.753zm-4.863 4.861l4.44-4.44a.62.62 0 1 1 .847.903l-4.699 4.125-.588-.588zm.33.694l-1.1.238a.06.06 0 0 1-.067-.032.06.06 0 0 1 .01-.073l.645-.645.512.512zm-2.803-.459l1.172-1.172.879.878-1.979.426a.074.074 0 0 1-.085-.039.072.072 0 0 1 .013-.093zm-3.646 6.058a.076.076 0 0 1-.069-.083.077.077 0 0 1 .022-.046h.002l.946-.946 1.222 1.222-2.123-.147zm2.425-1.256a.228.228 0 0 0-.117.256l.203.865a.125.125 0 0 1-.211.117h-.003l-.934-.934-.294-.295 3.762-3.758 1.82-.393.874.874c-1.255 1.102-2.971 2.201-5.1 3.268zm5.279-3.428h-.002l-.839-.839 4.699-4.125a.952.952 0 0 0 .119-.127c-.148 1.345-2.029 3.245-3.977 5.091zm3.657-6.46l-.003-.002a1.822 1.822 0 0 1 2.459-2.684l-1.61 1.613a.119.119 0 0 0 0 .169l1.247 1.247a1.817 1.817 0 0 1-2.093-.343zm2.578 0a1.714 1.714 0 0 1-.271.218h-.001l-1.207-1.207 1.533-1.533c.661.72.637 1.832-.054 2.522zM18.855 6.05a.143.143 0 0 0-.053.157.416.416 0 0 1-.053.45.14.14 0 0 0 .023.197.141.141 0 0 0 .084.03.14.14 0 0 0 .106-.05.691.691 0 0 0 .087-.751.138.138 0 0 0-.194-.033z" />
    </svg>
  );
}

const ICON_MAP: Record<string, React.ComponentType<IconProps>> = {
  react: IconBrandReact,
  nextjs: IconBrandNextjs,
  javascript: IconBrandJavascript,
  typescript: IconBrandTypescript,
  tailwind: IconBrandTailwind,
  framermotion: IconBrandFramerMotion,
  nodejs: IconBrandNodejs,
  express: IconExpress,
  graphql: IconBrandGraphql,
  rest: IconApi,
  postgresql: IconPostgresql,
  prisma: IconBrandPrisma,
  supabase: IconBrandSupabase,
  docker: IconBrandDocker,
  vercel: IconBrandVercel,
  github: IconBrandGithub,
  git: IconBrandGit,
  vscode: IconBrandVscode,
  figma: IconBrandFigma,
  postman: IconPostman,
  server: IconServer,
  database: IconDatabase,
};

export interface SkillIconProps {
  slug: string;
  className?: string;
  size?: number;
  stroke?: number;
}

export function SkillIcon({ slug, className, size = 24, stroke = 1.5 }: SkillIconProps) {
  const normalizedSlug = slug.toLowerCase().replace(/[^a-z0-9]/g, "");
  const IconComponent = ICON_MAP[normalizedSlug] || IconCode;

  return <IconComponent className={className} size={size} stroke={stroke} />;
}
