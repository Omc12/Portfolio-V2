import React, { useState, useEffect, useRef } from 'react';
import './css/CustomCursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHoveringWrapper, setIsHoveringWrapper] = useState(false);
  const [isHoveringDsPara, setIsHoveringDsPara] = useState(false);
  const [isElastic, setIsElastic] = useState(false);
  const textRef = useRef(null);

  // Update cursor position and mask position for dsPara
  const updateCursor = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });

    if (isHoveringDsPara) {
      const dsPara = document.getElementById('dsPara');
      if (dsPara) {
        const rect = dsPara.getBoundingClientRect();
        const relativeX = e.clientX - rect.left;
        const relativeY = e.clientY - rect.top;
        dsPara.style.setProperty('--mask-x', `${relativeX}px`);
        dsPara.style.setProperty('--mask-y', `${relativeY}px`);
      }
    }
  };

  // Check if cursor is over a .wrapper or #dsPara element
  const handleElementHover = (e) => {
    const isWrapper = e.target.closest('.wrapper') !== null;
    const isDsPara = e.target.closest('#dsPara') !== null;
    setIsHoveringWrapper(isWrapper);
    setIsHoveringDsPara(isDsPara);
  };

  // Compute brightness (unchanged)
  const getBrightness = (rgb) => {
    const result = rgb.match(/\d+/g);
    if (result && result.length >= 3) {
      const [r, g, b] = result.map(Number);
      return 0.299 * r + 0.587 * g + 0.114 * b;
    }
    return 255;
  };

  const getEffectiveBackground = (elem) => {
    let bg = window.getComputedStyle(elem).backgroundColor;
    while ((bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') && elem.parentElement) {
      elem = elem.parentElement;
      bg = window.getComputedStyle(elem).backgroundColor;
    }
    return bg;
  };

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
    textRef.current.style.color = brightness > 128 ? '#fff' : '#fff';
  };

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
        className={`custom-cursor-bg ${isHoveringWrapper ? 'active' : ''} ${isHoveringDsPara ? 'big-circle' : ''}`}
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
          🚀
        </div>
      )}
    </>
  );
};

export default CustomCursor;