"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Timeline } from "@/components/ui/timeline";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Code, Lightbulb, Users, Zap, Briefcase, GraduationCap, Award } from "lucide-react";
import { professionalExperience, education } from "@/data/experience";
import skills from "@/data/skills";
import { personalInfo } from "@/data/personal-info";
import { GitHubStats } from "@/components/github-stats";

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
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-muted-foreground overflow-visible">
                About Me
              </h1>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
                {personalInfo.descriptions.long}
              </p>
            </motion.div>

            {/* My Story */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-20"
            >
              <Card className="glass-panel shadow-xl border-border/40">
                <CardHeader>
                  <CardTitle className="text-2xl text-center font-bold text-primary">My Story</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-neutral dark:prose-invert max-w-3xl mx-auto text-center">
                  <p className="text-muted-foreground leading-relaxed">
                    {personalInfo.story.beginning}
                  </p>
                  <br />
                  <p className="text-muted-foreground leading-relaxed">
                    {personalInfo.story.current}
                  </p>
                  <br />
                  <p className="text-muted-foreground leading-relaxed">
                    {personalInfo.story.personal}
                  </p>
                </CardContent>
              </Card>
            </motion.section>

            {/* Values */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-20"
            >
              <h2 className="text-3xl font-bold text-center mb-12">What Drives Me</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Code, title: "Clean Code", description: "Writing maintainable, scalable, and self-documenting code with rigorous types." },
                  { icon: Lightbulb, title: "Innovation", description: "Finding creative engineering solutions to real-world, complex business workflows." },
                  { icon: Users, title: "Collaboration", description: "Working effectively with multidisciplinary product teams using Agile methods." },
                  { icon: Zap, title: "Performance", description: "Optimizing page load metrics, client rendering pathways, and database calls." },
                ].map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
                  >
                    <Card className="text-center h-full glass-panel hover:shadow-lg hover:shadow-primary/5 hover:border-primary/40 transition-all duration-300">
                      <CardHeader>
                        <value.icon className="h-10 w-10 mx-auto mb-4 text-primary" />
                        <CardTitle className="text-lg font-bold">{value.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
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
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-20"
            >
              <h2 className="text-3xl font-bold text-center mb-4">Technical Toolkit</h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                A comprehensive showcase of modern engineering tools, frameworks, and protocols I use to build scalable web products.
              </p>

              <InfiniteMovingCards
                items={Object.entries(skills).map(([category, skillList]) => ({
                  category,
                  skills: skillList
                }))}
                direction="left"
                speed="slow"
                pauseOnHover={true}
              />
            </motion.section>

            {/* Experience and Education Tabs */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-center mb-12">Journey & Education</h2>
              <Tabs defaultValue="experience" className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
                  <TabsTrigger value="experience" className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Professional Experience
                  </TabsTrigger>
                  <TabsTrigger value="education" className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Education
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="experience" className="mt-0">
                  <Timeline data={professionalExperience.map(exp => ({
                    title: exp.period,
                    content: (
                      <div>
                        <Card className="mb-6 glass-panel border-border/40 hover:border-primary/30 transition-all">
                          <CardHeader>
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
                              <div>
                                <CardTitle className="text-xl font-bold">{exp.title}</CardTitle>
                                <p className="text-primary font-semibold text-sm">{exp.company}</p>
                              </div>
                              <Badge variant="outline" className="flex items-center gap-1 text-xs">
                                <Briefcase className="h-3 w-3 text-primary" />
                                {exp.period}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-4">{exp.description}</p>
                            {exp.achievements && (
                              <div className="border-t border-border/30 pt-3">
                                <h4 className="font-semibold text-xs text-foreground mb-2 flex items-center gap-1.5">
                                  <Award className="h-4 w-4 text-primary" />
                                  Key Achievements:
                                </h4>
                                <ul className="list-disc list-inside space-y-1.5 pl-1">
                                  {exp.achievements.map((achievement, index) => (
                                    <li key={index} className="text-xs text-muted-foreground leading-normal">
                                      {achievement}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    )
                  }))} />
                </TabsContent>

                <TabsContent value="education" className="mt-0">
                  <Timeline data={education.map(edu => ({
                    title: edu.period,
                    content: (
                      <div>
                        <Card className="mb-6 glass-panel border-border/40 hover:border-primary/30 transition-all">
                          <CardHeader>
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
                              <div>
                                <CardTitle className="text-xl font-bold">{edu.degree}</CardTitle>
                                <p className="text-primary font-semibold text-sm">{edu.institution}</p>
                              </div>
                              <div className="flex flex-col items-end gap-1.5">
                                <Badge variant="outline" className="flex items-center gap-1 text-xs">
                                  <GraduationCap className="h-3 w-3 text-primary" />
                                  {edu.period}
                                </Badge>
                                {edu.gpa && (
                                  <Badge variant="secondary" className="text-[10px] font-mono">
                                    GPA: {edu.gpa}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-4">{edu.description}</p>
                            {edu.honors && (
                              <div className="border-t border-border/30 pt-3">
                                <h4 className="font-semibold text-xs text-foreground mb-2 flex items-center gap-1.5">
                                  <Award className="h-4 w-4 text-primary" />
                                  Honors & Projects:
                                </h4>
                                <ul className="list-disc list-inside space-y-1.5 pl-1">
                                  {edu.honors.map((honor, index) => (
                                    <li key={index} className="text-xs text-muted-foreground leading-normal">
                                      {honor}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    )
                  }))} />
                </TabsContent>
              </Tabs>
            </motion.section>
          </div>
        </div>
      </main>
    </div>
  );
}