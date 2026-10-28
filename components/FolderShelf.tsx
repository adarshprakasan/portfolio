"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import GlassFolder, { type FolderFile } from "@/components/ui/glass-folder-cards";
import { ART, SHEET_BG, designerFolders, developerFolders, type FolderDef } from "@/data/folders";
import { allProjects, coverOf, type Project } from "@/data/projects";
import { optimized } from "@/lib/img";

const GAP = 56;
const MAX = 360;

function toFile(p: Project, def: FolderDef): FolderFile {
  const cover = coverOf(p);
  const isLogo = p.designCategory === "Logo";
  if (!cover) return { name: p.title, meta: p.year, art: ART[p.accent] };
  return isLogo
    ? { name: p.title, meta: p.year, image: optimized(cover, 640), fit: "contain", bg: SHEET_BG[p.accent] }
    : { name: p.title, meta: p.year, image: optimized(cover, 640), fit: "cover" };
}

export default function FolderShelf({
  mode,
  onSelect,
}: {
  mode: "designer" | "developer";
  onSelect: (p: Project) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(340);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const cw = el.clientWidth;
      const cols = cw >= 1100 ? 3 : cw >= 700 ? 2 : 1;
      const pad = cols === 1 ? 40 : 0; // room for the fan on phones
      setWidth(Math.floor(Math.min(MAX, (cw - pad - GAP * (cols - 1)) / cols)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => setOpenId(null), [mode]);

  const defs = mode === "designer" ? designerFolders : developerFolders;

  const folders = useMemo(
    () =>
      defs.map((def) => {
        const projects = def.titles
          .map((t) => allProjects.find((p) => p.title === t))
          .filter((p): p is Project => !!p);
        return { def, projects, files: projects.map((p) => toFile(p, def)) };
      }),
    [defs],
  );

  return (
    <div ref={ref} className="shelf" role="group" aria-label="Project folders">
      {folders.map(({ def, projects, files }, i) => (
        <GlassFolder
          key={`${mode}-${def.id}`}
          label={def.label}
          meta={`${projects.length} ${def.noun}`}
          tone={def.tone ?? "light"}
          art={ART[def.accent]}
          seed={def.seed}
          files={files}
          action="none"
          maxVisible={5}
          width={width}
          appearDelay={i * 110}
          open={openId === def.id}
          onOpenChange={(o) => setOpenId((cur) => (o ? def.id : cur === def.id ? null : cur))}
          onFileSelect={(_, idx) => onSelect(projects[idx])}
          labelPlacement={i % 2 ? "top-left" : "bottom-left"}
          style={
            {
              "--gf-title-font": "var(--serif)",
              "--gf-title-size": "28px",
              "--gf-title-weight": 400,
              "--gf-mono-font": "var(--mono)",
              "--gf-accent": "#e2573a",
              "--gf-focus": "#e2573a",
              "--gf-glass-a": "rgba(255, 250, 244, .2)",
              "--gf-glass-b": "rgba(250, 244, 235, .55)",
              "--gf-glass-c": "rgba(245, 242, 234, .94)",
              "--gf-ink": def.tone === "dark" ? "#f5f2ea" : "#1a1a17",
              "--gf-ink-soft": def.tone === "dark" ? "rgba(245,242,234,.62)" : "rgba(26,26,23,.55)",
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
