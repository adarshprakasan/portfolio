import WordFlow from "@/components/WordFlow";

export default function AboutSection() {
  return (
    <section id="about" className="about" data-nav-theme="dark">
      <div className="wrap about-in">
        <WordFlow
          className="about-h"
          segments={[
            { text: "I design the system," },
            { text: "then I build it.", accent: true },
          ]}
        />

        <p className="about-lead">
          I&apos;m a designer with a computer science degree. I bring a
          designer&apos;s eye and a developer&apos;s discipline to the same
          table, so an idea stays intact from the first sketch to the final
          interaction. <b>Nothing lost in the handover,</b> because there
          isn&apos;t one.
        </p>
      </div>
    </section>
  );
}
