"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function SiteNav({
  mode,
  active,
}: {
  mode: "designer" | "developer";
  active: string;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // the chrome inverts while a dark chapter sits under it
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const y = 34;
      const dark = Array.from(
        document.querySelectorAll<HTMLElement>("[data-nav-theme='dark']"),
      ).some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= y && r.bottom >= y;
      });
      setTheme(dark ? "dark" : "light");
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="nav" data-scrolled={scrolled} data-theme={theme}>
        <div className="wrap nav-in">
          <a href="#home" className="brand" aria-label="Adarsh, back to top">
            Adarsh<i />
          </a>

          <nav className="nav-links" aria-label="Primary">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={active === l.id ? "on" : undefined}
                aria-current={active === l.id ? "true" : undefined}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="nav-right">
            <a
              className="nav-resume"
              href={mode === "designer" ? "/resume_des.pdf" : "/resume_dev.pdf"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Résumé
            </a>
            <a className="nav-talk" href="#contact">
              <i aria-hidden />
              <span>Let&apos;s talk</span>
            </a>
            <button
              type="button"
              className="nav-burger"
              aria-expanded={open}
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <span>
                <i />
                <i />
              </span>
              Menu
            </button>
          </div>
        </div>
        <motion.i className="nav-prog" style={{ scaleX: progress }} aria-hidden />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="menu-top">
              <span>Menu</span>
              <button
                type="button"
                className="menu-close"
                onClick={() => setOpen(false)}
                autoFocus
              >
                Close <X size={14} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="menu-nav" aria-label="Sections">
              {links.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.08 + i * 0.06,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>

            <div className="menu-foot">
              <a href="mailto:adarshp2911@gmail.com">
                adarshp2911@gmail.com <ArrowUpRight size={12} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
