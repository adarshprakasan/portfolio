import Reveal from "@/components/Reveal";

const experience = [
  {
    when: "2025",
    role: "MERN Full Stack Training",
    place: "JSpiders",
    text: "Intensive full-stack program that led to Hospiq and the attendance management system.",
  },
  {
    when: "Jul 2023 to Jan 2024",
    role: "UI/UX Developer Intern",
    place: "MPro Technologies",
    text: "Designed and built interfaces for a web consulting agency, and created its logo identity.",
  },
  {
    when: "Jan 2019 to Jul 2023",
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
    when: "2019 to 2023",
    role: "B.Tech, Computer Science & Engineering",
    place: "APJ Abdul Kalam Technological University",
    text: "Where design and code first met. Also took part in IEEE Xtreme 15.0.",
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="exp">
      <div className="wrap">
        <h2 className="display exp-h">
          Good work <em>leaves a trace.</em>
        </h2>

        <ol className="ledger">
          {experience.map((row, i) => (
            <li key={row.role}>
              <Reveal delay={i * 0.04}>
                <article className="ledger-row">
                  <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                  <h3>
                    {row.role}
                    <small>{row.place}</small>
                  </h3>
                  <div className="ledger-meta">
                    <span className="when">{row.when}</span>
                    <p>{row.text}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
