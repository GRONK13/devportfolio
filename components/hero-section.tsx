"use client";

import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, ArrowDown, Download } from "lucide-react";
import Link from "next/link";
import { skills as skillsData } from "@/data/skills";

type Skill = string | { name: string; [key: string]: unknown };

const typedSkillsData = skillsData as Record<string, Skill[]>;

const skills: string[] = Array.from(
  new Set(
    Object.values(typedSkillsData)
      .flat()
      .map((s: Skill) => (typeof s === "string" ? s : s.name))
  )
).slice(0, 12); // limit to first 12 for layout; remove .slice() if you want all

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background antialiased">
      <div className="absolute inset-0 bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2]" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background to-transparent" />

      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="currentColor" />
      <BackgroundBeams />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground pb-4 overflow-visible">
              Hi, I&apos;m Gregg
            </h1>
            
            <TextGenerateEffect
              words="A 4th Year Information Technology Student at University of San Carlos"
              className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Hi, I&apos;m Gregg Marayan, a developer currently exploring full-stack projects and building real-world experience.
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                >
                  <Badge variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Link href="/projects">
              <Button size="lg">View My Work</Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Get In Touch
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline">
                Get To Know Me
              </Button>
            </Link>

            {/* Added: Download Resume */}
            <Button asChild size="lg" variant="secondary">
              <a
                href="/Gregg-Marayan-Resume.pdf"
                download
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </Button>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center space-x-6 mb-12"
          >
            <Link
              href="https://github.com/GreggMarayan"
              className="text-muted-foreground hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-6 w-6" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/gregg-marayan"
              className="text-muted-foreground hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-6 w-6" />
            </Link>
            <Link
              href="/contact"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-6 w-6" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="animate-bounce"
          >
            <ArrowDown className="h-6 w-6 mx-auto text-muted-foreground" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}