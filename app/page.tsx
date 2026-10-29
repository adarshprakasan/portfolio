"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Github, Instagram, Linkedin, Mail } from "lucide-react";
import Hero from "@/components/Hero";
import FolderShelf from "@/components/FolderShelf";
import HalftoneWordmarkFooter from "@/components/ui/halftone-wordmark-footer";
import ProjectModal from "@/components/ProjectModal";
import Reveal from "@/components/Reveal";
import { type Project } from "@/data/projects";

type Mode = "designer" | "developer";

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
    items: [
      "Figma",
      "Adobe XD",
      "Illustrator",
      "Photoshop",
      "Brand identity",
      "Poster & editorial",
      "Video editing",
      "Photography",
    ],
  },
  {
    title: "Develop",
    accent: "blue",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "REST APIs",
      "Tailwind CSS",
      "MUI",
    ],
  },
  {
    title: "Explore",
    accent: "cyan",
    items: [
      "Blender 3D",
      "AI-assisted design",
      "Motion",
      "Python",
      "Computer vision",
    ],
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

  const switchMode = (m: Mode) => {
    setMode(m);
  };

  return (
    <>
      <header className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="wrap nav-in">
          <a href="#home" className="mono-mark" aria-label="Home">
            Adarsh
            <i />
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
        <Hero mode={mode} onModeChange={switchMode} />

        {/* ---------------- WORK ---------------- */}
        <section id="work" className="block">
          <div className="wrap">
            <Reveal>
              <div className="sec-head">
                <div>
                  <span className="label">Selected works</span>
                </div>
              </div>
            </Reveal>
            <FolderShelf mode={mode} onSelect={setSelected} />
          </div>
        </section>

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
        {/* <section className="block" style={{ paddingTop: 0 }}>
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
        </section> */}
      </main>

      {/* ---------------- CONTACT ---------------- */}
      <section id="contact" className="foot">
        <div className="wrap">
          <Reveal>
            <span className="label">Available for opportunities</span>
            <h2 className="display">
              Let&apos;s make something <em>worth remembering.</em>
            </h2>
            <a className="mail" href="mailto:adarshp2911@gmail.com">
              adarshp2911@gmail.com
            </a>
            <div className="socials">
              <a
                className="pill"
                style={{ "--tint": "var(--lilac)" } as React.CSSProperties}
                href="https://github.com/adarshprakasan"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={15} /> GitHub{" "}
                <ArrowUpRight className="arr" size={14} />
              </a>
              <a
                className="pill"
                style={{ "--tint": "var(--blue)" } as React.CSSProperties}
                href="https://www.linkedin.com/in/adarshprakasan/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={15} /> LinkedIn{" "}
                <ArrowUpRight className="arr" size={14} />
              </a>
              <a
                className="pill"
                style={{ "--tint": "var(--cyan)" } as React.CSSProperties}
                href="https://www.instagram.com/adarsh.prakasan/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={15} /> Instagram{" "}
                <ArrowUpRight className="arr" size={14} />
              </a>
              <a
                className="pill solid"
                style={{ "--tint": "var(--coral)" } as React.CSSProperties}
                href="mailto:adarshp2911@gmail.com"
              >
                <Mail size={15} /> Say hello{" "}
                <ArrowUpRight className="arr" size={14} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <HalftoneWordmarkFooter
        wordmark="adarsh"
        palette={{ background: "#1a1a17", ink: "#f5f2ea", warm: "#e2573a" }}
        fontFamily={'"Inter", "Helvetica Neue", Arial, system-ui, sans-serif'}
        monoFamily={'"DM Mono", ui-monospace, Menlo, Consolas, monospace'}
        height="clamp(360px, 34vw, 500px)"
      />

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
