"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Github, ExternalLink } from "lucide-react";

export type Project = {
  number: string;
  category: string;
  title: string;
  description: string;
  accent: string;
  designCategory?: string;
};

type ProjectDetails = {
  longDescription: string;
  tags: string[];
  year: string;
  role: string;
  githubUrl?: string;
  liveUrl?: string;
  highlights: string[];
};

const projectDetails: Record<string, ProjectDetails> = {
  "Strata Dashboard": {
    longDescription:
      "A modular analytics dashboard designed for data-heavy teams who need to think clearly under pressure. Built with a dark-mode-first design system, every panel, chart, and filter state was crafted for speed, scanability, and elegance.",
    tags: ["UI/UX", "Dashboard", "Design Systems", "Figma", "Dark Mode"],
    year: "2024",
    role: "Lead UI/UX Designer",
    liveUrl: "#",
    highlights: [
      "Designed a 60+ component Figma library with auto-layout and variables",
      "Reduced average task-completion time by 34% through layout restructure",
      "Built interactive prototypes tested with 12 real users across 3 sessions",
    ],
  },
  "Bloom App": {
    longDescription:
      "A mental wellness companion designed around calm, breathable UX. Daily journaling, mood tracking, and guided sessions live inside layouts that feel as light as the content they hold — intentional whitespace, soft palettes, and micro-interactions that reward reflection.",
    tags: ["UI/UX", "Mobile App", "Wellness", "Figma", "Prototyping"],
    year: "2024",
    role: "Product Designer",
    liveUrl: "#",
    highlights: [
      "Delivered 80+ mobile screens across iOS and Android breakpoints",
      "Ran usability tests that cut onboarding drop-off by 48%",
      "Designed a custom iconography set with 90 wellness-themed glyphs",
    ],
  },
  "Neon Pulse": {
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
  "Aura Studio": {
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
  "Void Objects": {
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
  "Frame Study": {
    longDescription:
      "A collection of short-form video edits that treat film as a compositional instrument. Every cut, colour grade, and sound choice is deliberate — studying how rhythm, pacing, and visual grammar can transform raw footage into something felt rather than just watched.",
    tags: ["Video Editing", "Motion", "Premiere Pro", "Color Grading", "Montage"],
    year: "2024",
    role: "Video Editor & Colorist",
    highlights: [
      "6 short films ranging from 45 seconds to 4 minutes",
      "Developed a signature grade built from custom LUTs in DaVinci Resolve",
      "Original sound design layered using Adobe Audition",
    ],
  },
  "After Hours": {
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
  HospEasy: {
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
  Flowstate: {
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
};

const accentMap: Record<string, { primary: string; glow: string; bg: string }> = {
  lilac: {
    primary: "#c98aff",
    glow: "rgba(185, 100, 255, 0.25)",
    bg: "linear-gradient(145deg, #1a1228, #2d1845)",
  },
  coral: {
    primary: "#ffb06e",
    glow: "rgba(255, 140, 80, 0.22)",
    bg: "linear-gradient(145deg, #281421, #52302b)",
  },
  blue: {
    primary: "#78a7ff",
    glow: "rgba(100, 150, 255, 0.22)",
    bg: "linear-gradient(145deg, #101a35, #172b55)",
  },
  cyan: {
    primary: "#55d8df",
    glow: "rgba(70, 210, 220, 0.22)",
    bg: "linear-gradient(145deg, #0d2026, #16404e)",
  },
};

type OriginRect = { x: number; y: number; w: number; h: number };

type Props = {
  project: Project | null;
  originRect: OriginRect | null;
  onClose: () => void;
};

export default function ProjectModal({ project, originRect, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);
  const [phase, setPhase] = useState<"idle" | "entering" | "open" | "exiting">(
    "idle",
  );

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      setPhase("entering");
      const t = window.setTimeout(() => setPhase("open"), 20);
      return () => window.clearTimeout(t);
    }
    document.body.style.overflow = "";
    setPhase("idle");
  }, [project]);

  const handleClose = useCallback(() => {
    if (!project) return;
    setPhase((current) => (current === "exiting" ? current : "exiting"));
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(onClose, 520);
  }, [onClose, project]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose, project]);

  if (!project) return null;

  const details = projectDetails[project.title] ?? {
    longDescription: project.description,
    tags: [project.category],
    year: "2024",
    role: "Designer & Developer",
    highlights: [],
  };
  const colors = accentMap[project.accent] ?? accentMap.lilac;
  const hasLive = Boolean(details.liveUrl && details.liveUrl !== "#");
  const hasSource = Boolean(details.githubUrl && details.githubUrl !== "#");

  // Build clip-path origin for the liquid morph
  const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
  const vh = typeof window !== "undefined" ? window.innerHeight : 900;
  const ox = originRect ? ((originRect.x + originRect.w / 2) / vw) * 100 : 50;
  const oy = originRect ? ((originRect.y + originRect.h / 2) / vh) * 100 : 50;

  const isOpen = phase === "open";
  const isExiting = phase === "exiting";

  return (
    <AnimatePresence>
      {(phase === "entering" || phase === "open" || phase === "exiting") && (
        <>
          {/* Backdrop */}
          <motion.div
            className="project-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: isExiting ? 0 : 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Liquid blob that morphs into full panel */}
          <motion.div
            className="project-modal-liquid"
            style={
              {
                "--accent-primary": colors.primary,
                "--accent-glow": colors.glow,
                "--accent-bg": colors.bg,
                "--ox": `${ox}%`,
                "--oy": `${oy}%`,
              } as React.CSSProperties
            }
            initial={{
              clipPath: `circle(0% at ${ox}% ${oy}%)`,
              opacity: 0,
            }}
            animate={
              isExiting
                ? {
                    clipPath: `circle(0% at ${ox}% ${oy}%)`,
                    opacity: 0,
                  }
                : isOpen
                  ? {
                      clipPath: `circle(175% at ${ox}% ${oy}%)`,
                      opacity: 1,
                    }
                  : {
                      clipPath: `circle(0% at ${ox}% ${oy}%)`,
                      opacity: 0,
                    }
            }
            transition={{
              clipPath: {
                duration: isExiting ? 0.5 : 0.65,
                ease: isExiting
                  ? [0.55, 0, 0.45, 1]
                  : [0.16, 1, 0.3, 1],
              },
              opacity: { duration: 0.25 },
            }}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} project details`}
            ref={overlayRef}
          >
            {/* Inner scrollable content */}
            <div className="project-modal-inner">
              {/* Close button */}
              <motion.button
                className="project-modal-close"
                onClick={handleClose}
                aria-label="Close project"
                initial={{ opacity: 0, scale: 0.7, rotate: -90 }}
                animate={
                  isOpen && !isExiting
                    ? { opacity: 1, scale: 1, rotate: 0 }
                    : { opacity: 0, scale: 0.7, rotate: -90 }
                }
                transition={{ duration: 0.35, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <X size={20} />
              </motion.button>

              <div className="project-modal-layout">
                {/* Left — art panel */}
                <motion.div
                  className="project-modal-art"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={
                    isOpen && !isExiting
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.9 }
                  }
                  transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="project-modal-art-bg" />
                  <div className="project-modal-orb" />
                  <span className="project-modal-number">{project.number}</span>
                  <b className="project-modal-title-art">{project.title}</b>
                </motion.div>

                {/* Right — content */}
                <div className="project-modal-content">
                  <motion.div
                    className="project-modal-meta"
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isOpen && !isExiting
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.4, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="project-modal-category">
                      {project.category}
                    </span>
                    <span className="project-modal-year">{details.year}</span>
                  </motion.div>

                  <motion.h2
                    className="project-modal-heading"
                    initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                    animate={
                      isOpen && !isExiting
                        ? { opacity: 1, y: 0, filter: "blur(0px)" }
                        : { opacity: 0, y: 28, filter: "blur(8px)" }
                    }
                    transition={{ duration: 0.5, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {project.title}
                  </motion.h2>

                  <motion.p
                    className="project-modal-desc"
                    initial={{ opacity: 0, y: 18 }}
                    animate={
                      isOpen && !isExiting
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 18 }
                    }
                    transition={{ duration: 0.45, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {details.longDescription}
                  </motion.p>

                  {/* Tags */}
                  <motion.div
                    className="project-modal-tags"
                    initial={{ opacity: 0, y: 14 }}
                    animate={
                      isOpen && !isExiting
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 14 }
                    }
                    transition={{ duration: 0.4, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {details.tags.map((tag) => (
                      <span key={tag} className="project-modal-tag">
                        {tag}
                      </span>
                    ))}
                  </motion.div>

                  {/* Role */}
                  <motion.div
                    className="project-modal-role-row"
                    initial={{ opacity: 0, y: 14 }}
                    animate={
                      isOpen && !isExiting
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 14 }
                    }
                    transition={{ duration: 0.4, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="project-modal-role-label">Role</span>
                    <span className="project-modal-role-value">{details.role}</span>
                  </motion.div>

                  {/* Highlights */}
                  {details.highlights.length > 0 && (
                    <motion.div
                      className="project-modal-highlights"
                      initial={{ opacity: 0, y: 16 }}
                      animate={
                        isOpen && !isExiting
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 16 }
                      }
                      transition={{ duration: 0.45, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="project-modal-highlights-label">Highlights</p>
                      <ul>
                        {details.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {(hasLive || hasSource) && (
                    <motion.div
                    className="project-modal-actions"
                    initial={{ opacity: 0, y: 16 }}
                    animate={
                      isOpen && !isExiting
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 16 }
                    }
                    transition={{ duration: 0.4, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {hasLive && (
                      <a
                        href={details.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-modal-btn project-modal-btn-primary"
                      >
                        View Live <ExternalLink size={14} />
                      </a>
                    )}
                    {hasSource && (
                      <a
                        href={details.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-modal-btn project-modal-btn-ghost"
                      >
                        <Github size={14} /> Source
                      </a>
                    )}
                  </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
