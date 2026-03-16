# OPERATIONS.md

Operational runbook for maintaining **CogniFox Site V5** with OpenClaw.

## 1) Recurring blog publishing workflow

Frequency: 1-2x per week

1. Add or edit entries in `content/blog-posts.json`
2. Ensure each post has:
   - unique `slug`
   - concrete `excerpt`
   - `body` paragraphs
   - `keyTakeaways`
   - `publishedAt`
3. If needed, feature the post in `content/site-config.json` under `home.featuredBlogSlugs`
4. Run:
   - `npm run lint`
   - `npm run build`
5. Deploy

## 2) Recurring agent project publishing workflow

Frequency: weekly/as-ready

1. Add project entries to `content/agent-projects.json`
2. Ensure each project includes:
   - problem
   - workflow
   - stack/tools
   - OpenClaw role
   - human review boundaries
   - output + lessons
3. Optionally feature in `content/site-config.json` under `home.featuredProjectSlugs`
4. Validate and deploy

## 3) Recurring use-case publishing workflow

Frequency: weekly/as-ready

1. Add or update `content/use-cases.json`
2. Keep outcomes and human-review boundaries concrete
3. Optionally feature in `content/site-config.json` under `home.featuredUseCaseSlugs`
4. Validate and deploy

## 4) Chatbot knowledge update workflow

Frequency: whenever content scope changes

1. Update `content/chatbot-faq.json` with grounded Q/A tied to real pages
2. Keep answers scoped to site content (no universal assistant claims)
3. Confirm chatbot page language still matches backend reality
4. If backend retrieval is implemented later, wire it through `src/app/api/chatbot/route.ts`

## 5) Contact/privacy consistency workflow

Frequency: monthly or whenever legal/contact UX changes

1. Verify `/contact` is reachable from header/footer
2. Verify `/privacy` language matches visible contact method(s)
3. Do not reference hidden/unpublished support email addresses
4. If a dedicated support email is introduced, update:
   - `content/site-config.json`
   - `/privacy`
   - README contact section

## 6) Safe-edit scope

### Safe by default
- `content/site-config.json`
- `content/blog-posts.json`
- `content/agent-projects.json`
- `content/use-cases.json`
- `content/chatbot-faq.json`
- `README.md`
- `OPERATIONS.md`

### Requires caution
- `src/app/**`
- `src/components/**`
- `src/lib/**`
- `src/app/api/**/route.ts`

## 7) Analytics + leads notes

Active lead flows:
- newsletter (`/api/newsletter`)
- contact (`/api/contact`)

Core analytics events to monitor:
- `page_view`
- `cta_click`
- `newsletter_submit`
- `contact_submit`

## 8) Legacy compatibility policy

Legacy route redirects are intentionally retained for backward compatibility.
Do not remove them without checking inbound links and indexed URLs.
