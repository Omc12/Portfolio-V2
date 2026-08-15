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
  const [isHoveringMenu, setIsHoveringMenu] = useState(false);
  const [isHoveringResume, setIsHoveringResume] = useState(false);
  const [isHoveringKnowMore, setIsHoveringKnowMore] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
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

    const accoladesSection = document.querySelector('.Section5');
    if (accoladesSection) {
      const rect = accoladesSection.getBoundingClientRect();
      const isInAccolades =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      setIsHoveringAccolades(isInAccolades);
    }
  };

  const handleElementHover = (e) => {
    const target = e.target;
    if (!target) return;
    const isMenu = target.closest('.menu-cursor') !== null;
    const isWrapper = target.closest('.wrapper') !== null;
    const isDsPara = target.closest('#dsPara') !== null;
    const isResume = target.closest('.resumeDownloadBtn') !== null;
    const isKnowMore = target.closest('.clickableKnowMore') !== null;
    const isLink = !isResume && !isKnowMore && !isWrapper && target.closest('a, button, .FlipLink') !== null;

    setIsHoveringMenu(isMenu);
    setIsHoveringWrapper(isWrapper);
    setIsHoveringDsPara(isDsPara);
    setIsHoveringResume(isResume);
    setIsHoveringKnowMore(isKnowMore);
    setIsHoveringLink(isLink);
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
    textRef.current.style.color = brightness > 128 ? '#000' : '#fff';
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
    if ((isHoveringWrapper || isHoveringAccolades || isHoveringResume || isHoveringKnowMore || isHoveringLink) && textRef.current) {
      updateTextColor();
    }
  }, [position, isHoveringWrapper, isHoveringAccolades, isHoveringResume, isHoveringKnowMore, isHoveringLink]);

  const isInteractive = isHoveringWrapper || isHoveringAccolades || isHoveringResume || isHoveringKnowMore || isHoveringLink;

  const getCursorText = () => {
    if (isHoveringResume) return 'CV 📄';
    if (isHoveringKnowMore) return 'LINKEDIN ↗';
    if (isHoveringLink) return 'OPEN ↗';
    if (isHoveringAccolades) return 'HOVER';
    if (isHoveringWrapper) return 'DRAG';
    return '';
  };

  return (
    <>
      <div
        className={`custom-cursor-bg 
          ${isHoveringMenu ? 'normal' : ''} 
          ${!isHoveringMenu && isHoveringWrapper ? 'active' : ''} 
          ${!isHoveringMenu && isHoveringAccolades ? 'accolades-hover' : ''}
          ${!isHoveringMenu && isHoveringResume ? 'resume-hover' : ''}
          ${!isHoveringMenu && isHoveringKnowMore ? 'knowmore-hover' : ''}
          ${!isHoveringMenu && isHoveringLink ? 'link-hover' : ''}
          ${isHoveringDsPara ? 'vanish' : ''}`}
        style={{
          left: hasMoved ? `${position.x}px` : '50vw',
          top: hasMoved ? `${position.y}px` : '50vh',
        }}
      ></div>
      {isInteractive && !isHoveringMenu && isFocused && (
        <div
          ref={textRef}
          className={`custom-cursor-text 
            ${isHoveringWrapper ? 'active' : ''} 
            ${isHoveringAccolades ? 'accolades-hover' : ''}
            ${isHoveringResume ? 'resume-hover' : ''}
            ${isHoveringKnowMore ? 'knowmore-hover' : ''}
            ${isHoveringLink ? 'link-hover' : ''}`}
          style={{ 
            left: hasMoved ? `${position.x}px` : '50vw', 
            top: hasMoved ? `${position.y}px` : '50vh' 
          }}
        >
          {getCursorText()}
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