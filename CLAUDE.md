# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server
npm run dev
# or
pnpm dev

# Build for production
npm run build
# or
pnpm build

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Project Architecture

EasyProfile is a React-based personal portfolio application with a YAML-driven configuration system that allows content updates without code changes.

### Core Architecture Components

**Configuration-Driven Design:**
- `/public/config/profile.yaml` - Central configuration file controlling all content, layout, and features
- `/public/config/intro.md` - Markdown content for introduction section
- `/public/config/eggs/` - Easter egg content files

**React Component Hierarchy:**
- `App.tsx` - Main application with section navigation, scroll handling, and YAML data loading
- Section components (`ProfileSection`, `IntroSection`, `ProjectsSection`, etc.) - Full-screen sections
- `BentoGrid.tsx` and card components - Modular grid layout system
- `ResumeExportButton.tsx` - PDF export functionality using jsPDF and html2canvas

**Key Data Flow:**
1. App loads and parses `/public/config/profile.yaml` using js-yaml
2. Section order determined by `sections` object in YAML (numerical ordering)
3. Profile data passed to appropriate section components
4. Cards rendered in ProfileSection using CardRenderer based on card type

### Section System

Sections are configured in YAML `sections` object with numerical ordering:
```yaml
sections:
  profile: 1    # First section
  intro: 2      # Second section
  projects: 3   # Third section
  # etc.
```

Section navigation uses smooth scrolling with touch/wheel event handling and cooldown periods.

### Card System Architecture

Bento grid cards are dynamically rendered based on type:
- `CardType` enum defines available card types (github, twitter, map, link, text, image, custom)
- `CardRenderer.tsx` handles type-based rendering
- Each card type has corresponding component in `/src/components/cards/`
- Card sizing controlled by `CardSize` enum (small=1x1, medium=1x2/2x1, large=2x2)

### Type System

Strong TypeScript typing throughout:
- `ProfileData` interface in `/src/types/profile.ts` defines core data structure
- `ExtendedProfileData` in App.tsx adds YAML-specific fields (meta, sections)
- Card interfaces for each card type with proper type guards

### Easter Egg System

Interactive easter eggs triggered via console commands:
- Configured in YAML `meta.easterEggs`
- Content loaded from `/public/config/eggs/` files
- Overrides console.log to detect trigger words
- Creates global trigger functions on window object

### Styling and UI

- Tailwind CSS for styling with dark theme (gray-900 background)
- Framer Motion for animations
- Lucide React for icons
- Responsive design with mobile touch support
- Fixed positioning for navigation dots and export button

## Important Implementation Details

**YAML Configuration Loading:**
- All content updates should be made in `/public/config/profile.yaml`
- App.tsx handles meta tag updates (title, favicon, description) from YAML
- Intro content loaded separately from markdown file

**PDF Export:**
- Uses html2canvas to capture sections as images
- jsPDF combines images into PDF
- Export sections controlled by `meta.resumeExport.sections` in YAML

**Scroll Navigation:**
- Custom wheel/touch event handling with accumulator-based thresholds
- Cooldown periods prevent rapid section switching
- Navigation dots show current section and allow direct navigation

**Development Notes:**
- Uses Vite for fast development and building
- ESLint configured for code quality
- TypeScript strict mode enabled
- PNPM preferred for dependency management