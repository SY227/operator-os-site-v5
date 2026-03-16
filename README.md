# CogniFox Site V5

Focused, Vercel-friendly Next.js App Router site for practical AI operator workflows.

## What V5 is

V5 is a cleanup and coherence pass over V4.

Public scope is intentionally focused:
- Home (`/`)
- Blog (`/blog`, `/blog/[slug]`)
- Agent Projects (`/projects`, `/projects/[slug]`)
- Use Cases (`/use-cases`, `/use-cases/[slug]`)
- Chatbot Preview (`/chatbot`)
- About (`/about`)
- Contact (`/contact`)

Brand + domain:
- **CogniFox**
- **cognifox.io**

## Tech stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Vercel-friendly route handlers

---

## Active content model (edit these first)

These files drive the current public site:

- `content/site-config.json` (brand, nav, SEO defaults, homepage featured slugs)
- `content/blog-posts.json`
- `content/agent-projects.json`
- `content/use-cases.json`
- `content/chatbot-faq.json`

### Active route files

- `src/app/page.tsx`
- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx`
- `src/app/projects/page.tsx`
- `src/app/projects/[slug]/page.tsx`
- `src/app/use-cases/page.tsx`
- `src/app/use-cases/[slug]/page.tsx`
- `src/app/chatbot/page.tsx`
- `src/app/about/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/privacy/page.tsx`
- `src/app/terms/page.tsx`

### Chatbot behavior files

- UI page: `src/app/chatbot/page.tsx`
- Preview widget: `src/components/chatbot/ChatbotSandbox.tsx`
- API integration point: `src/app/api/chatbot/route.ts`

> Note: chatbot API is intentionally a **beta preview stub** until retrieval + moderation wiring is implemented.

---

## Legacy/compatibility behavior

Legacy URLs are preserved via redirect pages for compatibility:
- `/articles` → `/blog`
- `/articles/[slug]` → `/blog`
- `/products` → `/projects`
- `/products/[slug]` → `/projects`
- `/free-tools` → `/use-cases`
- `/free-tools/[slug]` → `/use-cases`
- `/playbooks` → `/use-cases`
- `/playbooks/[slug]` → `/use-cases`
- `/templates` → `/projects`
- `/get-started` → `/chatbot`

---

## Local development

```bash
cd ~/Desktop/operator-os-site-v5
npm install
npm run dev
```

Open: `http://localhost:3000`

If 3000 is in use:

```bash
npm run dev -- -p 3001
```

---

## Build + validation

```bash
cd ~/Desktop/operator-os-site-v5
npm run lint
npm run build
```

---

## Environment variables

Copy `.env.example` to `.env.local` and configure as needed.

- `LEADS_PROVIDER` (`console|webhook|both`)
- `LEADS_WEBHOOK_URL`
- `ANALYTICS_PROVIDER` (`console|webhook|both`)
- `ANALYTICS_WEBHOOK_URL`
- `ANALYTICS_CONSOLE_LOGS`
- `NEXT_PUBLIC_ANALYTICS_DEBUG`

---

## Deploy (Vercel)

### Option A: Vercel CLI

```bash
cd ~/Desktop/operator-os-site-v5
npm i -g vercel
vercel
vercel --prod
```

### Option B: GitHub + Vercel Dashboard

1. Push `~/Desktop/operator-os-site-v5` to GitHub
2. Import project into Vercel
3. Confirm framework = Next.js
4. Set environment variables
5. Deploy
6. Set custom domain to `cognifox.io`

---

## Support and privacy contact method

CogniFox V5 currently surfaces support/privacy requests via the Contact page:
- `/contact`

No dedicated public support email is published in this version.

## OpenClaw editing guidance

For normal publishing updates, prefer JSON content updates first.

- Add blog post: `content/blog-posts.json`
- Add project example: `content/agent-projects.json`
- Add use case: `content/use-cases.json`
- Update chatbot seeded QA: `content/chatbot-faq.json`
- Update nav/featured cards/SEO defaults: `content/site-config.json`

Only edit route/components when structure or UX behavior needs to change.
