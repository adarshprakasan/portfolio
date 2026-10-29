"use client";

import { useEffect, useState } from "react";
<<<<<<< Updated upstream
import { ArrowUpRight, Github, Instagram, Linkedin, Mail } from "lucide-react";
import Hero from "@/components/Hero";
import FolderShelf from "@/components/FolderShelf";
import HalftoneWordmarkFooter from "@/components/ui/halftone-wordmark-footer";
=======
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Cursor from "@/components/Cursor";
import ExperienceSection from "@/components/ExperienceSection";
import Hero from "@/components/Hero";
import Interlude from "@/components/Interlude";
>>>>>>> Stashed changes
import ProjectModal from "@/components/ProjectModal";
import SiteNav from "@/components/SiteNav";
import Ticker from "@/components/Ticker";
import WorkRail from "@/components/WorkRail";
import HalftoneWordmarkFooter from "@/components/ui/halftone-wordmark-footer";
import { type Project } from "@/data/projects";

type Mode = "designer" | "developer";

<<<<<<< Updated upstream
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

=======
>>>>>>> Stashed changes
export default function Home() {
  const [mode, setMode] = useState<Mode>("designer");
  const [selected, setSelected] = useState<Project | null>(null);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const ids = ["home", "work", "about", "experience", "contact"];
    const io = new IntersectionObserver(
      (entries) => {
        const v = entries.find((e) => e.isIntersecting);
        if (v) setActive(v.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Cursor />
      <SiteNav mode={mode} active={active} />

      <main>
<<<<<<< Updated upstream
        {/* ---------------- HERO ---------------- */}
        <Hero mode={mode} onModeChange={switchMode} />
=======
        <Hero mode={mode} onMode={setMode} onSelect={setSelected} />

        <WorkRail mode={mode} onMode={setMode} onSelect={setSelected} />

        <AboutSection />

        <Interlude />

        <Ticker />
>>>>>>> Stashed changes

        <ExperienceSection />

        <ContactSection />
      </main>

      <div data-nav-theme="dark">
        <HalftoneWordmarkFooter
          wordmark="adarsh"
          palette={{ background: "#1a1a17", ink: "#f5f2ea", warm: "#e2573a" }}
          fontFamily={'"Inter", "Helvetica Neue", Arial, system-ui, sans-serif'}
          monoFamily={'"DM Mono", ui-monospace, Menlo, Consolas, monospace'}
          height="clamp(360px, 34vw, 500px)"
        />
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
