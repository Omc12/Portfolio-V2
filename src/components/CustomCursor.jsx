import React, { useState, useEffect, useRef } from 'react';
import './css/CustomCursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHoveringWrapper, setIsHoveringWrapper] = useState(false);
  const [isElastic, setIsElastic] = useState(false);
  const textRef = useRef(null);

  // Update cursor position
  const updateCursor = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  // Check if cursor is over a .wrapper element
  const handleElementHover = (e) => {
    const isWrapper = e.target.closest('.wrapper') !== null;
    setIsHoveringWrapper(isWrapper);
  };

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
    while ((bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') && elem.parentElement) {
      elem = elem.parentElement;
      bg = window.getComputedStyle(elem).backgroundColor;
    }
    return bg;
  };

  // Update the text color based on the background brightness (opposite logic)
  const updateTextColor = () => {
    if (!textRef.current) return;

    const originalPointerEvents = textRef.current.style.pointerEvents;
    textRef.current.style.pointerEvents = 'none';

    const rect = textRef.current.getBoundingClientRect();
    const sampleX = rect.left + rect.width / 2;
    const sampleY = rect.top + rect.height / 2;
    const elementBelow = document.elementFromPoint(sampleX, sampleY);

    textRef.current.style.pointerEvents = originalPointerEvents;

    if (!elementBelow) return;

    const bgColor = getEffectiveBackground(elementBelow);
    const brightness = getBrightness(bgColor);

    // Using white text for both cases in your original code.
    textRef.current.style.color = brightness > 128 ? '#fff' : '#fff';
  };

  // Observe changes to the custom cursor's class list to detect "elastic" state
  useEffect(() => {
    const cursorBg = document.querySelector('.custom-cursor-bg');
    if (!cursorBg) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsElastic(cursorBg.classList.contains('elastic'));
        }
      });
    });

    observer.observe(cursorBg, { attributes: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    window.addEventListener('pointermove', updateCursor);
    window.addEventListener('drag', updateCursor);
    window.addEventListener('dragover', updateCursor);
    document.addEventListener('mousemove', handleElementHover);

    return () => {
      window.removeEventListener('pointermove', updateCursor);
      window.removeEventListener('drag', updateCursor);
      window.removeEventListener('dragover', updateCursor);
      document.removeEventListener('mousemove', handleElementHover);
    };
  }, []);

  useEffect(() => {
    if (isHoveringWrapper && textRef.current) {
      updateTextColor();
    }
  }, [position, isHoveringWrapper]);

  return (
    <>
      <div
        className={`custom-cursor-bg ${isHoveringWrapper ? 'active' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      ></div>
      {isHoveringWrapper && (
        <div
          ref={textRef}
          className={`custom-cursor-text ${isHoveringWrapper ? 'active' : ''}`}
          style={{ left: `${position.x}px`, top: `${position.y}px` }}
        >
          DRAG
        </div>
      )}
      {isElastic && (
        <div
          className="custom-cursor-emoji"
          style={{ left: `${position.x}px`, top: `${position.y}px` }}
        >
          🌀
        </div>
      )}
    </>
  );
};

export default CustomCursor;
