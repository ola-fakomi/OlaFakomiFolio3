# V3 Portfolio Brief — Ola Fakomi

Reference document for building Version 3 of the portfolio site. Based on design screens in `V3_WebImages/`.

---

## Architecture: Multi-Page Site

V3 is a **multi-page** site, not a single-page scroll. Pages:

| Page | Route | Nav Label |
|---|---|---|
| Home | `/` | Home |
| Decks | `/decks` | Decks |
| About | `/about` | About |
| Blog | `/blog` | Blogs |

---

## Global Navigation

- **Style:** Floating rounded-rectangle pill, dark fill (`~#1a1a1a`), sits near top-center
- **Links:** Icon + text format — Home, Decks, About, Blogs
- **CTA:** "Let's talk" — filled pill button, right-aligned in nav bar
- **Active state:** Bold/white vs. muted inactive links
- No full-width header bar — nav floats above page content with padding on all sides

---

## Page 1: Home (`/`)

### Hero Section
- **Greeting:** "Hi, I'm" — small, muted gray
- **Name:** "OLA FAKOMI" — large, bold, uppercase, white
- **Avatar:** Small illustrated/3D character portrait (purple-toned) — sits left of the description block
- **Body copy:** "A **product designer**, with 5 years experience designing and building products for startups & enterprises. I'm committed to designing products flow, brand identity, pitch decks and graphics all in contribution to achieving targeted product goals."
  - "product designer" is bold/blue-accented
- **CTAs (side by side):**
  - "Let's talk" — outlined dark pill button
  - "Download CV" — pill button with PDF file icon
- **"CASE STUDIES" badge** — circular element, right side of hero. Dark circle with "CASE STUDIES" text + arrow icon pointing inward/down

### Projects — Tabbed Folder UI
Stacked folder tabs immediately below the hero. Each tab is a rounded top shape (like a browser tab / manila folder), offset so all three are visible simultaneously.

**Tabs (front to back, left-staggered):**
1. **01. THE ROOTS** — frontmost, pink/salmon background
2. **02. REVWIT** — second, lighter pink/cream
3. **03. TRIB** — third, lavender/purple

**Active tab content area shows:**
- Left: App icon + project description paragraph
- Right: Role tag chip (dot • separator style) + "Read Case Study" button with arrow icon
- Below: Large device/browser mockup (full-width, dark frame)

**Per project:**

| Project | Description | Role | Mockup style |
|---|---|---|---|
| The Roots | "Indigenous Language learning for African languages. Built to promote community learning and gamified for interactions." | Product & Brand Designer \| React Frontend Dev | Mobile + desktop side-by-side |
| Revwit | "AI-enabled B2B Sales CRM. I optimized user flows + brand system that scaled user acquisition and shortened sales cycles." | Product & Brand Designer \| React Frontend Dev | Desktop browser (CRM kanban view) |
| Trib | "Web3-powered Q&A gaming platform that enhances community engagement through interactive quizzes, tournaments, and rewards." | Product & Brand Designer \| React Frontend Dev | Laptop frame mockup |

Tab background color shifts with active project (pink → cream → lavender).

---

## Page 2: Decks (`/decks`)

### Landing Page & Websites Section
- **Background:** Deep navy/dark blue (`~#0d1b2e`) with subtle angular shape in corner
- **Category label:** "CONVERSION DRIVING" — small caps, muted/gray
- **Heading:** "Landing Page & Websites" — large display font; "& Websites" slightly lighter/italic style
- **Project list:** Numbered entries, each row:
  - Number (01, 02…)
  - App icon + project name (e.g., "Revwit Sales CRM")
  - "View live" button — pill with globe icon, right-aligned
  - Large screenshot/image preview below the row
- Projects: 01 Revwit Sales CRM, 02 Jollof Radio

### Storyboard Viewer
Appears as a modal/overlay or dedicated section within the Decks page.

- **Header:** White tab label at top: "STORY BOARD"
- **Info bar:** Gear icon + "I designed the storyboard that made these engaging videos possible." + X close button
- **Slide carousel:** Large frame area, left `<` / right `>` arrow navigation, slide number indicator
- **Slide examples:**
  - Dark blue bg: Product UI walkthrough (Automation flow — "Add Condition" screen)
  - Green textured bg: Email UI with "Voice Over: There's a problem." card in corner
  - Black grid bg: Kolme → Ethereum → Solana chain diagram with headline "and Solana right out of the box"

---

## Page 3: About (`/about`)

### Page Background
Full-page **grayscale beach/outdoor photography** as the page background. All sections and modals overlay this image for a personal, editorial feel.

### Scrollable Personality Sections
Two numbered sections in a split layout (label+headline right, photo left):

**Section 01 — STRATEGIC DESIGNER**
- Label: "01. STRATEGIC DESIGNER" — small, blue accent
- Headline: "THINK OF ME AS A DESIGN MERCENARY..." — muted gray for "THINK OF ME AS A", bold white for "DESIGN MERCENARY..."
- Subtext: "I find the gaps between business goals and design and I make that connection."
- Below: Large full-width B&W headshot photo

**Section 02 — EXTROVERT BY FORCE**
- Label: "02. EXTROVERT BY FORCE" — small, blue accent
- Headline: "LOVES STAYING-IN BUT FORCED TO GO OUT..." — same mixed muted/bold treatment
- Subtext: "Things & People around me inspire me to exceed my limits and that makes me 10x better."
- Two staggered B&W lifestyle photos (beach photo left, lake/park photo right, offset vertically)

### Info Modal / Overlay Panel
A large dark rounded card that floats over the background photo. Contains three internal tabs:

