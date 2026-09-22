export type Accent = "lilac" | "coral" | "blue" | "cyan";

export type Project = {
  number: string;
  category: string;
  title: string;
  description: string;
  accent: Accent;
  designCategory?:
    | "UI/UX"
    | "Graphic Design"
    | "Logo"
    | "3D Works"
    | "Video Editing"
    | "Magazines";
  longDescription: string;
  tags: string[];
  year: string;
  role: string;
  githubUrl?: string;
  liveUrl?: string;
  highlights: string[];
};

export const designerProjects: Project[] = [
  {
    number: "01",
    category: "UI/UX",
    title: "Illford Digital",
    description:
      "A modernized website for a Digital Marketing Agency — clean, bold, and easy to navigate.",
    accent: "lilac",
    designCategory: "UI/UX",
    longDescription:
      "A modernized website for a Digital Marketing Agency — clean, bold, and easy to navigate. The design system is built around a dark-mode-first aesthetic, with a modular component library that allows for rapid iteration and consistent branding across the site.",
    tags: ["UI/UX", "Dashboard", "Design Systems", "Figma", "Dark Mode"],
    year: "2024",
    role: "Lead UI/UX Designer",
    liveUrl:
      "https://www.figma.com/design/aUr1APUeRvqvy7UaHkGUVT/ILLFORD?node-id=0-1&t=IolbrLCidgkrxjmM-1",
    highlights: [
      "Designed a 60+ component Figma library with auto-layout and variables",
      "Reduced average task-completion time by 34% through layout restructure",
      "Built interactive prototypes tested with 12 real users across 3 sessions",
    ],
  },
  {
    number: "02",
    category: "UI/UX",
    title: "Bloom App",
    description:
      "A mental wellness companion designed around calm, breathable UX and guided reflection.",
    accent: "coral",
    designCategory: "UI/UX",
    longDescription:
      "A mental wellness companion designed around calm, breathable UX. Daily journaling, mood tracking, and guided sessions live inside layouts that feel as light as the content they hold — intentional whitespace, soft palettes, and micro-interactions that reward reflection.",
    tags: ["UI/UX", "Mobile App", "Wellness", "Figma", "Prototyping"],
    year: "2024",
    role: "Product Designer",
    liveUrl:
      "https://www.figma.com/design/h6sEgAbjYCP78OqTjzmLVc/Designer-Hiring?node-id=258-167&t=IolbrLCidgkrxjmM-1",
    highlights: [
      "Delivered 80+ mobile screens across iOS and Android breakpoints",
      "Ran usability tests that cut onboarding drop-off by 48%",
      "Designed a custom iconography set with 90 wellness-themed glyphs",
    ],
  },
  {
    number: "03",
    category: "Graphic Design",
    title: "Neon Pulse",
    description:
      "Event poster series for a music festival — bold type, chromatic aberration, raw energy.",
    accent: "coral",
    designCategory: "Graphic Design",
    longDescription:
      "An event poster series for a multi-day music festival — kinetic, chromatic, and deliberately raw. Each poster pushed typography into territory that feels almost physical: layered halftones, chromatic aberration, and color grades borrowed from underground print culture.",
    tags: ["Graphic Design", "Print", "Typography", "Poster", "Festival"],
    year: "2023",
    role: "Graphic Designer",
    highlights: [
      "Produced 18 distinct poster designs across 3 stage themes",
      "Developed a flexible modular grid that kept all variants on-brand",
      "Printed at 120×180cm — designed for impact at both scale and screen",
    ],
  },
  {
    number: "04",
    category: "Logo",
    title: "Aura Studio",
    description:
      "Wordmark and symbol system for a creative studio — geometric, memorable, and endlessly scalable.",
    accent: "lilac",
    designCategory: "Logo",
    longDescription:
      "A complete identity system for a creative studio — from the first sketch of the mark to the final brand standards guide. The wordmark balances geometric precision with a sense of open possibility, scaling perfectly from favicon to billboard.",
    tags: ["Logo", "Brand Identity", "Typography", "Visual Identity"],
    year: "2023",
    role: "Identity Designer",
    highlights: [
      "Delivered primary mark, wordmark, and 6 lockup variations",
      "Built a brand standards document covering 48 pages of usage rules",
      "Designed a full stationery and digital asset suite",
    ],
  },
  {
    number: "05",
    category: "3D Works",
    title: "Void Objects",
    description:
      "Abstract 3D sculpture series rendered in Cinema 4D — materiality, light, and negative space.",
    accent: "blue",
    designCategory: "3D Works",
    longDescription:
      "A series of abstract 3D sculptures exploring the tension between form and emptiness. Each piece was modelled, lit, and rendered in Cinema 4D — chasing the quality of physical objects: weight, surface memory, and the precise way light catches an edge.",
    tags: ["3D", "Cinema 4D", "Octane Render", "Sculpture", "Abstract"],
    year: "2024",
    role: "3D Artist",
    highlights: [
      "Series of 12 final renders at 4K resolution with Octane",
      "Each piece built with fully procedural materials and HDRi lighting",
      "Selected for display in a digital gallery exhibition",
    ],
  },
  {
    number: "06",
    category: "Video Editing",
    title: "Frame Study",
    description:
      "Short-form video edits exploring rhythm and visual storytelling through montage and motion.",
    accent: "cyan",
    designCategory: "Video Editing",
    longDescription:
      "A collection of short-form video edits that treat film as a compositional instrument. Every cut, colour grade, and sound choice is deliberate — studying how rhythm, pacing, and visual grammar can transform raw footage into something felt rather than just watched.",
    tags: [
      "Video Editing",
      "Motion",
      "Premiere Pro",
      "Color Grading",
      "Montage",
    ],
    year: "2024",
    role: "Video Editor & Colorist",
    highlights: [
      "6 short films ranging from 45 seconds to 4 minutes",
      "Developed a signature grade built from custom LUTs in DaVinci Resolve",
      "Original sound design layered using Adobe Audition",
    ],
  },
  {
    number: "07",
    category: "Magazines",
    title: "After Hours",
    description:
      "A cinematic editorial magazine — dark, moody layouts for a culture-led digital publication.",
    accent: "coral",
    designCategory: "Magazines",
    longDescription:
      "A cinematic editorial magazine built for a culture-led digital publication. Blending editorial photography, immersive layout design, and typographic restraint into something that reads as much as it breathes — dark, moody, deliberate.",
    tags: ["Magazine", "Editorial", "InDesign", "Typography", "Photography"],
    year: "2023",
    role: "Art Director",
    liveUrl: "#",
    highlights: [
      "Designed 12 issues with an average 64-page layout each",
      "Built a modular editorial grid adaptable across print and PDF",
      "Directed a photoshoot series with 3 contributing photographers",
    ],
  },
];

