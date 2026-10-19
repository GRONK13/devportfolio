import "server-only";
import {
  allCertifications,
  allNows,
  allProfiles,
  allProjects,
  allSites,
  allSkills,
  allTimelines,
  allValues,
} from "content-collections";
import { checkProjects, only } from "./checks";

/**
 * The only way pages read site content. Data comes from /content, validated and compiled at
 * build time by Content Collections (see content-collections.ts).
 */

const problems = checkProjects(allProjects);
if (problems.length > 0) throw new Error(`Content problems:\n- ${problems.join("\n- ")}`);

export const getProfile = () => only(allProfiles, "content/profile.yaml");
export const getSite = () => only(allSites, "content/site.yaml");
export const getNow = () => only(allNows, "content/now.yaml");
export const getValues = () => only(allValues, "content/values.yaml").items;
export const getSkillGroups = () => only(allSkills, "content/skills.yaml").groups;
export const getCertifications = () =>
  [...only(allCertifications, "content/certifications.yaml").items].sort((a, b) => b.issued.localeCompare(a.issued));

/** Work and education, most recently started first. */
export const getTimeline = () =>
  [...only(allTimelines, "content/timeline.yaml").entries].sort((a, b) => b.start.localeCompare(a.start));

export const getProjects = () => [...allProjects].sort((a, b) => a.order - b.order);
export const getFeaturedProjects = () => getProjects().filter((p) => p.featured);
export const getProject = (slug: string) => allProjects.find((p) => p.slug === slug);

/** Projects whose stack lists this skill, so the skills section can link to real work. */
export const getProjectsUsing = (skill: string) => getProjects().filter((p) => p.stack.includes(skill));

export type { Project, Profile } from "content-collections";
