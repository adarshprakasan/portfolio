import type { IconType } from "react-icons";
import { DiIllustrator } from "react-icons/di";
import {
  SiBlender,
  SiExpress,
  SiFigma,
  SiFlask,
  SiJavascript,
  SiMongodb,
  SiMui,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export type Skill = {
  name: string;
  icon: IconType;
  /** Official brand colour of the mark. */
  color: string;
  /** Tile behind the mark. Defaults to white; some brands use their own tile. */
  tile?: string;
  group: "design" | "development";
};

/** Tools and technologies that appear across the projects in data/projects.ts. */
export const skills: Skill[] = [
  { name: "Figma", icon: SiFigma, color: "#F24E1E", group: "design" },
  { name: "Illustrator", icon: DiIllustrator, color: "#FF9A00", tile: "#310000", group: "design" },
  { name: "Blender", icon: SiBlender, color: "#E87D0D", group: "design" },

  { name: "React", icon: SiReact, color: "#61DAFB", tile: "#20232A", group: "development" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000", group: "development" },
  { name: "TypeScript", icon: SiTypescript, color: "#FFFFFF", tile: "#3178C6", group: "development" },
  { name: "JavaScript", icon: SiJavascript, color: "#000000", tile: "#F7DF1E", group: "development" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E", group: "development" },
  { name: "Express", icon: SiExpress, color: "#000000", group: "development" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248", group: "development" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", group: "development" },
  { name: "MUI", icon: SiMui, color: "#007FFF", group: "development" },
  { name: "Python", icon: SiPython, color: "#3776AB", group: "development" },
  { name: "Flask", icon: SiFlask, color: "#000000", group: "development" },
];
