"use client";

import {
  motion,
  motionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";

const STILL = motionValue(1);

export type Segment = { text: string; accent?: boolean };

/** A sentence that inks itself in word by word as it crosses the viewport. */
export default function WordFlow({
  segments,
  className,
}: {
  segments: Segment[];
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "end 0.62"],
  });

  const words = segments.flatMap((segment, si) =>
    segment.text
      .split(" ")
      .filter(Boolean)
      .map((word, wi) => ({ word, accent: segment.accent, key: `${si}-${wi}` })),
  );

  return (
    <h2 ref={ref} className={className}>
      {words.map((word, i) => {
        const start = (i / words.length) * 0.8;
        const end = Math.min(1, start + 0.2 + 0.4 / words.length);
        return (
          <Word
            key={word.key}
            progress={reduce ? STILL : scrollYProgress}
            range={[start, end]}
            accent={word.accent}
          >
            {word.word}
          </Word>
        );
      })}
    </h2>
  );
}

function Word({
  children,
  progress,
  range,
  accent,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent?: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span
      className={accent ? "w accent" : "w"}
      style={progress === STILL ? undefined : { opacity }}
    >
      {children}
    </motion.span>
  );
}
