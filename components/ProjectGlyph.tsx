import {
  Atom,
  Box,
  Cloud,
  Film,
  Globe2,
  HeartPulse,
  KanbanSquare,
  Layout,
  Music2,
  Newspaper,
  QrCode,
  ScanFace,
  SquareCheckBig,
  Type,
  Layers,
} from "lucide-react";
import type { ComponentType } from "react";

const byTitle: Record<string, ComponentType<{ size?: number; strokeWidth?: number }>> = {
  "Illford Digital": Layout,
  "Designer Hiring Platform": Layers,
  "Poster Works": Type,
  "Technical Fest Announcement": Film,
  "IEEE Newsletter Announcement": Film,
  "GAZETTE — Glimpse of Glory": Newspaper,
  Hospiq: HeartPulse,
  "Globe Explorer": Globe2,
  "Attendance Management System": QrCode,
  Kanban: KanbanSquare,
  "Music App": Music2,
  "Weather App": Cloud,
  "To-Do List": SquareCheckBig,
  "Prisoner Face Identification": ScanFace,
  "Developer Portfolio": Atom,
};

/** A line-icon stand-in for projects that have no image media yet. */
export default function ProjectGlyph({ title, size = 64 }: { title: string; size?: number }) {
  const Icon = byTitle[title] ?? Box;
  return <Icon size={size} strokeWidth={1.1} />;
}
