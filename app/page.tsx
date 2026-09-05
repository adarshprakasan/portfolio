"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useSpring,
  useMotionValue,
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
import ProjectModal, { type Project } from "@/components/ProjectModal";

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
      categories: [
        "All",
        "UI/UX",
        "Graphic Design",
        "Logo",
        "3D Works",
        "Video Editing",
        "Magazines",
      ] as const,
      projects: [
        {
          number: "01",
          category: "UI/UX",
          title: "Strata Dashboard",
          description:
            "A modular analytics dashboard built for clarity and speed, with a dark-mode-first design system.",
          accent: "lilac",
          designCategory: "UI/UX" as const,
        },
        {
          number: "02",
          category: "UI/UX",
          title: "Bloom App",
          description:
            "Mental wellness app UI — calm, breathable layouts that make daily journaling feel effortless.",
          accent: "coral",
          designCategory: "UI/UX" as const,
        },
        {
          number: "03",
          category: "Graphic Design",
          title: "Neon Pulse",
          description:
            "Event poster series for a music festival — bold type, chromatic aberration, raw energy.",
          accent: "coral",
          designCategory: "Graphic Design" as const,
        },
        {
          number: "04",
          category: "Logo",
          title: "Aura Studio",
          description:
            "Wordmark and symbol system for a creative studio — geometric, memorable, and endlessly scalable.",
          accent: "lilac",
          designCategory: "Logo" as const,
        },
        {
          number: "05",
          category: "3D Works",
          title: "Void Objects",
          description:
            "Abstract 3D sculpture series rendered in Cinema 4D — materiality, light, and negative space.",
          accent: "blue",
          designCategory: "3D Works" as const,
        },
        {
          number: "06",
          category: "Video Editing",
          title: "Frame Study",
          description:
            "Short-form video edits exploring rhythm and visual storytelling through montage and motion.",
          accent: "cyan",
          designCategory: "Video Editing" as const,
        },
        {
          number: "07",
          category: "Magazines",
          title: "After Hours",
          description:
            "A cinematic editorial magazine — dark, moody layouts for a culture-led digital publication.",
          accent: "coral",
          designCategory: "Magazines" as const,
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

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

const reveal: Variants = {
  initial: { opacity: 0, y: 14, filter: "blur(5px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -10, filter: "blur(4px)" },
};

function getBentoSize(index: number, total: number): string {
  if (total === 1) return "hero";
  if (total === 2) return "large";
  if (total === 3) return ["large", "tall", "tall"][index] ?? "small";
  const pattern = [
    "large",
    "tall",
    "small",
    "small",
    "wide",
    "medium",
    "medium",
    "small",
  ];
  return pattern[index % pattern.length] ?? "small";
}

export default function Home() {
  const [mode, setMode] = useState<Mode>("designer");
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [switchPlaced, setSwitchPlaced] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [originRect, setOriginRect] = useState<{
    x: number;
    y: number;
    w: number;
    h: number;
  } | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeSection, setActiveSection] = useState("home");
  const switchSlotRef = useRef<HTMLDivElement>(null);
  const switchX = useSpring(useMotionValue(0), {
    stiffness: 320,
    damping: 32,
    mass: 0.55,
  });
  const switchY = useMotionValue(0);
  const switchWidth = useSpring(useMotionValue(368), {
    stiffness: 280,
    damping: 30,
    mass: 0.5,
  });
  const switchHeight = useSpring(useMotionValue(84), {
    stiffness: 280,
    damping: 30,
    mass: 0.5,
  });
  const designer = mode === "designer";
  const active = content[mode];

  // Reset category filter when switching modes
  useEffect(() => {
    setActiveCategory("All");
  }, [mode]);

  const openProject = useCallback((project: Project, target: HTMLElement) => {
    const rect = target.getBoundingClientRect();
    setOriginRect({
      x: rect.left,
      y: rect.top,
      w: rect.width,
      h: rect.height,
    });
    setSelectedProject({
      number: project.number,
      category: project.category,
      title: project.title,
      description: project.description,
      accent: project.accent,
      designCategory: project.designCategory,
    });
  }, []);

  const closeProject = useCallback(() => {
    setSelectedProject(null);
    setOriginRect(null);
  }, []);

  // Filtered projects for designer mode
  const designerWork = content.designer.work;
  const filteredProjects = designer
    ? activeCategory === "All"
      ? designerWork.projects
      : designerWork.projects.filter((p) => p.designCategory === activeCategory)
    : active.work.projects;

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

  useEffect(() => {
    const ids = ["home", "about", "work", "skills", "experience"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.15, 0.4, 0.7] },
    );

    ids.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const slot = switchSlotRef.current;
    if (!slot) return;

    let frame = 0;

    const updateSwitch = () => {
      const rect = slot.getBoundingClientRect();
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const documentTop = rect.top + window.scrollY;

      const compactWidth = Math.min(
        228,
        Math.max(168, window.innerWidth - (window.innerWidth <= 520 ? 30 : 56)),
      );
      const compactHeight = window.innerWidth <= 520 ? 44 : 48;
      const gutter = window.innerWidth <= 520 ? 15 : 28;
      const navWidth = Math.min(1420, window.innerWidth - gutter * 2);
      const navLeft = (window.innerWidth - navWidth) / 2;
      const endX = navLeft + navWidth - compactWidth;
      const dockY = Math.max(10, (90 - compactHeight) / 2);
      const travel = Math.max(0, documentTop - dockY);
      const dockRange = Math.min(180, Math.max(120, window.innerHeight * 0.16));
      const dockProgress = reducedMotion
        ? window.scrollY > travel
          ? 1
          : 0
        : clamp((window.scrollY - travel) / dockRange, 0, 1);
      const easedDockProgress = 1 - (1 - dockProgress) ** 3;
      const naturalY = documentTop - window.scrollY;
      const currentWidth = lerp(rect.width, compactWidth, easedDockProgress);
      const currentHeight = lerp(rect.height, compactHeight, easedDockProgress);

      switchX.set(lerp(rect.left, endX, easedDockProgress));
      switchY.set(dockProgress > 0 ? dockY : naturalY);
      switchWidth.set(currentWidth);
      switchHeight.set(currentHeight);
      const site = slot.closest(".site");
      if (site instanceof HTMLElement) {
        site.style.setProperty("--switch-dock", String(easedDockProgress));
      }
    };

    const requestUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(() => {
          try {
            updateSwitch();
          } finally {
            frame = 0;
          }
        });
      }
    };

    updateSwitch();
    setSwitchPlaced(true);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    const observer = new ResizeObserver(requestUpdate);
    observer.observe(slot);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      observer.disconnect();
    };
  }, [switchHeight, switchWidth, switchX, switchY]);

  return (
    <main className={`site mode-${mode}`}>
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />
      <div className="atmosphere-ring" />
      <div className="grid-floor" />

      <nav className="nav">
        <a className="monogram" href="#home" aria-label="Go to home">
          AP
        </a>
        <div className="nav-links">
          {["Work", "About", "Experience"].map((item) => (
            <a
              key={`nav-${item}`}
              className={activeSection === item.toLowerCase() ? "active" : ""}
              href={`#${item.toLowerCase()}`}
            >
              {item}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <a className="resume-link" href="/resume.pdf">
            Resume <ArrowUpRight size={13} aria-hidden="true" />
          </a>
          <a className="connect" href="#contact">
            Let&apos;s talk <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
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
          <div className="identity">
            <span className="designer-text">Designer</span>
            <span className="cross">×</span>
            <span className="developer-text">Developer</span>
          </div>
          <motion.h1 layout transition={transition}>
            <LiquidText>ADARSH</LiquidText>
            <br />
            <LiquidText>PRAKASAN</LiquidText>
          </motion.h1>
          {/* <AnimatePresence mode="wait">
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
          </AnimatePresence> */}

          <div
            className="availability"
            aria-label="Available for opportunities"
          >
            <span className="availability-dot" aria-hidden="true" />
            Available for opportunities
          </div>

          <div className="switch-slot" ref={switchSlotRef}>
            <motion.section
              className={`switch-wrap${switchPlaced ? " is-floating" : ""}`}
              aria-label="Profile mode switch"
              style={
                switchPlaced
                  ? {
                      x: switchX,
                      y: switchY,
                      width: switchWidth,
                      height: switchHeight,
                    }
                  : undefined
              }
            >
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
            </motion.section>
          </div>

          {/* <AnimatePresence mode="wait">
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
          </AnimatePresence> */}
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

      <section id="work" className="bento-section">
        <div className="bento-header">
          <AnimatePresence mode="wait">
            <motion.div
              key={`work-heading-${mode}`}
              variants={reveal}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={transition}
            >
              <p className="section-label">SELECTED WORKS</p>
              <h2 className="bento-headline">{active.work.headline}</h2>
            </motion.div>
          </AnimatePresence>

          {designer && (
            <div className="work-category-bar">
              {designerWork.categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={activeCategory === cat}
                  className={`work-cat-btn${activeCategory === cat ? " work-cat-btn--active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`bento-${mode}-${activeCategory}`}
            className="bento-grid"
            variants={reveal}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
          >
            {filteredProjects.length === 0 && (
              <p className="bento-empty">No projects in this category yet.</p>
            )}
            {filteredProjects.map((project, index) => {
              const size = getBentoSize(index, filteredProjects.length);
              return (
                <motion.article
                  key={`${mode}-bento-${project.number}`}
                  className={`bento-tile bento-${size} project-${project.accent}`}
                  data-cursor
                  tabIndex={0}
                  role="button"
                  aria-label={`Open ${project.title}`}
                  initial={{ opacity: 0, scale: 0.94, y: 14 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ ...transition, delay: index * 0.06 }}
                  onClick={(e) => openProject(project, e.currentTarget)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openProject(project, e.currentTarget);
                    }
                  }}
                >
                  {/* Decorative background orb */}
                  <div className="bento-orb" aria-hidden="true" />

                  {/* Large faded watermark glyph */}
                  <b className="bento-glyph" aria-hidden="true">
                    {project.title.split(" ")[0]}
                  </b>

                  {/* Number badge */}
                  <span className="bento-num">{project.number}</span>

                  {/* Arrow icon */}
                  <div className="bento-arrow" aria-hidden="true">
                    <ArrowUpRight size={13} />
                  </div>

                  {/* Bottom info strip */}
                  <div className="bento-info">
                    <span className="bento-cat-tag">{project.category}</span>
                    <h3 className="bento-title">{project.title}</h3>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </AnimatePresence>
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

      <footer id="contact" className="footer">
        <div>
          <span className="section-label">AVAILABLE FOR OPPORTUNITIES</span>
          <h2>
            {/* Let&apos;s build something */}
            Building something
            <br />
            worth remembering.
          </h2>
        </div>
        <div className="footer-links">
          <a href="mailto:adarshp2911@gmail.com">
            <Mail size={17} /> Email me
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
        <p className="copyright">
          © 2026 Adarsh Prakasan. All rights reserved.
        </p>
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

      <ProjectModal
        project={selectedProject}
        originRect={originRect}
        onClose={closeProject}
      />
    </main>
  );
}
