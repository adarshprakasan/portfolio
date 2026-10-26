/** Route a public image through Next's optimiser (the originals can be 9,000 px wide). */
export const optimized = (src: string, w = 640) =>
  `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=75`;
