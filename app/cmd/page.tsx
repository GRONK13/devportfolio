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
  Code2,
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SkillIcon } from "@/components/skill-icon";

// Import initial data and types
import { personalInfo as initialPersonalInfo, CoreValue, PersonalInfo } from "@/data/personal-info";
import { projects as initialProjects, Project } from "@/data/projects";
import { certificates as initialCertificates, Certificate } from "@/data/certificates";
import {
  professionalExperience as initialProfExp,
  education as initialEdu,
  ExperienceItem,
  EducationItem,
} from "@/data/experience";
import { skillsList as initialSkillsList, Skill, SkillCategory } from "@/data/skills";

interface AdminSkill extends Skill {
  _id: string;
}

interface AdminCoreValue extends CoreValue {
  _id: string;
}

interface AdminPersonalInfo extends Omit<PersonalInfo, "coreValues"> {
  coreValues: AdminCoreValue[];
}

interface AdminExperienceItem extends ExperienceItem {
  _id: string;
}

interface AdminEducationItem extends EducationItem {
  _id: string;
}

const SKILL_CATEGORIES: SkillCategory[] = [
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Tools",
];

const CORE_VALUE_ICON_PRESETS = ["Code", "Lightbulb", "Users", "Zap"];

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  // Profile data
  const [personalInfo, setPersonalInfo] = useState<AdminPersonalInfo>(() => ({
    ...initialPersonalInfo,
    coreValues: (initialPersonalInfo.coreValues || []).map((v, i) => ({
      ...v,
      _id: `val-${i}`,
    })),
  }));
  const [keywordsInput, setKeywordsInput] = useState(
    () => initialPersonalInfo.keywords?.join(", ") || ""
  );

  // Projects data
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [projectTechInputs, setProjectTechInputs] = useState<Record<number, string>>({});

  // Certificates data
  const [certificates, setCertificates] = useState<Certificate[]>(initialCertificates);
  const [certSkillsInputs, setCertSkillsInputs] = useState<Record<number, string>>({});

  // Experience data
  const [experience, setExperience] = useState<{
    professionalExperience: AdminExperienceItem[];
    education: AdminEducationItem[];
  }>(() => ({
    professionalExperience: initialProfExp.map((exp, i) => ({
      ...exp,
      _id: `exp-${i}`,
    })),
    education: initialEdu.map((edu, i) => ({
      ...edu,
      _id: `edu-${i}`,
    })),
  }));
  const [expAchievementsInputs, setExpAchievementsInputs] = useState<Record<string, string>>({});
  const [eduHonorsInputs, setEduHonorsInputs] = useState<Record<string, string>>({});

  // Skills data
  const [skills, setSkills] = useState<AdminSkill[]>(() =>
    initialSkillsList.map((s, i) => ({
      ...s,
      _id: `skill-${i}`,
    }))
  );

  // Delete confirmation modal state
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    description: "",
    onConfirm: () => {},
  });

  const confirmDelete = (title: string, description: string, onConfirm: () => void) => {
    setDeleteConfirm({
      isOpen: true,
      title,
      description,
      onConfirm,
    });
  };

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

  const handleSaveProfile = () => {
    const toSave = {
      ...personalInfo,
      keywords: keywordsInput
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
      coreValues: (personalInfo.coreValues || []).map((val) => ({
        title: val.title,
        description: val.description,
        icon: val.icon,
      })),
    };
    handleSave("personal-info", toSave);
  };

  const handleSaveSkills = () => {
    const toSave = skills.map((skill) => ({
      name: skill.name,
      category: skill.category,
      iconSlug: skill.iconSlug,
      color: skill.color || "text-white",
    }));
    handleSave("skills", toSave);
  };

  const handleSaveProjects = () => {
    const toSave = projects.map((p) => {
      const rawTech =
        projectTechInputs[p.id] !== undefined
          ? projectTechInputs[p.id]
          : p.technologies?.join(", ") || "";
      return {
        ...p,
        technologies: rawTech
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };
    });
    handleSave("projects", toSave);
  };

  const handleSaveCertificates = () => {
    const toSave = certificates.map((c) => {
      const rawSkills =
        certSkillsInputs[c.id] !== undefined
          ? certSkillsInputs[c.id]
          : c.skills?.join(", ") || "";
      return {
        ...c,
        description: c.description || "",
        skills: rawSkills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };
    });
    handleSave("certificates", toSave);
  };

  const handleSaveExperience = () => {
    const toSave = {
      professionalExperience: experience.professionalExperience.map((exp) => {
        const rawAch =
          expAchievementsInputs[exp._id] !== undefined
            ? expAchievementsInputs[exp._id]
            : exp.achievements?.join("\n") || "";
        return {
          title: exp.title,
          company: exp.company,
          period: exp.period,
          description: exp.description,
          achievements: rawAch
            .split("\n")
            .map((a) => a.trim())
            .filter(Boolean),
        };
      }),
      education: experience.education.map((edu) => {
        const rawHon =
          eduHonorsInputs[edu._id] !== undefined
            ? eduHonorsInputs[edu._id]
            : edu.honors?.join("\n") || "";
        return {
          degree: edu.degree,
          institution: edu.institution,
          period: edu.period,
          description: edu.description,
          gpa: edu.gpa,
          honors: rawHon
            .split("\n")
            .map((h) => h.trim())
            .filter(Boolean),
        };
      }),
    };
    handleSave("experience", toSave);
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
    { id: "skills", label: "Skills", icon: Code2 },
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
          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" /> Personal Information
                </h2>
                <Button
                  onClick={handleSaveProfile}
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
                        onChange={(e) => setPersonalInfo((prev) => ({ ...prev, name: e.target.value }))}
                        className="bg-zinc-900 border-zinc-700 text-zinc-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Title</Label>
                      <Input
                        value={personalInfo.title}
                        onChange={(e) => setPersonalInfo((prev) => ({ ...prev, title: e.target.value }))}
                        className="bg-zinc-900 border-zinc-700 text-zinc-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Subtitle</Label>
                      <Input
                        value={personalInfo.subtitle}
                        onChange={(e) => setPersonalInfo((prev) => ({ ...prev, subtitle: e.target.value }))}
                        className="bg-zinc-900 border-zinc-700 text-zinc-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Bio</Label>
                      <Textarea
                        value={personalInfo.bio}
                        onChange={(e) => setPersonalInfo((prev) => ({ ...prev, bio: e.target.value }))}
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
                          onChange={(e) => setPersonalInfo((prev) => ({ ...prev, email: e.target.value }))}
                          className="bg-zinc-900 border-zinc-700 text-zinc-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Phone</Label>
                        <Input
                          value={personalInfo.phone}
                          onChange={(e) => setPersonalInfo((prev) => ({ ...prev, phone: e.target.value }))}
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
                            setPersonalInfo((prev) => ({
                              ...prev,
                              location: { ...prev.location, city: e.target.value },
                            }))
                          }
                          className="bg-zinc-900 border-zinc-700 text-zinc-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Province</Label>
                        <Input
                          value={personalInfo.location.province}
                          onChange={(e) =>
                            setPersonalInfo((prev) => ({
                              ...prev,
                              location: { ...prev.location, province: e.target.value },
                            }))
                          }
                          className="bg-zinc-900 border-zinc-700 text-zinc-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Country</Label>
                        <Input
                          value={personalInfo.location.country}
                          onChange={(e) =>
                            setPersonalInfo((prev) => ({
                              ...prev,
                              location: { ...prev.location, country: e.target.value },
                            }))
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
                          setPersonalInfo((prev) => ({
                            ...prev,
                            location: { ...prev.location, availability: e.target.value },
                          }))
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
                            setPersonalInfo((prev) => ({
                              ...prev,
                              social: { ...prev.social, github: e.target.value },
                            }))
                          }
                          className="bg-zinc-900 border-zinc-700 text-zinc-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">LinkedIn URL</Label>
                        <Input
                          value={personalInfo.social.linkedin}
                          onChange={(e) =>
                            setPersonalInfo((prev) => ({
                              ...prev,
                              social: { ...prev.social, linkedin: e.target.value },
                            }))
                          }
                          className="bg-zinc-900 border-zinc-700 text-zinc-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Website URL</Label>
                        <Input
                          value={personalInfo.website.url}
                          onChange={(e) =>
                            setPersonalInfo((prev) => ({
                              ...prev,
                              website: { ...prev.website, url: e.target.value },
                            }))
                          }
                          className="bg-zinc-900 border-zinc-700 text-zinc-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Website Domain</Label>
                        <Input
                          value={personalInfo.website.domain}
                          onChange={(e) =>
                            setPersonalInfo((prev) => ({
                              ...prev,
                              website: { ...prev.website, domain: e.target.value },
                            }))
                          }
                          className="bg-zinc-900 border-zinc-700 text-zinc-100"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                        SEO Keywords (comma separated)
                      </Label>
                      <Textarea
                        value={keywordsInput}
                        onChange={(e) => setKeywordsInput(e.target.value)}
                        className="bg-zinc-900 border-zinc-700 text-zinc-100"
                        placeholder="e.g. Next.js Developer, React, TypeScript, Full Stack Developer"
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
                          setPersonalInfo((prev) => ({
                            ...prev,
                            descriptions: { ...prev.descriptions, short: e.target.value },
                          }))
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
                            setPersonalInfo((prev) => ({
                              ...prev,
                              descriptions: { ...prev.descriptions, medium: e.target.value },
                            }))
                          }
                          className="bg-zinc-900 border-zinc-700 text-zinc-100 min-h-[100px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Long Description</Label>
                        <Textarea
                          value={personalInfo.descriptions.long}
                          onChange={(e) =>
                            setPersonalInfo((prev) => ({
                              ...prev,
                              descriptions: { ...prev.descriptions, long: e.target.value },
                            }))
                          }
                          className="bg-zinc-900 border-zinc-700 text-zinc-100 min-h-[100px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Story: Beginning</Label>
                        <Textarea
                          value={personalInfo.story?.beginning || ""}
                          onChange={(e) =>
                            setPersonalInfo((prev) => ({
                              ...prev,
                              story: { ...prev.story, beginning: e.target.value },
                            }))
                          }
                          className="bg-zinc-900 border-zinc-700 text-zinc-100 min-h-[100px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Story: Current</Label>
                        <Textarea
                          value={personalInfo.story?.current || ""}
                          onChange={(e) =>
                            setPersonalInfo((prev) => ({
                              ...prev,
                              story: { ...prev.story, current: e.target.value },
                            }))
                          }
                          className="bg-zinc-900 border-zinc-700 text-zinc-100 min-h-[100px]"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Story: Personal</Label>
                        <Textarea
                          value={personalInfo.story?.personal || ""}
                          onChange={(e) =>
                            setPersonalInfo((prev) => ({
                              ...prev,
                              story: { ...prev.story, personal: e.target.value },
                            }))
                          }
                          className="bg-zinc-900 border-zinc-700 text-zinc-100 min-h-[100px]"
                          placeholder="What you do when not coding, hobbies, interests..."
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Core Values Editor */}
                <Card className="glass-panel border-border/40 md:col-span-2">
                  <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <div>
                      <CardTitle className="text-lg">Core Values</CardTitle>
                      <CardDescription className="text-zinc-400">
                        Principles and values displayed in the &quot;What Drives Me&quot; section
                      </CardDescription>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-zinc-700 text-zinc-300 hover:text-white"
                      onClick={() => {
                        const newId = `val-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
                        setPersonalInfo((prev) => ({
                          ...prev,
                          coreValues: [
                            ...(prev.coreValues || []),
                            { _id: newId, title: "New Value", description: "", icon: "Code" },
                          ],
                        }));
                      }}
                    >
                      <Plus className="w-4 h-4 mr-1" /> Add Value
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {(!personalInfo.coreValues || personalInfo.coreValues.length === 0) ? (
                      <p className="text-sm text-zinc-400 italic">No core values added yet.</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {personalInfo.coreValues.map((val) => (
                          <Card key={val._id} className="bg-zinc-900/60 border-zinc-800 relative">
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute top-3 right-3 h-7 w-7"
                              onClick={() => {
                                confirmDelete(
                                  "Delete Core Value",
                                  `Are you sure you want to delete "${val.title || "Untitled"}"?`,
                                  () => {
                                    setPersonalInfo((prev) => ({
                                      ...prev,
                                      coreValues: (prev.coreValues || []).filter((v) => v._id !== val._id),
                                    }));
                                  }
                                );
                              }}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                            <CardContent className="pt-4 space-y-3">
                              <div className="space-y-1.5 pr-8">
                                <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Title</Label>
                                <Input
                                  value={val.title}
                                  onChange={(e) => {
                                    const text = e.target.value;
                                    setPersonalInfo((prev) => ({
                                      ...prev,
                                      coreValues: (prev.coreValues || []).map((v) =>
                                        v._id === val._id ? { ...v, title: text } : v
                                      ),
                                    }));
                                  }}
                                  className="bg-zinc-900 border-zinc-700 text-zinc-100"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Icon Name / Slug</Label>
                                  <span className="text-[11px] font-mono text-zinc-400">Preset: Code, Lightbulb, Users, Zap</span>
                                </div>
                                <div className="flex gap-2">
                                  <Input
                                    value={val.icon}
                                    onChange={(e) => {
                                      const text = e.target.value;
                                      setPersonalInfo((prev) => ({
                                        ...prev,
                                        coreValues: (prev.coreValues || []).map((v) =>
                                          v._id === val._id ? { ...v, icon: text } : v
                                        ),
                                      }));
                                    }}
                                    className="bg-zinc-900 border-zinc-700 text-zinc-100 font-mono text-xs flex-1"
                                    placeholder="e.g. Code, Lightbulb, Users, Zap"
                                  />
                                  <select
                                    value={CORE_VALUE_ICON_PRESETS.includes(val.icon) ? val.icon : "custom"}
                                    onChange={(e) => {
                                      if (e.target.value !== "custom") {
                                        const selected = e.target.value;
                                        setPersonalInfo((prev) => ({
                                          ...prev,
                                          coreValues: (prev.coreValues || []).map((v) =>
                                            v._id === val._id ? { ...v, icon: selected } : v
                                          ),
                                        }));
                                      }
                                    }}
                                    className="bg-zinc-900 border border-zinc-700 rounded-md px-2 text-xs text-zinc-300 focus:outline-none"
                                  >
                                    <option value="custom" disabled>Preset...</option>
                                    {CORE_VALUE_ICON_PRESETS.map((iconName) => (
                                      <option key={iconName} value={iconName} className="bg-zinc-900 text-zinc-100">
                                        {iconName}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              <div className="space-y-1.5">
                                <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Description</Label>
                                <Textarea
                                  value={val.description}
                                  onChange={(e) => {
                                    const text = e.target.value;
                                    setPersonalInfo((prev) => ({
                                      ...prev,
                                      coreValues: (prev.coreValues || []).map((v) =>
                                        v._id === val._id ? { ...v, description: text } : v
                                      ),
                                    }));
                                  }}
                                  className="bg-zinc-900 border-zinc-700 text-zinc-100 min-h-[80px]"
                                />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* SKILLS TAB */}
          {activeTab === "skills" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-primary" /> Skills & Technologies
                  </h2>
                  <p className="text-zinc-400 text-sm font-mono mt-1">
                    Manage technical skills grouped by category
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => {
                      const newSkill: AdminSkill = {
                        _id: `skill-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                        name: "New Skill",
                        category: "Frontend",
                        iconSlug: "react",
                        color: "text-white",
                      };
                      setSkills((prev) => [...prev, newSkill]);
                    }}
                    variant="outline"
                    className="border-zinc-700 text-zinc-300 hover:text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Skill
                  </Button>
                  <Button
                    onClick={handleSaveSkills}
                    disabled={isSaving}
                    className="bg-primary text-primary-foreground"
                  >
                    {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Skills
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                {SKILL_CATEGORIES.map((category) => {
                  const categorySkills = skills.filter((s) => s.category === category);

                  return (
                    <Card key={category} className="glass-panel border-border/40">
                      <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-800/80 pb-4">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{category}</CardTitle>
                          <span className="text-xs font-mono bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">
                            {categorySkills.length} {categorySkills.length === 1 ? "skill" : "skills"}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-zinc-700 text-zinc-300 hover:text-white text-xs"
                          onClick={() => {
                            const newSkill: AdminSkill = {
                              _id: `skill-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                              name: "New Skill",
                              category,
                              iconSlug: "code",
                              color: "text-white",
                            };
                            setSkills((prev) => [...prev, newSkill]);
                          }}
                        >
                          <Plus className="w-3.5 h-3.5 mr-1" /> Add {category} Skill
                        </Button>
                      </CardHeader>
                      <CardContent className="pt-6">
                        {categorySkills.length === 0 ? (
                          <div className="py-6 text-center text-sm text-zinc-400 italic">
                            No skills in this category yet. Click &quot;Add {category} Skill&quot; to add one.
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {categorySkills.map((skill) => (
                              <Card key={skill._id} className="bg-zinc-900/60 border-zinc-800 relative">
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  className="absolute top-3 right-3 h-7 w-7"
                                  onClick={() => {
                                    confirmDelete(
                                      "Delete Skill",
                                      `Are you sure you want to delete the skill "${skill.name || "Untitled"}"?`,
                                      () => {
                                        setSkills((prev) => prev.filter((s) => s._id !== skill._id));
                                      }
                                    );
                                  }}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                                <CardContent className="pt-4 space-y-3">
                                  <div className="space-y-1.5 pr-8">
                                    <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Skill Name</Label>
                                    <Input
                                      value={skill.name}
                                      onChange={(e) => {
                                        const text = e.target.value;
                                        setSkills((prev) =>
                                          prev.map((s) => (s._id === skill._id ? { ...s, name: text } : s))
                                        );
                                      }}
                                      className="bg-zinc-900 border-zinc-700 text-zinc-100 h-9"
                                      placeholder="e.g. React"
                                    />
                                  </div>
                                  <div className="space-y-1.5">
                                    <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Category</Label>
                                    <select
                                      value={skill.category}
                                      onChange={(e) => {
                                        const newCategory = e.target.value as SkillCategory;
                                        setSkills((prev) =>
                                          prev.map((s) =>
                                            s._id === skill._id ? { ...s, category: newCategory } : s
                                          )
                                        );
                                      }}
                                      className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-1.5 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-primary"
                                    >
                                      {SKILL_CATEGORIES.map((cat) => (
                                        <option key={cat} value={cat} className="bg-zinc-900 text-zinc-100">
                                          {cat}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                      <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Icon Slug</Label>
                                      <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                                        <span>Preview:</span>
                                        <div className="p-1 rounded bg-zinc-800 text-primary inline-flex items-center justify-center">
                                          <SkillIcon slug={skill.iconSlug} size={16} />
                                        </div>
                                      </div>
                                    </div>
                                    <Input
                                      value={skill.iconSlug}
                                      onChange={(e) => {
                                        const text = e.target.value;
                                        setSkills((prev) =>
                                          prev.map((s) => (s._id === skill._id ? { ...s, iconSlug: text } : s))
                                        );
                                      }}
                                      className="bg-zinc-900 border-zinc-700 text-zinc-100 h-9 font-mono text-xs"
                                      placeholder="e.g. react, nextjs, docker"
                                    />
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FolderGit2 className="w-5 h-5 text-primary" /> Projects
                </h2>
                <Button
                  onClick={handleSaveProjects}
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
                        confirmDelete(
                          "Delete Project",
                          `Are you sure you want to delete "${project.title || "this project"}"?`,
                          () => {
                            setProjects((prev) => prev.filter((p) => p.id !== project.id));
                            setProjectTechInputs((prev) => {
                              const copy = { ...prev };
                              delete copy[project.id];
                              return copy;
                            });
                          }
                        );
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
                            const val = e.target.value;
                            setProjects((prev) =>
                              prev.map((p) => (p.id === project.id ? { ...p, title: val } : p))
                            );
                          }}
                          className="bg-zinc-900 border-zinc-700 text-zinc-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Description</Label>
                        <Textarea
                          value={project.description}
                          onChange={(e) => {
                            const val = e.target.value;
                            setProjects((prev) =>
                              prev.map((p) => (p.id === project.id ? { ...p, description: val } : p))
                            );
                          }}
                          className="bg-zinc-900 border-zinc-700 text-zinc-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Image Path</Label>
                        <Input
                          value={project.image}
                          onChange={(e) => {
                            const val = e.target.value;
                            setProjects((prev) =>
                              prev.map((p) => (p.id === project.id ? { ...p, image: val } : p))
                            );
                          }}
                          className="bg-zinc-900 border-zinc-700 text-zinc-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                          Technologies (comma separated)
                        </Label>
                        <Input
                          value={projectTechInputs[project.id] ?? project.technologies?.join(", ") ?? ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            setProjectTechInputs((prev) => ({ ...prev, [project.id]: val }));
                          }}
                          className="bg-zinc-900 border-zinc-700 text-zinc-100"
                          placeholder="e.g. Next.js, TypeScript, Tailwind CSS"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">GitHub URL</Label>
                          <Input
                            value={project.githubUrl || ""}
                            onChange={(e) => {
                              const val = e.target.value;
                              setProjects((prev) =>
                                prev.map((p) => (p.id === project.id ? { ...p, githubUrl: val } : p))
                              );
                            }}
                            className="bg-zinc-900 border-zinc-700 text-zinc-100"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Live URL</Label>
                          <Input
                            value={project.liveUrl || ""}
                            onChange={(e) => {
                              const val = e.target.value;
                              setProjects((prev) =>
                                prev.map((p) => (p.id === project.id ? { ...p, liveUrl: val } : p))
                              );
                            }}
                            className="bg-zinc-900 border-zinc-700 text-zinc-100"
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 pt-2">
                        <input
                          type="checkbox"
                          id={`featured-${project.id}`}
                          checked={project.isFeatured}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setProjects((prev) =>
                              prev.map((p) => (p.id === project.id ? { ...p, isFeatured: checked } : p))
                            );
                          }}
                          className="rounded border-zinc-700 bg-zinc-900 text-primary"
                        />
                        <Label htmlFor={`featured-${project.id}`} className="text-sm font-medium leading-none">
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
                      const newId = Date.now();
                      setProjects((prev) => [
                        ...prev,
                        {
                          id: newId,
                          title: "New Project",
                          description: "",
                          image: "",
                          technologies: [],
                          githubUrl: "",
                          liveUrl: "",
                          isFeatured: false,
                        },
                      ]);
                      setProjectTechInputs((prev) => ({ ...prev, [newId]: "" }));
                    }}
                  >
                    <Plus className="w-8 h-8" />
                    <span>Add Project</span>
                  </Button>
                </Card>
              </div>
            </div>
          )}

          {/* CERTIFICATES TAB */}
          {activeTab === "certificates" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" /> Certificates
                </h2>
                <Button
                  onClick={handleSaveCertificates}
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
                        confirmDelete(
                          "Delete Certificate",
                          `Are you sure you want to delete "${cert.title || "this certificate"}"?`,
                          () => {
                            setCertificates((prev) => prev.filter((c) => c.id !== cert.id));
                            setCertSkillsInputs((prev) => {
                              const copy = { ...prev };
                              delete copy[cert.id];
                              return copy;
                            });
                          }
                        );
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
                            const val = e.target.value;
                            setCertificates((prev) =>
                              prev.map((c) => (c.id === cert.id ? { ...c, title: val } : c))
                            );
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
                              const val = e.target.value;
                              setCertificates((prev) =>
                                prev.map((c) => (c.id === cert.id ? { ...c, issuer: val } : c))
                              );
                            }}
                            className="bg-zinc-900 border-zinc-700 text-zinc-100"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Date</Label>
                          <Input
                            value={cert.date}
                            onChange={(e) => {
                              const val = e.target.value;
                              setCertificates((prev) =>
                                prev.map((c) => (c.id === cert.id ? { ...c, date: val } : c))
                              );
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
                              const val = e.target.value;
                              setCertificates((prev) =>
                                prev.map((c) => (c.id === cert.id ? { ...c, credentialId: val } : c))
                              );
                            }}
                            className="bg-zinc-900 border-zinc-700 text-zinc-100"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Verification URL</Label>
                          <Input
                            value={cert.verificationUrl || ""}
                            onChange={(e) => {
                              const val = e.target.value;
                              setCertificates((prev) =>
                                prev.map((c) => (c.id === cert.id ? { ...c, verificationUrl: val } : c))
                              );
                            }}
                            className="bg-zinc-900 border-zinc-700 text-zinc-100"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Description</Label>
                        <Textarea
                          value={cert.description || ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCertificates((prev) =>
                              prev.map((c) => (c.id === cert.id ? { ...c, description: val } : c))
                            );
                          }}
                          className="bg-zinc-900 border-zinc-700 text-zinc-100 min-h-[75px]"
                          placeholder="Brief description of the certificate..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                          Skills (comma separated)
                        </Label>
                        <Input
                          value={certSkillsInputs[cert.id] ?? cert.skills?.join(", ") ?? ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCertSkillsInputs((prev) => ({ ...prev, [cert.id]: val }));
                          }}
                          className="bg-zinc-900 border-zinc-700 text-zinc-100"
                          placeholder="e.g. Cybersecurity, Threat Detection, Cryptography"
                        />
                      </div>
                      <div className="flex items-center space-x-2 pt-2">
                        <input
                          type="checkbox"
                          id={`featured-cert-${cert.id}`}
                          checked={cert.isFeatured}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setCertificates((prev) =>
                              prev.map((c) => (c.id === cert.id ? { ...c, isFeatured: checked } : c))
                            );
                          }}
                          className="rounded border-zinc-700 bg-zinc-900 text-primary"
                        />
                        <Label htmlFor={`featured-cert-${cert.id}`} className="text-sm font-medium leading-none">
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
                      const newId = Date.now();
                      setCertificates((prev) => [
                        ...prev,
                        {
                          id: newId,
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
                      setCertSkillsInputs((prev) => ({ ...prev, [newId]: "" }));
                    }}
                  >
                    <Plus className="w-8 h-8" />
                    <span>Add Certificate</span>
                  </Button>
                </Card>
              </div>
            </div>
          )}

          {/* EXPERIENCE & EDUCATION TAB */}
          {activeTab === "experience" && (
            <div className="space-y-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" /> Experience & Education
                </h2>
                <Button
                  onClick={handleSaveExperience}
                  disabled={isSaving}
                  className="bg-primary text-primary-foreground"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Save Experience
                </Button>
              </div>

              {/* Professional Experience */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium border-b border-zinc-800 pb-2">Professional Experience</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {experience.professionalExperience.map((exp, index) => (
                    <Card key={exp._id} className="glass-panel border-border/40 relative">
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-4 right-4 h-8 w-8"
                        onClick={() => {
                          confirmDelete(
                            "Delete Experience",
                            `Are you sure you want to delete "${exp.title || "this role"}" at ${exp.company || "this company"}?`,
                            () => {
                              setExperience((prev) => ({
                                ...prev,
                                professionalExperience: prev.professionalExperience.filter((e) => e._id !== exp._id),
                              }));
                              setExpAchievementsInputs((prev) => {
                                const copy = { ...prev };
                                delete copy[exp._id];
                                return copy;
                              });
                            }
                          );
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
                              const val = e.target.value;
                              setExperience((prev) => ({
                                ...prev,
                                professionalExperience: prev.professionalExperience.map((e) =>
                                  e._id === exp._id ? { ...e, title: val } : e
                                ),
                              }));
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
                                const val = e.target.value;
                                setExperience((prev) => ({
                                  ...prev,
                                  professionalExperience: prev.professionalExperience.map((e) =>
                                    e._id === exp._id ? { ...e, company: val } : e
                                  ),
                                }));
                              }}
                              className="bg-zinc-900 border-zinc-700 text-zinc-100"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Period</Label>
                            <Input
                              value={exp.period}
                              onChange={(e) => {
                                const val = e.target.value;
                                setExperience((prev) => ({
                                  ...prev,
                                  professionalExperience: prev.professionalExperience.map((e) =>
                                    e._id === exp._id ? { ...e, period: val } : e
                                  ),
                                }));
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
                              const val = e.target.value;
                              setExperience((prev) => ({
                                ...prev,
                                professionalExperience: prev.professionalExperience.map((e) =>
                                  e._id === exp._id ? { ...e, description: val } : e
                                ),
                              }));
                            }}
                            className="bg-zinc-900 border-zinc-700 text-zinc-100"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                            Achievements (one per line)
                          </Label>
                          <Textarea
                            value={expAchievementsInputs[exp._id] ?? exp.achievements?.join("\n") ?? ""}
                            onChange={(e) => {
                              const val = e.target.value;
                              setExpAchievementsInputs((prev) => ({ ...prev, [exp._id]: val }));
                            }}
                            className="bg-zinc-900 border-zinc-700 text-zinc-100 min-h-[100px]"
                            placeholder="Enter achievements (one per line)..."
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
                        const newId = `exp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
                        setExperience((prev) => ({
                          ...prev,
                          professionalExperience: [
                            ...prev.professionalExperience,
                            {
                              _id: newId,
                              title: "",
                              company: "",
                              period: "",
                              description: "",
                              achievements: [],
                            },
                          ],
                        }));
                        setExpAchievementsInputs((prev) => ({ ...prev, [newId]: "" }));
                      }}
                    >
                      <Plus className="w-8 h-8" />
                      <span>Add Experience</span>
                    </Button>
                  </Card>
                </div>
              </div>

              {/* Education */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium border-b border-zinc-800 pb-2">Education</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {experience.education.map((edu, index) => (
                    <Card key={edu._id} className="glass-panel border-border/40 relative">
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-4 right-4 h-8 w-8"
                        onClick={() => {
                          confirmDelete(
                            "Delete Education",
                            `Are you sure you want to delete "${edu.degree || "this education"}" at ${edu.institution || "this institution"}?`,
                            () => {
                              setExperience((prev) => ({
                                ...prev,
                                education: prev.education.filter((e) => e._id !== edu._id),
                              }));
                              setEduHonorsInputs((prev) => {
                                const copy = { ...prev };
                                delete copy[edu._id];
                                return copy;
                              });
                            }
                          );
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
                              const val = e.target.value;
                              setExperience((prev) => ({
                                ...prev,
                                education: prev.education.map((e) =>
                                  e._id === edu._id ? { ...e, degree: val } : e
                                ),
                              }));
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
                                const val = e.target.value;
                                setExperience((prev) => ({
                                  ...prev,
                                  education: prev.education.map((e) =>
                                    e._id === edu._id ? { ...e, institution: val } : e
                                  ),
                                }));
                              }}
                              className="bg-zinc-900 border-zinc-700 text-zinc-100"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Period</Label>
                            <Input
                              value={edu.period}
                              onChange={(e) => {
                                const val = e.target.value;
                                setExperience((prev) => ({
                                  ...prev,
                                  education: prev.education.map((e) =>
                                    e._id === edu._id ? { ...e, period: val } : e
                                  ),
                                }));
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
                              const val = e.target.value;
                              setExperience((prev) => ({
                                ...prev,
                                education: prev.education.map((e) =>
                                  e._id === edu._id ? { ...e, gpa: val } : e
                                ),
                              }));
                            }}
                            className="bg-zinc-900 border-zinc-700 text-zinc-100"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Description</Label>
                          <Textarea
                            value={edu.description}
                            onChange={(e) => {
                              const val = e.target.value;
                              setExperience((prev) => ({
                                ...prev,
                                education: prev.education.map((e) =>
                                  e._id === edu._id ? { ...e, description: val } : e
                                ),
                              }));
                            }}
                            className="bg-zinc-900 border-zinc-700 text-zinc-100"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                            Honors (one per line)
                          </Label>
                          <Textarea
                            value={eduHonorsInputs[edu._id] ?? edu.honors?.join("\n") ?? ""}
                            onChange={(e) => {
                              const val = e.target.value;
                              setEduHonorsInputs((prev) => ({ ...prev, [edu._id]: val }));
                            }}
                            className="bg-zinc-900 border-zinc-700 text-zinc-100 min-h-[100px]"
                            placeholder="Enter honors (one per line)..."
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
                        const newId = `edu-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
                        setExperience((prev) => ({
                          ...prev,
                          education: [
                            ...prev.education,
                            {
                              _id: newId,
                              degree: "",
                              institution: "",
                              period: "",
                              description: "",
                              honors: [],
                            },
                          ],
                        }));
                        setEduHonorsInputs((prev) => ({ ...prev, [newId]: "" }));
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

          {/* RESUME TAB */}
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

        {/* Delete Confirmation Modal */}
        <Dialog
          open={deleteConfirm.isOpen}
          onOpenChange={(open) => setDeleteConfirm((prev) => ({ ...prev, isOpen: open }))}
        >
          <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-zinc-100">{deleteConfirm.title}</DialogTitle>
              <DialogDescription className="text-zinc-400">
                {deleteConfirm.description}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                className="border-zinc-700 text-zinc-300 hover:text-white"
                onClick={() => setDeleteConfirm((prev) => ({ ...prev, isOpen: false }))}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  deleteConfirm.onConfirm();
                  setDeleteConfirm((prev) => ({ ...prev, isOpen: false }));
                }}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
