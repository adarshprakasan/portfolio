import WordFlow from "@/components/WordFlow";

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

const toolkit = [
  {
    title: "Design",
    items: [
      "Figma",
      "Illustrator",
      "Photoshop",
      "Brand identity",
      "Editorial",
      "Photography",
    ],
  },
  {
    title: "Develop",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Tailwind",
    ],
  },
  {
    title: "Explore",
    items: ["Blender 3D", "Motion", "Python", "Computer vision", "AI tools"],
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="about" data-nav-theme="dark">
      <div className="wrap about-in">
        <div className="about-top">
          <span className="label">
            <span className="n">02</span>
            <span className="dash" />
            About
          </span>
          <span className="label">Dubai, UAE — 25.2048°N</span>
        </div>

        <WordFlow
          className="about-h"
          segments={[
            { text: "I design the system," },
            { text: "then I build it.", accent: true },
          ]}
        />

        <div className="about-grid">
          <div>
            <p className="about-lead">
              I’m a designer with a computer science degree. I bring a
              designer’s eye and a developer’s discipline to the same table — so
              an idea stays intact from the first sketch to the final
              interaction. <b>Nothing lost in the handover,</b> because there
              isn’t one.
            </p>
            <div className="about-facts">
              <span>English · Malayalam · Hindi</span>
              <span>Open to on-site / hybrid</span>
              <span>Available now</span>
            </div>
          </div>

          <ol className="principles">
            {principles.map(([title, text], i) => (
              <li className="principle" key={title}>
                <span className="pn">0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="toolkit">
          {toolkit.map((group) => (
            <div className="toolkit-col" key={group.title}>
              <span className="label">{group.title}</span>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
