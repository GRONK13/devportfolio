"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Code, Lightbulb, Users, Zap } from "lucide-react";

const skills = {
  "Frontend": ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vue.js"],
  "Backend": ["Node.js", "Express", "Python", "FastAPI", "GraphQL", "REST APIs"],
  "Database": ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Supabase"],
  "DevOps": ["AWS", "Docker", "Kubernetes", "CI/CD", "Vercel", "GitHub Actions"],
  "Tools": ["Git", "VS Code", "Figma", "Postman", "Jest", "Cypress"],
};

const experiences = [
  {
    title: "Senior Full Stack Developer",
    company: "Tech Innovators Inc.",
    period: "2022 - Present",
    description: "Leading development of scalable web applications using React, Node.js, and cloud technologies. Mentoring junior developers and architecting solutions for high-traffic applications.",
  },
  {
    title: "Full Stack Developer",
    company: "Digital Solutions Co.",
    period: "2020 - 2022",
    description: "Developed and maintained multiple client projects using modern web technologies. Collaborated with design teams to create user-friendly interfaces and optimized application performance.",
  },
  {
    title: "Frontend Developer",
    company: "StartUp Ventures",
    period: "2019 - 2020",
    description: "Built responsive web applications and implemented modern UI/UX designs. Worked closely with backend developers to integrate APIs and ensure seamless user experiences.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="relative">
        <BackgroundBeams />
        
        <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                I&apos;m a passionate full-stack developer with over 5 years of experience creating 
                digital solutions that make a difference. I love turning complex problems into 
                simple, beautiful, and intuitive applications.
              </p>
            </motion.div>

            {/* My Story */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-20"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">My Story</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    My journey in software development began during my computer science studies, 
                    where I discovered my passion for creating digital experiences. What started 
                    as curiosity about how websites work evolved into a career dedicated to building 
                    innovative solutions.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Over the years, I&apos;ve had the privilege of working with startups and established 
                    companies, helping them bring their ideas to life through clean, efficient code 
                    and thoughtful design. I believe in continuous learning and staying up-to-date 
                    with the latest technologies and best practices.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    When I&apos;m not coding, you can find me contributing to open-source projects, 
                    writing technical blogs, or exploring new frameworks and tools that can improve 
                    development workflows.
                  </p>
                </CardContent>
              </Card>
            </motion.section>

            {/* Values */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-20"
            >
              <h2 className="text-3xl font-bold text-center mb-12">What Drives Me</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Code, title: "Clean Code", description: "Writing maintainable, scalable, and efficient code" },
                  { icon: Lightbulb, title: "Innovation", description: "Finding creative solutions to complex problems" },
                  { icon: Users, title: "Collaboration", description: "Working effectively with diverse teams" },
                  { icon: Zap, title: "Performance", description: "Building fast, optimized applications" },
                ].map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    <Card className="text-center h-full">
                      <CardHeader>
                        <value.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                        <CardTitle className="text-lg">{value.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm">{value.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Skills */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-20"
            >
              <h2 className="text-3xl font-bold text-center mb-12">Technical Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(skills).map(([category, skillList], index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">{category}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {skillList.map((skill) => (
                            <Badge key={skill} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Experience */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-center mb-12">Professional Experience</h2>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl">{exp.title}</CardTitle>
                            <p className="text-primary font-semibold">{exp.company}</p>
                          </div>
                          <Badge variant="outline">{exp.period}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{exp.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      </main>
    </div>
  );
}