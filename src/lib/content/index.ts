import path from "node:path";
import { existsSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { AgentProject, BlogPost, ChatbotFaq, SiteConfig, ToolAsset, UseCase } from "./types";

function hasProjectMarkers(dir: string) {
  const packageJsonPath = path.join(dir, "package.json");
  const contentPath = path.join(dir, "content");

  if (!existsSync(packageJsonPath) || !existsSync(contentPath)) {
    return false;
  }

  try {
    const pkg = JSON.parse(readFileSync(packageJsonPath, "utf8")) as {
      name?: string;
    };

    return pkg.name === "cognifox-site-v5";
  } catch {
    return false;
  }
}

function resolveProjectRoot() {
  const candidates = new Set<string>();

  candidates.add(process.cwd());
  if (process.env.PWD) {
    candidates.add(process.env.PWD);
  }

  for (const arg of process.argv) {
    if (!arg || arg.startsWith("-")) {
      continue;
    }

    const absolute = path.resolve(arg);
    candidates.add(absolute);
    candidates.add(path.dirname(absolute));
  }

  candidates.add(path.join(process.cwd(), "operator-os-site-v5"));

  for (const candidate of candidates) {
    if (hasProjectMarkers(candidate)) {
      return candidate;
    }
  }

  return process.cwd();
}

const PROJECT_ROOT = resolveProjectRoot();
const CONTENT_DIR = path.join(PROJECT_ROOT, "content");
const cache = new Map<string, unknown>();

async function loadContentFile<T>(fileName: string): Promise<T> {
  if (cache.has(fileName)) {
    return cache.get(fileName) as T;
  }

  const fullPath = path.join(CONTENT_DIR, fileName);
  const raw = await readFile(fullPath, "utf8");
  const parsed = JSON.parse(raw) as T;
  cache.set(fileName, parsed);
  return parsed;
}

export function clearContentCache() {
  cache.clear();
}

export async function getSiteConfig() {
  return loadContentFile<SiteConfig>("site-config.json");
}

export async function getBlogPosts() {
  return loadContentFile<BlogPost[]>("blog-posts.json");
}

export async function getProjects() {
  return loadContentFile<AgentProject[]>("agent-projects.json");
}

export async function getUseCases() {
  return loadContentFile<UseCase[]>("use-cases.json");
}

export async function getTools() {
  return loadContentFile<ToolAsset[]>("tools.json");
}

export async function getChatbotFaq() {
  return loadContentFile<ChatbotFaq[]>("chatbot-faq.json");
}

export async function getBlogPostBySlug(slug: string) {
  const items = await getBlogPosts();
  return items.find((item) => item.slug === slug) ?? null;
}

export async function getProjectBySlug(slug: string) {
  const items = await getProjects();
  return items.find((item) => item.slug === slug) ?? null;
}

export async function getUseCaseBySlug(slug: string) {
  const items = await getUseCases();
  return items.find((item) => item.slug === slug) ?? null;
}
