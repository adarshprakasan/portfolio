"use client";

import { useEffect, useRef } from "react";

type LiquidTextProps = {
  children: string;
  className?: string;
};

export default function LiquidText({
  children,
  className = "",
}: LiquidTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let padX = 0;
    let padY = 0;
    let gridW = 0;
    let gridH = 0;

    // Water simulation heightmaps (1/2 resolution for smooth performance)
    const step = 2;
    let buffer1: Float32Array;
    let buffer2: Float32Array;

    // Offscreen canvas for initial text rendering
    const offscreen = document.createElement("canvas");
    const offCtx = offscreen.getContext("2d", { willReadFrequently: true });

    let lastX = -1;
    let lastY = -1;

    const updateTextTexture = () => {
      if (!container || !offCtx) return;
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const computedStyle = window.getComputedStyle(container);
      const fontSize = parseFloat(computedStyle.fontSize) * dpr;
      const fontFamily = computedStyle.fontFamily;
      const fontWeight = computedStyle.fontWeight || "800";
      const letterSpacing = computedStyle.letterSpacing;
      const color = computedStyle.color || "#ffffff";

      // Add extra padding so ascenders/descenders & ripples don't get cropped
      padX = Math.ceil(fontSize * 0.2);
      padY = Math.ceil(fontSize * 0.35);

      width = Math.ceil(rect.width * dpr) + padX * 2;
      height = Math.ceil(rect.height * dpr) + padY * 2;

      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${(rect.width * dpr + padX * 2) / dpr}px`;
      canvas.style.height = `${(rect.height * dpr + padY * 2) / dpr}px`;

      offscreen.width = width;
      offscreen.height = height;

      gridW = Math.ceil(width / step);
      gridH = Math.ceil(height / step);

      buffer1 = new Float32Array(gridW * gridH);
      buffer2 = new Float32Array(gridW * gridH);

      offCtx.clearRect(0, 0, width, height);
      offCtx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
      offCtx.fillStyle = color;
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      if (letterSpacing && letterSpacing !== "normal") {
        offCtx.letterSpacing = `${parseFloat(letterSpacing) * dpr}px`;
      }

      // Draw text centered in offscreen canvas
      offCtx.fillText(children, width / 2, height / 2);
    };

    const addRipple = (x: number, y: number, radius = 4, strength = 80) => {
      if (!buffer1) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const gx = Math.floor((x * dpr + padX) / step);
      const gy = Math.floor((y * dpr + padY) / step);

      for (let j = -radius; j <= radius; j++) {
        for (let i = -radius; i <= radius; i++) {
          const rx = gx + i;
          const ry = gy + j;
          if (rx >= 1 && rx < gridW - 1 && ry >= 1 && ry < gridH - 1) {
            if (i * i + j * j <= radius * radius) {
              const idx = ry * gridW + rx;
              buffer1[idx] += strength * (1 - Math.sqrt(i * i + j * j) / radius);
            }
          }
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (lastX !== -1 && lastY !== -1) {
        const dist = Math.hypot(x - lastX, y - lastY);
        if (dist > 5) {
          addRipple(x, y, 4, 65);
          lastX = x;
          lastY = y;
        }
      } else {
        addRipple(x, y, 5, 85);
        lastX = x;
        lastY = y;
      }
    };

    const handleMouseLeave = () => {
      lastX = -1;
      lastY = -1;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      addRipple(e.clientX - rect.left, e.clientY - rect.top, 8, 220);
    };

    const damping = 0.94;

    const render = () => {
      if (width > 0 && height > 0 && buffer1 && buffer2 && offCtx) {
        // Water wave propagation
        for (let y = 1; y < gridH - 1; y++) {
          for (let x = 1; x < gridW - 1; x++) {
            const idx = y * gridW + x;
            const val =
              (buffer1[idx - 1] +
                buffer1[idx + 1] +
                buffer1[idx - gridW] +
                buffer1[idx + gridW]) /
                2 -
              buffer2[idx];
            buffer2[idx] = val * damping;
          }
        }

        // Swap heightmap buffers
        const temp = buffer1;
        buffer1 = buffer2;
        buffer2 = temp;

        // Source & target pixels
        const sourceData = offCtx.getImageData(0, 0, width, height);
        const targetData = ctx.createImageData(width, height);
        const sPixels = sourceData.data;
        const tPixels = targetData.data;

        const invStep = 1 / step;
        for (let y = 0; y < height; y++) {
          const gy = Math.min(Math.floor(y * invStep), gridH - 2);
          const gy1 = Math.max(gy, 1);
          const rowIdx = gy1 * gridW;

          for (let x = 0; x < width; x++) {
            const gx = Math.min(Math.floor(x * invStep), gridW - 2);
            const gx1 = Math.max(gx, 1);
            const idx = rowIdx + gx1;

            const displacementX = buffer1[idx + 1] - buffer1[idx - 1];
            const displacementY = buffer1[idx + gridW] - buffer1[idx - gridW];

            if (displacementX !== 0 || displacementY !== 0) {
              const srcX = Math.min(
                Math.max(Math.round(x + displacementX * 0.065), 0),
                width - 1
              );
              const srcY = Math.min(
                Math.max(Math.round(y + displacementY * 0.065), 0),
                height - 1
              );

              const srcIdx = (srcY * width + srcX) * 4;
              const trgIdx = (y * width + x) * 4;

              const specular = Math.min(
                Math.max((displacementX + displacementY) * 0.2, -10),
                35
              );

              tPixels[trgIdx] = Math.min(
                255,
                Math.max(0, sPixels[srcIdx] + specular)
              );
              tPixels[trgIdx + 1] = Math.min(
                255,
                Math.max(0, sPixels[srcIdx + 1] + specular)
              );
              tPixels[trgIdx + 2] = Math.min(
                255,
                Math.max(0, sPixels[srcIdx + 2] + specular)
              );
              tPixels[trgIdx + 3] = sPixels[srcIdx + 3];
            } else {
              const srcIdx = (y * width + x) * 4;
              tPixels[srcIdx] = sPixels[srcIdx];
              tPixels[srcIdx + 1] = sPixels[srcIdx + 1];
              tPixels[srcIdx + 2] = sPixels[srcIdx + 2];
              tPixels[srcIdx + 3] = sPixels[srcIdx + 3];
            }
          }
        }

        ctx.putImageData(targetData, 0, 0);
      }

      animationFrame = requestAnimationFrame(render);
    };

    updateTextTexture();

    const resizeObserver = new ResizeObserver(() => {
      updateTextTexture();
    });
    resizeObserver.observe(container);

    window.addEventListener("resize", updateTextTexture);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("click", handleClick);

    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateTextTexture);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("click", handleClick);
    };
  }, [children]);

  return (
    <span ref={containerRef} className={`liquid-text ${className}`}>
      <span className="liquid-text-hidden">{children}</span>
      <canvas ref={canvasRef} className="liquid-text-canvas" />
    </span>
  );
}