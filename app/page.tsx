"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  type Transition,
  type Variants,
} from "motion/react";
import {
  ArrowUp,
  ArrowUpRight,
  ChevronDown,
  Github,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";
import LiquidText from "@/components/LiquidText";

type Mode = "designer" | "developer";

const content = {
  designer: {
    eyebrow: "DESIGNING EXPERIENCES.",
    description:
      "Visual storyteller crafting identities, interfaces and memorable digital experiences.",
    switchDescription: "Visual storyteller",
    skills: ["Branding", "UI/UX", "Illustration", "3D & Motion", "Photography"],
    toolset: [
      {
        label: "Identity",
        tools: ["Brand strategy", "Art direction", "Visual systems"],
      },
      {
        label: "Experience",
        tools: ["UX research", "Interface design", "Prototyping"],
      },
      {
        label: "Expression",
        tools: ["Illustration", "3D & motion", "Photography"],
      },
    ],
    experience: [
      {
        dates: "2024 — NOW",
        role: "Independent Designer",
        place: "Freelance",
        summary:
          "Building distinct identities and digital experiences for ideas in motion.",
      },
      {
        dates: "2023 — 2024",
        role: "Visual Designer",
        place: "Sample Collective",
        summary:
          "Shaping campaigns, interfaces, and visual systems across culture and technology.",
      },
      {
        dates: "2022 — 2023",
        role: "Design Intern",
        place: "Placeholder Agency",
        summary:
          "Supporting brand research, concept development, and production-ready creative work.",
      },
    ],
    work: {
      headline: "A visual language with purpose.",
      projects: [
        {
          number: "01",
          category: "Brand Identity / UIUX",
          title: "Beyond Design",
          description:
            "Brand systems, digital interfaces and visual storytelling.",
          accent: "lilac",
        },
        {
          number: "02",
          category: "Editorial / Digital",
          title: "After Hours",
          description:
            "A cinematic visual world for a culture-led digital publication.",
          accent: "coral",
        },
      ],
    },
  },
  developer: {
    eyebrow: "BUILDING DIGITAL PRODUCTS.",
    description:
      "Frontend & full-stack developer turning thoughtful design into fast, scalable digital products.",
    switchDescription: "Problem solver",
    skills: [
      "Next.js",
      "TypeScript",
      "React",
      "Node.js",
      "APIs",
      "Performance",
    ],
    toolset: [
      { label: "Frontend", tools: ["Next.js", "React", "TypeScript"] },
      { label: "Backend", tools: ["Node.js", "REST APIs", "MongoDB"] },
      {
        label: "Quality",
        tools: ["Accessibility", "Performance", "Responsive UI"],
      },
    ],
    experience: [
      {
        dates: "2024 — NOW",
        role: "Independent Developer",
        place: "Example Studio",
        summary:
          "Creating fast, thoughtful web products from interface through implementation.",
      },
      {
        dates: "2023 — 2024",
        role: "Frontend Developer",
        place: "Sample Product Team",
        summary:
          "Developing responsive product experiences with reusable systems and clean code.",
      },
      {
        dates: "2022 — 2023",
        role: "Developer Intern",
        place: "Placeholder Lab",
        summary:
          "Contributing to interface builds, integrations, and the details that improve usability.",
      },
    ],
    work: {
      headline: "Products built to solve real problems.",
      projects: [
        {
          number: "01",
          category: "Full Stack / MERN",
          title: "HospEasy",
          description: "Hospital appointment and token management platform.",
          accent: "blue",
        },
        {
          number: "02",
          category: "Frontend / SaaS",
          title: "Flowstate",
          description:
            "A focused workspace for turning product ideas into progress.",
          accent: "cyan",
        },
      ],
    },
  },
} as const;

const transition: Transition = { duration: 0.38, ease: [0.22, 1, 0.36, 1] };
const reveal: Variants = {
  initial: { opacity: 0, y: 14, filter: "blur(5px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -10, filter: "blur(4px)" },
};

export default function Home() {
  const [mode, setMode] = useState<Mode>("designer");
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const designer = mode === "designer";
  const active = content[mode];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;

      // Hide indicator when within 100px of the page bottom
      if (windowHeight + scrollY >= documentHeight - 100) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }

      // Show scroll to top button after scrolling down 300px
      if (scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className={`site mode-${mode}`}>
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />
      <div className="atmosphere-ring" />
      <div className="grid-floor" />

      <nav className="nav">
        <div className="monogram">AP</div>
        <div className="nav-links">
          {["Home", "About", "Work", "Experience", "Skills"].map(
            (item, index) => (
              <a
                key={`nav-${item}`}
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
        <div className="side-rail left-rail" aria-label={`${mode} skills`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`rail-${mode}`}
              className="rail-list"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={reveal}
              transition={transition}
            >
              {active.skills.map((skill, index) => (
                <motion.div
                  key={`${mode}-skill-${index}`}
                  className="rail-item"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...transition, delay: index * 0.055 }}
                >
                  <span className="rail-dot">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{skill}</span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="hero-copy">
          <AnimatePresence mode="wait">
            <motion.p
              key={`eyebrow-${mode}`}
              className="eyebrow"
              variants={reveal}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={transition}
            >
              {active.eyebrow}
            </motion.p>
          </AnimatePresence>
          <motion.h1 layout transition={transition}>
            <LiquidText>ADARSH</LiquidText>
            <br />
            <LiquidText>PRAKASAN</LiquidText>
          </motion.h1>
          <div className="identity">
            <span className="designer-text">Designer</span>
            <span className="cross">×</span>
            <span className="developer-text">Developer</span>
          </div>

          <section className="switch-wrap" aria-label="Profile mode switch">
            <div
              className="mode-switch"
              role="tablist"
              aria-label="Choose portfolio view"
            >
              <motion.div
                className="switch-knob"
                animate={{ x: designer ? "0%" : "100%" }}
                transition={{
                  type: "spring",
                  stiffness: 310,
                  damping: 28,
                  mass: 0.75,
                }}
                aria-hidden="true"
              />
              {(["designer", "developer"] as const).map((option) => {
                const selected = mode === option;
                return (
                  <button
                    key={`mode-${option}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="mode-preview"
                    className={selected ? `selected ${option}-selected` : ""}
                    onClick={() => setMode(option)}
                  >
                    <strong>{option.toUpperCase()}</strong>
                    <span>{content[option].switchDescription}</span>
                  </button>
                );
              })}
            </div>
            {/* <p className="switch-hint">Switch between worlds</p> */}
          </section>

          <AnimatePresence mode="wait">
            <motion.p
              key={`description-${mode}`}
              className="subcopy"
              variants={reveal}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={transition}
            >
              {active.description}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="visual-card" id="mode-preview" role="tabpanel">
          <motion.div
            className="orb"
            animate={{
              rotate: designer ? 360 : -360,
              scale: designer ? 1 : 1.12,
            }}
            transition={{
              rotate: { duration: 18, repeat: Infinity, ease: "linear" },
              scale: transition,
            }}
          />
          <AnimatePresence mode="wait">
            {designer ? (
              <motion.div
                key="designer-visual"
                className="visual-scene designer-scene"
                initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.05, rotate: 3 }}
                transition={transition}
              >
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
              </motion.div>
            ) : (
              <motion.div
                key="developer-visual"
                className="visual-scene developer-scene"
                initial={{ opacity: 0, scale: 0.94, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.96, x: -20 }}
                transition={transition}
              >
                <div className="code-window">
                  <div className="window-bar">
                    <i />
                    <i />
                    <i />
                    <span>adarsh.tsx</span>
                  </div>
                  <pre>{`const Adarsh = {\n  role: "Designer × Developer",\n  focus: ["UX", "React", "Next.js"],\n  mindset: "Build beautifully."\n};`}</pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="about-intro">
          <p className="section-label">THE HYBRID ADVANTAGE</p>
          <h2>
            Designed with feeling.
            <br />
            Built with intention.
          </h2>
          <p>
            I bring a designer&apos;s eye and a developer&apos;s discipline to
            the same table—so the idea stays intact from the first sketch to the
            final interaction.
          </p>
        </div>
        <div className="about-details">
          {[
            [
              "01",
              "See the whole picture",
              "Strategy, visual identity, product thinking, and the details that make an experience feel considered.",
            ],
            [
              "02",
              "Make it real",
              "Production-ready interfaces that are responsive, accessible, and built to perform.",
            ],
            [
              "03",
              "Keep it human",
              "Technology is the medium. Clarity, character, and a useful experience are the point.",
            ],
          ].map(([number, title, description]) => (
            <article key={`principle-${number}`} className="principle">
              <span>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="work" className="preview-section">
        <AnimatePresence mode="wait">
          <motion.div
            key={`work-heading-${mode}`}
            className="work-heading"
            variants={reveal}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
          >
            <p className="section-label">SELECTED WORK</p>
            <h2>{active.work.headline}</h2>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.div
            key={`projects-${mode}`}
            className="projects-grid"
            variants={reveal}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
          >
            {active.work.projects.map((project, index) => (
              <motion.article
                key={`${mode}-project-${project.number}`}
                className={`project-card project-${project.accent}`}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: index * 0.1 }}
              >
                <div className="project-art" aria-hidden="true">
                  <span>{project.number}</span>
                  <i />
                  <b>{project.title}</b>
                </div>
                <div className="project-meta">
                  <span>{project.number}</span>
                  <span>{project.category}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <button type="button">
                  View project <ArrowUpRight size={16} />
                </button>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      <section id="skills" className="skills-section">
        <div className="skills-heading">
          <p className="section-label">SKILLS &amp; TOOLS</p>
          <h2>
            Two disciplines.
            <br />
            One standard.
          </h2>
          <p>
            Every skill is in service of making the final experience more clear,
            useful, and memorable.
          </p>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={`toolset-${mode}`}
            className="toolset"
            variants={reveal}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
          >
            {active.toolset.map((group, index) => (
              <article
                key={`${mode}-tool-group-${group.label}`}
                className="tool-group"
              >
                <div className="tool-group-label">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{group.label}</h3>
                </div>
                <ul>
                  {group.tools.map((tool) => (
                    <li key={`${mode}-${group.label}-${tool}`}>{tool}</li>
                  ))}
                </ul>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      <section id="experience" className="experience-section">
        <div className="experience-heading">
          <p className="section-label">SELECTED EXPERIENCE</p>
          <h2>
            Good work leaves
            <br />a trace.
          </h2>
          <span>Placeholder entries — replace with your real experience.</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={`experience-${mode}`}
            className="experience-list"
            variants={reveal}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
          >
            {active.experience.map((entry, index) => (
              <motion.article
                key={`${mode}-experience-${index}`}
                className="experience-item"
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...transition, delay: index * 0.09 }}
              >
                <span className="experience-date">{entry.dates}</span>
                <div>
                  <h3>{entry.role}</h3>
                  <p className="experience-place">{entry.place}</p>
                  <p>{entry.summary}</p>
                </div>
                <ArrowUpRight size={17} aria-hidden="true" />
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
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
          <a href="mailto:adarshp2911@gmail.com">
            <Mail size={17} /> Email
          </a>
          <a href="https://github.com/adarshprakasan">
            <Github size={17} /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/adarshprakasan/">
            <Linkedin size={17} /> LinkedIn
          </a>
          <a href="https://www.instagram.com/adarsh.prakasan/">
            <Instagram size={17} /> Instagram
          </a>
        </div>
      </footer>
      <AnimatePresence>
        {!isAtBottom && (
          <motion.div
            className="scroll"
            initial={{ opacity: 0, x: "-50%", y: 10 }}
            animate={{ opacity: 1, x: "-50%", y: 0 }}
            exit={{ opacity: 0, x: "-50%", y: 10 }}
            transition={{ duration: 0.25 }}
          >
            <span>SCROLL TO EXPLORE</span>
            <ChevronDown size={16} />
          </motion.div>
        )}
        {showScrollTop && (
          <motion.button
            type="button"
            className="scroll-top-btn"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            initial={{ opacity: 0, scale: 0.7, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}
