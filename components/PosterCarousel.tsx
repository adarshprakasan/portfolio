"use client";

import { useMemo } from "react";
import LiquidGlassCarousel, {
  type LiquidGlassCarouselItem,
} from "@/components/ui/liquid-glass-carousel";
import { designerProjects } from "@/data/projects";
import { posterAspects } from "@/lib/poster-aspects";
import { optimized } from "@/lib/img";

// Module-level so the carousel isn't rebuilt on every render.
const LENS_OVERRIDES = { dim: 1, adapt: 1, edgeShade: 0.07 };

const posters = designerProjects.find((p) => p.title === "Poster Works")?.media ?? [];

/** The 28 posters in a liquid-glass carousel, tuned to the site's paper-and-ink look. */
export default function PosterCarousel() {
  const items = useMemo<LiquidGlassCarouselItem[]>(
    () =>
      posters
        .filter((m) => m.type === "image")
        .map((m, i) => ({
          src: optimized(m.src, 1080),
          title: `Poster ${String(i + 1).padStart(2, "0")}`,
          aspect: posterAspects[m.filename],
        })),
    [],
  );

  return (
    <LiquidGlassCarousel
      items={items}
      background="#f5f2ea"
      ink="#1a1a17"
      glassTint="#f5f2ea"
      lens={LENS_OVERRIDES}
      panelHeight={440}
      gap={14}
      entry={false}
      wheelMode="horizontal"
      showArrows
      style={{ ["--lgc-arrow-hover" as string]: "#f6d3c4" }}
    />
  );
}
