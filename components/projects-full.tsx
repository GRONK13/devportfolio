"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import { projects } from "@/data/projects";

type ProjectCategory = "All" | "React/Next.js" | "Supabase" | "PostgreSQL" | "Prisma/Express";

export function ProjectsFull() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("All");

  const filters: ProjectCategory[] = ["All", "React/Next.js", "Supabase", "PostgreSQL", "Prisma/Express"];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "All") return true;
    const techs = project.technologies.map(t => t.toLowerCase());
    
    if (activeFilter === "React/Next.js") {
      return techs.includes("react") || techs.includes("next");
    }
    if (activeFilter === "Supabase") {
      return techs.includes("supabase");
    }
    if (activeFilter === "PostgreSQL") {
      return techs.includes("postgresql");
    }
    if (activeFilter === "Prisma/Express") {
      return techs.includes("prisma") || techs.includes("express");
    }
    return true;
  });

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-muted-foreground overflow-visible">
            All Projects
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            A comprehensive showcase of my projects that demonstrate my skills and experience in web development.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap justify-center items-center gap-2.5 mb-14"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 text-xs font-mono rounded-full border transition-all cursor-pointer ${
                activeFilter === filter
                  ? "bg-primary border-primary text-primary-foreground font-semibold shadow-md shadow-primary/20"
                  : "bg-muted/40 hover:bg-muted border-border/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md h-full"
              >
                <Card className="group glass-panel hover:border-primary/45 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden h-full flex flex-col relative border-border/40">
                  
                  {/* Featured Tag */}
                  {project.isFeatured && (
                    <div className="absolute top-3 left-3 z-20 bg-primary/90 text-primary-foreground text-[10px] font-bold font-mono px-2 py-0.5 rounded shadow">
                      FEATURED
                    </div>
                  )}

                  {/* Project Screenshot / Cover */}
                  <div className="relative overflow-hidden bg-muted h-48 border-b border-border/30">
                    <Image
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3.5 z-10">
                      <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="secondary" className="font-semibold text-xs py-1.5 h-8">
                          <Github className="h-3.5 w-3.5 mr-1.5" />
                          Repository
                        </Button>
                      </Link>
                      
                      {project.liveUrl === "development" || !project.liveUrl ? (
                        <Button size="sm" variant="outline" disabled className="cursor-not-allowed opacity-65 text-xs py-1.5 h-8">
                          In Dev
                        </Button>
                      ) : (
                        <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" className="font-semibold text-xs py-1.5 h-8 shadow shadow-primary/25">
                            <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                            Live Demo
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <CardHeader className="pb-3 flex-grow">
                    <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-xs text-muted-foreground leading-normal mt-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  {/* Tech stack badges */}
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
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 font-mono text-sm text-muted-foreground">
            No projects matched the selected filter criteria.
          </div>
        )}

      </div>
    </section>
  );
}