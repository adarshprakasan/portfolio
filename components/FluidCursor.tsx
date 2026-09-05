"use client";

import { useEffect, useRef } from "react";

export default function FluidCursor() {
  const blobRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    vx: 0,
    vy: 0,
    angle: 0,
    scaleX: 1,
    scaleY: 1,
  });

  useEffect(() => {
    const blob = blobRef.current;

    if (!blob) return;

    let animationFrame: number | null = null;
    let hideTimeout: ReturnType<typeof setTimeout> | null = null;
    let hasPosition = false;

    const render = () => {
      const state = mouse.current;

      blob.style.transform = `
        translate3d(${state.x}px, ${state.y}px, 0)
        translate(-50%, -50%)
        rotate(${state.angle}rad)
        scale(${state.scaleX}, ${state.scaleY})
      `;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      const state = mouse.current;

      const newX = event.clientX;
      const newY = event.clientY;

      if (!hasPosition) {
        state.x = newX;
        state.y = newY;
        hasPosition = true;
      }

      state.vx = (newX - state.targetX) * 0.65;
      state.vy = (newY - state.targetY) * 0.65;

      state.targetX = newX;
      state.targetY = newY;

      if (Math.abs(state.vx) + Math.abs(state.vy) > 0.5) {
        state.angle = Math.atan2(state.vy, state.vx);
      }

      blob.style.opacity = "1";

      if (hideTimeout) clearTimeout(hideTimeout);

      hideTimeout = setTimeout(() => {
        blob.style.opacity = "0";
      }, 180);

      if (animationFrame === null) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const animate = () => {
      const state = mouse.current;

      state.x += (state.targetX - state.x) * 0.09;
      state.y += (state.targetY - state.y) * 0.09;

      const velocity = Math.sqrt(state.vx * state.vx + state.vy * state.vy);
      const stretch = Math.min(velocity / 32, 0.7);

      const targetScaleX = 1 + stretch * 0.28;
      const targetScaleY = 1 - stretch * 0.1;

      state.scaleX += (targetScaleX - state.scaleX) * 0.08;

      state.scaleY += (targetScaleY - state.scaleY) * 0.08;

      state.vx *= 0.72;
      state.vy *= 0.72;

      render();

      const settled =
        Math.abs(state.targetX - state.x) < 0.1 &&
        Math.abs(state.targetY - state.y) < 0.1 &&
        Math.abs(state.vx) < 0.1 &&
        Math.abs(state.vy) < 0.1;

      animationFrame = settled ? null : requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);

      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
      if (hideTimeout) clearTimeout(hideTimeout);
    };
  }, []);

  return (
    <>
      {/* SVG goo filter */}
      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}
        aria-hidden="true"
      >
        <defs>
          <filter id="fluid-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />

            <feColorMatrix
              in="blur"
              mode="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 10 -4
              "
              result="goo"
            />

            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Cursor */}
      <div
        ref={blobRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
      >
        <div className="fluid-blob">
          <div className="fluid-blob-inner" />
        </div>
      </div>
    </>
  );
}
