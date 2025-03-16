import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScrollProvider = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.07, // Adjust for more or less smoothing
      smooth: true,
      duration: 1.2,
      smoothTouch: true,
      easing: (t) => 1 - Math.pow(1 - t, 3), // Custom easing function
    });

    function update(time) {
      lenis.raf(time);
      requestAnimationFrame(update);
    }

    requestAnimationFrame(update);

    // Connect Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      lenis.destroy(); // Clean up on unmount
    };
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
