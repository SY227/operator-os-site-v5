export type NavItem = { label: string; href: string };

export type SiteConfig = {
  name: string;
  domain: string;
  baseUrl: string;
  tagline: string;
  description: string;
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
  };
  nav: NavItem[];
  headerCta?: {
    label: string;
    href: string;
  };
  trustBar: string[];
  home?: {
    featuredBlogSlugs?: string[];
    featuredProjectSlugs?: string[];
    featuredUseCaseSlugs?: string[];
    featuredToolSlugs?: string[];
  };
  newsletter: {
    title: string;
    description: string;
    placeholder: string;
    buttonLabel: string;
  };
};

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  publishedAt: string;
  body: string[];
  keyTakeaways: string[];
};

export type AgentProject = {
  slug: string;
  name: string;
  summary: string;
  whoFor?: string;
  problem: string;
  inputsRequired?: string[];
  workflow: string[];
  stack: string[];
  openclawRole: string[];
  humanReview: string[];
  output: string;
  estimatedTimeSaved?: string;
  businessValue?: string;
  lessons: string[];
};

export type UseCase = {
  slug: string;
  title: string;
  audience: string;
  summary: string;
  challenge: string;
  workflow: string[];
  outcomes: string[];
  openclawRole: string;
  humanReview: string;
};

export type ToolAsset = {
  slug: string;
  name: string;
  category: "Templates" | "SOPs" | "Prompt Kits" | "Workflow Packs" | "Starter Systems";
  summary: string;
  whoFor: string;
  includes: string[];
  format: string;
  status: "Available" | "Coming soon";
  ctaLabel: string;
  ctaHref: string;
};

export type ChatbotFaq = {
  id: string;
  question: string;
  answer: string;
  sourceHref: string;
};
