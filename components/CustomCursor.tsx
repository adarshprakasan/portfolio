"use client";

import { useEffect, useRef } from "react";

/**
 * Matchstick custom cursor.
 *
 * Design notes:
 * - The flame sits exactly at the real cursor position (the "hotspot"), so
 *   pointing/clicking stays precise. The wooden stick trails behind the
 *   direction of travel, like a lit match being dragged through the air.
 * - Speed is turned into a smoothed "heat" value (0..1): move fast enough
 *   and it "lights", releasing the match head glow and a stream of smoke;
 *   slow down and it cools back to an unlit tip.
 * - Everything is driven from refs and a single rAF loop that mutates
 *   `transform`/`opacity` directly — no React state, no re-renders. The
 *   loop sleeps itself after a couple of seconds of inactivity and wakes
 *   on the next pointer event, so it costs nothing while idle.
 * - Smoke and spark particles are pooled DOM nodes (created once, reused
 *   forever) to avoid allocation/GC churn during heavy movement.
 */

const LIGHT_SPEED = 900; // px/s of cursor travel needed to ignite
const HEAT_UP_RATE = 3.4; // heat gained per second while above LIGHT_SPEED
const HEAT_DOWN_RATE = 1.15; // heat lost per second while below it
const SMOKE_POOL_SIZE = 16;
const SPARK_POOL_SIZE = 14;
const IDLE_SLEEP_MS = 2200;
const DEFAULT_ANGLE = 45; // resting tilt (deg) before any movement

interface Particle {
  el: HTMLDivElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  scaleStart: number;
  scaleEnd: number;
  active: boolean;
}

function makePool(
  container: HTMLDivElement,
  size: number,
  className: string,
): Particle[] {
  return Array.from({ length: size }, () => {
    const el = document.createElement("div");
    el.className = className;
    el.style.opacity = "0";
    container.appendChild(el);
    return {
      el,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      life: 0,
      maxLife: 1,
      scaleStart: 1,
      scaleEnd: 1,
      active: false,
    };
  });
}