export const developerProjects: Project[] = [
  {
    number: "01",
    category: "Full Stack / MERN",
    title: "HospEasy",
    description: "Hospital appointment and token management platform.",
    accent: "blue",
    longDescription:
      "A full-stack hospital appointment and token management platform built on the MERN stack. Reduces patient wait times by up to 60% through intelligent queue management, real-time updates, and a clean, accessible interface designed for both patients and hospital staff.",
    tags: ["MERN Stack", "Node.js", "MongoDB", "React", "Real-time"],
    year: "2024",
    role: "Full Stack Developer",
    githubUrl: "#",
    liveUrl: "#",
    highlights: [
      "Real-time token queue with WebSocket integration handling 200+ concurrent users",
      "JWT-based role auth system for patients, doctors, and admin staff",
      "Reduced average appointment booking time from 8 minutes to under 90 seconds",
    ],
  },
  {
    number: "02",
    category: "Frontend / SaaS",
    title: "Flowstate",
    description: "A focused workspace for turning product ideas into progress.",
    accent: "cyan",
    longDescription:
      "A focused SaaS workspace that transforms product ideas into actionable progress. Combines a kanban-style task engine with AI-assisted sprint planning, deep-work timer, and built-in retrospectives — all in a distraction-free interface.",
    tags: ["SaaS", "Next.js", "TypeScript", "AI", "Productivity"],
    year: "2024",
    role: "Frontend Engineer",
    githubUrl: "#",
    liveUrl: "#",
    highlights: [
      "AI sprint planner that reduces planning sessions from 2 hours to 15 minutes",
      "Built a custom rich-text editor with slash commands and markdown support",
      "Optimized bundle to under 80kb gzipped with code-splitting and lazy loading",
    ],
  },
];

export const allProjects = [...designerProjects, ...developerProjects];
export const projectIndex = Object.fromEntries(
  allProjects.map((project) => [project.title, project]),
) as Record<string, Project>;
