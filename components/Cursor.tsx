"use client";

import { useEffect, useRef } from "react";

/**
 * An ink dot: exact to the pointer, stretched by its own velocity, with a soft
 * aura lagging behind it. Over things you can act on it opens into a label.
 * No blend modes, no ring — just weight.
 */
export default function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const aura = useRef<HTMLDivElement>(null);
  const disc = useRef<HTMLSpanElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    // reduced motion keeps the real pointer rather than a slower imitation
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = root.current;
    const dotEl = dot.current;
    const auraEl = aura.current;
    const discEl = disc.current;
    if (!el || !dotEl || !auraEl || !discEl) return;

    const rootEl = document.documentElement;
    rootEl.classList.add("cx-on");

    let x = -100;
    let y = -100;
    let ax = x;
    let ay = y;
    let angle = 0;
    let stretch = 0;
    let raf = 0;
    let running = false;
    let live = false;
    let pressed = false;
    let state = "";
    let tone = "";
    let grow = 1;

    const paintDot = () => {
      const sx = 1 + stretch * 0.85;
      const sy = 1 - stretch * 0.4;
      const press = pressed ? 0.82 : 1;
      const s = grow * press;
      dotEl.style.transform =
        `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) ` +
        `rotate(${angle}deg) scale(${sx * s}, ${sy * s})`;
    };

    const setState = (next: string, text = "") => {
      if (next !== state) {
        state = next;
        el.dataset.state = next;
        if (label.current) label.current.textContent = text;
        grow = next === "link" ? 1.55 : next === "label" ? 1.15 : 1;
        paintDot();
      }
    };

    const setTone = (next: string) => {
      if (next === tone) return;
      tone = next;
      el.dataset.tone = next;
    };

    const frame = () => {
      ax += (x - ax) * 0.16;
      ay += (y - ay) * 0.16;
      auraEl.style.transform = `translate3d(${ax.toFixed(2)}px, ${ay.toFixed(2)}px, 0)`;

      if (stretch > 0.002) {
        stretch *= 0.88;
        paintDot();
      } else if (stretch !== 0) {
        stretch = 0;
        paintDot();
      }

      const settled =
        Math.abs(x - ax) < 0.1 && Math.abs(y - ay) < 0.1 && stretch === 0;
      if (settled) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const nx = e.clientX;
      const ny = e.clientY;
      const dx = nx - x;
      const dy = ny - y;
      const d = Math.hypot(dx, dy);

      if (d > 0.6) {
        angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        stretch = Math.min(0.62, d / 46);
      }
      x = nx;
      y = ny;

      if (!live) {
        live = true;
        ax = x;
        ay = y;
        el.dataset.live = "true";
        auraEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      paintDot();
      start();
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      setTone(target.closest("[data-nav-theme='dark']") ? "dark" : "light");

      const tagged = target.closest<HTMLElement>("[data-cursor]");
      if (tagged) {
        setState("label", tagged.dataset.cursor ?? "");
        return;
      }
      const hit = target.closest(
        "a, button, [role='button'], input, textarea, select",
      );
      setState(hit ? "link" : "");
    };

    const onDown = () => {
      pressed = true;
      paintDot();
      start();
    };
    const onUp = () => {
      pressed = false;
      paintDot();
      start();
    };

    const onLeave = () => {
      live = false;
      el.dataset.live = "false";
    };

    // the page can scroll under a still pointer, so re-check the surface
    let scrollRaf = 0;
    const onScroll = () => {
      if (scrollRaf || !live) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        const under = document.elementFromPoint(x, y);
        if (!under) return;
        setTone(under.closest("[data-nav-theme='dark']") ? "dark" : "light");
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(scrollRaf);
      rootEl.classList.remove("cx-on");
    };
  }, []);

  return (
    <div ref={root} className="cx" aria-hidden="true">
      <div ref={aura} className="cx-aura">
        <span ref={disc} className="cx-disc" />
        <span ref={label} className="cx-label" />
      </div>
      <div ref={dot} className="cx-dot" />
    </div>
  );
}
