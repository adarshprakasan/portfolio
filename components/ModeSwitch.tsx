"use client";

/** The one place the site switches between the design and code bodies of work. */
export default function ModeSwitch({
  mode,
  onMode,
}: {
  mode: "designer" | "developer";
  onMode: (mode: "designer" | "developer") => void;
}) {
  return (
    <div
      className="mode-switch"
      data-mode={mode}
      role="tablist"
      aria-label="Profile"
    >
      <span className="thumb" aria-hidden />
      <button
        type="button"
        role="tab"
        aria-selected={mode === "designer"}
        onClick={() => onMode("designer")}
      >
        Design
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={mode === "developer"}
        onClick={() => onMode("developer")}
      >
        Code
      </button>
    </div>
  );
}
