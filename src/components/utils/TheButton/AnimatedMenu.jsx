// AnimatedMenuHeader.js
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import styles from './AnimatedMenu.module.css';

// Navigation links data with target div IDs
const links = [
  { title: "About", targetId: "about-section" },
  { title: "Projects", targetId: "projects-section" },
  { title: "Contact", targetId: "contact-section" },
];

// Footer links data (optional)
const footerLinks = [];

// Menu animation variants for Framer Motion
const menuVariants = {
  open: {
    width: "25vw",
    height: "max-content",
    top: "-25px",
    right: "-25px",
    transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    width: "40px", // Matches circular button size
    height: "40px", // Matches circular button size
    top: "0px",
    right: "0px",
    transition: { duration: 0.75, delay: 0.35, type: "tween", ease: [0.76, 0, 0.24, 1] },
  },
};

// Footer links animation variants (if used)
const slideIn = {
  initial: { opacity: 0, y: 20 },
  enter: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.75 + i * 0.1, ease: [0.215, 0.61, 0.355, 1] },
  }),
  exit: { opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } },
};

// Function to smoothly scroll to the target div using offsetTop
function scrollToSection(id, extraOffset = -20) {
  const element = document.getElementById(id);
  if (element) {
    const baseOffset = 0; // your fixed header offset
    const headerOffset = baseOffset + extraOffset;
    const offsetPosition = element.offsetTop - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  } else {
    console.error(`Element with id ${id} not found.`);
  }
}


// Button component with hamburger icon
function Button({ isActive, toggleMenu }) {
  return (
    <div
      className={`${styles.button} ${isActive ? styles.active : ''} menu-cursor`}
      onClick={toggleMenu}
    >
      <div className={`${styles.icon} ${isActive ? styles.close : ''}`}></div>
    </div>
  );
}

// Navigation component with GSAP link animations and click handling
function Nav({ isActive, closeMenu, setScrollTarget }) {
  const linkRefs = useRef([]);

  useEffect(() => {
    if (isActive) {
      gsap.fromTo(
        linkRefs.current,
        { opacity: 0, rotateX: 90, y: 80, x: -20 },
        {
          opacity: 1,
          rotateX: 0,
          y: 0,
          x: 0,
          duration: 0.65,
          stagger: 0.1,
          delay: 0.5,
          ease: "power4.out",
        }
      );
    } else {
      gsap.to(linkRefs.current, {
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.in",
      });
    }
  }, [isActive]);

  return (
    <div className={styles.nav}>
      <div className={styles.body}>
        {links.map((link, i) => (
          <div key={`b_${i}`} className={styles.linkContainer}>
            <a
              href={`#${link.targetId}`}
              ref={(el) => (linkRefs.current[i] = el)}
              onClick={(e) => {
                e.preventDefault();
                // Set the target for scrolling and close the menu immediately.
                setScrollTarget(link.targetId);
                closeMenu();
              }}
            >
              {link.title}
            </a>
          </div>
        ))}
      </div>
      <motion.div className={styles.footer}>
        {footerLinks.map((link, i) => (
          <motion.a
            key={`f_${i}`}
            href={link.href}
            variants={slideIn}
            custom={i}
            initial="initial"
            animate={isActive ? "enter" : "exit"}
          >
            {link.title}
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}

// Main AnimatedMenuHeader component with deferred scrolling logic
function AnimatedMenuHeader() {
  const [isActive, setIsActive] = useState(false);
  const [scrollTarget, setScrollTarget] = useState(null);

  const closeMenu = () => setIsActive(false);

  return (
    <div className={`${styles.header} menu-cursor`}>
      <motion.div
        className={`${styles.menu} menu-cursor`}
        variants={menuVariants}
        animate={isActive ? "open" : "closed"}
        initial="closed"
        // Once the close animation is complete, scroll if a target is set.
        onAnimationComplete={() => {
          if (!isActive && scrollTarget) {
            scrollToSection(scrollTarget);
            setScrollTarget(null);
          }
        }}
      >
        <Nav
          isActive={isActive}
          closeMenu={closeMenu}
          setScrollTarget={setScrollTarget}
        />
      </motion.div>
      <Button isActive={isActive} toggleMenu={() => setIsActive(!isActive)} />
    </div>
  );
}

export default AnimatedMenuHeader;
