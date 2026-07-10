"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Award, Calendar } from "lucide-react";
import Link from "next/link";
import { certificates } from "@/data/certificates";

export function CertificatesFull() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-transparent">
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

        <div className="flex flex-wrap justify-center gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="w-full max-w-sm"
            >
              <Card className="group glass-panel hover:border-primary/45 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 h-full border-border/40">
                <CardHeader className="pb-3 flex-grow">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="h-5 w-5 text-primary" />
                        <Badge variant="secondary" className="text-xs font-mono">
                          {cert.issuer}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">{cert.title}</CardTitle>
                    </div>
                    <Link 
                      href={cert.verificationUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  <CardDescription className="text-xs leading-normal mt-2">{cert.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0 border-t border-border/20 mt-auto pb-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground pt-3 pb-3 font-mono">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    <span>Earned in {cert.date}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-[10px] text-muted-foreground font-mono bg-muted/40 p-1 px-2 rounded break-all border border-border/30">
                      Credential ID: {cert.credentialId}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-[9px] py-0 px-2 font-mono">
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