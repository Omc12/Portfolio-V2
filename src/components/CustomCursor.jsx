// CustomCursor.js
import React, { useState, useEffect, useRef } from 'react';
import './css/CustomCursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ 
    x: window.innerWidth / 2, 
    y: window.innerHeight / 2 
  });
  const [isHoveringWrapper, setIsHoveringWrapper] = useState(false);
  const [isHoveringDsPara, setIsHoveringDsPara] = useState(false);
  const [isHoveringAccolades, setIsHoveringAccolades] = useState(false);
  const [isElastic, setIsElastic] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [isFocused, setIsFocused] = useState(document.hasFocus());
  const textRef = useRef(null);

  useEffect(() => {
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  useEffect(() => {
    const cursorBg = document.querySelector('.custom-cursor-bg');
    if (!cursorBg) return;

    if (isFocused) {
      cursorBg.style.display = 'block';
      cursorBg.classList.add('entrance');
      cursorBg.classList.remove('exit');
    } else {
      cursorBg.classList.add('exit');
      cursorBg.classList.remove('entrance');
      const handleAnimationEnd = () => {
        if (!isFocused) {
          cursorBg.style.display = 'none';
        }
        cursorBg.classList.remove('entrance', 'exit');
      };
      cursorBg.addEventListener('animationend', handleAnimationEnd);
      return () => cursorBg.removeEventListener('animationend', handleAnimationEnd);
    }
  }, [isFocused]);

  const updateCursor = (e) => {
    setHasMoved(true);
    setPosition({ x: e.clientX, y: e.clientY });

    // Check accolades section
    const accoladesSection = document.querySelector('.Section5');
    if (accoladesSection) {
      const rect = accoladesSection.getBoundingClientRect();
      const isInAccolades = e.clientX >= rect.left && 
                          e.clientX <= rect.right && 
                          e.clientY >= rect.top && 
                          e.clientY <= rect.bottom;
      setIsHoveringAccolades(isInAccolades);
    }

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

  const handleElementHover = (e) => {
    const isWrapper = e.target.closest('.wrapper') !== null;
    const isDsPara = e.target.closest('#dsPara') !== null;
    setIsHoveringWrapper(isWrapper);
    setIsHoveringDsPara(isDsPara);
  };

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
  }, [isHoveringDsPara]);

  useEffect(() => {
    if ((isHoveringWrapper || isHoveringAccolades) && textRef.current) {
      updateTextColor();
    }
  }, [position, isHoveringWrapper, isHoveringAccolades]);

  return (
    <>
      <div
        className={`custom-cursor-bg 
          ${isHoveringWrapper ? 'active' : ''} 
          ${isHoveringDsPara ? 'big-circle' : ''} 
          ${isHoveringAccolades ? 'accolades-hover' : ''}`}
        style={{
          left: hasMoved ? `${position.x}px` : '50vw',
          top: hasMoved ? `${position.y}px` : '50vh',
          WebkitMaskImage: isHoveringDsPara ? "url('../assets/mask.svg')" : "none",
          maskImage: isHoveringDsPara ? "url('/mask.svg')" : "none",
          WebkitMaskSize: isHoveringDsPara ? "cover" : "auto",
          maskSize: isHoveringDsPara ? "cover" : "auto",
        }}
      ></div>
      {(isHoveringWrapper || isHoveringAccolades) && isFocused && (
        <div
          ref={textRef}
          className={`custom-cursor-text 
            ${isHoveringWrapper ? 'active' : ''} 
            ${isHoveringAccolades ? 'accolades-hover' : ''}`}
          style={{ 
            left: hasMoved ? `${position.x}px` : '50vw', 
            top: hasMoved ? `${position.y}px` : '50vh' 
          }}
        >
          {isHoveringAccolades ? 'HOVER' : 'DRAG'}
        </div>
      )}
      {isElastic && isFocused && (
        <div
          className="custom-cursor-emoji"
          style={{ 
            left: hasMoved ? `${position.x}px` : '50vw', 
            top: hasMoved ? `${position.y}px` : '50vh' 
          }}
        >
          🚀
        </div>
      )}
    </>
  );
};

export default CustomCursor;