"use client";

import { useReducedMotion } from "motion/react";
import { useSyncExternalStore, type CSSProperties } from "react";
import Reveal from "@/components/Reveal";
import MarqueeAlongSvgPath from "@/components/ui/marquee-along-svg-path";
import { skills, type Skill } from "@/data/skills";
import "@/app/skills.css";

/**
 * Wide wave for tablets and desktops. The path is shifted so the whole curve
 * (including its loop) sits inside the box with room for the tiles and their
 * hover labels, so nothing is cut off.
 */
const WIDE = {
  path: "M50.00 288.01C107.59 334.51 436.93 404.51 531.58 288.01C649.90 142.38 574.52 35.35 476.33 98.54C378.15 161.72 401.90 321.30 564.04 345.88C693.75 365.54 992.56 260.52 1044.00 235.08",
  viewBox: "0 0 1094 402",
};

/** Tall serpentine for phones, so the logos stay a readable size. */
const TALL = {
  path: "M50.00 80.00C370.00 80.00 370.00 260.00 190.00 260.00C10.00 260.00 10.00 440.00 190.00 440.00C370.00 440.00 370.00 620.00 330.00 660.00",
  viewBox: "0 0 402 710",
};

const MOBILE_QUERY = "(max-width: 720px)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(MOBILE_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getSnapshot = () => window.matchMedia(MOBILE_QUERY).matches;
const getServerSnapshot = () => false;

const chipStyle = (s: Skill) =>
  ({ "--logo": s.color, "--tile": s.tile ?? "#ffffff" }) as CSSProperties;

/**
 * One element per skill, built once at module level. The marquee needs
 * separate children (it spreads them along the path), and stable elements
 * also mean React never re-renders them while they animate.
 */
const CHIPS = skills.map((s) => {
  const Icon = s.icon;
  return (
    <div
      key={s.name}
      className="skill-chip"
      data-name={s.name}
      style={chipStyle(s)}
    >
      <Icon aria-hidden focusable="false" />
    </div>
  );
});

function Group({ title, group }: { title: string; group: Skill["group"] }) {
  return (
    <div className="skills-group">
      <h3 className="label">
        <span className="dash" />
        {title}
      </h3>
      <ul>
        {skills
          .filter((s) => s.group === group)
          .map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.name}>
                <span className="skills-mark" style={chipStyle(s)} aria-hidden>
                  <Icon focusable="false" />
                </span>
                {s.name}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default function SkillsSection() {
  const isMobile = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const reduceMotion = useReducedMotion();
  const shape = isMobile ? TALL : WIDE;

  return (
    <section id="skills" className="skills" aria-labelledby="skills-h">
      <div className="wrap">
        <Reveal className="skills-head">
          <span className="label">
            <span className="dash" />
            Toolkit
          </span>
          <h2 id="skills-h" className="display skills-h">
            Tools I <em>reach for.</em>
          </h2>
        </Reveal>
      </div>

      {/* Decorative: the full list below carries the same information as text. */}
      <div
        className="skills-stage"
        data-shape={isMobile ? "tall" : "wide"}
        aria-hidden
      >
        <MarqueeAlongSvgPath
          key={isMobile ? "tall" : "wide"}
          path={shape.path}
          viewBox={shape.viewBox}
          responsive
          keepUpright
          repeat={1}
          baseVelocity={reduceMotion ? 0 : 5}
          slowdownOnHover
          slowDownFactor={0.15}
          draggable
          grabCursor
          dragSensitivity={0.1}
          className="skills-marquee"
        >
          {CHIPS}
        </MarqueeAlongSvgPath>
      </div>

      <div className="wrap">
        <div className="skills-lists">
          <Group title="Design" group="design" />
          <Group title="Development" group="development" />
        </div>
      </div>
    </section>
  );
}
