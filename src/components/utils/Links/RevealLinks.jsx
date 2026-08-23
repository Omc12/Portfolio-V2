import React from "react";
import { motion } from "framer-motion";
import "./RevealLinks.css";

export const RevealLinks = () => {
  return (
    <section className="reveal-links-section">
      <FlipLink href="/resume.pdf">
        Resume
      </FlipLink>
      <FlipLink href="mailto:omchimurkar45@gmail.com">
        Mail
      </FlipLink>
      <FlipLink href="https://scholar.google.com/citations?user=7NXAM-wAAAAJ">
        Scholar
      </FlipLink>
      <FlipLink href="https://www.researchgate.net/profile/Om-Chimurkar">
        ResearchGate
      </FlipLink>
      <FlipLink href="https://orcid.org/0009-0004-0518-4598">
        ORCID
      </FlipLink>
      <FlipLink href="https://www.linkedin.com/in/om-chimurkar">
        Linkedin
      </FlipLink>
      <FlipLink href="https://github.com/Omc12">
        Github
      </FlipLink>
      <FlipLink href="https://leetcode.com/u/omchimurkar/">
        Leetcode
      </FlipLink>
    </section>
  );
};

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children, href, download }) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      download={download}
      className="flip-link"
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            key={i}
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="flip-link-overlay">
        {children.split("").map((l, i) => (
          <motion.span
            key={i}
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};
