"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  Braces,
  Code2,
  Palette,
  PenTool,
  Sparkles,
  Terminal,
} from "lucide-react";

type Mode = "designer" | "developer";

const SKIN = "#b9784f";
const SKIN_SHADE = "#a2663f";
const HAIR = "#211c19";

/** Flat 2D illustrated character. Props on the desk swap with the mode. */
export default function Character({ mode }: { mode: Mode }) {
  const designer = mode === "designer";
  const sweater = designer ? "#2f3e5c" : "#c9573a";

  return (
    <>
      {/* soft background shapes */}
      <svg viewBox="0 0 400 500" aria-hidden="true">
        <circle cx="318" cy="118" r="58" fill="#fff" opacity="0.45" />
        <circle cx="70" cy="300" r="34" fill="#fff" opacity="0.3" />
        <path d="M0 440 H400 V500 H0Z" fill="#1a1a17" opacity="0.07" />
      </svg>

      <svg
        viewBox="0 0 400 500"
        role="img"
        aria-label="Illustration of Adarsh working at a desk"
      >
        {/* body */}
        <g className="bob">
          <path
            d="M118 452 C118 372 156 336 200 336 C244 336 282 372 282 452Z"
            fill={sweater}
            style={{ transition: "fill .5s" }}
          />
          {/* collar */}
          <path
            d="M178 338 Q200 362 222 338 L214 334 Q200 350 186 334Z"
            fill="#f5f2ea"
          />
          {/* neck */}
          <path d="M184 300 H216 V338 Q200 352 184 338Z" fill={SKIN_SHADE} />
          {/* ears */}
          <circle cx="150" cy="268" r="9" fill={SKIN} />
          <circle cx="250" cy="268" r="9" fill={SKIN} />
          {/* head */}
          <ellipse cx="200" cy="262" rx="50" ry="56" fill={SKIN} />
          {/* hair */}
          <path
            d="M148 262 C140 200 176 176 204 178 C240 178 262 206 252 262 C246 240 232 224 206 222 C178 222 160 236 148 262Z"
            fill={HAIR}
          />
          <path
            d="M160 214 C170 188 200 176 226 184 C206 186 184 196 170 220Z"
            fill={HAIR}
          />
          {/* glasses */}
          <g fill="none" stroke="#1a1a17" strokeWidth="3">
            <rect x="166" y="256" width="30" height="24" rx="9" />
            <rect x="206" y="256" width="30" height="24" rx="9" />
            <path d="M196 266 H206" />
          </g>
          {/* eyes */}
          <g className="blink" fill="#1a1a17">
            <circle cx="181" cy="268" r="3.2" />
            <circle cx="221" cy="268" r="3.2" />
          </g>
          {/* brows + smile */}
          <g fill="none" stroke={HAIR} strokeWidth="3" strokeLinecap="round">
            <path d="M170 248 Q181 243 192 248" />
            <path d="M210 248 Q221 243 232 248" />
          </g>
          <path
            d="M188 295 Q200 306 212 295"
            fill="none"
            stroke="#1a1a17"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M200 272 Q196 284 202 286"
            fill="none"
            stroke={SKIN_SHADE}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>

        {/* desk */}
        <rect x="40" y="430" width="320" height="14" rx="4" fill="#1a1a17" />
        <rect
          x="70"
          y="444"
          width="10"
          height="56"
          fill="#1a1a17"
          opacity="0.85"
        />
        <rect
          x="320"
          y="444"
          width="10"
          height="56"
          fill="#1a1a17"
          opacity="0.85"
        />

        {/* laptop (back of the screen faces us) */}
        <g>
          <rect
            x="140"
            y="368"
            width="120"
            height="64"
            rx="8"
            fill="#e9e4d8"
            stroke="#1a1a17"
            strokeWidth="3"
          />
          <circle
            cx="200"
            cy="400"
            r="7"
            fill={designer ? "#e2573a" : "#2f3e5c"}
            style={{ transition: "fill .5s" }}
          />
          {/* hands */}
          <circle cx="132" cy="424" r="11" fill={SKIN} />
          <circle cx="268" cy="424" r="11" fill={SKIN} />
        </g>

        {/* mug */}
        <g>
          <rect
            x="296"
            y="398"
            width="28"
            height="32"
            rx="6"
            fill="#f5f2ea"
            stroke="#1a1a17"
            strokeWidth="3"
          />
          <path
            d="M324 408 q12 0 12 9 t-12 9"
            fill="none"
            stroke="#1a1a17"
            strokeWidth="3"
          />
          <path
            d="M304 388 q-4 -8 0 -14 M314 388 q-4 -8 0 -14"
            fill="none"
            stroke="#1a1a17"
            strokeWidth="2"
            opacity="0.4"
            strokeLinecap="round"
          />
        </g>

        {/* plant */}
        <g>
          <path d="M62 430 L68 396 H96 L102 430Z" fill="#e2573a" />
          <path
            d="M82 396 C70 372 60 366 54 352 C74 356 84 372 82 396Z"
            fill="#3f7a58"
          />
          <path
            d="M82 396 C84 368 96 358 108 352 C108 374 98 388 82 396Z"
            fill="#4f9a70"
          />
          <path
            d="M82 396 C80 380 84 366 82 352 C92 366 90 384 82 396Z"
            fill="#3f7a58"
          />
        </g>
      </svg>

      {/* floating icon chips */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ position: "absolute", inset: 0 }}
        >
          {designer ? (
            <>
              <div className="chip float" style={{ left: "9%", top: "24%" }}>
                <PenTool size={24} color="#e2573a" />
              </div>
              <div
                className="chip sm float d1"
                style={{ right: "10%", top: "36%" }}
              >
                <Palette size={20} />
              </div>
              <div
                className="chip sm float d2"
                style={{ left: "16%", top: "52%" }}
              >
                <Sparkles size={20} color="#2f3e5c" />
              </div>
            </>
          ) : (
            <>
              <div className="chip float" style={{ left: "9%", top: "24%" }}>
                <Code2 size={24} color="#2f3e5c" />
              </div>
              <div
                className="chip sm float d1"
                style={{ right: "10%", top: "36%" }}
              >
                <Braces size={20} color="#e2573a" />
              </div>
              <div
                className="chip sm float d2"
                style={{ left: "16%", top: "52%" }}
              >
                <Terminal size={20} />
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
