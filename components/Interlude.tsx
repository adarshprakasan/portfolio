import HalftoneField from "@/components/HalftoneField";

/** The pause between work and the person: a living halftone plate. */
export default function Interlude() {
  return (
    <section className="inter" data-nav-theme="dark" aria-label="A note on process">
      <HalftoneField className="inter-field" />
      <div className="inter-scrim" aria-hidden />
      <div className="inter-grain" aria-hidden />

      <div className="inter-inner">
        <h2 className="inter-line">
          Everything is made of <em>small decisions.</em>
        </h2>
      </div>
    </section>
  );
}
