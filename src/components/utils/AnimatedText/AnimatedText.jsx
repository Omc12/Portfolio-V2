import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AnimatedText = ({ text }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  // Split text into words
  const words = text.split(" ");

  return (
    <div
      ref={ref}
      style={{
        overflow: "hidden",
        display: "inline-block",
        whiteSpace: "pre-wrap",
      }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: "inline-block" }}>
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              initial={{ y: "100%", opacity: 0 }}
              animate={isInView ? { y: "0%", opacity: 1 } : {}}
              transition={{
                // Delay is a combination of word and character index
                delay: wordIndex * 0.07 + charIndex * 0.01,
                duration: 0.15,
                ease: "easeOut",
              }}
              style={{ display: "inline-block" }}
            >
              {char}
            </motion.span>
          ))}
          {/* Add a natural space after each word except the last */}
          {wordIndex < words.length - 1 && " "}
        </span>
      ))}
    </div>
  );
};

export default AnimatedText;
