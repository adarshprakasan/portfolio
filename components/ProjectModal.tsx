"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  X,
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  projectIndex,
  type Project,
  type ProjectMedia,
} from "@/data/projects";

const accentMap: Record<string, { primary: string; glow: string; bg: string }> =
  {
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

function ProjectMediaFrame({
  item,
  title,
}: {
  item: ProjectMedia;
  title: string;
}) {
  const [status, setStatus] = useState<"loading" | "ready" | "missing">(
    "loading",
  );

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    fetch(item.src, { method: "HEAD" })
      .then((res) => {
        if (!cancelled) setStatus(res.ok ? "ready" : "missing");
      })
      .catch(() => {
        if (!cancelled) setStatus("missing");
      });
    return () => {
      cancelled = true;
    };
  }, [item.src]);

  if (status !== "ready") {
    return (
      <div className="project-media-placeholder" aria-live="polite">
        <span className="project-media-placeholder-title">{title}</span>
        <span className="project-media-placeholder-file">{item.filename}</span>
        {status === "loading" && (
          <span className="project-media-placeholder-hint">Loading…</span>
        )}
      </div>
    );
  }

  if (item.type === "video") {
    return (
      <video
        className="project-media-asset"
        src={item.src}
        controls
        playsInline
        preload="metadata"
      />
    );
  }

  if (item.type === "pdf") {
    return (
      <iframe
        className="project-media-asset project-media-pdf"
        src={item.src}
        title={`${title} — ${item.filename}`}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="project-media-asset"
      src={item.src}
      alt={`${title} — ${item.filename}`}
    />
  );
}

export default function ProjectModal({ project, originRect, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);
  const [phase, setPhase] = useState<"idle" | "entering" | "open" | "exiting">(
    "idle",
  );
  const [viewerOpen, setViewerOpen] = useState(false);
  const [mediaIndex, setMediaIndex] = useState(0);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      setViewerOpen(false);
      setMediaIndex(0);
      setPhase("entering");
      const t = window.setTimeout(() => setPhase("open"), 20);
      return () => window.clearTimeout(t);
    }
    document.body.style.overflow = "";
    setViewerOpen(false);
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

  const media = project?.media ?? [];

  const showPrevMedia = useCallback(() => {
    setMediaIndex((index) =>
      media.length === 0 ? 0 : (index - 1 + media.length) % media.length,
    );
  }, [media.length]);

  const showNextMedia = useCallback(() => {
    setMediaIndex((index) =>
      media.length === 0 ? 0 : (index + 1) % media.length,
    );
  }, [media.length]);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (viewerOpen) {
          setViewerOpen(false);
          return;
        }
        handleClose();
        return;
      }
      if (!viewerOpen || media.length < 2) return;
      if (e.key === "ArrowLeft") showPrevMedia();
      if (e.key === "ArrowRight") showNextMedia();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [
    handleClose,
    media.length,
    project,
    showNextMedia,
    showPrevMedia,
    viewerOpen,
  ]);

  if (!project) return null;

  const details = projectIndex[project.title] ?? project;
  const colors = accentMap[project.accent] ?? accentMap.lilac;
  const hasLive = Boolean(details.liveUrl && details.liveUrl !== "#");
  const hasSource = Boolean(details.githubUrl && details.githubUrl !== "#");
  const hasMedia = media.length > 0;
  const activeMedia = media[mediaIndex];

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
                ease: isExiting ? [0.55, 0, 0.45, 1] : [0.16, 1, 0.3, 1],
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
                transition={{
                  duration: 0.35,
                  delay: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
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
                  transition={{
                    duration: 0.5,
                    delay: 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
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
                    transition={{
                      duration: 0.4,
                      delay: 0.28,
                      ease: [0.22, 1, 0.36, 1],
                    }}
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
                    transition={{
                      duration: 0.5,
                      delay: 0.32,
                      ease: [0.22, 1, 0.36, 1],
                    }}
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
                    transition={{
                      duration: 0.45,
                      delay: 0.38,
                      ease: [0.22, 1, 0.36, 1],
                    }}
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
                    transition={{
                      duration: 0.4,
                      delay: 0.44,
                      ease: [0.22, 1, 0.36, 1],
                    }}
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
                    transition={{
                      duration: 0.4,
                      delay: 0.48,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <span className="project-modal-role-label">Role</span>
                    <span className="project-modal-role-value">
                      {details.role}
                    </span>
                  </motion.div>

                  {(hasLive || hasSource || hasMedia) && (
                    <motion.div
                      className="project-modal-actions"
                      initial={{ opacity: 0, y: 16 }}
                      animate={
                        isOpen && !isExiting
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 16 }
                      }
                      transition={{
                        duration: 0.4,
                        delay: 0.52,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {hasLive && (
                        <a
                          href={details.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-modal-btn project-modal-btn-primary"
                        >
                          View Project <ExternalLink size={14} />
                        </a>
                      )}
                      {!hasLive && hasMedia && (
                        <button
                          type="button"
                          className="project-modal-btn project-modal-btn-primary"
                          onClick={() => {
                            setMediaIndex(0);
                            setViewerOpen(true);
                          }}
                        >
                          View Project <ExternalLink size={14} />
                        </button>
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
                      transition={{
                        duration: 0.45,
                        delay: 0.52,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <p className="project-modal-highlights-label">
                        Highlights
                      </p>
                      <ul>
                        {details.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {viewerOpen && activeMedia && (
              <motion.div
                className="project-media-viewer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                role="dialog"
                aria-modal="true"
                aria-label={`${project.title} work`}
              >
                <button
                  type="button"
                  className="project-media-viewer-backdrop"
                  aria-label="Close work viewer"
                  onClick={() => setViewerOpen(false)}
                />
                <div className="project-media-viewer-panel">
                  <div className="project-media-viewer-bar">
                    <div className="project-media-viewer-meta">
                      <span>{project.title}</span>
                      <span>{activeMedia.filename}</span>
                    </div>
                    <button
                      type="button"
                      className="project-modal-close project-media-viewer-close"
                      onClick={() => setViewerOpen(false)}
                      aria-label="Close work viewer"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="project-media-stage">
                    {media.length > 1 && (
                      <button
                        type="button"
                        className="project-media-nav project-media-nav-prev"
                        onClick={showPrevMedia}
                        aria-label="Previous file"
                      >
                        <ChevronLeft size={22} />
                      </button>
                    )}
                    <ProjectMediaFrame
                      item={activeMedia}
                      title={project.title}
                    />
                    {media.length > 1 && (
                      <button
                        type="button"
                        className="project-media-nav project-media-nav-next"
                        onClick={showNextMedia}
                        aria-label="Next file"
                      >
                        <ChevronRight size={22} />
                      </button>
                    )}
                  </div>
                  {media.length > 1 && (
                    <div className="project-media-thumbs" role="tablist">
                      {media.map((item, index) => (
                        <button
                          key={item.src}
                          type="button"
                          role="tab"
                          aria-selected={index === mediaIndex}
                          className={`project-media-thumb${
                            index === mediaIndex
                              ? " project-media-thumb--active"
                              : ""
                          }`}
                          onClick={() => setMediaIndex(index)}
                        >
                          {item.filename}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
