import { ArrowUpRight, Github, Instagram, Linkedin, Mail } from "lucide-react";
import Magnetic from "@/components/Magnetic";

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
        <h2 className="display contact-h">
          Let&apos;s make something <em>worth remembering.</em>
        </h2>

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
      </div>
    </section>
  );
}
