# AGENTS.md — OlaFakomiFolio

**See `../../Kelli Lewis/training-site/AGENTS.md` for the reference workflow.** Portfolio site — lighter test surface, same discipline.

---

## Project in one paragraph

Personal portfolio site (`index.html` + `images/`). A potential client's first impression of Ola — a broken project link or a missing image is a credibility hit.

---

## Stack

- Static HTML
- Images
- Existing `CLAUDE.md` (keep in sync with this AGENTS.md)
- `package.json` exists — light tooling

---

## The relevant tests

### 1. Link integrity (the biggest risk)
Every project card links somewhere. Every "external" link must 200. Every "view case study" link must reach the case study.

### 2. Image presence
Every `<img>` must load — no broken images, no missing alt text.

### 3. Mobile viewport
375px mobile and 1440px desktop. Layout must not break.

### 4. Basic performance + a11y
Lighthouse run — Performance > 85, Accessibility > 90.

---

## Commands

```bash
npm i -D @playwright/test @axe-core/playwright
npx playwright install chromium

# Serve locally
npx http-server . -p 5500

# Tests
npx playwright test
```

---

## The tests to write first

```
tests/
├── smoke.spec.ts         (page loads, hero renders, nav works)
├── project-links.spec.ts (each project card link → 200)
├── images.spec.ts        (all <img> tags have src that loads, and alt text)
└── a11y.spec.ts          (axe-core)
```

---

## Things to never do

- **Never** add a project card without the target link working — ship it live, not as a placeholder
- Don't let image file sizes bloat — compress before committing
- Don't let old project entries with dead links stay up — remove or update

---

## What "done" looks like

- [ ] `PLAN.md` if the change is non-trivial
- [ ] All Playwright tests green
- [ ] No broken links or missing images
- [ ] Manual visual check at mobile + desktop

---

## Reference

Full workflow: `../../Kelli Lewis/training-site/AGENTS.md`
Project-wide playbook: `../../Ovasys/Agentic TDD Playbook.md`
