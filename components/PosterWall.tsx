"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { designerProjects } from "@/data/projects";

const posters =
  designerProjects.find((p) => p.title === "Poster Works")?.media ?? [];

export default function PosterWall() {
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const list = showAll ? posters : posters.slice(0, 12);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % posters.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + posters.length) % posters.length));
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <div className="poster-wall">
        {list.map((m, i) => (
          <motion.button
            key={m.src}
            onClick={() => setOpen(i)}
            aria-label={`Open ${m.filename}`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
          >
            <Image
              src={m.src}
              alt={`Poster ${i + 1}`}
              width={800}
              height={1000}
              sizes="(max-width: 640px) 50vw, (max-width: 1000px) 33vw, 25vw"
              style={{ width: "100%", height: "auto" }}
            />
          </motion.button>
        ))}
      </div>

      {!showAll && posters.length > 12 && (
        <div className="center">
          <button className="btn btn-ghost" onClick={() => setShowAll(true)}>
            View all {posters.length} posters
          </button>
        </div>
      )}

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={posters[open].src}
              alt={`Poster ${open + 1}`}
              onClick={(e) => e.stopPropagation()}
            />
            <button className="lb-btn" style={{ top: 20, right: 20 }} onClick={() => setOpen(null)} aria-label="Close">
              <X size={18} />
            </button>
            <button
              className="lb-btn"
              style={{ left: 20, top: "50%" }}
              onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + posters.length) % posters.length); }}
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="lb-btn"
              style={{ right: 20, top: "50%" }}
              onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % posters.length); }}
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
