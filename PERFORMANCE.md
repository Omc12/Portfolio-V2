# Performance Optimization Workflow

This document records the non-visual performance improvements and media conversion steps. All changes guarantee no layout, animation, or interaction regressions.

## Media Conversion (GIF -> MP4/WebM)
Convert each large GIF to MP4 + WebM. Keep GIF as final fallback.

Example (replace INPUT.gif / OUTPUT base name):

```bash
ffmpeg -y -i INPUT.gif -movflags faststart -pix_fmt yuv420p -vf "scale=iw:ih:flags=lanczos" OUTPUT.mp4
ffmpeg -y -i INPUT.gif -c:v libvpx-vp9 -b:v 0 -crf 30 -pix_fmt yuv420p -vf "scale=iw:ih:flags=lanczos" OUTPUT.webm
```

Optional poster (first frame):
```bash
ffmpeg -y -i INPUT.gif -vf "select=eq(n\,0)" -q:v 3 OUTPUT-poster.jpg
```

Store converted files in `src/assets/videos/` (create folder). Update `AccoladesSection.jsx` mapping to provide `videoSources={{ mp4: '...', webm: '...', poster: '...' }}`.

## PNG Optimization (PNG -> AVIF/WebP)
```bash
ffmpeg -y -i audioml.png -c:v libaom-av1 -crf 30 -b:v 0 audioml.avif
ffmpeg -y -i audioml.png -c:v libwebp -lossless 0 -qscale 75 audioml.webp
```

Integrate with `<picture>` wrapper:
```jsx
<picture>
  <source srcSet={audiomlAvif} type="image/avif" />
  <source srcSet={audiomlWebp} type="image/webp" />
  <img src={audiomlPng} alt="Audio ML" loading="lazy" />
</picture>
```

## Code Splitting (Below-the-fold)
Use `React.lazy` and `Suspense` for: StatsSection, ProjectsSection, AccoladesSection, KnowMore.
Prefetch with:
```js
if ('requestIdleCallback' in window) requestIdleCallback(() => import('./StatsSection')); else setTimeout(() => import('./StatsSection'), 1000);
```

## Lenis & Matter Defer
Both libraries dynamically imported. Ensure smoothness by idle preloading Matter and immediate rAF initialization for Lenis after first paint.

## Fonts
Loaded via `<link>` with preconnect. Only needed Poppins weights (300,400,500,700) + Hurricane.

## Firebase Caching
`/assets/**`: immutable, 1 year.
`/index.html`: no-cache to always fetch latest shell.

## Revert Point
Tag: `perf-baseline-2025-11-10` for hard reset.

## Future Enhancements
1. Introduce image dimension attributes (width/height) for CLS avoidance.
2. Add service worker for runtime caching (ensure no stale script risk).
3. Collect bundle analysis (`vite build --report`) for granular tree-shaking checks.

## Validation Checklist
- No layout shift introduced.
- Same cursor, scroll smoothing, and animations.
- Media fallback chain: MP4/WebM -> GIF.
