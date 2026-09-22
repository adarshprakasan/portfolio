export type Accent = "lilac" | "coral" | "blue" | "cyan";

export type ProjectMediaType = "image" | "video" | "pdf";

export type ProjectMedia = {
  src: string;
  filename: string;
  type: ProjectMediaType;
};

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
  media?: ProjectMedia[];
  highlights: string[];
};

function mediaTypeFromFilename(filename: string): ProjectMediaType {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  if (ext === "mp4" || ext === "webm" || ext === "mov") return "video";
  if (ext === "pdf") return "pdf";
  return "image";
}

/** Placeholder public path: `/works/{title}/{filename}` */
function workMedia(title: string, filenames: string[]): ProjectMedia[] {
  return filenames.map((filename) => ({
    src: `/works/${encodeURIComponent(title)}/${encodeURIComponent(filename)}`,
    filename,
    type: mediaTypeFromFilename(filename),
  }));
}

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
    media: workMedia("Hikari", ["logo.png"]),
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
    media: workMedia("Inside Out", ["logo.png"]),
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
    media: workMedia("MakeATable", ["logo.png"]),
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
    media: workMedia("MPro Technologies", ["logo.png"]),
    highlights: [
      "Developed the primary logo and visual direction for the agency",
      "Focused on a professional identity suitable for a technology services company",
      "Designed the mark for use across digital and business communication materials",
    ],
  },
  {
    number: "07",
    category: "Logo Design",
    title: "Illford Digital — Brand Identity",
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
    media: workMedia("Illford Digital — Brand Identity", ["logo.png"]),
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
    media: workMedia("Villa Design — Project 01", [
      "render-01.jpg",
      "render-02.jpg",
    ]),
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
    media: workMedia("Villa Design — Project 02", [
      "render-01.jpg",
      "render-02.jpg",
    ]),
    highlights: [
      "Designed and modelled the residential villa environment in Blender",
      "Explored architectural materials, lighting, and environmental details",
      "Created composed 3D scenes for architectural visualization and presentation",
    ],
  },
  {
    number: "10",
    category: "3D Works",
    title: "Villa Design — Project 03",
    description:
      "A residential 3D visualization exploring architectural form, materials, lighting, and spatial composition through Blender.",
    accent: "cyan",
    designCategory: "3D Works",
    longDescription:
      "An independent residential villa visualization project created in Blender. The project focused on developing the architectural model and creating a detailed presentation through materials, lighting, camera composition, and environmental elements.",
    tags: [
      "3D Design",
      "Blender",
      "Architectural Visualization",
      "3D Modelling",
      "Rendering",
    ],
    year: "2021",
    role: "3D Designer",
    media: workMedia("Villa Design — Project 03", [
      "render-01.jpg",
      "render-02.jpg",
    ]),
    highlights: [
      "Created and developed the villa model and surrounding environment in Blender",
      "Worked on materials, lighting, camera composition, and scene details",
      "Produced final architectural visualization renders for presentation",
    ],
  },

  {
    number: "11",
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
    media: workMedia("Poster Works", [
      "poster-01.png",
      "poster-02.png",
      "poster-03.png",
      "poster-04.png",
    ]),
    highlights: [
      "Created posters across multiple themes, events, and communication needs",
      "Experimented with typography, imagery, composition, and visual hierarchy",
      "Adapted visual styles to suit different audiences and event identities",
    ],
  },

  {
    number: "12",
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
    media: workMedia("GAZETTE — Glimpse of Glory", ["gazette.pdf"]),
    highlights: [
      "Designed the visual layout and structure for the IEEE Student Branch newsletter",
      "Organized event highlights, achievements, and student activities into an editorial format",
      "Combined typography, imagery, and structured grids for clear information flow",
    ],
  },

  {
    number: "13",
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
    media: workMedia("IEEE Newsletter Announcement", ["announcement.mp4"]),
    highlights: [
      "Created a short promotional video for the newsletter launch",
      "Used animated typography and transitions to communicate key information",
      "Focused on pacing and visual rhythm for social-media-friendly viewing",
    ],
  },

  {
    number: "14",
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
    media: workMedia("Technical Fest Announcement", ["announcement.mp4"]),
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
    title: "Hospiq",

    description:
      "A full-stack healthcare platform for hospital discovery, OPD tokens, queues, doctors, and patient records.",

    accent: "blue",

    longDescription:
      "A full-stack healthcare management platform built with the MERN stack. Hospiq connects patients, doctors, hospital staff, and administrators through hospital and department discovery, OPD token management, queue tracking, doctor scheduling, medical records, authentication, and role-based workflows.",

    tags: [
      "MERN Stack",
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "MUI"
    ],

    year: "2025",

    role: "Full Stack Developer",

    githubUrl: "https://github.com/adarshprakasan/Hospiq",

    liveUrl: "#",

    highlights: [
      "Built role-based workflows for patients, doctors, staff, and administrators",
      "Implemented OPD token management with queue status and estimated waiting time",
      "Developed authentication, doctor scheduling, patient profiles, medical records, and QR-based workflows"
    ],
  },

  {
    number: "02",
    category: "Frontend / TypeScript",
    title: "Globe Explorer",

    description:
      "An interactive world exploration application for visualizing countries and global data.",

    accent: "cyan",

    longDescription:
      "A React and TypeScript-based interactive world exploration application focused on visualizing countries and global information through an interactive globe interface. Uses Zustand for state management and Tailwind CSS for a responsive, data-driven interface.",

    tags: [
      "React",
      "TypeScript",
      "Zustand",
      "Tailwind CSS",
      "Data Visualization"
    ],

    year: "2026",

    role: "Frontend Developer",

    githubUrl: "https://github.com/adarshprakasan/globe-explorer",

    liveUrl: "#",

    highlights: [
      "Built an interactive globe and country exploration interface with React and TypeScript",
      "Implemented centralized application state using Zustand",
      "Created reusable country and nation card components for presenting global data"
    ],
  },

  {
    number: "03",
    category: "Full Stack / Web App",
    title: "Attendance Management System",

    description:
      "A web-based system for managing attendance, courses, and student records.",

    accent: "blue",

    longDescription:
      "A full-stack attendance management application designed to simplify attendance tracking and course management. The project combines a React frontend with a Node.js and Express backend, MongoDB data storage, authentication, and QR-based attendance workflows.",

    tags: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "QR"
    ],

    year: "2025",

    role: "Full Stack Developer",

    githubUrl: "https://github.com/adarshprakasan/attendance-tracking-mern",

    liveUrl: "#",

    highlights: [
      "Built the frontend and backend architecture for attendance management",
      "Implemented authentication and database-backed application workflows",
      "Worked with QR-based attendance verification and course management"
    ],
  },

  {
    number: "04",
    category: "Frontend / React",
    title: "Kanban",

    description:
      "A task management interface built around a visual Kanban workflow.",

    accent: "cyan",

    longDescription:
      "A productivity-focused web application built around the Kanban methodology. The project explores interactive task management, structured workflows, and a clean interface for organizing work across different stages.",

    tags: [
      "React",
      "JavaScript",
      "Frontend",
      "UI/UX"
    ],

    year: "2024",

    role: "Frontend Developer",

    githubUrl: "https://github.com/adarshprakasan/kanban-board",

    liveUrl: "#",

    highlights: [
      "Built an interactive Kanban-style task management interface",
      "Implemented task organization across workflow stages",
      "Focused on responsive interaction and clear visual hierarchy"
    ],
  },

  {
    number: "05",
    category: "Frontend / React",
    title: "Music App",

    description:
      "A React-based music application with an interactive player experience.",

    accent: "blue",

    longDescription:
      "A frontend music application built with React, focused on creating an interactive music browsing and playback experience with reusable components and dynamic UI interactions.",

    tags: [
      "React",
      "JavaScript",
      "Frontend",
      "UI/UX"
    ],

    year: "2024",

    role: "Frontend Developer",

    githubUrl: "#",

    liveUrl: "#",

    highlights: [
      "Built the music application interface using React",
      "Created reusable components for the music experience",
      "Implemented interactive player-related UI functionality"
    ],
  },

  {
    number: "06",
    category: "Frontend / API",
    title: "Weather App",

    description:
      "A weather application that retrieves and displays live weather information through an API.",

    accent: "cyan",

    longDescription:
      "A React-based weather application that integrates an external weather API to retrieve and present dynamic weather information through a responsive interface.",

    tags: [
      "React",
      "JavaScript",
      "REST API",
      "API Integration"
    ],

    year: "2024",

    role: "Frontend Developer",

    githubUrl: "#",

    liveUrl: "#",

    highlights: [
      "Integrated an external weather API",
      "Built a dynamic interface for displaying weather information",
      "Handled API-driven data and frontend state updates"
    ],
  },

  {
    number: "07",
    category: "Frontend / React",
    title: "To-Do List",

    description:
      "A simple task management application for creating and organizing daily tasks.",

    accent: "blue",

    longDescription:
      "A React-based task management application built to practice component-driven development, state management, and interactive CRUD-style task workflows.",

    tags: [
      "React",
      "JavaScript",
      "Frontend",
      "State Management"
    ],

    year: "2024",

    role: "Frontend Developer",

    githubUrl: "#",

    liveUrl: "#",

    highlights: [
      "Built reusable React components for task management",
      "Implemented interactive task creation and management",
      "Practiced frontend state management and component-based architecture"
    ],
  },

  {
    number: "08",
    category: "Python / Computer Vision",
    title: "Prisoner Face Identification",

    description:
      "A computer vision project for identifying faces from prisoner records.",

    accent: "cyan",

    longDescription:
      "A Python-based computer vision project exploring face identification and matching against stored records. The project demonstrates practical use of image processing and facial recognition techniques.",

    tags: [
      "Python",
      "Computer Vision",
      "Face Recognition",
      "Machine Learning"
    ],

    year: "2023",

    role: "Developer",

    githubUrl: "#",

    liveUrl: "#",

    highlights: [
      "Developed a Python-based facial identification workflow",
      "Worked with computer vision and facial recognition techniques",
      "Explored matching captured facial data against stored records"
    ],
  },

  {
    number: "09",
    category: "Next.js / TypeScript",
    title: "Developer Portfolio",

    description:
      "A personal portfolio showcasing my work across software development and design.",

    accent: "blue",

    longDescription:
      "A custom Next.js portfolio built to present my work as both a developer and designer. The site combines a developer-focused experience with a separate design profile, animated transitions, responsive layouts, project case studies, skills, experience, and contact sections.",

    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Motion",
      "Responsive UI"
    ],

    year: "2026",

    role: "Designer & Developer",

    githubUrl: "https://github.com/adarshprakasan/portfolio",

    liveUrl: "https://adarshprakasan.vercel.app/",

    highlights: [
      "Designed and developed the portfolio from scratch using Next.js and TypeScript",
      "Built an interactive Designer × Developer experience with animated transitions",
      "Implemented responsive layouts, project showcases, navigation, and custom UI interactions"
    ],
  },

];


export const allProjects = [...designerProjects, ...developerProjects];
export const projectIndex = Object.fromEntries(
  allProjects.map((project) => [project.title, project]),
) as Record<string, Project>;
