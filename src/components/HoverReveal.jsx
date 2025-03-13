import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './css/HoverReveal.css';

const HoverReveal = ({ visibleChildren, hiddenChildren }) => {
  const containerRef = useRef(null);
  const hiddenContentRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Setup the mask effect
  useEffect(() => {
    if (!containerRef.current || !hiddenContentRef.current) return;

    // Initialize GSAP timeline for the reveal animation
    const tl = gsap.timeline({ paused: true });
    tl.to(hiddenContentRef.current, {
      "--size": "150px",
      duration: 0.75,
      ease: "back.out(1.7)"
    });

    // Handle mouse enter/leave events
    const handleMouseEnter = () => {
      setIsHovering(true);
      tl.restart();
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      tl.reverse();
    };

    // Add event listeners
    containerRef.current.addEventListener('mouseenter', handleMouseEnter);
    containerRef.current.addEventListener('mouseleave', handleMouseLeave);

    // Initialize hidden content visibility
    gsap.set(hiddenContentRef.current, { 
      autoAlpha: 1,
      "--x": "50%",
      "--y": "50%",
      "--size": "0px"
    });

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mouseenter', handleMouseEnter);
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Track mouse position for mask positioning
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current || !isHovering) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setCursorPosition({ x, y });
      
      // Update CSS variables for the mask position
      if (hiddenContentRef.current) {
        gsap.to(hiddenContentRef.current, {
          "--x": `${x}px`,
          "--y": `${y}px`,
          duration: 0.4,
          ease: "power4.out"
        });
      }
    };

    if (isHovering) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovering]);

  return (
    <div className="hover-reveal-container" ref={containerRef}>
      {/* Visible content that's shown by default */}
      <div className="visible-content">
        {visibleChildren}
      </div>
      
      {/* Hidden content that's revealed on hover */}
      <div className="hidden-content" ref={hiddenContentRef}>
        {hiddenChildren}
      </div>
    </div>
  );
};

export default HoverReveal;