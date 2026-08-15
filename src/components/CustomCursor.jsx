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
  const [isHoveringBackToTop, setIsHoveringBackToTop] = useState(false);
  const [isElastic, setIsElastic] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [isFocused, setIsFocused] = useState(document.hasFocus());

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
      cursorBg.style.display = 'flex';
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
    const target = e?.target;
    if (!target) return;
    const isMenu = target.closest('.menu-cursor') !== null;
    const isWrapper = target.closest('.wrapper') !== null;
    const isDsPara = target.closest('#dsPara') !== null;
    const isResume = target.closest('.resumeDownloadBtn') !== null;
    const isKnowMore = target.closest('.clickableKnowMore, .section7Sub') !== null;
    const isBackToTop = target.closest('.backToTopBtn, #heroScroll, [href="#top"]') !== null;
    const isLink = !isResume && !isKnowMore && !isWrapper && !isBackToTop && target.closest('a, button, .FlipLink, .menu__item-link') !== null;

    setIsHoveringMenu(isMenu);
    setIsHoveringWrapper(isWrapper);
    setIsHoveringDsPara(isDsPara);
    setIsHoveringResume(isResume);
    setIsHoveringKnowMore(isKnowMore);
    setIsHoveringBackToTop(isBackToTop);
    setIsHoveringLink(isLink);
  };

  // Re-evaluate element under cursor when scrolling so hover effect turns off automatically when element scrolls off
  useEffect(() => {
    const handleScroll = () => {
      if (hasMoved) {
        const elem = document.elementFromPoint(position.x, position.y);
        if (elem) {
          handleElementHover({ target: elem });
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [position, hasMoved]);

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

  const renderCursorIcon = () => {
    if (isHoveringBackToTop) {
      return (
        <svg className="cursor-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
      );
    }
    if (isHoveringResume) {
      return (
        <svg className="cursor-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7FFF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="12" y1="18" x2="12" y2="12"/>
          <polyline points="9 15 12 18 15 15"/>
        </svg>
      );
    }
    if (isHoveringKnowMore) {
      return (
        <svg className="cursor-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7FFF00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="7" y1="17" x2="17" y2="7"/>
          <polyline points="7 7 17 7 17 17"/>
        </svg>
      );
    }
    if (isHoveringLink) {
      return (
        <svg className="cursor-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15 3 21 3 21 9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
      );
    }
    if (isHoveringWrapper) {
      return (
        <svg className="cursor-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 11V6a2 2 0 0 0-4 0v4M14 10V4a2 2 0 0 0-4 0v6M10 10.5V2a2 2 0 0 0-4 0v9M6 11.5V7a2 2 0 0 0-4 0v8.5a7 7 0 0 0 7 7h4a7 7 0 0 0 7-7v-4.5a2 2 0 0 0-4 0"/>
        </svg>
      );
    }
    return null;
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
          ${!isHoveringMenu && isHoveringBackToTop ? 'top-hover' : ''}
          ${isHoveringDsPara ? 'vanish' : ''}`}
        style={{
          left: hasMoved ? `${position.x}px` : '50vw',
          top: hasMoved ? `${position.y}px` : '50vh',
        }}
      >
        {renderCursorIcon()}
      </div>
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