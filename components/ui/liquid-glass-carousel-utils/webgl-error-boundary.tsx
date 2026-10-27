"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

type BoundaryProps = { children: ReactNode; fallback: ReactNode };
type BoundaryState = { failed: boolean };

export class WebGLErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { failed: false };

  static getDerivedStateFromError(): BoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Liquid glass carousel failed to render.", error, info);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export function WebGLFallback({
  className = "",
  message,
}: {
  className?: string;
  message: string;
}) {
  return (
    <div
      className={`grid place-items-center px-6 text-center text-sm text-[#6d695f] ${className}`}
      style={{ background: "var(--paper)" }}
      role="status"
    >
      {message}
    </div>
  );
}
