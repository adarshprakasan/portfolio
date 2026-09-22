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
      "A modern website experience for a digital marketing agency, designed to communicate services clearly while giving the brand a bold and contemporary identity.",
    accent: "lilac",
    designCategory: "UI/UX",
    longDescription:
      "A complete website UI/UX exploration for Illford Digital, a digital marketing agency. The design combines a bold visual direction with a structured information architecture, making it easier for visitors to understand the agency's services, explore its capabilities, and navigate between key sections. The interface was designed in Figma with reusable components and a consistent visual system.",
    tags: [
      "UI/UX",
      "Web Design",
      "Design System",
      "Figma",
      "Responsive Design",
    ],
    year: "2024",
    role: "UI/UX Designer",
    liveUrl:
      "https://www.figma.com/design/aUr1APUeRvqvy7UaHkGUVT/ILLFORD?node-id=0-1&t=IolbrLCidgkrxjmM-1",
    highlights: [
      "Designed the website structure, layouts, and responsive interface in Figma",
      "Created reusable components and a consistent visual language for faster design iteration",
      "Focused on clear information hierarchy, intuitive navigation, and strong visual storytelling",
    ],
  },

  {
    number: "02",
    category: "UI/UX",
    title: "Designer Hiring Platform",
    description:
      "A designer hiring platform focused on connecting clients with creative professionals through a clear, intuitive, and portfolio-driven experience.",
    accent: "coral",
    designCategory: "UI/UX",
    longDescription:
      "A UI/UX concept for a platform that connects clients with designers and creative professionals. The experience was designed around discovering talent, presenting portfolios, and simplifying the hiring journey. I worked across web and mobile interfaces, creating a consistent design language while exploring ways to make the platform feel approachable, structured, and visually engaging.",
    tags: ["UI/UX", "Web Design", "Mobile App", "Figma", "Prototyping"],
    year: "2024",
    role: "UI/UX Designer",
    liveUrl:
      "https://www.figma.com/design/h6sEgAbjYCP78OqTjzmLVc/Designer-Hiring?node-id=258-167&t=IolbrLCidgkrxjmM-1",
    highlights: [
      "Designed web pages and mobile app screens around the designer hiring journey",
      "Created user flows, interface layouts, and interactive prototypes in Figma",
      "Developed a custom visual system combining flat UI elements with 3D illustrations",
    ],
  },

  {
    number: "03",
    category: "Logo Design",
    title: "Hikari",
    description:
      "A visual identity for a Japanese language learning institute, combining Japanese-inspired simplicity with a contemporary educational brand.",
    accent: "coral",
    designCategory: "Logo",
    longDescription:
      "A logo identity created for Hikari, a Japanese language learning institute. The design explores a balance between Japanese visual influence and a modern educational identity, aiming to create a mark that feels approachable, memorable, and relevant across both digital and physical applications.",
    tags: [
      "Logo Design",
      "Brand Identity",
      "Typography",
      "Visual Identity",
      "Illustrator",
    ],
    year: "2023",
    role: "Logo Designer",
    highlights: [
      "Developed the core logo concept and visual direction for the institute",
      "Explored Japanese-inspired forms while maintaining a modern and accessible identity",
      "Designed the mark for flexible use across digital and print applications",
    ],
  },

  {
    number: "04",
    category: "Logo Design",
    title: "Inside Out",
    description:
      "A distinctive identity for a podcast series created for an IEEE Student Branch, designed to feel conversational, youthful, and technology-focused.",
    accent: "lilac",
    designCategory: "Logo",
    longDescription:
      "A logo concept developed for Inside Out, a podcast series produced for an IEEE Student Branch. The identity was designed to capture the idea of bringing conversations, ideas, and perspectives from the inside to a wider audience while maintaining a contemporary student-tech aesthetic.",
    tags: ["Logo Design", "Brand Identity", "Podcast", "Typography", "IEEE"],
    year: "2021",
    role: "Logo Designer",
    highlights: [
      "Created the visual identity for an IEEE Student Branch podcast series",
      "Developed a recognizable mark suited for podcast and social media applications",
      "Balanced a youthful visual style with a technology-oriented identity",
    ],
  },

  {
    number: "05",
    category: "Logo Design",
    title: "MakeATable",
    description:
      "A restaurant table-booking brand identity designed around simplicity, convenience, and the dining experience.",
    accent: "blue",
    designCategory: "Logo",
    longDescription:
      "A logo identity created for MakeATable, a restaurant table-booking application currently in production. The visual direction was developed to communicate an easy and convenient way of discovering and booking restaurant tables, with a clean identity designed to work across the future product ecosystem.",
    tags: [
      "Logo Design",
      "Brand Identity",
      "Food & Hospitality",
      "App Branding",
    ],
    year: "2024",
    role: "Logo Designer",
    highlights: [
      "Designed the core logo and visual direction for the upcoming platform",
      "Created an identity intended to scale across the application and digital touchpoints",
      "Developed the brand around simplicity, accessibility, and restaurant discovery",
    ],
  },

  {
    number: "06",
    category: "Logo Design",
    title: "MPro Technologies",
    description:
      "A professional identity for a web consulting agency providing digital services and technology solutions.",
    accent: "cyan",
    designCategory: "Logo",
    longDescription:
      "A logo identity developed for MPro Technologies, a web consulting and service provider agency. The design focuses on creating a professional and technology-oriented visual presence that can work consistently across the company's website, digital communications, and business materials.",
    tags: [
      "Logo Design",
      "Brand Identity",
      "Technology",
      "Typography",
      "Visual Identity",
    ],
    year: "2024",
    role: "Logo Designer",
    highlights: [
      "Developed the primary logo and visual direction for the agency",
      "Focused on a professional identity suitable for a technology services company",
      "Designed the mark for use across digital and business communication materials",
    ],
  },
  {
    number: "07",
    category: "Logo Design",
    title: "Illford Digital Logo",
    description:
      "A modern brand identity for a digital marketing agency, combining a bold visual mark with a clean and contemporary digital presence.",
    accent: "blue",
    designCategory: "Logo",
    longDescription:
      "A logo identity developed for Illford Digital, a digital marketing agency. The design was created to establish a distinctive and professional visual identity that reflects the agency's digital-first approach while remaining flexible across its website, social media, and marketing materials.",
    tags: [
      "Logo Design",
      "Brand Identity",
      "Digital Marketing",
      "Typography",
      "Visual Identity",
    ],
    year: "2024",
    role: "Logo Designer",
    highlights: [
      "Designed the primary logo and visual direction for the agency",
      "Developed a distinctive identity suited to a modern digital marketing brand",
      "Created a flexible mark for use across digital platforms and marketing materials",
    ],
  },

  {
    number: "08",
    category: "3D Works",
    title: "Villa Design — Project 01",
    description:
      "A residential villa visualization exploring architectural form, materials, lighting, and spatial composition through 3D design.",
    accent: "blue",
    designCategory: "3D Works",
    longDescription:
      "A residential villa design project created in Blender, focusing on translating an architectural concept into a detailed 3D environment. The project involved modelling the villa, developing materials, setting up lighting, and composing the final scenes to create a realistic architectural presentation.",
    tags: [
      "3D Design",
      "Blender",
      "Architectural Visualization",
      "3D Modelling",
      "Rendering",
    ],
    year: "2021",
    role: "3D Designer",
    highlights: [
      "Created the villa model and surrounding architectural environment in Blender",
      "Worked on materials, lighting, camera composition, and scene presentation",
      "Developed the project from 3D modelling through final visualization",
    ],
  },

  {
    number: "09",
    category: "3D Works",
    title: "Villa Design — Project 02",
    description:
      "A second residential 3D visualization project focused on architectural modelling, material exploration, lighting, and realistic presentation.",
    accent: "lilac",
    designCategory: "3D Works",
    longDescription:
      "An independent villa visualization project created in Blender, exploring a different residential architectural direction from the first project. The work focused on 3D modelling, materials, lighting, composition, and creating a visually detailed presentation of the villa and its surroundings.",
    tags: [
      "3D Design",
      "Blender",
      "Architectural Visualization",
      "3D Modelling",
      "Rendering",
    ],
    year: "2021",
    role: "3D Designer",
    highlights: [
      "Designed and modelled the residential villa environment in Blender",
      "Explored architectural materials, lighting, and environmental details",
      "Created composed 3D scenes for architectural visualization and presentation",
    ],
  },

  {
    number: "08",
    category: "Graphic Design",
    title: "Poster Works",
    description:
      "A collection of poster designs exploring typography, composition, visual hierarchy, and experimental graphic treatments.",
    accent: "coral",
    designCategory: "Graphic Design",
    longDescription:
      "A selection of poster design work created across different themes and visual directions. The collection explores typography, composition, imagery, colour, and visual hierarchy, with each poster approaching communication from a different graphic perspective.",
    tags: [
      "Graphic Design",
      "Poster Design",
      "Typography",
      "Composition",
      "Visual Design",
    ],
    year: "2020–2024",
    role: "Graphic Designer",
    highlights: [
      "Created posters across multiple themes, events, and communication needs",
      "Experimented with typography, imagery, composition, and visual hierarchy",
      "Adapted visual styles to suit different audiences and event identities",
    ],
  },

  {
    number: "09",
    category: "Magazines",
    title: "GAZETTE — Glimpse of Glory",
    description:
      "A newsletter-style editorial publication created for an IEEE Student Branch, documenting events, achievements, and student activities.",
    accent: "lilac",
    designCategory: "Magazines",
    longDescription:
      "GAZETTE — Glimpse of Glory is a newsletter-style publication created for an IEEE Student Branch. The project focused on presenting student activities, events, achievements, and organizational highlights through a structured editorial layout that combines typography, photography, and visual storytelling.",
    tags: [
      "Editorial Design",
      "Newsletter",
      "Typography",
      "Layout Design",
      "IEEE",
    ],
    year: "2021",
    role: "Editorial Designer",
    highlights: [
      "Designed the visual layout and structure for the IEEE Student Branch newsletter",
      "Organized event highlights, achievements, and student activities into an editorial format",
      "Combined typography, imagery, and structured grids for clear information flow",
    ],
  },

  {
    number: "10",
    category: "Video Editing",
    title: "IEEE Newsletter Announcement",
    description:
      "A short-form announcement video created to introduce and promote an IEEE Student Branch newsletter.",
    accent: "cyan",
    designCategory: "Video Editing",
    longDescription:
      "A promotional announcement video created for an IEEE Student Branch to introduce its newsletter. The edit combines motion, typography, pacing, and visual transitions to turn static newsletter content into a concise and engaging announcement.",
    tags: [
      "Video Editing",
      "Motion Graphics",
      "Typography",
      "Announcement",
      "IEEE",
    ],
    year: "2021",
    role: "Video Editor",
    highlights: [
      "Created a short promotional video for the newsletter launch",
      "Used animated typography and transitions to communicate key information",
      "Focused on pacing and visual rhythm for social-media-friendly viewing",
    ],
  },

  {
    number: "11",
    category: "Video Editing",
    title: "Technical Fest Announcement",
    description:
      "An energetic event announcement video designed to build awareness and excitement around a college technical festival.",
    accent: "coral",
    designCategory: "Video Editing",
    longDescription:
      "A promotional announcement video created for a college technical festival. The project focused on communicating event information through energetic editing, typography, motion, and visual pacing while maintaining a strong connection to the technical and student-focused nature of the event.",
    tags: [
      "Video Editing",
      "Motion Graphics",
      "Event Promotion",
      "Typography",
      "Social Media",
    ],
    year: "2021",
    role: "Video Editor",
    highlights: [
      "Edited an event announcement designed to generate interest in the technical fest",
      "Combined typography, transitions, and motion to create an energetic presentation",
      "Structured the edit around clear event information and visual impact",
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
