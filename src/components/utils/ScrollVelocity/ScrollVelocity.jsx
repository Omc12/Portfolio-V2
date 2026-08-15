import { useRef, useLayoutEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import "./ScrollVelocity.css";

// Hook to measure the element's width.
function useElementWidth(ref) {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    if (!ref.current) return;
    function updateWidth() {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setWidth(rect.width);
      }
    }
    updateWidth();
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(ref.current);
    if (document.fonts) {
      document.fonts.ready.then(updateWidth);
    }
    window.addEventListener("resize", updateWidth);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateWidth);
    };
  }, [ref]);
  return width;
}

const ScrollVelocitySingle = ({
  text = "React Bits",
  velocity = 100,
  scrollContainerRef,
  className = "",
  damping = 50,
  stiffness = 400,
  numCopies = 12,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName = "parallax",
  scrollerClassName = "scroller",
  parallaxStyle,
  scrollerStyle,
}) => {
  // Base motion value that will control the x offset.
  const baseX = useMotionValue(0);
  const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};
  const { scrollY } = useScroll(scrollOptions);
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping, stiffness });
  const velocityFactor = useTransform(
    smoothVelocity,
    velocityMapping.input,
    velocityMapping.output,
    { clamp: false }
  );

  const copyRef = useRef(null);
  const copyWidth = useElementWidth(copyRef);

  // Utility function to wrap the x value for a seamless loop.
  function wrap(min, max, v) {
    const range = max - min;
    if (range <= 0) return 0;
    const mod = (((v - min) % range) + range) % range;
    return mod + min;
  }

  // Transform the base x value into a wrapped value.
  const x = useTransform(baseX, (v) => {
    if (copyWidth === 0) return "0px";
    return `${wrap(-copyWidth, 0, v)}px`;
  });

  // Animation loop to update the motion value based on scroll velocity.
  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * velocity * (delta / 1000);

    const vFactor = velocityFactor.get();
    if (vFactor < -0.1) {
      directionFactor.current = -1;
    } else if (vFactor > 0.1) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * Math.abs(vFactor);
    baseX.set(baseX.get() + moveBy);
  });

  // Create copies of the text for the seamless loop.
  const spans = [];
  for (let i = 0; i < numCopies; i++) {
    spans.push(
      <span className={className} key={i} ref={i === 0 ? copyRef : null} style={{ paddingRight: "1.5rem" }}>
        {text}
      </span>
    );
  }

  return (
    <div className={parallaxClassName} style={parallaxStyle}>
      <motion.div className={scrollerClassName} style={{ x, ...scrollerStyle }}>
        {spans}
      </motion.div>
    </div>
  );
};

export default ScrollVelocitySingle;
