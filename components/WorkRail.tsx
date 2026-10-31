"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import GlassFolder from "@/components/ui/glass-folder-cards";
import {
  ART,
  designerFolders,
  developerFolders,
  type FolderDef,
} from "@/data/folders";
import {
  allProjects,
  designerProjects,
  developerProjects,
  type Project,
} from "@/data/projects";
import { folderContents } from "@/lib/folder-file";

const CARD = 340;

export default function WorkRail({
  mode,
  onSelect,
}: {
  mode: "designer" | "developer";
  onSelect: (project: Project) => void;
}) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [distance, setDistance] = useState(0);
  const [card, setCard] = useState(CARD);
  const [openId, setOpenId] = useState<string | null>(null);

  const defs = mode === "designer" ? designerFolders : developerFolders;
  const projects = mode === "designer" ? designerProjects : developerProjects;

  const folders = useMemo(
    () =>
      defs.map((def: FolderDef) => ({
        def,
        ...folderContents(def, allProjects),
      })),
    [defs],
  );

  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start start", "end end"],
  });

  const raw = useMotionValue(0);
  const x = useSpring(raw, {
    stiffness: 220,
    damping: 40,
    mass: 0.35,
    restDelta: 0.4,
  });
  const distRef = useRef(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    raw.set(-p * distRef.current);
  });

  useEffect(() => {
    distRef.current = distance;
    raw.set(-scrollYProgress.get() * distance);
  }, [distance, raw, scrollYProgress]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const measure = () => {
      const isPinned = mq.matches;
      const el = track.current;
      setPinned(isPinned);
      setCard(
        isPinned
          ? CARD
          : Math.round(Math.min(CARD, Math.max(240, window.innerWidth * 0.78))),
      );

      // scrollWidth drops a flex container's trailing padding, so measure the
      // last panel's edge and add the padding back.
      if (!isPinned || !el || !el.lastElementChild) {
        setDistance(0);
        return;
      }
      const left = el.getBoundingClientRect().left;
      const right = el.lastElementChild.getBoundingClientRect().right - left;
      const pad = parseFloat(getComputedStyle(el).paddingRight) || 0;
      setDistance(Math.max(0, Math.round(right + pad - window.innerWidth)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    mq.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
  }, [mode]);

  useEffect(() => setOpenId(null), [mode]);

  return (
    <section
      id="work"
      ref={root}
      className="work"
      style={pinned ? { height: `calc(100svh + ${distance}px)` } : undefined}
      aria-label="Selected works"
    >
      <div className="work-pin">
        <h2 className="work-title">
          A drawer of <em>things made.</em>
        </h2>

        <motion.div ref={track} className="work-track" style={{ x }}>
          {folders.map(({ def, projects: rows, files }, i) => (
            <div
              key={`${mode}-${def.id}`}
              className="rail-item"
              data-cursor="Open"
            >
              <GlassFolder
                label={def.label}
                meta={`${rows.length} ${def.noun}`}
                tone={def.tone ?? "light"}
                art={ART[def.accent]}
                seed={def.seed}
                files={files}
                action="none"
                maxVisible={5}
                width={card}
                appearDelay={i * 90}
                open={openId === def.id}
                onOpenChange={(o) =>
                  setOpenId((cur) => (o ? def.id : cur === def.id ? null : cur))
                }
                onFileSelect={(_, idx) => onSelect(rows[idx])}
                labelPlacement={i % 2 ? "top-left" : "bottom-left"}
                style={
                  {
                    "--gf-title-font": "var(--serif)",
                    "--gf-title-size": "27px",
                    "--gf-title-weight": 400,
                    "--gf-mono-font": "var(--mono)",
                    "--gf-accent": "#e2573a",
                    "--gf-focus": "#e2573a",
                    "--gf-glass-a": "rgba(255, 250, 244, .2)",
                    "--gf-glass-b": "rgba(250, 244, 235, .55)",
                    "--gf-glass-c": "rgba(245, 242, 234, .94)",
                    "--gf-ink": def.tone === "dark" ? "#f5f2ea" : "#1a1a17",
                    "--gf-ink-soft":
                      def.tone === "dark"
                        ? "rgba(245,242,234,.62)"
                        : "rgba(26,26,23,.55)",
                  } as React.CSSProperties
                }
              />
            </div>
          ))}

          <div className="rail-index">
            <h3>Index</h3>
            <ol>
              {projects.map((p, i) => (
                <li key={p.title}>
                  <button
                    type="button"
                    onClick={() => onSelect(p)}
                    data-cursor="View"
                  >
                    <span className="ix">{String(i + 1).padStart(2, "0")}</span>
                    <span className="tt">{p.title}</span>
                    <span className="yr">{p.year}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </motion.div>

        <div className="work-foot">
          <span className="work-bar" aria-hidden>
            <motion.i style={{ scaleX: scrollYProgress }} />
          </span>
        </div>
      </div>
    </section>
  );
}
