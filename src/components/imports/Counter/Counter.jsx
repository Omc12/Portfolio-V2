import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export default function CountUp({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 2,
  className = "",
  startWhen = true,
  separator = "",
  onStart,
  onEnd,
}) {
  const visibleRef = useRef(null);
  const placeholderRef = useRef(null);
  const motionValue = useMotionValue(direction === "down" ? to : from);

  // Calculate damping and stiffness based on duration
  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);

  const springValue = useSpring(motionValue, {
    damping,
    stiffness,
  });

  const isInView = useInView(visibleRef, { once: true, margin: "0px" });

  // Function to format the number
  const formatNumber = (number) => {
    const options = {
      useGrouping: !!separator,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    };
    const formattedNumber = Intl.NumberFormat("en-US", options).format(number);
    return separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;
  };

  // Set initial text content based on direction
  useEffect(() => {
    if (visibleRef.current) {
      visibleRef.current.textContent = String(direction === "down" ? to : from);
    }
  }, [from, to, direction]);

  // Start the animation when in view and startWhen is true
  useEffect(() => {
    if (isInView && startWhen) {
      if (typeof onStart === "function") onStart();

      const timeoutId = setTimeout(() => {
        motionValue.set(direction === "down" ? from : to);
      }, delay * 1000);

      const durationTimeoutId = setTimeout(() => {
        if (typeof onEnd === "function") onEnd();
      }, delay * 1000 + duration * 1000);

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(durationTimeoutId);
      };
    }
  }, [isInView, startWhen, motionValue, direction, from, to, delay, onStart, onEnd, duration]);

  // Update text content with formatted number on spring value change
  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (visibleRef.current) {
        visibleRef.current.textContent = formatNumber(latest.toFixed(0));
      }
    });
    return () => unsubscribe();
  }, [springValue, separator]);

  // Use the formatted 'to' value as the placeholder so its width is reserved
  const maxText = formatNumber(to);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Invisible placeholder that reserves the space */}
      <span ref={placeholderRef} style={{ visibility: "hidden" }}>
        {maxText}
      </span>
      {/* Visible counter rendered on top */}
      <span
        ref={visibleRef}
        className={className}
        style={{ position: "absolute", top: 0, left: 0 }}
      />
    </div>
  );
}
