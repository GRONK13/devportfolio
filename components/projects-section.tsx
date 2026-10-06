"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Project, projects as defaultProjects } from "@/data/projects";
import { ProjectImage } from "@/components/project-image";

export interface ProjectsSectionProps {
  projects?: Project[];
}

export function ProjectsSection({ projects = defaultProjects }: ProjectsSectionProps = {}) {
  // Show only featured projects as preview
  const featuredProjects = projects.filter(project => project.isFeatured);
  
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A preview of some of my recent projects that showcase my skills and experience in web development.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="w-full max-w-md"
            >
              <Card className="group glass-panel hover:border-primary/45 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden h-full flex flex-col relative border-border/40">
                {/* image: use Next Image and keep responsive cover */}
                <div className="relative overflow-hidden bg-muted h-48 border-b border-border/30">
                  <ProjectImage 
                    title={project.title} 
                    imageSrc={project.image} 
                    liveUrl={project.liveUrl} 
                  />
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3.5 z-10">
                    <Button asChild size="sm" variant="secondary" className="font-semibold text-xs py-1.5 min-h-[36px]">
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} source code on GitHub`}
                      >
                        <Github className="h-3.5 w-3.5 mr-1.5" />
                        Repository
                      </Link>
                    </Button>
                    
                    {project.liveUrl === "development" || !project.liveUrl ? (
                      <Button size="sm" variant="outline" disabled className="cursor-not-allowed opacity-65 text-xs py-1.5 min-h-[36px]" aria-label={`${project.title} is currently in development`}>
                        In Dev
                      </Button>
                    ) : (
                      <Button asChild size="sm" className="font-semibold text-xs py-1.5 shadow shadow-primary/25 min-h-[36px]">
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View live demo of ${project.title}`}
                        >
                          <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                          Live Demo
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>

                <CardHeader className="pb-3 flex-grow">
                  <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">{project.title}</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground leading-normal mt-2">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0 border-t border-border/20 mt-auto pb-4">
                  <div className="flex flex-wrap gap-1.5 pt-3.5">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-[10px] py-0 px-2 font-mono font-medium">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>



        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button asChild variant="outline" size="lg" className="min-h-[44px]">
            <Link href="/projects">
              View All Projects
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}