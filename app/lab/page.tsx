"use client";

import { LoadingAnimation } from "@/components/ui/loading-animation";

// Controls for the demo panel (literal values only).
export const settings = {
  name: "Asha Iyer",
  cta: "Create Now",
  loadingLabel: "Setting up your desk",
  size: 0.5,
  spread: 1,
  showReveal: true,
  autoplay: true,
};

/**
 * Demo page for the LoadingAnimation component.
 * Accessed at /lab
 */
export default function LabPage({
  name = settings.name,
  cta = settings.cta,
  loadingLabel = settings.loadingLabel,
  size = settings.size,
  spread = settings.spread,
  showReveal = settings.showReveal,
  autoplay = settings.autoplay,
}: Partial<typeof settings>) {
  return (
    <div className="min-h-screen bg-black">
      <LoadingAnimation
        name={name}
        cta={cta}
        loadingLabel={loadingLabel}
        size={size}
        spread={spread}
        showReveal={showReveal}
        autoplay={autoplay}
      />
    </div>
  );
}
