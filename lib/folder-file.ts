import type { FolderFile } from "@/components/ui/glass-folder-cards";
import { ART, SHEET_BG, type FolderDef } from "@/data/folders";
import { coverOf, type Project } from "@/data/projects";
import { optimized } from "@/lib/img";

/** Turn a project into a sheet that can live inside a glass folder. */
export function toFile(project: Project, def: FolderDef): FolderFile {
  const cover = coverOf(project);
  const isLogo = project.designCategory === "Logo";
  if (!cover) {
    return { name: project.title, meta: project.year, art: ART[project.accent] };
  }
  return isLogo
    ? {
        name: project.title,
        meta: project.year,
        image: optimized(cover, 640),
        fit: "contain",
        bg: SHEET_BG[project.accent],
      }
    : {
        name: project.title,
        meta: project.year,
        image: optimized(cover, 640),
        fit: "cover",
      };
}

/** Resolve a folder definition against the full project list. */
export function folderContents(def: FolderDef, all: Project[]) {
  const projects = def.titles
    .map((title) => all.find((p) => p.title === title))
    .filter((p): p is Project => !!p);
  return { projects, files: projects.map((p) => toFile(p, def)) };
}
