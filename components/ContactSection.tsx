import { ArrowUpRight, Github, Instagram, Linkedin, Mail } from "lucide-react";
import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/Reveal";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/adarshprakasan",
    icon: Github,
    tint: "var(--lilac)",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/adarshprakasan/",
    icon: Linkedin,
    tint: "var(--blue)",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/adarsh.prakasan/",
    icon: Instagram,
    tint: "var(--cyan)",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="contact">
      <div className="wrap">
        <div className="sec-top">
          <span className="label">
            <span className="n">05</span>
            <span className="dash" />
            Contact
          </span>
          <span className="label">
            <i aria-hidden className="live-dot" />
            Open for opportunities
          </span>
        </div>

        <Reveal>
          <h2 className="display contact-h">
            Let’s make something <em>worth remembering.</em>
          </h2>
        </Reveal>

        <div className="contact-row">
          <Magnetic strength={0.16}>
            <a
              className="mail-link"
              href="mailto:adarshp2911@gmail.com"
              data-cursor="Mail"
            >
              adarshp2911@gmail.com
              <ArrowUpRight size={28} strokeWidth={1.3} />
            </a>
          </Magnetic>

          <div className="socials">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  className="pill"
                  style={{ "--tint": s.tint } as React.CSSProperties}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={15} /> {s.label}
                  <ArrowUpRight className="arr" size={14} />
                </a>
              );
            })}
            <a
              className="pill solid"
              style={{ "--tint": "var(--coral)" } as React.CSSProperties}
              href="mailto:adarshp2911@gmail.com"
            >
              <Mail size={15} /> Say hello
              <ArrowUpRight className="arr" size={14} />
            </a>
          </div>
        </div>

        <div className="contact-foot">
          <span className="grp">
            Dubai, UAE <i aria-hidden /> 25.2048°N 55.2708°E
          </span>
          <span className="grp">© 2026 Adarsh Prakasan</span>
          <span className="grp">
            Built with Next.js <i aria-hidden /> Set in Instrument Serif
          </span>
        </div>
      </div>
    </section>
  );
}
