"use client";

import { LiquidGlassCarousel } from "@/components/ui/liquid-glass-carousel";
import { designerProjects } from "@/data/projects";

const posterItems =
  designerProjects
    .find((project) => project.title === "Poster Works")
    ?.media?.filter((media) => media.type === "image")
    .map((media, index) => ({
      src: media.src,
      title: `Poster ${String(index + 1).padStart(2, "0")}`,
    })) ?? [];

export default function PosterCarousel() {
  return (
    <LiquidGlassCarousel
      items={posterItems}
      panelHeight={390}
      gap={20}
      background="var(--paper)"
      entry={false}
      className="min-h-[340px]"
      style={{ height: "clamp(420px, 55vw, 560px)" }}
    />
  );
}
