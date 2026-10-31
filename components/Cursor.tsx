"use client";

import { useEffect, useRef } from "react";

const FREE = 26; // resting frame, px
const PAD = 6; // breathing room around a locked element
const MAX_W = 280; // only link-sized things get framed; big objects keep the tag
const MAX_H = 92;

// one cursor, one listener set, even across StrictMode double-mounts
let teardown: (() => void) | null = null;

/**
 * Crop marks for a cursor: four corner ticks that frame the point, breathe with
 * speed, then travel out to lock around whatever you are about to click.
 * The dot stays exact so precision never suffers.
 */
export default function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    // reduced motion keeps the real pointer rather than a slower imitation
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = root.current;
    const dotEl = dot.current;
    const frameEl = frame.current;
    if (!el || !dotEl || !frameEl) return;

    teardown?.();

    const rootEl = document.documentElement;
    rootEl.classList.add("cx-on");

    let x = -100;
    let y = -100;
    let speed = 0;
    let pressed = false;
    let live = false;
    let running = false;
    let raf = 0;
    let state = "";
    let tone = "";
    let locked: HTMLElement | null = null;

    const paintDot = () => {
      const s = pressed ? 0.72 : 1;
      dotEl.style.transform =
        `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${s})`;
    };

    const paintFree = () => {
      if (locked) return; // a locked frame only moves with its element
      const s = 1 + speed * 0.1;
      frameEl.style.width = `${FREE}px`;
      frameEl.style.height = `${FREE}px`;
      frameEl.style.transform =
        `translate3d(${x - FREE / 2}px, ${y - FREE / 2}px, 0) scale(${s})`;
    };

    const paintLocked = (target: HTMLElement) => {
      const r = target.getBoundingClientRect();
      if (r.width > MAX_W || r.height > MAX_H) {
        locked = null;
        el.dataset.lock = "false";
        paintFree();
        return;
      }
      frameEl.style.width = `${r.width + PAD * 2}px`;
      frameEl.style.height = `${r.height + PAD * 2}px`;
      frameEl.style.transform = `translate3d(${r.left - PAD}px, ${r.top - PAD}px, 0) scale(1)`;
    };

    const setState = (next: string, text = "") => {
      if (label.current && label.current.textContent !== text) {
        label.current.textContent = text;
      }
      el.dataset.label = text ? "true" : "false";
      if (next === state) return;
      state = next;
      el.dataset.state = next;
    };

    const setTone = (next: string) => {
      if (next === tone) return;
      tone = next;
      el.dataset.tone = next;
    };

    const lock = (target: HTMLElement | null, text = "") => {
      if (target === locked) return;
      locked = target;
      const r = target?.getBoundingClientRect();
      const framed = !!target && !!r && r.width <= MAX_W && r.height <= MAX_H;
      if (target && framed) {
        paintLocked(target!);
      } else {
        locked = null;
        paintFree();
      }
      el.dataset.lock = framed ? "true" : "false";
      setState(target ? "locked" : "", text);
    };

    const tick = () => {
      speed *= 0.86;
      if (speed > 0.001 && !locked) paintFree();
      if (!locked && speed < 0.001 && !pressed) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const dx = e.clientX - x;
      const dy = e.clientY - y;
      x = e.clientX;
      y = e.clientY;

      if (!live) {
        live = true;
        el.dataset.live = "true";
        paintFree();
      }

      speed = Math.min(1, Math.max(speed, Math.hypot(dx, dy) / 40));
      if (!locked) paintFree();
      paintDot();
      start();
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      setTone(target.closest("[data-nav-theme='dark']") ? "dark" : "light");

      const tagged = target.closest<HTMLElement>("[data-cursor]");
      if (tagged) {
        lock(tagged, tagged.dataset.cursor ?? "");
        return;
      }
      lock(
        target.closest<HTMLElement>(
          "a, button, [role='button'], input, textarea, select",
        ) ?? null,
      );
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
      lock(null);
    };

    // keep a locked frame glued to its element while the page moves
    let moveRaf = 0;
    const onScroll = () => {
      if (moveRaf) return;
      moveRaf = requestAnimationFrame(() => {
        moveRaf = 0;
        if (locked) {
          if (!document.contains(locked)) {
            lock(null);
            return;
          }
          paintLocked(locked);
        }
        if (!live) return;
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
    window.addEventListener("resize", onScroll, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    const cleanup = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(moveRaf);
      rootEl.classList.remove("cx-on");
    };

    teardown = cleanup;
    return cleanup;
  }, []);

  return (
    <div ref={root} className="cx" aria-hidden="true">
      <div ref={frame} className="cx-frame">
        <i />
        <i />
        <i />
        <i />
        <span ref={label} className="cx-label" />
      </div>
      <div ref={dot} className="cx-dot" />
    </div>
  );
}
