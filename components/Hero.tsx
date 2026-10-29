"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate, motion, useReducedMotion } from "motion/react";
import {
  ArrowDown,
  Braces,
  ChevronsLeftRight,
  Code2,
  Palette,
  PenTool,
  Sparkles,
  Terminal,
} from "lucide-react";

type Mode = "designer" | "developer";

/* The divider lives between these two positions (% of hero width), so a sliver of
   each side always shows and the handle is always reachable. */
const P_MIN = 6;
const P_MAX = 94;
const P_REST = 74; // where the divider settles after the intro: it cuts the figure in half
const P_REST_Y = 68; // same, for the horizontal divider on narrow screens
const NARROW = "(max-width: 860px)";
const isNarrow = () => typeof window !== "undefined" && window.matchMedia(NARROW).matches;
const EASE = [0.22, 1, 0.36, 1] as const;

const SKIN = "#b9784f";
const SKIN_SHADE = "#a2663f";
const HAIR = "#211c19";

/* ------------------------------------------------------------------ figure */

/** The same flat illustration drawn twice: painted, and as its blueprint. */
function Figure({ wire = false, sweater }: { wire?: boolean; sweater: string }) {
  return (
    <svg
      viewBox="0 0 480 560"
      className={wire ? "hx-fig hx-wire" : "hx-fig"}
      role={wire ? undefined : "img"}
      aria-label={wire ? undefined : "Illustration of Adarsh at his desk"}
      aria-hidden={wire ? true : undefined}
    >
      {/* arch + sun */}
      <path
        className="hx-arch-shape"
        d="M30 560 V250 A210 210 0 0 1 450 250 V560Z"
        fill="var(--hx-arch)"
      />
      <circle className="hx-sun" cx="372" cy="150" r="40" fill="#fff" opacity=".5" />

      <g className="figure" transform="translate(-10 -20) scale(1.25)">
        <g className="bob">
          <path d="M118 452 C118 372 156 336 200 336 C244 336 282 372 282 452Z" fill={sweater} />
          <path d="M178 338 Q200 362 222 338 L214 334 Q200 350 186 334Z" fill="#f5f2ea" />
          <path d="M184 300 H216 V338 Q200 352 184 338Z" fill={SKIN_SHADE} />
          <circle cx="150" cy="268" r="9" fill={SKIN} />
          <circle cx="250" cy="268" r="9" fill={SKIN} />
          <ellipse cx="200" cy="262" rx="50" ry="56" fill={SKIN} />
          <path
            d="M148 262 C140 200 176 176 204 178 C240 178 262 206 252 262 C246 240 232 224 206 222 C178 222 160 236 148 262Z"
            fill={HAIR}
          />
          <path d="M160 214 C170 188 200 176 226 184 C206 186 184 196 170 220Z" fill={HAIR} />
          <g fill="none" stroke="#1a1a17" strokeWidth="3">
            <rect x="166" y="256" width="30" height="24" rx="9" />
            <rect x="206" y="256" width="30" height="24" rx="9" />
            <path d="M196 266 H206" />
          </g>
          <g className="blink" fill="#1a1a17">
            <circle cx="181" cy="268" r="3.2" />
            <circle cx="221" cy="268" r="3.2" />
          </g>
          <g fill="none" stroke={HAIR} strokeWidth="3" strokeLinecap="round">
            <path d="M170 248 Q181 243 192 248" />
            <path d="M210 248 Q221 243 232 248" />
          </g>
          <path d="M188 295 Q200 306 212 295" fill="none" stroke="#1a1a17" strokeWidth="3" strokeLinecap="round" />
          <path d="M200 272 Q196 284 202 286" fill="none" stroke={SKIN_SHADE} strokeWidth="3" strokeLinecap="round" />
        </g>
        <rect x="40" y="430" width="320" height="14" rx="4" fill="#1a1a17" />
        <rect x="70" y="444" width="10" height="56" fill="#1a1a17" opacity=".85" />
        <rect x="320" y="444" width="10" height="56" fill="#1a1a17" opacity=".85" />
        <rect x="140" y="368" width="120" height="64" rx="8" fill="#e9e4d8" stroke="#1a1a17" strokeWidth="3" />
        <circle cx="200" cy="400" r="7" fill="#e2573a" />
        <circle cx="132" cy="424" r="11" fill={SKIN} />
        <circle cx="268" cy="424" r="11" fill={SKIN} />
        <rect x="296" y="398" width="28" height="32" rx="6" fill="#f5f2ea" stroke="#1a1a17" strokeWidth="3" />
        <path d="M324 408 q12 0 12 9 t-12 9" fill="none" stroke="#1a1a17" strokeWidth="3" />
        <path d="M62 430 L68 396 H96 L102 430Z" fill="#e2573a" />
        <path d="M82 396 C70 372 60 366 54 352 C74 356 84 372 82 396Z" fill="#3f7a58" />
        <path d="M82 396 C84 368 96 358 108 352 C108 374 98 388 82 396Z" fill="#4f9a70" />
        <path d="M82 396 C80 380 84 366 82 352 C92 366 90 384 82 396Z" fill="#3f7a58" />
      </g>

      {wire && (
        <g className="hx-ann" fontFamily="var(--mono)" fontSize="11" letterSpacing=".06em">
          <rect x="150" y="224" width="172" height="196" rx="4" />
          <text x="150" y="214">{"<Head />"}</text>
          <rect x="120" y="440" width="236" height="130" rx="4" transform="translate(0 -6)" />
          <text x="122" y="426">{"<Laptop />"}</text>
          <path d="M30 520 H450 M30 514 V526 M450 514 V526" />
          <text x="200" y="512">{"width: 420px"}</text>
        </g>
      )}
    </svg>
  );
}

