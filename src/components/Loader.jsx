import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import './css/loader.scss';

const Loader = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const progressRef = useRef(null);
  const letters = ''.split(''); //fill text to display in loader
  const segment = 100 / letters.length; // ≈16.67% per letter

  useEffect(() => {
    // Simulate progress until 90%
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev < 90) {
          return Math.min(prev + Math.random() * 5, 90);
        }
        return prev;
      });
    }, 100);

    const markLoaded = () => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setShowLoader(false);
        if (onLoaded) onLoaded();
      }, 1000);
    };

    // Use DOMContentLoaded to mark that the critical content is ready.
    if (document.readyState === "complete" || document.readyState === "interactive") {
      // Let the progress bar fill up smoothly before marking loaded.
      setTimeout(markLoaded, 100);
    } else {
      window.addEventListener("DOMContentLoaded", markLoaded);
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener("DOMContentLoaded", markLoaded);
    };
  }, [onLoaded]);

  // Animate the progress bar using GSAP.
  useEffect(() => {
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${progress}%`,
        duration: 0.3,
        ease: 'power1.out'
      });
    }
  }, [progress]);

  if (!showLoader) return null;

  return (
    <>
      {/* Progress Bar at the Bottom */}
      <div className="loader-progress-container">
        <div ref={progressRef} className="loader-progress" />
      </div>

      {/* Centered Text Animation */}
      <div className="loader-text-container">
        {letters.map((letter, index) => {
          // Lower the threshold for the final letter ("r") so it appears before 100%
          const threshold = index === letters.length - 1 ? 85 : (index + 1) * segment;
          return (
            <motion.span
              key={index}
              className="loader-letter"
              initial={{ y: '100vh', opacity: 0 }}
              animate={{
                y: progress >= threshold ? 0 : '100vh',
                opacity: progress >= threshold ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {letter}
            </motion.span>
          );
        })}
      </div>
    </>
  );
};

export default Loader;
