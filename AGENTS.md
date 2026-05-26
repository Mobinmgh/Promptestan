# Promptestan AGENTS Scope Update

Use this as the current source of truth for Promptestan.

## Product Definition

Promptestan is an AI image prompt gallery.

It does not generate images inside the website.

Users browse example images, open a prompt detail page, and copy the prompt to use in their own AI image tool.

Some prompts are free. More professional prompts are locked behind a paid/pro subscription.

The admin CMS lets Mobin add and manage:
- prompt title
- prompt description
- prompt text
- negative prompt
- uploaded image
- example images
- category
- tags
- model compatibility
- difficulty
- access level: free or pro
- published/unpublished status

## Build This

Public:
- homepage
- prompt gallery page
- prompt detail page
- category pages
- pricing page
- login page
- user dashboard with saved prompts and subscription status

Admin:
- admin dashboard
- create/edit/delete prompts
- upload images
- choose category
- choose tags
- choose free/pro access
- publish/unpublish prompts
- manage categories
- manage tags

Access:
- free users can see free prompts
- free users can preview pro prompts
- pro users can see full pro prompts
- admins can see and manage everything

## Do Not Build

Do not build:
- image generation
- /generate page
- generate nav item
- generate button
- generate using style button
- OpenAI image API
- Replicate API
- Midjourney integration
- credits system
- generation history
- image editing
- prompt marketplace
- seller accounts
- comments
- ratings
- affiliate system

If it means users create images inside Promptestan, do not build it.

## Navigation

Use this nav only:

- خانه
- پرامپت‌ها
- دسته‌بندی‌ها
- قیمت‌گذاری

Actions:
- ورود
- شروع کن

No Generate item.

## Phase 1 Codex Task

Read AGENTS.md and this scope update before making changes.

Build Phase 1 only.

Goal:
Create the first visual version of Promptestan using mock data only.

Required:
1. Set up global RTL Persian dark theme.
2. Create a dark header:
   - brand: پرامپتستان
   - nav: خانه، پرامپت‌ها، دسته‌بندی‌ها، قیمت‌گذاری
   - actions: ورود، شروع کن
3. Create a dark footer.
4. Create homepage at `/`.
5. Create prompt gallery page at `/prompts`.
6. Create prompt detail page at `/prompts/[slug]`.
7. Use local mock prompt data only.
8. Gallery page must use 3-column dark card grid on desktop, 2 columns tablet, 1 column mobile.
9. Prompt detail page must use RTL mirrored two-column layout:
   - right column: title, badges, prompt block, usage guide
   - left column: large image preview
10. Prompt blocks must show English prompt text with `dir="ltr"`.
11. Use placeholder images from `/public/mock`.
12. Use clean TypeScript components.

Forbidden in Phase 1:
- no auth
- no Supabase
- no admin
- no payment
- no AI generation
- no `/generate` page
- no Generate nav item
- no Generate Using Style button

Acceptance:
- `npm run dev` works
- `npm run build` works
- no TypeScript errors
- UI is fully RTL
- dark gallery visually follows the supplied reference
- no backend code yet
- no generation feature exists

## Later Phases

Phase 2:
Supabase schema, auth, and real prompt data.

Phase 3:
Admin CMS for prompts, categories, tags, image uploads, and free/pro status.

Phase 4:
Free/pro gating, user dashboard, saved prompts.

Phase 5:
Manual or payment-provider subscription activation, only when requested.

Final MVP:
A Persian-first dark AI image prompt gallery with categories, paid/pro prompt access, saved prompts, and a CMS for managing images and prompts.
