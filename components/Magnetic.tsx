"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";

/** Pulls its child a little toward the pointer, then lets go. */
export default function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 170, damping: 16, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 170, damping: 16, mass: 0.35 });

  return (
    <motion.span
      ref={ref}
      className={className ? `mag ${className}` : "mag"}
      style={reduce ? undefined : { x: sx, y: sy }}
      onPointerMove={(e) => {
        if (reduce) return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}
