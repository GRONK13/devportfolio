"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Award, Calendar } from "lucide-react";
import Link from "next/link";

const certificates = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2024",
    credentialId: "AWS-SAA-2024-001",
    verificationUrl: "https://aws.amazon.com/verification",
    skills: ["AWS", "Cloud Architecture", "EC2", "S3", "Lambda"],
    description: "Validates expertise in designing distributed systems on AWS platform.",
  },
  {
    id: 2,
    title: "React Developer Certification",
    issuer: "Meta",
    date: "2023",
    credentialId: "META-REACT-2023-001",
    verificationUrl: "https://coursera.org/verify",
    skills: ["React", "JavaScript", "JSX", "Redux", "Testing"],
    description: "Professional certification in React development and best practices.",
  },
  {
    id: 3,
    title: "Full Stack Web Development",
    issuer: "freeCodeCamp",
    date: "2023",
    credentialId: "FCC-FULLSTACK-2023",
    verificationUrl: "https://freecodecamp.org/certification",
    skills: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB"],
    description: "Comprehensive full-stack development certification covering frontend and backend.",
  },
  {
    id: 4,
    title: "Google Cloud Professional",
    issuer: "Google Cloud",
    date: "2024",
    credentialId: "GCP-PRO-2024-001",
    verificationUrl: "https://cloud.google.com/certification",
    skills: ["GCP", "Kubernetes", "DevOps", "CI/CD"],
    description: "Professional cloud developer certification from Google Cloud Platform.",
  },
  {
    id: 5,
    title: "TypeScript Certification",
    issuer: "Microsoft",
    date: "2023",
    credentialId: "MS-TS-2023-001",
    verificationUrl: "https://learn.microsoft.com/certification",
    skills: ["TypeScript", "JavaScript", "Types", "Generics"],
    description: "Advanced TypeScript programming and type system mastery.",
  },
  {
    id: 6,
    title: "Docker Certified Associate",
    issuer: "Docker",
    date: "2024",
    credentialId: "DOCKER-DCA-2024",
    verificationUrl: "https://docker.com/certification",
    skills: ["Docker", "Containers", "Orchestration", "DevOps"],
    description: "Containerization and orchestration expertise certification.",
  },
];

export function CertificatesFull() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">All Certifications & Achievements</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive collection of my professional certifications and credentials that validate my expertise in various technologies and platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-lg transition-all duration-300 h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="h-5 w-5 text-primary" />
                        <Badge variant="secondary" className="text-xs">
                          {cert.issuer}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg leading-tight">{cert.title}</CardTitle>
                    </div>
                    <Link 
                      href={cert.verificationUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Button size="sm" variant="ghost">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  <CardDescription className="text-sm">{cert.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Earned in {cert.date}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground font-mono">
                      ID: {cert.credentialId}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}