import type { ArtRecipe } from "@/components/ui/glass-folder-cards";
import type { Accent } from "./projects";

export type FolderDef = {
  id: string;
  label: string;
  noun: string;
  accent: Accent;
  tone?: "light" | "dark";
  seed: number;
  /** Project titles, in the order they stack (last = nearest the glass). */
  titles: string[];
};

/** Back-panel artwork in the site's palette: pastel to ink, one hue per accent. */
export const ART: Record<Accent, ArtRecipe> = {
  coral: {
    style: "marble",
    colors: ["#fdf1ea", "#f6d3c4", "#ee9a7e", "#e2573a", "#8f2f1d", "#2a1612"],
    scale: 0.7,
    warp: 3.2,
    angle: -0.5,
    gloss: 0.4,
    veins: 0.4,
  },
  lilac: {
    style: "marble",
    colors: ["#f8f5fd", "#dcd5f2", "#a99be0", "#5f4fb0", "#2a2060", "#120d2c"],
    scale: 0.72,
    warp: 3.4,
    angle: 0.8,
    gloss: 0.45,
    veins: 0.4,
  },
  blue: {
    style: "streak",
    colors: ["#f3f8fc", "#d3e2f2", "#8fb2dc", "#3f5f93", "#1d2c4a", "#0e1524"],
    scale: 0.7,
    warp: 1.6,
    angle: -0.4,
    gloss: 0.3,
    veins: 0,
  },
  cyan: {
    style: "marble",
    colors: ["#f3fbf8", "#cfe8e1", "#86c7b6", "#2f7a6b", "#123a33", "#09201c"],
    scale: 0.7,
    warp: 3.3,
    angle: 2.0,
    gloss: 0.45,
    veins: 0.4,
  },
};

/** Soft sheet colours for logo cards, per accent. */
export const SHEET_BG: Record<Accent, string> = {
  coral: "#fbe3d8",
  lilac: "#e8e3f7",
  blue: "#e0ecf8",
  cyan: "#dcefe9",
};

export const designerFolders: FolderDef[] = [
  {
    id: "uiux",
    label: "UI / UX",
    noun: "case studies",
    accent: "lilac",
    seed: 4,
    titles: ["Illford Digital", "Designer Hiring Platform"],
  },
  {
    id: "brand",
    label: "Brand Identity",
    noun: "logos",
    accent: "coral",
    seed: 9,
    titles: [
      "Hikari",
      "Inside Out",
      "MakeATable",
      "MPro Technologies",
      "Illford Digital, Brand Identity",
    ],
  },
  {
    id: "3d",
    label: "3D Works",
    noun: "renders",
    accent: "blue",
    tone: "dark",
    seed: 5,
    titles: [
      "Villa Design, Project 01",
      "Villa Design, Project 02",
      "Villa Design, Project 03",
    ],
  },
  {
    id: "print",
    label: "Print & Poster",
    noun: "collections",
    accent: "coral",
    seed: 12,
    titles: ["Poster Works", "GAZETTE, Glimpse of Glory"],
  },
  {
    id: "motion",
    label: "Motion & Video",
    noun: "videos",
    accent: "cyan",
    seed: 7,
    titles: ["IEEE Newsletter Announcement", "Technical Fest Announcement"],
  },
];

export const developerFolders: FolderDef[] = [
  {
    id: "fullstack",
    label: "Full-Stack",
    noun: "apps",
    accent: "blue",
    seed: 3,
    titles: ["Attendance Management System", "Hospiq"],
  },
  {
    id: "frontend",
    label: "Frontend Apps",
    noun: "apps",
    accent: "cyan",
    tone: "dark",
    seed: 8,
    titles: [
      "Globe Explorer",
      "Kanban",
      "Music App",
      "Weather App",
      "To-Do List",
    ],
  },
  {
    id: "labs",
    label: "Vision & Web",
    noun: "projects",
    accent: "lilac",
    seed: 6,
    titles: ["Prisoner Face Identification", "Developer Portfolio"],
  },
];
