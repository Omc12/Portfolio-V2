import React, { useState, useEffect } from 'react';

const ScrollProgress = () => {
  const [scrollPercent, setScrollPercent] = useState(0);

  // Compute brightness using the formula: brightness = 0.299*R + 0.587*G + 0.114*B
  const getBrightness = (rgb) => {
    const result = rgb.match(/\d+/g);
    if (result && result.length >= 3) {
      const [r, g, b] = result.map(Number);
      return 0.299 * r + 0.587 * g + 0.114 * b;
    }
    return 255;
  };

  // Recursively get a non-transparent background color from the element or its parent(s)
  const getEffectiveBackground = (elem) => {
    let bg = window.getComputedStyle(elem).backgroundColor;
    // If the background is transparent, check parent elements.
    while ((bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') && elem.parentElement) {
      elem = elem.parentElement;
      bg = window.getComputedStyle(elem).backgroundColor;
    }
    return bg;
  };

  // Samples the background beneath the indicator and adjusts its text color accordingly.
  const updateTextColor = () => {
    const indicator = document.getElementById('scroll-percent');
    if (!indicator) return;

    // Temporarily disable pointer events so that elementFromPoint doesn't pick the indicator itself.
    const originalPointerEvents = indicator.style.pointerEvents;
    indicator.style.pointerEvents = 'none';

    const rect = indicator.getBoundingClientRect();
    const sampleX = rect.left + rect.width / 2;
    const sampleY = rect.top + rect.height / 2;
    const elementBelow = document.elementFromPoint(sampleX, sampleY);

    // Restore pointer events
    indicator.style.pointerEvents = originalPointerEvents;

    if (!elementBelow) return;

    const bgColor = getEffectiveBackground(elementBelow);
    const brightness = getBrightness(bgColor);
    // Use a threshold (e.g., 128) to decide which text color to apply:
    // For bright backgrounds, use dark text; for dark backgrounds, use light text.
    indicator.style.color = brightness > 128 ? '#000' : '#fff';
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollPercent(Math.round(scrolled));
      updateTextColor();
    };

    // Listen for scroll and resize events
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateTextColor);

    // Initial update
    updateTextColor();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateTextColor);
    };
  }, []);

  return <div id="scroll-percent">{scrollPercent}%</div>;
};

export default ScrollProgress;
