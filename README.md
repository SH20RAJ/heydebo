# ⚡ heydebo OS — World's Best Student Life Operating System PWA

> **Second Brain & Automated Decision Engine for B.Tech CS Students**  
> *Targeting 9+ CGPA • Google L4 DSA Mastery • 5-Day Calisthenics Athletic Build*

Live Deployment: **[https://heydebo.shraj.workers.dev](https://heydebo.shraj.workers.dev)**

---

## 🌟 Overview

**heydebo OS** is not a generic timetable app. It is a high-performance, glassmorphic Progressive Web App (PWA) that operates as an **automated life operating system and decision engine**.

It eliminates decision fatigue by answering:
- *What should I do right now?*
- *What comes next?*
- *Should I go to the library or hostel?*
- *Am I behind schedule?*
- *What LeetCode pattern should I solve?*
- *What workout split is scheduled today?*

---

## 📅 Official BIT Mesra Monsoon 2026 Timetable

**Department of Computer Science & Engineering | B.Tech CS (Semester V C)**

### Course & Faculty Matrix

| Course Code | Type | Course Title | Credits | Faculty / Instructor |
| :--- | :--- | :--- | :--- | :--- |
| **CS24305** | PC | Data Communication & Computer Networks (DCCN) | 3.0 | Dr. Prashant Pranav |
| **CS24301** | PC | Compiler Design (CD) | 3.0 | Dr. I. Mukherjee |
| **CS24303** | PC | Data Mining Concepts & Techniques (DMCT) | 3.0 | Dr. Debjani Mustafi |
| **CS24307** | PC | Artificial Intelligence (AI) | 3.0 | Dr. Amrita Sarkar |
| **CS24351** | PE I | Natural Language Processing (NLP) | 3.0 | Dr. Aditi Panda |
| **CS24353** | PE I | Software Engineering (SE) | 3.0 | Dr. S. P. Singh |
| **CS24306** | PC Lab | Data Communication & Computer Networks Lab | 1.5 | Dr. Prashant Pranav, Dr. Sumit Srivastava |
| **CS24302** | PC Lab | Compiler Design Lab | 1.5 | Dr. I. Mukherjee |
| **CS24308** | PC Lab | Artificial Intelligence Lab | 1.5 | Dr. Amrita Sarkar |

*(Note: Open Elective II 17:30-18:20 excluded per configuration)*

### Weekly Routine Grid

| Day | 08:00 - 08:50 | 09:00 - 09:50 | 10:00 - 10:50 | 11:00 - 11:50 | 12:00 - 12:50 | LUNCH (12:50-13:30) | 13:30 - 14:20 | 14:30 - 15:20 | 15:30 - 16:20 | 16:30 - 17:20 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Monday** | Self Study | Self Study | Self Study | Self Study | Self Study | Mess Lunch | NLP (G3) / SE (G2) | AI (G3) | DMCT (G3) | DCCN (G3) |
| **Tuesday** | Free | AI (220) | DMCT (220) | CD (220) | SE (220) | Mess Lunch | Free | AI Lab (Lab 4) | AI Lab (Lab 4) | AI Lab (Lab 4) |
| **Wednesday**| Free | Free | DCCN (220) | DMCT (220) | CD (220) | Mess Lunch | Library | Library | Library | Library |
| **Thursday** | Free | Free | CD Lab (Lab 1) | CD Lab (Lab 1) | Free | Mess Lunch | CD (214) | AI (214) | NLP (214) / SE (220) | DCCN (220) |
| **Friday** | Free | NLP (220) | DCCN Lab (Lab 4) | DCCN Lab (Lab 4) | Free | Mess Lunch | Library | Library | Library | Library |

---

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router with Turbopack) + React 19 + TypeScript
- **Deployment**: Cloudflare Workers via `@opennextjs/cloudflare` & Wrangler
- **Styling**: Tailwind CSS v4, Glassmorphism, Apple Human Interface Guidelines
- **Offline Database**: Dexie.js (IndexedDB local state durability)
- **PWA Capabilities**: Service Worker caching (`public/sw.js`), Web Manifest
- **Animations**: Framer Motion (60fps ring progress, dynamic island expansion)
- **Icons & Visuals**: `lucide-react`, `canvas-confetti`

---

## 💻 Local Development Setup

```bash
# 1. Clone & Install Dependencies
bun install

# 2. Run Local Development Server
bun run dev

# 3. Build & Typecheck
bun run build

# 4. Deploy to Cloudflare Workers
bun run deploy
```

---

## 📱 Core OS Features

1. **Apple Watch Dashboard**:
   - Dynamic Island header with live activity & location solver.
   - Large Apple Time display with seconds sweep.
   - Concentric Animated Progress Rings (Focus, DSA, Calisthenics, Hydration, Sleep).
   - Water logger with instant +250ml / +500ml taps.
2. **Vertical Schedule Timeline**:
   - Active minute neon glow, completed emerald green, missed red with quick-reschedule.
3. **Google L4 DSA Prep Engine**:
   - 12-week roadmap, 365-day submission heatmap, pattern tracker, mistakes notebook.
4. **5-Day Calisthenics Athletic Split**:
   - Chest/Front Lever, Arms/Handstand, Legs/Explosive, Back/Muscle-Up, Abs/Skills.
5. **AI Emergency Recovery Mode ("I'm Behind")**:
   - 1-click schedule reset that drops non-essentials and re-aligns remaining focus hours.
