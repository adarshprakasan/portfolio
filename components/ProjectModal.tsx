"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  FileText,
  Github,
  Play,
  X,
} from "lucide-react";
import { type Project } from "@/data/projects";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {project && (
        <Body key={project.title} project={project} onClose={onClose} />
      )}
    </AnimatePresence>
  );
}

function Body({ project, onClose }: { project: Project; onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const media = project.media ?? [];
  const current = media[index];
  const hasLive = project.liveUrl && project.liveUrl !== "#";
  const hasFigma = hasLive && project.liveUrl!.includes("figma.com");
  const hasGit = project.githubUrl && project.githubUrl !== "#";
  const thumbnailStart = Math.max(0, Math.min(index - 1, media.length - 3));
  const visibleThumbnails = media.slice(thumbnailStart, thumbnailStart + 3);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight")
        setIndex((i) => Math.min(i + 1, media.length - 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, media.length]);

  return (
    <motion.div
      className="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        <div className="modal-body">
          <div className="stage">
            <div
              className={`stage-view t-${project.accent}`}
              id="stage-view-canvas"
              style={{
                aspectRatio:
                  project.designCategory === "Graphic Design" ? "3/4" : "16/10",
                maxHeight: "min(75vh, 800px)",
                width: current ? "fit-content" : "100%",
                margin: "0 auto",
              }}
            >
              {!current && (
                <div className="plate">
                  <span className="plate-n" aria-hidden>
                    {project.number}
                  </span>
                  <span className="plate-t">{project.title}</span>
                  <span className="plate-k">
                    {project.category}, {project.year}
                  </span>
                </div>
              )}
              {current?.type === "image" && (
                <img
                  src={current.src}
                  alt={`${project.title}, ${current.filename}`}
                  style={{
                    width: "auto",
                    height: "100%",
                    maxHeight: "100%",
                    display: "block",
                  }}
                />
              )}
              {current?.type === "video" && (
                <video
                  src={current.src}
                  controls
                  playsInline
                  preload="metadata"
                />
              )}
              {current?.type === "pdf" && (
                <a
                  className="btn btn-solid"
                  href={current.src}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText size={16} /> Open the PDF <ArrowUpRight size={15} />
                </a>
              )}
            </div>

            {media.length > 1 && (
              <div
                className="thumbs-wrapper"
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  width: "min(100%, 320px)",
                  margin: "0 auto",
                }}
              >
                <button
                  type="button"
                  className="thumb-nav-btn"
                  aria-label="Previous image"
                  onClick={() => setIndex((i) => Math.max(0, i - 1))}
                  disabled={index === 0}
                >
                  <ChevronLeft size={16} aria-hidden="true" />
                </button>
                <div
                  className="thumbs"
                  style={{
                    overflowX: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    gap: "8px",
                    flex: 1,
                  }}
                >
                  {visibleThumbnails.map((m, i) => (
                    <button
                      key={m.src}
                      className={thumbnailStart + i === index ? "on" : ""}
                      onClick={() => setIndex(thumbnailStart + i)}
                      aria-label={`Show item ${thumbnailStart + i + 1}`}
                      style={{
                        flexShrink: 0,
                        opacity: thumbnailStart + i === index ? 1 : 0.6,
                      }}
                    >
                      {m.type === "image" ? (
                        <Image
                          src={m.src}
                          alt=""
                          fill
                          sizes="72px"
                          style={{ objectFit: "cover" }}
                        />
                      ) : m.type === "video" ? (
                        <Play size={16} />
                      ) : (
                        <FileText size={16} />
                      )}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="thumb-nav-btn"
                  aria-label="Next image"
                  onClick={() =>
                    setIndex((i) => Math.min(media.length - 1, i + 1))
                  }
                  disabled={index === media.length - 1}
                >
                  <ChevronRight size={16} aria-hidden="true" />
                </button>
              </div>
            )}

            <div className="stage-tags">
              <h4>Tools &amp; tags</h4>
              <div className="tags">
                {project.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
            {hasFigma && (
              <div className="actions stage-actions">
                <a
                  className="btn btn-solid"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View in Figma <ArrowUpRight size={15} />
                </a>
              </div>
            )}
          </div>

          <div className="info">
            <span className="label">
              {project.number} · {project.category}
            </span>
            <h2 className="display">{project.title}</h2>
            <p>{project.longDescription}</p>

            <div className="facts-row">
              <div>
                <span className="label">Year</span>
                <b>{project.year}</b>
              </div>
              <div>
                <span className="label">Role</span>
                <b>{project.role}</b>
              </div>
            </div>

            <h4>Highlights</h4>
            <ul>
              {project.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>

            {((hasLive && !hasFigma) || hasGit) && (
              <div className="actions">
                {hasLive && !hasFigma && (
                  <a
                    className="btn btn-solid"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live site <ArrowUpRight size={15} />
                  </a>
                )}
                {hasGit && (
                  <a
                    className="btn btn-ghost"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={15} /> Source
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
