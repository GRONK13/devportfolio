import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMarkdown } from "@content-collections/markdown";
import { imageSize } from "image-size";
import { ditherCover } from "./lib/dither";
import {
  certificationsSchema,
  nowSchema,
  profileSchema,
  projectSchema,
  siteSchema,
  skillsSchema,
  timelineSchema,
  valuesSchema,
} from "./lib/content/schemas";

/**
 * Reads an image under public/ and returns its intrinsic size, so pages can reserve space for it
 * (no layout shift). Throws, and so fails the build, if the file is missing.
 */
function withSize<T extends { src: string }>(image: T, file: string): T & { width: number; height: number } {
  let size;
  try {
    size = imageSize(readFileSync(path.join(process.cwd(), "public", image.src)));
  } catch {
    throw new Error(`${file}: image "${image.src}" was not found in public/.`);
  }
  return { ...image, width: size.width, height: size.height };
}

/** Size of a file under public/ in KB, shown next to download links. Fails the build if missing. */
function fileSizeKB(file: string, from: string): number {
  try {
    return Math.round(statSync(path.join(process.cwd(), "public", file)).size / 1024);
  } catch {
    throw new Error(`${from}: file "${file}" was not found in public/.`);
  }
}

/** A collection holding one YAML file, e.g. content/profile.yaml. */
function single<const N extends string, S extends Parameters<typeof defineCollection>[0]["schema"]>(name: N, schema: S) {
  return defineCollection({ name, directory: "content", include: `${name}.yaml`, parser: "yaml", schema });
}

const profile = defineCollection({
  name: "profile",
  directory: "content",
  include: "profile.yaml",
  parser: "yaml",
  schema: profileSchema,
  // Markdown is compiled with raw HTML disabled, so content can't inject markup or scripts.
  transform: async ({ _meta, about, photo, resume, ...data }, context) => ({
    ...data,
    photo: photo && withSize(photo, `content/${_meta.filePath}`),
    resume: { ...resume, sizeKB: fileSizeKB(resume.file, `content/${_meta.filePath}`) },
    aboutHtml: await compileMarkdown(context, { _meta, content: about }),
  }),
});

const projects = defineCollection({
  name: "projects",
  directory: "content/projects",
  include: "*.md",
  parser: "frontmatter",
  schema: projectSchema,
  transform: async (project, context) => {
    // The raw Markdown is only needed to compile the HTML; don't ship it in the bundle.
    const { content, ...data } = project;
    const slug = project._meta.path;
    const cover = project.cover && withSize(project.cover, `content/projects/${project._meta.filePath}`);
    return {
      ...data,
      slug,
      cover: cover && { ...cover, dither: await ditherCover(cover.src, slug) },
      html: await compileMarkdown(context, { _meta: project._meta, content }),
    };
  },
});

export default defineConfig({
  content: [
    profile,
    projects,
    single("values", valuesSchema),
    single("now", nowSchema),
    single("skills", skillsSchema),
    single("timeline", timelineSchema),
    single("certifications", certificationsSchema),
    single("site", siteSchema),
  ],
});
