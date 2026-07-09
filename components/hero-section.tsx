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
import { personalInfo } from "@/data/personal-info";
import { DeveloperTerminal } from "@/components/developer-terminal";

const skills: string[] = Array.from(
  new Set(
    Object.values(skillsData)
      .flat()
      .map((skill) => skill.name)
  )
).slice(0, 12); // limit to first 12 for layout

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-background antialiased pt-24 pb-16 lg:py-0">
      <div className="absolute inset-0 bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2]" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background to-transparent" />

      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="currentColor" />
      <BackgroundBeams />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Bio & Details Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 w-full"
            >
              <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-muted-foreground pb-2 overflow-visible">
                Hi, I&apos;m {personalInfo.name.split(' ')[0]}
              </h1>
              
              <TextGenerateEffect
                words={personalInfo.subtitle}
                className="mt-2 text-lg md:text-xl text-muted-foreground font-semibold"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-xl leading-relaxed">
                {personalInfo.bio}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  >
                    <Badge variant="secondary" className="text-xs py-1 px-2.5">
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-3 items-center mb-8"
            >
              <Link href="/contact">
                <Button size="lg" className="shadow-lg shadow-primary/20 hover:shadow-primary/35 transition-all">
                  Get In Touch
                </Button>
              </Link>
              
              <Button asChild size="lg" variant="secondary" className="border">
                <a
                  href={personalInfo.resume.path}
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
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex space-x-5"
            >
              <Link
                href={personalInfo.social.github}
                className="text-muted-foreground hover:text-primary hover:scale-110 transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5.5. w-5.5" />
              </Link>
              <Link
                href={personalInfo.social.linkedin}
                className="text-muted-foreground hover:text-primary hover:scale-110 transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5.5 w-5.5" />
              </Link>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-primary hover:scale-110 transition-all"
              >
                <Mail className="h-5.5 w-5.5" />
              </Link>
            </motion.div>
          </div>

          {/* Terminal Right Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5 w-full h-full flex items-center justify-center"
          >
            <DeveloperTerminal />
          </motion.div>

        </div>
        
        {/* Bounce Arrow indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden lg:block"
        >
          <ArrowDown className="h-5 w-5 text-muted-foreground/60" />
        </motion.div>
      </div>
    </section>
  );
}