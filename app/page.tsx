"use client";

import { useEffect, useState } from "react";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Cursor from "@/components/Cursor";
import ExperienceSection from "@/components/ExperienceSection";
import Hero from "@/components/Hero";
import Interlude from "@/components/Interlude";
import ProjectModal from "@/components/ProjectModal";
import SiteNav from "@/components/SiteNav";
import SkillsSection from "@/components/SkillsSection";
import WorkRail from "@/components/WorkRail";
import HalftoneWordmarkFooter from "@/components/ui/halftone-wordmark-footer";
import { type Project } from "@/data/projects";

type Mode = "designer" | "developer";

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
        <Hero mode={mode} onMode={setMode} onSelect={setSelected} />

        <WorkRail mode={mode} onSelect={setSelected} />

        <AboutSection />

        <SkillsSection />

        <Interlude />

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
