"use client";

import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;

uniform vec2 uRes;
uniform vec2 uPtr;
uniform float uTime;

float wave(vec2 p, float t) {
  float v = sin(p.x * 2.1 + t * 0.9)
          + sin(p.y * 2.7 - t * 0.7 + sin(p.x * 1.3 + t * 0.4) * 1.7)
          + sin(length(p - vec2(0.75, 0.42)) * 6.0 - t * 1.2);
  return v / 3.0;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5) * 3.2;

  float t = uTime;
  float w = wave(p, t);
  float w2 = wave(p * 1.7 + 11.0, t * 1.3);

  vec2 ptr = vec2((uPtr.x - 0.5) * aspect, uPtr.y - 0.5) * 3.2;
  float d = length(p - ptr);
  float swell = exp(-d * d * 1.7);
  w = w * (0.62 + 0.5 * swell) + swell * 0.32;

  float cell = 13.0;
  vec2 f = fract(gl_FragCoord.xy / cell) - 0.5;
  float r = 0.1 + 0.42 * smoothstep(-0.85, 0.95, w);
  float aa = 0.06;
  float dotv = smoothstep(r + aa, r - aa, length(f));

  vec3 ink = vec3(0.062, 0.062, 0.049);
  vec3 paper = vec3(0.960, 0.949, 0.918);
  vec3 coral = vec3(0.886, 0.341, 0.227);

  float warm = smoothstep(0.2, 0.95, w2 + swell * 0.9);
  vec3 dot = mix(paper, coral, warm * 0.9);

  float a = dotv * (0.16 + 0.74 * smoothstep(-0.95, 0.9, w));
  vec3 col = mix(ink, dot, clamp(a, 0.0, 1.0));

  col += coral * swell * 0.045;
  col *= 0.78 + 0.22 * smoothstep(1.25, 0.15, length(uv - 0.5));

  gl_FragColor = vec4(col, 1.0);
}
`;

/** A live halftone field: dots swell into a tide that leans toward the pointer. */
export default function HalftoneField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uPtr = gl.getUniformLocation(program, "uPtr");
    const uTime = gl.getUniformLocation(program, "uTime");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0.5, y: 0.5 };
    const eased = { x: 0.5, y: 0.5 };

    let raf = 0;
    let running = true;
    let elapsed = 0;
    let last = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, w, h);
    };

    const draw = () => {
      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uPtr, eased.x, eased.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const loop = (now: number) => {
      if (!running) return;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      elapsed += dt * 0.42;
      eased.x += (pointer.x - eased.x) * 0.05;
      eased.y += (pointer.y - eased.y) * 0.05;
      draw();
      raf = requestAnimationFrame(loop);
    };

    resize();
    if (reduce) {
      gl.uniform2f(uPtr, 0.5, 0.5);
      gl.uniform1f(uTime, 0.4);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const onResize = () => {
      resize();
      if (reduce) draw();
    };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - r.left) / r.width;
      pointer.y = 1 - (e.clientY - r.top) / r.height;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        const next = entry.isIntersecting && !document.hidden && !reduce;
        if (next === running) return;
        running = next;
        if (running) {
          last = 0;
          raf = requestAnimationFrame(loop);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.01 },
    );

    if (!reduce) {
      io.observe(canvas);
      window.addEventListener("pointermove", onMove, { passive: true });
    }
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
