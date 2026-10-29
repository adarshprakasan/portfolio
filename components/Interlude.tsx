import HalftoneField from "@/components/HalftoneField";

/** The pause between work and the person: a living halftone plate. */
export default function Interlude() {
  return (
    <section className="inter" data-nav-theme="dark" aria-label="A note on process">
      <HalftoneField className="inter-field" />
      <div className="inter-scrim" aria-hidden />
      <div className="inter-grain" aria-hidden />

      <div className="inter-inner">
        <div className="inter-top">
          <span className="label">
            <span className="n">03</span>
            <span className="dash" />
            Interlude
          </span>
          <span className="label">Halftone plate · live</span>
        </div>

        <h2 className="inter-line">
          Everything is made of <em>small decisions.</em>
        </h2>

        <div className="inter-foot">
          <span>Ink, dots and light — reacting to you</span>
          <span>Fig. 01</span>
        </div>
      </div>
    </section>
  );
}