**Tab navigation:** `Experience` | `Tools` | `Skills & Competence` (X close button top-right)

**Experience tab:**
Each row: company logo icon | company name + role (below name) | year right-aligned
- Ovasys (Freelance) — Product Designer — 2025
- Revwit — Product & Brand Designer — 2024-25
- Insite Pro — Product Designer — 2023-24
- Pretzel — Product Designer — 2021-22
- NextHandle — Product & Brand Designer — 2021-22

**Tools tab:**
Grouped by category, chips with icon + label:
- *Design & Development:* Figma, Framer, Relume, Image FX, Midjourney, Jitter, VS Code
- *Research & Admin:* GPT, Claude, Linear

**Skills & Competence tab:**
Checkbox-style list (all checked with blue checkmark):
- UI/UX Design, Design System Design, React, HTML & CSS
- No Code Development, Brand Design, Graphic Design, Motion Design
- Presentation & Deck Design

---

## Clients Section (on Home page, below Projects)

- **Background:** Very dark (`~#0d0d0d`) with subtle crack/vein texture overlay
- **Layout:** Floating pill chips scattered organically (not a grid)
- **Chip style:** Dark rounded pill, small square app icon + company name text
- **Section title (centered between the chips):** "**Clients** & Collaborations" — "Clients" bold white, "& Collaborations" muted/lighter weight
- **Clients shown:**
  All Clear Glass, Mavlon Tours, Insite, Daba, DriveMe, SME Hive, Justnovate, IgniteTunes, High N Dry, Renaissance, WashVilla, Ride Vendor, Lochindaal

---

## Page 4: Blog (`/blog`)

Two newsletter sections, each using a 2-column layout:

**Left column:** Newsletter identity
- Bold uppercase heading (e.g., "TAKES BY OVASYS")
- Description paragraph
- "View in Substack" pill button with Substack icon (orange)

**Right column:** Content preview
- Top post: Episode label + title + excerpt + arrow →
- Two more ghosted/faded post previews stacked below (creates depth/stack illusion)
- OR: 3×3 grid of cover image tiles

**Newsletter 1 — TAKES BY OVASYS**
- Description: "This newsletter helps founders, designers, PMs, and developers save time, cut costs, and build better with AI. There's a thought process to optimally using AI to build, and you need to know it."
- Sample post: "EP 3: AI Browsers and why they matter"
- Post has cover image thumbnail (purple/gradient) revealed on hover or as first state

**Newsletter 2 — FULL STEAM & HARD LEFT**
- Description: "I'm a guy in my 20s with goals & ambitions, as I am sure you have. I write because of you. So that when you get stuck or confused, you can relate to a problem I've had and solved and find the strength to keep going."
- Right side: 3×3 grid of newsletter cover image tiles (black & white graphic style)

---

## Footer / Contact

- **Background:** Bright electric blue gradient (`~#2222ee` to `~#3344ff`)
- **Large text:** "Get in touch now..." — large, left-aligned, slightly lighter blue (blends into bg, not pure white)
- **Top-right block:** Column of nav links (Homepage, Projects, Explorations, Blog) + illustrated avatar icon above
- **Bottom contact bar:** Dark pill spanning full width:
  - Left: Social icons — Email, X (Twitter), Bookmark/Link, LinkedIn
  - Center: `@Olarewajufakomi@gmail.com`
  - Right: "Let's talk" dark rounded button
- **Copyright:** "© 2025 — Copyright" — small, centered below the bar

---

## Design Tokens

| Token | Value |
|---|---|
| Background | `#191919` |
| Blue accent | `#4837f3` (nav active state, section labels) |
| White | `#ffffff` (primary headings) |
| Muted text | `~#555` / `~#444` (ghost words in mixed headlines) |
| Navy (Decks bg) | `~#0d1b2e` |
| Footer blue | `~#2233ee` gradient |
| Clients bg | `~#0d0d0d` |

---

## Typography Patterns

- **Display headlines:** Uppercase, large — mix bold white + muted gray *within the same line* for contrast effect
- **Section labels:** Small, uppercase or small-caps, blue accent, numbered ("01. STRATEGIC DESIGNER")
- **Body text:** Regular weight, moderate size, white or near-white
- **Nav labels:** Icon + short text, medium weight

---

## Key UI Patterns

| Pattern | Description |
|---|---|
| Floating pill nav | Not full-width; floats with padding, rounded pill shape |
| Folder tab switcher | Overlapping rounded tabs stacked front-to-back for project switching |
| Mixed-weight headlines | Bold white words + muted gray words in same heading, same size |
| Numbered sections | "01." blue prefix for about/personality sections |
| Dark overlay modal | Rounded dark card floats on top of bg photo (About page) |
| Stacked ghost previews | 2-3 faded duplicate cards below active card (blog posts depth) |
| Organic scatter layout | Client chips placed loosely, not in grid rows |
| Slide carousel | Left/right arrow navigation with numbered indicator (Storyboard) |

---

## Key Differences from V2

| Feature | V2 | V3 |
|---|---|---|
| Structure | Single-page scroll | Multi-page |
| Navigation | Full-width sticky bar | Floating pill bar |
| Projects display | Card grid | Folder tab switcher |
| Decks/Work | Not present | Dedicated `/decks` page |
| Storyboard | Not present | Slide carousel viewer in Decks |
| About | Section on homepage | Full `/about` page with bg photo + modal |
| Blog | Not present | Full `/blog` page |
| Skill chips | In hero section | Moved to About modal (Skills tab) |
| Experience | Card in hero | About modal (Experience tab) |
| Footer | Clouds/dark bg | Solid electric blue gradient |
| Clients | Card with logos | Organic scatter of pill chips |
