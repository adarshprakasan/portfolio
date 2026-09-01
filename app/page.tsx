"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Github,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";
import { motion } from "motion/react";

const designerSkills = [
  "Branding",
  "UI/UX",
  "Illustration",
  "3D & Motion",
  "Photography",
];
const developerSkills = [
  "Next.js",
  "TypeScript",
  "React",
  "Node.js",
  "Tailwind CSS",
  "MongoDB",
];

export default function Home() {
  const [mode, setMode] = useState<"designer" | "developer">("designer");
  const designer = mode === "designer";

  return (
    <main className={`site ${designer ? "mode-designer" : "mode-developer"}`}>
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />
      <div className="grid-floor" />

      <nav className="nav">
        <div className="monogram">AP</div>
        <div className="nav-links">
          {["Home", "About", "Work", "Experience", "Skills"].map(
            (item, index) => (
              <a
                key={item}
                className={index === 0 ? "active" : ""}
                href={`#${item.toLowerCase()}`}
              >
                {item}
              </a>
            ),
          )}
        </div>
        <a className="connect" href="#contact">
          Let&apos;s connect <ArrowUpRight size={15} />
        </a>
      </nav>

      <section id="home" className="hero">
        <div className="side-rail left-rail">
          {(designer
            ? designerSkills
            : ["Frontend", "Full Stack", "APIs", "Architecture", "Performance"]
          ).map((item, i) => (
            <motion.div
              key={`${mode}-skill-${i}`}
              className="rail-item"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <span className="rail-dot">{String(i + 1).padStart(2, "0")}</span>
              <span>{item}</span>
            </motion.div>
          ))}
        </div>

        <div className="hero-copy">
          <motion.p
            className="eyebrow"
            key={`eyebrow-${mode}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {designer ? "DESIGNING EXPERIENCES." : "BUILDING DIGITAL PRODUCTS."}
          </motion.p>
          <motion.h1 layout>
            ADARSH
            <br />
            PRAKASAN
          </motion.h1>
          <motion.div
            className="identity"
            key={`identity-${mode}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="designer-text">Designer</span>
            <span className="cross">×</span>
            <span className="developer-text">Developer</span>
          </motion.div>

          <section className="switch-wrap" aria-label="Profile mode switch">
            <div className="mode-switch">
              <button
                className={designer ? "selected designer-selected" : ""}
                onClick={() => setMode("designer")}
              >
                <strong>DESIGNER</strong>
                <span>Visual storyteller</span>
              </button>
              <button
                className={!designer ? "selected developer-selected" : ""}
                onClick={() => setMode("developer")}
              >
                <strong>DEVELOPER</strong>
                <span>Problem solver</span>
              </button>
              <motion.div
                className="switch-knob"
                animate={{ x: designer ? 0 : 164 }}
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
              />
            </div>
            <p className="switch-hint">Switch between worlds</p>
          </section>

          <p className="subcopy">
            {designer
              ? "Visual storyteller crafting identities, interfaces and memorable digital experiences."
              : "Frontend & full-stack developer turning thoughtful design into fast, scalable digital products."}
          </p>
        </div>

        <div className="visual-card">
          <motion.div
            className="orb"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
          {designer ? (
            <>
              <div className="poster">
                <span>
                  BEYOND
                  <br />
                  DESIGN.
                </span>
                <small>
                  We don&apos;t just make it look good.
                  <br />
                  We make it meaningful.
                </small>
              </div>
              <div className="brush" />
              <div className="a-mark">A</div>
            </>
          ) : (
            <div className="code-window">
              <div className="window-bar">
                <i />
                <i />
                <i />
              </div>
              <pre>{`const Adarsh = {\n  role: "Designer × Developer",\n  focus: ["UX", "React", "Next.js"],\n  mindset: "Build beautifully."\n};`}</pre>
            </div>
          )}
        </div>
      </section>

      <section id="work" className="preview-section">
        <div>
          <p className="section-label">SELECTED WORK</p>
          <h2>
            {designer
              ? "A visual language with purpose."
              : "Products built to solve real problems."}
          </h2>
        </div>
        <div className="project-preview">
          <div className="project-meta">
            <span>01</span>
            <span>
              {designer ? "Brand Identity / UIUX" : "Full Stack / MERN"}
            </span>
          </div>
          <h3>{designer ? "Beyond Design" : "HospEasy"}</h3>
          <p>
            {designer
              ? "Brand systems, digital interfaces and visual storytelling."
              : "Hospital appointment and token management platform."}
          </p>
          <button>
            View project <ArrowUpRight size={16} />
          </button>
        </div>
      </section>

      <footer id="contact" className="footer">
        <div>
          <span className="section-label">AVAILABLE FOR</span>
          <h2>
            Let&apos;s build something
            <br />
            worth remembering.
          </h2>
        </div>
        <div className="footer-links">
          <a href="mailto:hello@adarsh.dev">
            <Mail size={17} /> Email
          </a>
          <a href="#">
            <Github size={17} /> GitHub
          </a>
          <a href="#">
            <Linkedin size={17} /> LinkedIn
          </a>
          <a href="#">
            <Instagram size={17} /> Instagram
          </a>
        </div>
      </footer>

      <div className="scroll">
        <span>SCROLL TO EXPLORE</span>
        <ChevronDown size={16} />
      </div>
    </main>
  );
}
