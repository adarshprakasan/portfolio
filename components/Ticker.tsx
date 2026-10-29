const phrases = [
  { text: "Available for work", accent: false },
  { text: "Designer × Developer", accent: true },
  { text: "Dubai, UAE", accent: false },
  { text: "Brand · Interface · Product", accent: true },
  { text: "Since 2019", accent: false },
  { text: "Open to good problems", accent: true },
];

/** A printed ticker between chapters. Two identical groups, one transform. */
export default function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {[0, 1].map((group) => (
          <div className="ticker-group" key={group}>
            {phrases.map((phrase) => (
              <span className="ticker-item" key={`${group}-${phrase.text}`}>
                {phrase.accent ? <em>{phrase.text}</em> : phrase.text}
                <span className="st">✳</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
