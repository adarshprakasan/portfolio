"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  Github,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";
import Character from "@/components/Character";
import PosterCarousel from "@/components/PosterCarousel";
import FolderShelf from "@/components/FolderShelf";
import HalftoneWordmarkFooter from "@/components/ui/halftone-wordmark-footer";
import ProjectModal from "@/components/ProjectModal";
import Reveal from "@/components/Reveal";
import { type Project } from "@/data/projects";

type Mode = "designer" | "developer";

const copy = {
  designer: {
    sub: (
      <>
        I craft <b>brand identities, interfaces and visual stories</b> —
        thoughtful, minimal and made to be remembered.
      </>
    ),
    headline: (
      <>
        A visual language <em>with purpose.</em>
      </>
    ),
    marquee: [
      "Brand Identity",
      "UI / UX Design",
      "Poster Design",
      "Editorial",
      "3D Visualisation",
      "Motion & Video",
      "Photography",
    ],
  },
  developer: {
    sub: (
      <>
        I build <b>fast, full-stack products</b> with React, Next.js and the
        MERN stack — from the first component to the last endpoint.
      </>
    ),
    headline: (
      <>
        Products built to <em>solve real problems.</em>
      </>
    ),
    marquee: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "REST APIs",
    ],
  },
} as const;

const principles = [
  [
    "See the whole picture",
    "Brand, interface and product thinking — the details that make an experience feel considered.",
  ],
  [
    "Make it real",
    "Responsive, accessible interfaces, wired to real back-ends and built to perform.",
  ],
  [
    "Keep it human",
    "Technology is the medium. Clarity, character and usefulness are the point.",
  ],
];

const experience = [
  {
    when: "2025",
    role: "MERN Full Stack Training",
    place: "JSpiders",
    text: "Intensive full-stack program that led to Hospiq and the attendance management system.",
  },
  {
    when: "Jul 2023 — Jan 2024",
    role: "UI/UX Developer Intern",
    place: "MPro Technologies",
    text: "Designed and built interfaces for a web consulting agency, and created its logo identity.",
  },
  {
    when: "Jan 2019 — Jul 2023",
    role: "Freelance Designer",
    place: "Independent",
    text: "Brand identities, posters, 3D visualisation and video for clients and student communities.",
  },
  {
    when: "3 years",
    role: "Design Team Lead",
    place: "IEEE SB CETkr",
    text: "Led the IEEE design team and served as Webmaster and Electronic Communication Coordinator.",
  },
  {
    when: "2019 — 2023",
    role: "B.Tech, Computer Science & Engineering",
    place: "APJ Abdul Kalam Technological University",
    text: "Where design and code first met. Also took part in IEEE Xtreme 15.0.",
  },
];

const skills = [
  {
    title: "Design",
    accent: "coral",
    items: ["Figma", "Adobe XD", "Illustrator", "Photoshop", "Brand identity", "Poster & editorial", "Video editing", "Photography"],
  },
  {
    title: "Develop",
    accent: "blue",
    items: ["React", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "REST APIs", "Tailwind CSS", "MUI"],
  },
  {
    title: "Explore",
    accent: "cyan",
    items: ["Blender 3D", "AI-assisted design", "Motion", "Python", "Computer vision"],
  },
];

