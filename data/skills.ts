export type Skill = { name: string; icon: string; group: "design" | "dev" };

/** Tools and technologies that appear across the projects in data/projects.ts. */
export const skills: Skill[] = [
  { name: "Figma", icon: "/skills/figma.svg", group: "design" },
  { name: "Illustrator", icon: "/skills/illustrator.svg", group: "design" },
  { name: "Blender", icon: "/skills/blender.svg", group: "design" },
  { name: "React", icon: "/skills/react.svg", group: "dev" },
  { name: "Next.js", icon: "/skills/nextjs.svg", group: "dev" },
  { name: "TypeScript", icon: "/skills/typescript.svg", group: "dev" },
  { name: "JavaScript", icon: "/skills/javascript.svg", group: "dev" },
  { name: "Node.js", icon: "/skills/nodejs.svg", group: "dev" },
  { name: "Express", icon: "/skills/express.svg", group: "dev" },
  { name: "MongoDB", icon: "/skills/mongodb.svg", group: "dev" },
  { name: "Tailwind CSS", icon: "/skills/tailwind.svg", group: "dev" },
  { name: "Python", icon: "/skills/python.svg", group: "dev" },
  { name: "Flask", icon: "/skills/flask.svg", group: "dev" },
  { name: "Motion", icon: "/skills/motion.svg", group: "dev" },
];
