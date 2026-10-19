import type { StaticImageData } from "next/image";
import devkwest from "@/assets/projects/devkwest.webp";
import jaCarRental from "@/assets/projects/ja-car-rental.webp";
import lostAndFound from "@/assets/projects/lost-and-found.webp";

export interface Project {
  slug: string;
  title: string;
  /** One-line pitch shown on cards. */
  summary: string;
  /** Longer description shown when a card is expanded. */
  description: string;
  image?: StaticImageData;
  stack: string[];
  repoUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "balanceflow",
    title: "BalanceFlow",
    summary: "Real-time ledger and compliance system with GAAP-conformant balance sheets.",
    description:
      "Computes dynamic balance sheets that follow GAAP accounting principles, audits double-entry balance discrepancies, and includes an automated document-ingestion workflow that simulates OCR invoice-to-account classification.",
    stack: ["Next.js", "C#", "ASP.NET Core", "TypeScript", "Supabase", "Tailwind CSS", "Framer Motion"],
    repoUrl: "https://github.com/GRONK13/BalanceFlow",
    liveUrl: "https://balance-flow-theta.vercel.app/login",
    featured: true,
  },
  {
    slug: "ja-car-rental",
    title: "J&A Car Rental System",
    summary: "Mobile-first booking and management system for a real car rental business.",
    description:
      "A full-stack, mobile-first car rental booking management and information system with user authentication, booking management, and payment integration.",
    image: jaCarRental,
    stack: ["React", "Express.js", "Prisma", "PostgreSQL", "JavaScript", "Tailwind CSS"],
    repoUrl: "https://github.com/unclejambo/JA-car-rental-system",
    liveUrl: "https://ja-car-rental-system.vercel.app/",
    featured: true,
  },
  {
    slug: "lost-and-found",
    title: "USC DCISM Lost & Found",
    summary: "Campus portal for reporting found items and recovering lost belongings.",
    description:
      "A platform for USC DCISM students to report found items and recover lost belongings with ease.",
    image: lostAndFound,
    stack: ["Next.js", "Supabase", "JavaScript", "Tailwind CSS"],
    repoUrl: "https://github.com/GRONK13/lost-and-found",
    liveUrl: "https://lost-n-found.dcism.org/",
    featured: true,
  },
  {
    slug: "devkwest",
    title: "DevKwest",
    summary: "A platform for developers to level up by building new projects.",
    description:
      "A platform for developers to enhance their skills by developing new projects.",
    image: devkwest,
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Framer Motion"],
    repoUrl: "https://github.com/nzrnshannen/devkwest",
    liveUrl: "https://devkwest.vercel.app",
    featured: true,
  },
];