export default function Home() {
  const [mode, setMode] = useState<Mode>("designer");
  const [selected, setSelected] = useState<Project | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  const designer = mode === "designer";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["home", "work", "about", "experience", "contact"];
    const io = new IntersectionObserver(
      (entries) => {
        const v = entries.find((e) => e.isIntersecting);
        if (v) setActive(v.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const showPosters = designer;

  const switchMode = (m: Mode) => {
    setMode(m);
  };

  return (
    <>
      <header className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="wrap nav-in">
          <a href="#home" className="mono-mark" aria-label="Home">
            Adarsh<i />
          </a>
          <nav className="nav-links" aria-label="Primary">
            {["work", "about", "experience", "contact"].map((id) => (
              <a key={id} href={`#${id}`} className={active === id ? "on" : ""}>
                {id[0].toUpperCase() + id.slice(1)}
              </a>
            ))}
          </nav>
          <div className="nav-cta">
            <a
              className="btn btn-ghost"
              href={designer ? "/resume_des.pdf" : "/resume_dev.pdf"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume <ArrowUpRight size={14} />
            </a>
            <a className="btn btn-solid" href="#contact">
              Let&apos;s talk
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* ---------------- HERO ---------------- */}
        <section id="home" className="hero">
          <div className="wrap hero-grid">
            <div>
              <motion.span
                className="status"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="pulse" /> Available now · Dubai, UAE
              </motion.span>

              <h1 className="display">
                {["Adarsh", "Prakasan"].map((w, i) => (
                  <motion.span
                    key={w}
                    style={{ display: "block", fontStyle: i ? "italic" : "normal" }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {w}
                  </motion.span>
                ))}
              </h1>

              <AnimatePresence mode="wait">
                <motion.p
                  key={mode}
                  className="hero-sub"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  {copy[mode].sub}
                </motion.p>
              </AnimatePresence>

              <div className="toggle" data-mode={mode} role="tablist" aria-label="Choose a view">
                <span className="knob" aria-hidden="true" />
                {(["designer", "developer"] as const).map((m) => (
                  <button
                    key={m}
                    role="tab"
                    aria-selected={mode === m}
                    className={mode === m ? "on" : ""}
                    onClick={() => switchMode(m)}
                  >
                    {m === "designer" ? "Designer" : "Developer"}
                  </button>
                ))}
              </div>
            </div>

            <div className="arch" data-mode={mode}>
              <Character mode={mode} />
            </div>
          </div>
        </section>

        {/* ---------------- MARQUEE ---------------- */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...copy[mode].marquee, ...copy[mode].marquee, ...copy[mode].marquee, ...copy[mode].marquee].map(
              (t, i) => (
                <span key={i}>{t}</span>
              ),
            )}
          </div>
        </div>

        {/* ---------------- WORK ---------------- */}
        <section id="work" className="block">
          <div className="wrap">
            <Reveal>
              <div className="sec-head">
                <div>
                  <span className="label">Selected work · {designer ? "five folders" : "three folders"}</span>
                  <h2 className="display">{copy[mode].headline}</h2>
                </div>
                <p className="label" style={{ maxWidth: 240 }}>
                  {/* Hover to lean · click a folder to open · pick a file to dive in */}
                </p>
              </div>
            </Reveal>
            <FolderShelf mode={mode} onSelect={setSelected} />
          </div>
        </section>

        {/* ---------------- POSTERS ---------------- */}
        {showPosters && (
          <section className="block" style={{ paddingTop: 0 }} aria-labelledby="posters-h">
            <div className="wrap">
              <Reveal>
                <div className="sec-head">
                  <div>
                    <span className="label">Poster works · 2020–2024</span>
                    <h2 id="posters-h" className="display">
                      Type, colour <em>& composition.</em>
                    </h2>
                  </div>
                </div>
              </Reveal>
            </div>
            <PosterCarousel />
          </section>
        )}

        {/* ---------------- ABOUT ---------------- */}
        <section id="about" className="block about" style={{ marginTop: 20 }}>
          <div className="wrap about-grid">
            <Reveal>
              <span className="label">The hybrid advantage</span>
              <h2 className="display">
                Designed with feeling. <em>Built with intention.</em>
              </h2>
              <p className="lead">
                I&apos;m a designer with a computer science degree. I bring a
                designer&apos;s eye and a developer&apos;s discipline to the
                same table — so an idea stays intact from the first sketch to
                the final interaction.
              </p>
              <div className="facts">
                <span>Dubai, UAE</span>
                <span>English · Malayalam · Hindi</span>
                <span>Open to on-site / hybrid</span>
              </div>
            </Reveal>
            <div>
              {principles.map(([t, d], i) => (
                <Reveal key={t} delay={i * 0.08}>
                  <article className="principle">
                    <span className="n">0{i + 1}</span>
                    <div>
                      <h3>{t}</h3>
                      <p>{d}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- EXPERIENCE ---------------- */}
        <section id="experience" className="block">
          <div className="wrap">
            <Reveal>
              <div className="sec-head">
                <div>
                  <span className="label">Experience & education</span>
                  <h2 className="display">
                    Good work <em>leaves a trace.</em>
                  </h2>
                </div>
              </div>
            </Reveal>
            {experience.map((e, i) => (
              <Reveal key={e.role} delay={i * 0.05}>
                <article className="row">
                  <span className="when">{e.when}</span>
                  <h3>
                    {e.role}
                    <small>{e.place}</small>
                  </h3>
                  <p>{e.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------- SKILLS ---------------- */}
        <section className="block" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="skill-cols">
              {skills.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.08}>
                  <article className={`skill t-${s.accent}`}>
                    <span className="label">0{i + 1}</span>
                    <h3>{s.title}</h3>
                    <ul>
                      {s.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ---------------- CONTACT ---------------- */}
      <section id="contact" className="foot contact-foot" style={{ background: "#1a1a17", color: "#f5f2ea" }}>
        <div className="wrap">
          <Reveal>
            <span className="label" style={{ color: "#f5f2ea" }}>Available for opportunities</span>
            <h2 className="display" style={{ color: "#f5f2ea" }}>
              Let&apos;s make something <em>worth remembering.</em>
            </h2>
            <a className="mail" href="mailto:adarshp2911@gmail.com" style={{ color: "#f5f2ea" }}>
              adarshp2911@gmail.com
            </a>
            <div className="socials">
              <a className="btn btn-ghost" href="https://github.com/adarshprakasan" target="_blank" rel="noopener noreferrer" style={{ color: "#f5f2ea", borderColor: "#f5f2ea" }}>
                <Github size={15} /> GitHub
              </a>
              <a className="btn btn-ghost" href="https://www.linkedin.com/in/adarshprakasan/" target="_blank" rel="noopener noreferrer" style={{ color: "#f5f2ea", borderColor: "#f5f2ea" }}>
                <Linkedin size={15} /> LinkedIn
              </a>
              <a className="btn btn-ghost" href="https://www.instagram.com/adarsh.prakasan/" target="_blank" rel="noopener noreferrer" style={{ color: "#f5f2ea", borderColor: "#f5f2ea" }}>
                <Instagram size={15} /> Instagram
              </a>
              <a className="btn btn-solid contact-cta" href="mailto:adarshp2911@gmail.com" style={{ background: "#f5f2ea", color: "#1a1a17" }}>
                <Mail size={15} /> Say hello
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <HalftoneWordmarkFooter
        wordmark="adarsh"
        label="Adarsh Prakasan"
        meta="©2026 · Dubai, UAE"
        palette={{ background: "#1a1a17", ink: "#f5f2ea", warm: "#e2573a" }}
        fontFamily={'"Inter", "Helvetica Neue", Arial, system-ui, sans-serif'}
        monoFamily={'"DM Mono", ui-monospace, Menlo, Consolas, monospace'}
        height="clamp(300px, 34vw, 500px)"
        columns={[]}
      />

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