export default function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const flameRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const smokeLayerRef = useRef<HTMLDivElement>(null);
  const sparkLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only render the custom cursor for real mice/trackpads/pens.
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const root = rootRef.current;
    const group = groupRef.current;
    const flame = flameRef.current;
    const head = headRef.current;
    const smokeLayer = smokeLayerRef.current;
    const sparkLayer = sparkLayerRef.current;
    if (!root || !group || !flame || !head || !smokeLayer || !sparkLayer) {
      return;
    }

    const smokePool = makePool(smokeLayer, SMOKE_POOL_SIZE, "smoke-particle");
    const sparkPool = makePool(sparkLayer, SPARK_POOL_SIZE, "spark-particle");
    let smokeCursor = 0;

    function spawnSmoke() {
      const p = smokePool[smokeCursor];
      smokeCursor = (smokeCursor + 1) % smokePool.length;
      p.x = (Math.random() - 0.5) * 4;
      p.y = (Math.random() - 0.5) * 4;
      p.vx = (Math.random() - 0.5) * 16;
      p.vy = -24 - Math.random() * 20;
      p.life = 0;
      p.maxLife = 0.9 + Math.random() * 0.5;
      p.scaleStart = 0.35 + Math.random() * 0.2;
      p.scaleEnd = 1.5 + Math.random() * 0.8;
      p.active = true;
    }

    function spawnSparkBurst() {
      for (const p of sparkPool) {
        const dir = Math.random() * Math.PI * 2;
        const speed = 60 + Math.random() * 90;
        p.x = 0;
        p.y = 0;
        p.vx = Math.cos(dir) * speed;
        p.vy = Math.sin(dir) * speed;
        p.life = 0;
        p.maxLife = 0.32 + Math.random() * 0.22;
        p.scaleStart = 1;
        p.scaleEnd = 0.15;
        p.active = true;
      }
    }

    let mouseX = -100;
    let mouseY = -100;
    let lastX = mouseX;
    let lastY = mouseY;
    let lastMoveAt = performance.now();
    let hovering = false;
    let angle = DEFAULT_ANGLE;
    let heat = 0;
    let lastFrameAt = performance.now();
    let rafId = 0;
    let sleeping = true;

    function wake() {
      if (!sleeping) return;
      sleeping = false;
      lastFrameAt = performance.now();
      rafId = requestAnimationFrame(loop);
    }

    function handleMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      lastMoveAt = performance.now();
      if (root!.style.opacity !== "1") root!.style.opacity = "1";
      const target = e.target as HTMLElement | null;
      hovering = Boolean(
        target?.closest("a, button, input, textarea, select, [data-cursor]"),
      );
      wake();
    }

    function handleMouseLeave() {
      root!.style.opacity = "0";
    }

    function handleMouseDown() {
      heat = 1;
      if (!reduceMotion) spawnSparkBurst();
      wake();
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousedown", handleMouseDown, { passive: true });

    function loop(now: number) {
      const dt = Math.min(0.05, (now - lastFrameAt) / 1000);
      lastFrameAt = now;

      const dx = mouseX - lastX;
      const dy = mouseY - lastY;
      lastX = mouseX;
      lastY = mouseY;
      const dist = Math.hypot(dx, dy);
      const speed = dt > 0 ? dist / dt : 0;

      if (dist > 1.5) {
        const travelAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
        const targetAngle = travelAngle + 180; // stick trails behind travel
        const delta = ((targetAngle - angle + 540) % 360) - 180;
        angle += delta * Math.min(1, dt * 12);
      }

      if (!reduceMotion && speed > LIGHT_SPEED) {
        heat = Math.min(1, heat + HEAT_UP_RATE * dt);
      } else {
        heat = Math.max(0, heat - HEAT_DOWN_RATE * dt);
      }

      root!.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      group!.style.transform = `rotate(${angle}deg) scale(${hovering ? 1.14 : 1})`;
      flame!.style.opacity = String(heat);
      flame!.style.transform = `translate(-50%, -50%) scale(${0.5 + heat * 0.85})`;
      head!.style.opacity = String(1 - heat * 0.6);

      if (!reduceMotion && heat > 0.12 && Math.random() < heat * 0.85) {
        spawnSmoke();
      }

      let anyActive = false;

      for (const p of smokePool) {
        if (!p.active) continue;
        anyActive = true;
        p.life += dt;
        if (p.life >= p.maxLife) {
          p.active = false;
          p.el.style.opacity = "0";
          continue;
        }
        p.vy -= 14 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        const t = p.life / p.maxLife;
        const scale = p.scaleStart + (p.scaleEnd - p.scaleStart) * t;
        p.el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) scale(${scale})`;
        p.el.style.opacity = String((1 - t) * 0.5);
      }

      for (const p of sparkPool) {
        if (!p.active) continue;
        anyActive = true;
        p.life += dt;
        if (p.life >= p.maxLife) {
          p.active = false;
          p.el.style.opacity = "0";
          continue;
        }
        p.vy += 90 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        const t = p.life / p.maxLife;
        const scale = p.scaleStart + (p.scaleEnd - p.scaleStart) * t;
        p.el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) scale(${scale})`;
        p.el.style.opacity = String(1 - t);
      }

      const idleFor = now - lastMoveAt;
      if (idleFor > IDLE_SLEEP_MS && heat <= 0.001 && !anyActive) {
        sleeping = true;
        return;
      }

      rafId = requestAnimationFrame(loop);
    }

    wake();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      cancelAnimationFrame(rafId);
      smokePool.forEach((p) => p.el.remove());
      sparkPool.forEach((p) => p.el.remove());
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="matchstick-cursor"
      style={{ opacity: 0 }}
      aria-hidden="true"
    >
      <div ref={groupRef} className="matchstick-group">
        <div className="matchstick-stick" />
        <div ref={headRef} className="matchstick-head" />
        <div ref={flameRef} className="matchstick-flame">
          <span className="flame-glow" />
          <span className="flame-outer" />
          <span className="flame-core" />
        </div>
      </div>
      <div ref={smokeLayerRef} className="matchstick-smoke-layer" />
      <div ref={sparkLayerRef} className="matchstick-spark-layer" />
    </div>
  );
}
