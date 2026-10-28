"use client";

import { Component, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Catches a render-time failure in the WebGL subtree and shows `fallback` instead. */
export class WebGLErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error("WebGL carousel failed:", error);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/** Calm, on-brand message for browsers without WebGL. */
export function WebGLFallback({
  className,
  message,
}: {
  className?: string;
  message: string;
}) {
  return (
    <div
      role="status"
      className={cn("grid place-items-center p-8 text-center", className)}
    >
      <p className="max-w-xs text-sm text-black/60">{message}</p>
    </div>
  );
}
