import { useEffect } from 'react';

const SmoothScrollProvider = ({ children }) => {
  useEffect(() => {
    // Initialize after first paint to avoid blocking FCP
    const init = async () => {
      try {
        const [{ default: Lenis }, gsapModule, scrollTriggerModule] = await Promise.all([
          import('@studio-freight/lenis'),
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ]);

        const gsap = (gsapModule && (gsapModule.default || gsapModule.gsap)) || undefined;
        const ScrollTrigger = (scrollTriggerModule && (scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default)) || undefined;
        if (gsap && ScrollTrigger) {
          gsap.registerPlugin(ScrollTrigger);
        }

        const lenis = new Lenis({
          lerp: 0.07,
          smooth: true,
          duration: 1.2,
          smoothTouch: true,
          easing: (t) => 1 - Math.pow(1 - t, 3),
        });

        function update(time) {
          lenis.raf(time);
          requestAnimationFrame(update);
        }

        requestAnimationFrame(update);

        if (ScrollTrigger) {
          lenis.on('scroll', ScrollTrigger.update);
        }

        return () => {
          lenis.destroy();
        };
      } catch (e) {
        // If dynamic import fails, gracefully do nothing
      }
    };

    // Prefer idle if available, else rAF
    if ('requestIdleCallback' in window) {
      // @ts-ignore
      requestIdleCallback(init);
    } else {
      requestAnimationFrame(() => init());
    }
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        {children}
      </div>
    </div>
  );
};

export default SmoothScrollProvider;
