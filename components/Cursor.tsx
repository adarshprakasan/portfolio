"use client";

import { useEffect, useRef } from "react";

/**
 * A registration mark for a cursor: a hollow ring and a dot, inverted against
 * whatever is underneath, that widens into a labelled loupe over things you can
 * open. Disabled for touch and reduced-motion visitors, who keep the real one.
 */
export default function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = root.current;
    if (!el) return;

    const rootEl = document.documentElement;
    rootEl.classList.add("cx-on");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let raf = 0;
    let running = false;
    let live = false;
    let state = "";

    const frame = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      if (Math.abs(x - cx) < 0.08 && Math.abs(y - cy) < 0.08) {
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

    const setState = (next: string, text = "") => {
      if (next === state) return;
      state = next;
      el.dataset.state = next;
      if (label.current) label.current.textContent = text;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      x = e.clientX;
      y = e.clientY;
      if (!live) {
        live = true;
        cx = x;
        cy = y;
        el.dataset.live = "true";
      }
      start();
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
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

    const onLeave = () => {
      live = false;
      el.dataset.live = "false";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
      rootEl.classList.remove("cx-on");
    };
  }, []);

  return (
    <div ref={root} className="cx" aria-hidden="true">
      <span className="cx-ring">
        <span ref={label} className="cx-label" />
      </span>
      <span className="cx-dot" />
    </div>
  );
}