function Chips({ wire }: { wire?: boolean }) {
  const icons = wire
    ? [<Code2 key="a" size={22} />, <Braces key="b" size={19} />, <Terminal key="c" size={19} />]
    : [<PenTool key="a" size={22} />, <Palette key="b" size={19} />, <Sparkles key="c" size={19} />];
  return (
    <>
      <div className="chip float" style={{ left: "4%", top: "24%" }}>{icons[0]}</div>
      <div className="chip sm float d1" style={{ right: "2%", top: "40%" }}>{icons[1]}</div>
      <div className="chip sm float d2" style={{ left: "10%", top: "56%" }}>{icons[2]}</div>
    </>
  );
}

/* ------------------------------------------------------------------- hero */

export default function Hero({
  mode,
  onModeChange,
}: {
  mode: Mode;
  onModeChange: (m: Mode) => void;
}) {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const pRef = useRef(P_MAX);
  const anim = useRef<ReturnType<typeof animate> | null>(null);
  const dragging = useRef(false);
  const [now, setNow] = useState("");
  const [aria, setAria] = useState(P_MAX);

  const setP = useCallback((v: number) => {
    const p = Math.min(P_MAX, Math.max(P_MIN, v));
    pRef.current = p;
    rootRef.current?.style.setProperty("--p", String(p));
  }, []);

  const settle = useCallback(
    (side?: Mode) => {
      const m: Mode = side ?? (pRef.current >= 50 ? "designer" : "developer");
      setAria(Math.round(pRef.current));
      onModeChange(m);
    },
    [onModeChange],
  );

  const go = useCallback(
    (to: number, opts?: { duration?: number; side?: Mode; silent?: boolean }) => {
      anim.current?.stop();
      if (reduced) {
        setP(to);
        if (!opts?.silent) settle(opts?.side);
        else setAria(Math.round(to));
        return;
      }
      anim.current = animate(pRef.current, to, {
        duration: opts?.duration ?? 0.9,
        ease: EASE,
        onUpdate: setP,
        onComplete: () => (opts?.silent ? setAria(Math.round(to)) : settle(opts?.side)),
      });
    },
    [reduced, setP, settle],
  );

  /* intro: the code curtain slides in from the right edge and settles on the figure */
  useEffect(() => {
    const t = window.setTimeout(
      () => go(isNarrow() ? P_REST_Y : P_REST, { duration: 1.5, silent: true }),
      reduced ? 0 : 1100,
    );
    return () => {
      window.clearTimeout(t);
      anim.current?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Dubai clock */
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Dubai",
        hour12: false,
      }).format(new Date());
    setNow(fmt());
    const id = window.setInterval(() => setNow(fmt()), 20000);
    return () => window.clearInterval(id);
  }, []);

  /* dragging */
  const onDown = (e: React.PointerEvent) => {
    anim.current?.stop();
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    rootRef.current?.setAttribute("data-drag", "");
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragging.current || !rootRef.current) return;
    const r = rootRef.current.getBoundingClientRect();
    setP(
      isNarrow()
        ? ((e.clientY - r.top) / r.height) * 100
        : ((e.clientX - r.left) / r.width) * 100,
    );
  };
  const onUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    rootRef.current?.removeAttribute("data-drag");
    settle();
  };
  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 12 : 4;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") go(pRef.current - step, { duration: 0.25 });
    else if (e.key === "ArrowRight" || e.key === "ArrowDown") go(pRef.current + step, { duration: 0.25 });
    else if (e.key === "Home") go(P_MIN, { duration: 0.6 });
    else if (e.key === "End") go(P_MAX, { duration: 0.6 });
    else return;
    e.preventDefault();
  };

  const pick = (m: Mode) => go(m === "designer" ? P_MAX : P_MIN, { side: m });

  const rise = (d: number) => ({
    initial: reduced ? false : { y: "108%" },
    animate: { y: 0 },
    transition: { duration: 0.95, delay: d, ease: EASE },
  });
  const fade = (d: number, y = 18) => ({
    initial: reduced ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: d, ease: EASE },
  });

  const sweater = mode === "designer" ? "#2f3e5c" : "#c9573a";

  return (
    <section
      id="home"
      ref={rootRef}
      className="hx"
      data-mode={mode}
      style={{ ["--p" as string]: P_MAX }}
      aria-label="Introduction"
    >
      {/* ============ layer 1 · the finished design ============ */}
      <div className="hx-layer hx-design">
        <div className="hx-frame">
          <motion.div className="hx-top" {...fade(0.1, 10)}>
            <span className="status">
              <span className="pulse" /> Available now · Dubai, UAE
            </span>
            <span className="hx-micro hx-clock" aria-label="Local time in Dubai">
              Dubai {now || "--:--"} GST
            </span>
          </motion.div>

          <div className="hx-name">
            <h1 className="display">
              <span className="hx-line"><motion.span {...rise(0.2)}>Adarsh</motion.span></span>
              <span className="hx-line"><motion.span {...rise(0.32)}><em>Prakasan</em></motion.span></span>
            </h1>
          </div>

          <motion.p className="hx-sub" {...fade(0.6)}>
            Designer and full-stack developer in Dubai. I shape brands and interfaces,
            then build them in React, Next.js and the MERN stack.
          </motion.p>

          <div className="hx-fig-slot">
            <motion.div className="hx-fig-wrap" {...fade(0.45, 40)}>
              <Figure sweater={sweater} />
              <Chips />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ============ layer 2 · the same hero as source ============ */}
      <div className="hx-layer hx-code" aria-hidden="true">
        <div className="hx-frame">
          <div className="hx-top">
            <span className="hx-micro">{"// hero.tsx"}</span>
          </div>

          <div className="hx-name">
            <pre className="hx-src">
              <code>
                <span className="k">export default function</span> <span className="f">Adarsh</span>
                <span className="p">() {"{"}</span>{"\n"}
                {"  "}<span className="k">return</span> <span className="p">(</span>{"\n"}
                {"    "}<span className="p">{"<"}</span><span className="t">Portfolio</span>{"\n"}
                {"      "}<span className="a">role</span><span className="p">=</span><span className="s">&quot;designer + developer&quot;</span>{"\n"}
                {"      "}<span className="a">base</span><span className="p">=</span><span className="s">&quot;Dubai, UAE&quot;</span>{"\n"}
                {"      "}<span className="a">stack</span><span className="p">={"{["}</span><span className="s">&quot;Next.js&quot;</span><span className="p">, </span><span className="s">&quot;MERN&quot;</span><span className="p">, </span><span className="s">&quot;Figma&quot;</span><span className="p">{"]}"}</span>{"\n"}
                {"      "}<span className="a">openToWork</span>{"\n"}
                {"    "}<span className="p">{"/>"}</span>{"\n"}
                {"  "}<span className="p">);</span>{"\n"}
                <span className="p">{"}"}</span>
              </code>
            </pre>
          </div>

          <dl className="hx-tokens">
            <div><dt>paper</dt><dd><i style={{ background: "#f5f2ea" }} />#f5f2ea</dd></div>
            <div><dt>arch</dt><dd><i style={{ background: "#f6d3c4" }} />#f6d3c4</dd></div>
            <div><dt>accent</dt><dd><i style={{ background: "#e2573a" }} />#e2573a</dd></div>
            <div><dt>display</dt><dd>Instrument Serif</dd></div>
          </dl>

          <p className="hx-sub hx-sub-code">
            <span className="c">{"// I design it, then I build it."}</span>
          </p>

          <div className="hx-fig-slot">
            <div className="hx-fig-wrap">
              <Figure wire sweater="none" />
              <Chips wire />
            </div>
          </div>
        </div>
      </div>

      {/* ============ divider ============ */}
      <div
        ref={handleRef}
        className="hx-handle"
        role="slider"
        tabIndex={0}
        aria-label="Reveal the code behind the design"
        aria-valuemin={P_MIN}
        aria-valuemax={P_MAX}
        aria-valuenow={aria}
        aria-valuetext={aria >= 50 ? "Design view" : "Code view"}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onKeyDown={onKey}
      >
        <span className="hx-tag hx-tag-l">Design</span>
        <span className="hx-tag hx-tag-r">Code</span>
        <span className="hx-grip"><ChevronsLeftRight size={20} strokeWidth={1.6} /></span>
        <span className="hx-hint">Drag</span>
      </div>

      {/* ============ controls (always on top) ============ */}
      <motion.div className="hx-ctl" {...fade(0.78)}>
        <div className="toggle" data-mode={mode} role="tablist" aria-label="Choose a view">
          <span className="knob" aria-hidden="true" />
          {(["designer", "developer"] as const).map((m) => (
            <button
              key={m}
              role="tab"
              aria-selected={mode === m}
              className={mode === m ? "on" : ""}
              onClick={() => pick(m)}
            >
              {m === "designer" ? "Designer" : "Developer"}
            </button>
          ))}
        </div>
        <a className="pill" href="#work">
          See the work <ArrowDown size={15} />
        </a>
      </motion.div>
    </section>
  );
}
