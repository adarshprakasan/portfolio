"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowDownRight } from "lucide-react";
import GlassFolder from "@/components/ui/glass-folder-cards";
import {
  ART,
  designerFolders,
  developerFolders,
  type FolderDef,
} from "@/data/folders";
import { allProjects, type Project } from "@/data/projects";
import { folderContents } from "@/lib/folder-file";

export type Mode = "designer" | "developer";

const copy = {
  designer: {
    lede: (
      <>
        I build <b>brands, interfaces and visual systems</b> — quiet, considered
        and made to be remembered.
      </>
    ),
    note: "Specimen 01 · Instrument Serif Italic",
  },
  developer: {
    lede: (
      <>
        I ship <b>full-stack products</b> with React, Next.js and the MERN stack
        — from the first component to the last endpoint.
      </>
    ),
    note: "Specimen 02 · DM Mono Medium",
  },
} as const;

/** Duplicate of the headline used for the two off-register ink layers. */
function GhostCopy() {
  return (
    <>
      <span className="hv-l1">Adarsh</span>
      <span className="hv-l2">Prakasan</span>
    </>
  );
}

export default function Hero({
  mode,
  onMode,
  onSelect,
}: {
  mode: Mode;
  onMode: (mode: Mode) => void;
  onSelect: (project: Project) => void;
}) {
  const reduce = useReducedMotion();
  const [time, setTime] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  // pointer position, normalised to -0.5 … 0.5 across the hero
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 80, damping: 18, mass: 0.6 });

  // the two ink layers drift apart in opposite directions, with a resting
  // offset so the plate is never quite in register
  const g1x = useTransform(sx, (v) => v * 14 + 2.2);
  const g1y = useTransform(sy, (v) => v * 9 - 1.6);
  const g2x = useTransform(sx, (v) => v * -11 - 1.8);
  const g2y = useTransform(sy, (v) => v * -7 + 1.4);

  const rotateY = useTransform(sx, [-0.5, 0.5], [-2.4, 2.4]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [2, -2]);

  // specimens pinned into the sheet drift against the pointer
  const foldAx = useTransform(sx, (v) => v * -26);
  const foldAy = useTransform(sy, (v) => v * -18);
  const foldBx = useTransform(sx, (v) => v * 18);
  const foldBy = useTransform(sy, (v) => v * 12);

  // the sheet eases away a touch slower than the page
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const nameScale = useTransform(scrollYProgress, [0, 1], [1, 0.975]);

  const defs = mode === "designer" ? designerFolders : developerFolders;

  const specimens = useMemo(() => {
    return defs.slice(0, 2).map((def: FolderDef) => ({
      def,
      ...folderContents(def, allProjects),
    }));
  }, [defs]);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Dubai",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => setOpenId(null), [mode]);

  return (
    <section
      id="home"
      ref={heroRef}
      className="hv"
      data-mode={mode}
      aria-label="Introduction"
      onPointerMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <div className="hv-grain" aria-hidden />
      <div className="hv-guides" aria-hidden>
        <span />
        <span />
        <span />
      </div>

      <div className="wrap hv-inner">
        <div className="hv-top">
          <span className="hv-status">
            <i aria-hidden /> Available for work
          </span>
          <span className="hv-clock">
            <span className="hv-coords">Dubai, UAE · 25.2048°N 55.2708°E · </span>
            <span className="hv-time">{time || "--:--"} GST</span>
          </span>
        </div>

        <motion.div className="hv-name" style={{ y: nameY, scale: nameScale }}>
          <motion.div
            className="hv-tilt"
            style={{ rotateX, rotateY, transformPerspective: 1400 }}
          >
            <div className="hv-ghosts" aria-hidden>
              <motion.div className="hv-ghost g1" style={{ x: g1x, y: g1y }}>
                <GhostCopy />
              </motion.div>
              <motion.div className="hv-ghost g2" style={{ x: g2x, y: g2y }}>
                <GhostCopy />
              </motion.div>
            </div>

            <h1 className="hv-h1">
              <span className="hv-l1">Adarsh</span>
              <span className="hv-l2">
                <span className="hv-serif">Prakasan</span>
                <span className="hv-mono" aria-hidden>
                  Prakasan
                </span>
              </span>
            </h1>

            <div className="hv-spec" aria-hidden>
              <span className="r cap" />
              <span className="r base" />
            </div>

            {specimens.map(({ def, projects, files }, i) => {
              const w = i === 0 ? 190 : 152;
              return (
                <motion.figure
                  key={`${mode}-${def.id}`}
                  className={`hv-fold hv-fold--${i === 0 ? "a" : "b"}`}
                  style={{
                    x: i === 0 ? foldAx : foldBx,
                    y: i === 0 ? foldAy : foldBy,
                    rotate: i === 0 ? 3.4 : -6.5,
                    height: Math.round((272 + 54) * (w / 340)),
                  }}
                  data-cursor="Open"
                >
                <GlassFolder
                  label={def.label}
                  meta={`${projects.length} ${def.noun}`}
                  tone={def.tone ?? "light"}
                  art={ART[def.accent]}
                  seed={def.seed}
                  files={files}
                  action="none"
                  maxVisible={4}
                  width={w}
                  appearDelay={1100 + i * 190}
                  open={openId === def.id}
                  onOpenChange={(o) =>
                    setOpenId((cur) =>
                      o ? def.id : cur === def.id ? null : cur,
                    )
                  }
                  onFileSelect={(_, idx) => onSelect(projects[idx])}
                  labelPlacement={i === 0 ? "bottom-left" : "top-left"}
                  style={
                    {
                      "--gf-title-font": "var(--serif)",
                      "--gf-title-size": "15px",
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
                <figcaption>
                  Fig. 0{i + 1} — {def.label}
                </figcaption>
                </motion.figure>
              );
            })}
          </motion.div>

          <div className="hv-note">{copy[mode].note}</div>
        </motion.div>

        <div className="hv-foot">
          <p className="hv-lede">{copy[mode].lede}</p>
          <div className="hv-ctl">
            <div className="hv-switch" role="tablist" aria-label="Profile">
              <button
                role="tab"
                aria-selected={mode === "designer"}
                className={mode === "designer" ? "on" : ""}
                onClick={() => onMode("designer")}
              >
                Design
              </button>
              <span className="sep" aria-hidden>
                /
              </span>
              <button
                role="tab"
                aria-selected={mode === "developer"}
                className={mode === "developer" ? "on" : ""}
                onClick={() => onMode("developer")}
              >
                Code
              </button>
            </div>
            <a className="hv-link" href="#work">
              Selected works <ArrowDownRight size={16} strokeWidth={1.6} />
            </a>
          </div>
        </div>

        <div className="hv-base">
          <span className="grp">Designer × Developer</span>
          <span className="grp">Portfolio — 2026</span>
          <span className="hv-scroll">
            Scroll <i aria-hidden />
          </span>
        </div>
      </div>
    </section>
  );
}
