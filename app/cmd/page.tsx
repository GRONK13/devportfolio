"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Terminal,
  LogOut,
  User,
  FolderGit2,
  Award,
  Briefcase,
  FileText,
  Save,
  Plus,
  Trash2,
  Upload,
  Loader2,
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Import initial data
import { personalInfo as initialPersonalInfo } from "@/data/personal-info";
import { projects as initialProjects } from "@/data/projects";
import { certificates as initialCertificates } from "@/data/certificates";
import { professionalExperience as initialProfExp, education as initialEdu } from "@/data/experience";

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  // States for data
  const [personalInfo, setPersonalInfo] = useState(initialPersonalInfo);
  const [projects, setProjects] = useState(initialProjects);
  const [certificates, setCertificates] = useState(initialCertificates);
  const [experience, setExperience] = useState({
    professionalExperience: initialProfExp,
    education: initialEdu,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // Verify auth on mount
    fetch("/api/auth/verify")
      .then((res) => {
        if (res.ok) {
          setIsAuthenticated(true);
        }
      })
      .catch((err) => console.error("Auth verification failed", err))
      .finally(() => setIsVerifying(false));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        const data = await res.json();
        setLoginError(data.error || "Invalid password");
      }
    } catch {
      setLoginError("Failed to connect to authentication server");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      });
      router.push("/");
    } catch {
      toast.error("Failed to logout");
    }
  };

  const handleSave = async (section: string, data: unknown) => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, data }),
      });

      if (res.ok) {
        toast.success("Changes committed to GitHub. Site will redeploy in ~30s.");
      } else {
        const result = await res.json();
        toast.error(result.error || `Failed to save ${section}`);
      }
    } catch {
      toast.error(`An error occurred while saving ${section}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUploadResume = async () => {
    if (!resumeFile) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", resumeFile);

    try {
      const res = await fetch("/api/admin/resume", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success("Resume uploaded successfully! Site will redeploy in ~30s.");
        setResumeFile(null);
        const fileInput = document.getElementById("resume-upload") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      } else {
        const result = await res.json();
        toast.error(result.error || "Failed to upload resume");
      }
    } catch {
      toast.error("An error occurred while uploading resume");
    } finally {
      setIsUploading(false);
    }
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-md glass-panel border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-mono text-zinc-100">
              <Terminal className="w-5 h-5" />
              {">"} ADMIN ACCESS REQUIRED
            </CardTitle>
            <CardDescription className="font-mono text-xs text-zinc-400">
              Please enter credentials to continue.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-zinc-900 border-zinc-700 text-zinc-100 focus-visible:ring-primary font-mono"
                  placeholder="Enter password..."
                  required
                />
              </div>
              {loginError && <p className="text-destructive text-sm font-mono">{loginError}</p>}
              <Button type="submit" className="w-full bg-primary text-primary-foreground font-mono" disabled={isLoggingIn}>
                {isLoggingIn ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                AUTHENTICATE
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "certificates", label: "Certificates", icon: Award },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "resume", label: "Resume", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-md">
              <Terminal className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-100">Portfolio Control Panel</h1>
              <p className="text-zinc-400 text-sm font-mono">System configuration and content management</p>
            </div>
          </div>
          <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:text-white" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </header>

        {/* Navigation */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <Button
                key={tab.id}
                variant={isActive ? "default" : "outline"}
                className={`rounded-full ${
                  isActive ? "bg-primary text-primary-foreground" : "border-zinc-700 text-zinc-300 hover:text-white"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </Button>
            );
          })}
        </div>

        {/* Content Area */}
        <main className="space-y-6">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" /> Personal Information
                </h2>
                <Button
                  onClick={() => handleSave("personal-info", personalInfo)}
                  disabled={isSaving}
                  className="bg-primary text-primary-foreground"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Save Profile
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-panel border-border/40">
                  <CardHeader>
                    <CardTitle className="text-lg">Basic Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Name</Label>
                      <Input
                        value={personalInfo.name}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                        className="bg-zinc-900 border-zinc-700 text-zinc-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Title</Label>
                      <Input
                        value={personalInfo.title}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, title: e.target.value })}
                        className="bg-zinc-900 border-zinc-700 text-zinc-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Subtitle</Label>
                      <Input
                        value={personalInfo.subtitle}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, subtitle: e.target.value })}
                        className="bg-zinc-900 border-zinc-700 text-zinc-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Bio</Label>
                      <Textarea
                        value={personalInfo.bio}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, bio: e.target.value })}
                        className="bg-zinc-900 border-zinc-700 text-zinc-100 min-h-[100px]"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-panel border-border/40">
                  <CardHeader>
                    <CardTitle className="text-lg">Contact & Location</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Email</Label>
                        <Input
                          value={personalInfo.email}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                          className="bg-zinc-900 border-zinc-700 text-zinc-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Phone</Label>
                        <Input
                          value={personalInfo.phone}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                          className="bg-zinc-900 border-zinc-700 text-zinc-100"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">City</Label>
                        <Input
                          value={personalInfo.location.city}
                          onChange={(e) =>
                            setPersonalInfo({
                              ...personalInfo,
                              location: { ...personalInfo.location, city: e.target.value },
                            })
                          }
                          className="bg-zinc-900 border-zinc-700 text-zinc-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Province</Label>
                        <Input
                          value={personalInfo.location.province}
                          onChange={(e) =>
                            setPersonalInfo({
                              ...personalInfo,
                              location: { ...personalInfo.location, province: e.target.value },
                            })
                          }
                          className="bg-zinc-900 border-zinc-700 text-zinc-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Country</Label>
                        <Input
                          value={personalInfo.location.country}
                          onChange={(e) =>
                            setPersonalInfo({
                              ...personalInfo,
                              location: { ...personalInfo.location, country: e.target.value },
                            })
                          }
                          className="bg-zinc-900 border-zinc-700 text-zinc-100"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Availability</Label>
                      <Input
                        value={personalInfo.location.availability}
                        onChange={(e) =>
                          setPersonalInfo({
                            ...personalInfo,
                            location: { ...personalInfo.location, availability: e.target.value },
                          })
                        }
                        className="bg-zinc-900 border-zinc-700 text-zinc-100"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-panel border-border/40 md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Links & SEO</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">GitHub URL</Label>
                        <Input
                          value={personalInfo.social.github}
                          onChange={(e) =>
                            setPersonalInfo({
                              ...personalInfo,
                              social: { ...personalInfo.social, github: e.target.value },
                            })
                          }
                          className="bg-zinc-900 border-zinc-700 text-zinc-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">LinkedIn URL</Label>
                        <Input
                          value={personalInfo.social.linkedin}
                          onChange={(e) =>
                            setPersonalInfo({
                              ...personalInfo,
                              social: { ...personalInfo.social, linkedin: e.target.value },
                            })
                          }
                          className="bg-zinc-900 border-zinc-700 text-zinc-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Website URL</Label>
                        <Input
                          value={personalInfo.website.url}
                          onChange={(e) =>
                            setPersonalInfo({
                              ...personalInfo,
                              website: { ...personalInfo.website, url: e.target.value },
                            })
                          }
                          className="bg-zinc-900 border-zinc-700 text-zinc-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Website Domain</Label>
                        <Input
                          value={personalInfo.website.domain}
                          onChange={(e) =>
                            setPersonalInfo({
                              ...personalInfo,
                              website: { ...personalInfo.website, domain: e.target.value },
                            })
                          }
                          className="bg-zinc-900 border-zinc-700 text-zinc-100"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">SEO Keywords (comma separated)</Label>
                      <Textarea
                        value={personalInfo.keywords?.join(", ")}
                        onChange={(e) =>
                          setPersonalInfo({
                            ...personalInfo,
                            keywords: e.target.value.split(",").map((k) => k.trim()),
                          })
                        }
                        className="bg-zinc-900 border-zinc-700 text-zinc-100"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-panel border-border/40 md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Descriptions & Story</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Short Description</Label>
                      <Input
                        value={personalInfo.descriptions.short}
                        onChange={(e) =>
                          setPersonalInfo({
                            ...personalInfo,
                            descriptions: { ...personalInfo.descriptions, short: e.target.value },
                          })
                        }
                        className="bg-zinc-900 border-zinc-700 text-zinc-100"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Medium Description</Label>
                        <Textarea
                          value={personalInfo.descriptions.medium}
                          onChange={(e) =>
                            setPersonalInfo({
                              ...personalInfo,
                              descriptions: { ...personalInfo.descriptions, medium: e.target.value },
                            })
                          }
                          className="bg-zinc-900 border-zinc-700 text-zinc-100 min-h-[100px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Long Description</Label>
                        <Textarea
                          value={personalInfo.descriptions.long}
                          onChange={(e) =>
                            setPersonalInfo({
                              ...personalInfo,
                              descriptions: { ...personalInfo.descriptions, long: e.target.value },
                            })
                          }
                          className="bg-zinc-900 border-zinc-700 text-zinc-100 min-h-[100px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Story: Beginning</Label>
                        <Textarea
                          value={personalInfo.story?.beginning || ""}
                          onChange={(e) =>
                            setPersonalInfo({
                              ...personalInfo,
                              story: { ...personalInfo.story, beginning: e.target.value },
                            })
                          }
                          className="bg-zinc-900 border-zinc-700 text-zinc-100 min-h-[100px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Story: Current</Label>
                        <Textarea
                          value={personalInfo.story?.current || ""}
                          onChange={(e) =>
                            setPersonalInfo({
                              ...personalInfo,
                              story: { ...personalInfo.story, current: e.target.value },
                            })
                          }
                          className="bg-zinc-900 border-zinc-700 text-zinc-100 min-h-[100px]"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FolderGit2 className="w-5 h-5 text-primary" /> Projects
                </h2>
                <Button
                  onClick={() => handleSave("projects", projects)}
                  disabled={isSaving}
                  className="bg-primary text-primary-foreground"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Save Projects
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                  <Card key={project.id} className="glass-panel border-border/40 relative">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-4 right-4 h-8 w-8"
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this project?")) {
                          setProjects(projects.filter((_, i) => i !== index));
                        }
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <CardHeader>
                      <CardTitle className="text-lg">Project {index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Title</Label>
                        <Input
                          value={project.title}
                          onChange={(e) => {
                            const newProjects = [...projects];
                            newProjects[index].title = e.target.value;
                            setProjects(newProjects);
                          }}
                          className="bg-zinc-900 border-zinc-700 text-zinc-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Description</Label>
                        <Textarea
                          value={project.description}
                          onChange={(e) => {
                            const newProjects = [...projects];
                            newProjects[index].description = e.target.value;
                            setProjects(newProjects);
                          }}
                          className="bg-zinc-900 border-zinc-700 text-zinc-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Image Path</Label>
                        <Input
                          value={project.image}
                          onChange={(e) => {
                            const newProjects = [...projects];
                            newProjects[index].image = e.target.value;
                            setProjects(newProjects);
                          }}
                          className="bg-zinc-900 border-zinc-700 text-zinc-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                          Technologies (comma separated)
                        </Label>
                        <Input
                          value={project.technologies.join(", ")}
                          onChange={(e) => {
                            const newProjects = [...projects];
                            newProjects[index].technologies = e.target.value.split(",").map((t) => t.trim());
                            setProjects(newProjects);
                          }}
                          className="bg-zinc-900 border-zinc-700 text-zinc-100"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">GitHub URL</Label>
                          <Input
                            value={project.githubUrl || ""}
                            onChange={(e) => {
                              const newProjects = [...projects];
                              newProjects[index].githubUrl = e.target.value;
                              setProjects(newProjects);
                            }}
                            className="bg-zinc-900 border-zinc-700 text-zinc-100"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Live URL</Label>
                          <Input
                            value={project.liveUrl || ""}
                            onChange={(e) => {
                              const newProjects = [...projects];
                              newProjects[index].liveUrl = e.target.value;
                              setProjects(newProjects);
                            }}
                            className="bg-zinc-900 border-zinc-700 text-zinc-100"
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 pt-2">
                        <input
                          type="checkbox"
                          id={`featured-${index}`}
                          checked={project.isFeatured}
                          onChange={(e) => {
                            const newProjects = [...projects];
                            newProjects[index].isFeatured = e.target.checked;
                            setProjects(newProjects);
                          }}
                          className="rounded border-zinc-700 bg-zinc-900 text-primary"
                        />
                        <Label htmlFor={`featured-${index}`} className="text-sm font-medium leading-none">
                          Featured Project
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Card className="glass-panel border-border/40 border-dashed flex items-center justify-center min-h-[300px]">
                  <Button
                    variant="ghost"
                    className="flex flex-col items-center gap-2 h-auto py-8 text-zinc-400 hover:text-white"
                    onClick={() => {
                      setProjects([
                        ...projects,
                        {
                          id: Date.now(),
                          title: "New Project",
                          description: "",
                          image: "",
                          technologies: [],
                          githubUrl: "",
                          liveUrl: "",
                          isFeatured: false,
                        },
                      ]);
                    }}
                  >
                    <Plus className="w-8 h-8" />
                    <span>Add Project</span>
                  </Button>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "certificates" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" /> Certificates
                </h2>
                <Button
                  onClick={() => handleSave("certificates", certificates)}
                  disabled={isSaving}
                  className="bg-primary text-primary-foreground"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Save Certificates
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificates.map((cert, index) => (
                  <Card key={cert.id} className="glass-panel border-border/40 relative">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-4 right-4 h-8 w-8"
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this certificate?")) {
                          setCertificates(certificates.filter((_, i) => i !== index));
                        }
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <CardHeader>
                      <CardTitle className="text-lg">Certificate {index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Title</Label>
                        <Input
                          value={cert.title}
                          onChange={(e) => {
                            const newCerts = [...certificates];
                            newCerts[index].title = e.target.value;
                            setCertificates(newCerts);
                          }}
                          className="bg-zinc-900 border-zinc-700 text-zinc-100"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Issuer</Label>
                          <Input
                            value={cert.issuer}
                            onChange={(e) => {
                              const newCerts = [...certificates];
                              newCerts[index].issuer = e.target.value;
                              setCertificates(newCerts);
                            }}
                            className="bg-zinc-900 border-zinc-700 text-zinc-100"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Date</Label>
                          <Input
                            value={cert.date}
                            onChange={(e) => {
                              const newCerts = [...certificates];
                              newCerts[index].date = e.target.value;
                              setCertificates(newCerts);
                            }}
                            className="bg-zinc-900 border-zinc-700 text-zinc-100"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Credential ID</Label>
                          <Input
                            value={cert.credentialId || ""}
                            onChange={(e) => {
                              const newCerts = [...certificates];
                              newCerts[index].credentialId = e.target.value;
                              setCertificates(newCerts);
                            }}
                            className="bg-zinc-900 border-zinc-700 text-zinc-100"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Verification URL</Label>
                          <Input
                            value={cert.verificationUrl || ""}
                            onChange={(e) => {
                              const newCerts = [...certificates];
                              newCerts[index].verificationUrl = e.target.value;
                              setCertificates(newCerts);
                            }}
                            className="bg-zinc-900 border-zinc-700 text-zinc-100"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                          Skills (comma separated)
                        </Label>
                        <Input
                          value={cert.skills?.join(", ") || ""}
                          onChange={(e) => {
                            const newCerts = [...certificates];
                            newCerts[index].skills = e.target.value.split(",").map((s) => s.trim());
                            setCertificates(newCerts);
                          }}
                          className="bg-zinc-900 border-zinc-700 text-zinc-100"
                        />
                      </div>
                      <div className="flex items-center space-x-2 pt-2">
                        <input
                          type="checkbox"
                          id={`featured-cert-${index}`}
                          checked={cert.isFeatured}
                          onChange={(e) => {
                            const newCerts = [...certificates];
                            newCerts[index].isFeatured = e.target.checked;
                            setCertificates(newCerts);
                          }}
                          className="rounded border-zinc-700 bg-zinc-900 text-primary"
                        />
                        <Label htmlFor={`featured-cert-${index}`} className="text-sm font-medium leading-none">
                          Featured Certificate
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card className="glass-panel border-border/40 border-dashed flex items-center justify-center min-h-[300px]">
                  <Button
                    variant="ghost"
                    className="flex flex-col items-center gap-2 h-auto py-8 text-zinc-400 hover:text-white"
                    onClick={() => {
                      setCertificates([
                        ...certificates,
                        {
                          id: Date.now(),
                          title: "New Certificate",
                          issuer: "",
                          date: "",
                          credentialId: "",
                          verificationUrl: "",
                          skills: [],
                          description: "",
                          isFeatured: false,
                        },
                      ]);
                    }}
                  >
                    <Plus className="w-8 h-8" />
                    <span>Add Certificate</span>
                  </Button>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "experience" && (
            <div className="space-y-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" /> Experience & Education
                </h2>
                <Button
                  onClick={() => handleSave("experience", experience)}
                  disabled={isSaving}
                  className="bg-primary text-primary-foreground"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Save Experience
                </Button>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-medium border-b border-zinc-800 pb-2">Professional Experience</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {experience.professionalExperience.map((exp, index) => (
                    <Card key={`exp-${index}`} className="glass-panel border-border/40 relative">
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-4 right-4 h-8 w-8"
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this experience?")) {
                            const newExp = [...experience.professionalExperience];
                            newExp.splice(index, 1);
                            setExperience({ ...experience, professionalExperience: newExp });
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <CardHeader>
                        <CardTitle className="text-lg">Role {index + 1}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Title</Label>
                          <Input
                            value={exp.title}
                            onChange={(e) => {
                              const newExp = [...experience.professionalExperience];
                              newExp[index].title = e.target.value;
                              setExperience({ ...experience, professionalExperience: newExp });
                            }}
                            className="bg-zinc-900 border-zinc-700 text-zinc-100"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Company</Label>
                            <Input
                              value={exp.company}
                              onChange={(e) => {
                                const newExp = [...experience.professionalExperience];
                                newExp[index].company = e.target.value;
                                setExperience({ ...experience, professionalExperience: newExp });
                              }}
                              className="bg-zinc-900 border-zinc-700 text-zinc-100"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Period</Label>
                            <Input
                              value={exp.period}
                              onChange={(e) => {
                                const newExp = [...experience.professionalExperience];
                                newExp[index].period = e.target.value;
                                setExperience({ ...experience, professionalExperience: newExp });
                              }}
                              className="bg-zinc-900 border-zinc-700 text-zinc-100"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Description</Label>
                          <Textarea
                            value={exp.description}
                            onChange={(e) => {
                              const newExp = [...experience.professionalExperience];
                              newExp[index].description = e.target.value;
                              setExperience({ ...experience, professionalExperience: newExp });
                            }}
                            className="bg-zinc-900 border-zinc-700 text-zinc-100"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                            Achievements (one per line)
                          </Label>
                          <Textarea
                            value={exp.achievements?.join("\n") || ""}
                            onChange={(e) => {
                              const newExp = [...experience.professionalExperience];
                              newExp[index].achievements = e.target.value.split("\n").filter((a) => a.trim() !== "");
                              setExperience({ ...experience, professionalExperience: newExp });
                            }}
                            className="bg-zinc-900 border-zinc-700 text-zinc-100 min-h-[100px]"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <Card className="glass-panel border-border/40 border-dashed flex items-center justify-center min-h-[300px]">
                    <Button
                      variant="ghost"
                      className="flex flex-col items-center gap-2 h-auto py-8 text-zinc-400 hover:text-white"
                      onClick={() => {
                        setExperience({
                          ...experience,
                          professionalExperience: [
                            ...experience.professionalExperience,
                            { title: "", company: "", period: "", description: "", achievements: [] },
                          ],
                        });
                      }}
                    >
                      <Plus className="w-8 h-8" />
                      <span>Add Experience</span>
                    </Button>
                  </Card>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-medium border-b border-zinc-800 pb-2">Education</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {experience.education.map((edu, index) => (
                    <Card key={`edu-${index}`} className="glass-panel border-border/40 relative">
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-4 right-4 h-8 w-8"
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this education entry?")) {
                            const newEdu = [...experience.education];
                            newEdu.splice(index, 1);
                            setExperience({ ...experience, education: newEdu });
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <CardHeader>
                        <CardTitle className="text-lg">Education {index + 1}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Degree</Label>
                          <Input
                            value={edu.degree}
                            onChange={(e) => {
                              const newEdu = [...experience.education];
                              newEdu[index].degree = e.target.value;
                              setExperience({ ...experience, education: newEdu });
                            }}
                            className="bg-zinc-900 border-zinc-700 text-zinc-100"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Institution</Label>
                            <Input
                              value={edu.institution}
                              onChange={(e) => {
                                const newEdu = [...experience.education];
                                newEdu[index].institution = e.target.value;
                                setExperience({ ...experience, education: newEdu });
                              }}
                              className="bg-zinc-900 border-zinc-700 text-zinc-100"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Period</Label>
                            <Input
                              value={edu.period}
                              onChange={(e) => {
                                const newEdu = [...experience.education];
                                newEdu[index].period = e.target.value;
                                setExperience({ ...experience, education: newEdu });
                              }}
                              className="bg-zinc-900 border-zinc-700 text-zinc-100"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">GPA (Optional)</Label>
                          <Input
                            value={edu.gpa || ""}
                            onChange={(e) => {
                              const newEdu = [...experience.education];
                              newEdu[index].gpa = e.target.value;
                              setExperience({ ...experience, education: newEdu });
                            }}
                            className="bg-zinc-900 border-zinc-700 text-zinc-100"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Description</Label>
                          <Textarea
                            value={edu.description}
                            onChange={(e) => {
                              const newEdu = [...experience.education];
                              newEdu[index].description = e.target.value;
                              setExperience({ ...experience, education: newEdu });
                            }}
                            className="bg-zinc-900 border-zinc-700 text-zinc-100"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                            Honors (one per line)
                          </Label>
                          <Textarea
                            value={edu.honors?.join("\n") || ""}
                            onChange={(e) => {
                              const newEdu = [...experience.education];
                              newEdu[index].honors = e.target.value.split("\n").filter((h) => h.trim() !== "");
                              setExperience({ ...experience, education: newEdu });
                            }}
                            className="bg-zinc-900 border-zinc-700 text-zinc-100 min-h-[100px]"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <Card className="glass-panel border-border/40 border-dashed flex items-center justify-center min-h-[300px]">
                    <Button
                      variant="ghost"
                      className="flex flex-col items-center gap-2 h-auto py-8 text-zinc-400 hover:text-white"
                      onClick={() => {
                        setExperience({
                          ...experience,
                          education: [
                            ...experience.education,
                            { degree: "", institution: "", period: "", description: "", honors: [] },
                          ],
                        });
                      }}
                    >
                      <Plus className="w-8 h-8" />
                      <span>Add Education</span>
                    </Button>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {activeTab === "resume" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" /> Resume Management
              </h2>

              <Card className="glass-panel border-border/40 max-w-2xl">
                <CardHeader>
                  <CardTitle>Upload New Resume</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Upload a PDF file to replace your current resume at {personalInfo.resume.path}.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="resume-upload" className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                      Select PDF File
                    </Label>
                    <Input
                      id="resume-upload"
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                      className="bg-zinc-900 border-zinc-700 text-zinc-100 file:bg-zinc-800 file:text-zinc-100 file:border-0 file:mr-4 file:px-4 file:py-2 file:rounded-md cursor-pointer"
                    />
                  </div>
                  <Button
                    onClick={handleUploadResume}
                    disabled={!resumeFile || isUploading}
                    className="w-full bg-primary text-primary-foreground"
                  >
                    {isUploading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4 mr-2" />
                    )}
                    {isUploading ? "Uploading..." : "Upload Resume"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
