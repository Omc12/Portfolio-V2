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
    const isLink = !isResume && !isKnowMore && target.closest('a, button, .FlipLink, .menu__item-link') !== null;

    setIsHoveringMenu(isMenu);
    setIsHoveringWrapper(isWrapper);
    setIsHoveringDsPara(isDsPara);
    setIsHoveringResume(isResume);
    setIsHoveringKnowMore(isKnowMore);
    setIsHoveringLink(isLink);
  };

  const isInteractive = isHoveringWrapper || isHoveringAccolades || isHoveringResume || isHoveringKnowMore || isHoveringLink;

  const getCursorText = () => {
    if (isHoveringResume) return 'GET CV';
    if (isHoveringKnowMore) return 'LINKEDIN ↗';
    if (isHoveringLink) return 'CLICK ↗';
    if (isHoveringWrapper) return 'DRAG / VISIT';
    if (isHoveringAccolades) return 'HOVER 🎬';
    return '';
  };

  return (
    <>
      <div
        className={`custom-cursor-bg 
          ${isHoveringMenu ? 'normal' : ''} 
          ${!isHoveringMenu && isInteractive ? 'active' : ''} 
          ${isHoveringDsPara ? 'vanish' : ''}`}
        style={{
          left: hasMoved ? `${position.x}px` : '50vw',
          top: hasMoved ? `${position.y}px` : '50vh',
        }}
      ></div>
      {!isHoveringMenu && isInteractive && isFocused && (
        <div
          ref={textRef}
          className="custom-cursor-text active"
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