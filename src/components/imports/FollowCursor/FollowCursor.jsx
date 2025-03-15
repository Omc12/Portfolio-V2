import { useRef, useEffect, useState } from "react";
import { useSpring, animated, to } from "@react-spring/web";
import './FollowCursor.css';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};

const calcX = (y, containerCenterY, rotationFactor) => (y - containerCenterY) / rotationFactor;
const calcY = (x, containerCenterX, rotationFactor) => (x - containerCenterX) / rotationFactor;

const FollowCursor = ({
  gif,
  initialX,
  initialY,
  className = '',
  animationConfig = { mass: 5, tension: 350, friction: 40 },
  offsetXMobile = '0vw',
  offsetXTablet = '10vw',
  offsetXDesktop = '15vw',
  offsetYMobile = '5vh',
  offsetYTablet = '10vw',
  offsetYDesktop = '30vw',
  cardWidthMobile = '60vw',
  cardWidthTablet = '20vw',
  cardWidthDesktop = '18vw',
  cardHeightMobile = '32vw',
  cardHeightTablet = '12vw',
  cardHeightDesktop = '10vw',
  rotationFactor = 80,
  perspective = '300px',
  enableTilt = true,
}) => {
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);
  const hasAnimatedIn = useRef(false);
  const { width } = useWindowSize();

  const getResponsiveStyles = () => {
    if (width <= 768) {
      return { offsetX: offsetXMobile, offsetY: offsetYMobile, cardWidth: cardWidthMobile, cardHeight: cardHeightMobile };
    } else if (width <= 1024) {
      return { offsetX: offsetXTablet, offsetY: offsetYTablet, cardWidth: cardWidthTablet, cardHeight: cardHeightTablet };
    } else {
      return { offsetX: offsetXDesktop, offsetY: offsetYDesktop, cardWidth: cardWidthDesktop, cardHeight: cardHeightDesktop };
    }
  };

  const { offsetX, offsetY, cardWidth, cardHeight } = getResponsiveStyles();

  const [{ x, y, rotateX, rotateY, scale, opacity }, api] = useSpring(() => {
    const offsetXValue = parseFloat(offsetX) || 0;
    const offsetYValue = parseFloat(offsetY) || 0;
    const pixelOffsetX = (offsetXValue / 100) * window.innerWidth;
    const pixelOffsetY = (offsetYValue / 100) * window.innerHeight; // Use vh for Y-axis

    return {
      x: initialX + pixelOffsetX,
      y: initialY + pixelOffsetY,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      opacity: 0,
      config: animationConfig,
      immediate: true,
    };
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const container = containerRef.current;
      if (!container || !gif) return;

      const rect = container.getBoundingClientRect();
      const px = event.clientX - rect.left;
      const py = event.clientY - rect.top;

      const vwValue = parseFloat(cardWidth) || 18;
      const vhValue = parseFloat(cardHeight) || 10;
      const offsetXValue = parseFloat(offsetX) || 0;
      const offsetYValue = parseFloat(offsetY) || 0;

      const calculatedWidth = (vwValue / 100) * window.innerWidth;
      const calculatedHeight = (vhValue / 100) * window.innerHeight;
      const pixelOffsetX = (offsetXValue / 100) * window.innerWidth;
      const pixelOffsetY = (offsetYValue / 100) * window.innerHeight;

      const halfCardWidth = calculatedWidth / 2;
      const halfCardHeight = calculatedHeight / 2;
      const minX = halfCardWidth;
      const maxX = rect.width - halfCardWidth;
      const minY = halfCardHeight;
      const maxY = rect.height - halfCardHeight;

      const clampedX = Math.min(Math.max(px + pixelOffsetX - rect.width / 2, minX), maxX);
      const clampedY = Math.min(Math.max(py + pixelOffsetY - rect.height / 2, minY), maxY);

      api.start({
        x: clampedX,
        y: clampedY,
        rotateX: enableTilt ? calcX(event.clientY, rect.top + rect.height / 2, rotationFactor) : 0,
        rotateY: enableTilt ? calcY(event.clientX, rect.left + rect.width / 2, rotationFactor) : 0,
        scale: 1.1,
        immediate: false,
      });

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        api.start({ rotateX: 0, rotateY: 0, immediate: false });
      }, 100);
    };

    const handleTouchMove = (event) => {
      const touch = event.touches[0];
      handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
    };

    if (gif && !hasAnimatedIn.current) {
      api.start({ opacity: 1, immediate: false });
      hasAnimatedIn.current = true;
    } else if (!gif && hasAnimatedIn.current) {
      api.start({ opacity: 0, immediate: false });
      hasAnimatedIn.current = false;
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove); // Add touch support
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [api, gif, offsetX, offsetY, cardWidth, cardHeight, rotationFactor, enableTilt, initialX, initialY]);

  return (
    <div className={`follow-cursor-container ${className}`} ref={containerRef}>
      <animated.div
        className="card"
        style={{
          width: cardWidth,
          height: cardHeight,
          transform: to(
            [x, y, rotateX, rotateY, scale],
            (xVal, yVal, rx, ry, s) =>
              `perspective(${perspective}) translate(${xVal}px, ${yVal}px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${s})`
          ),
          backgroundImage: gif ? `url(${gif})` : 'none',
          opacity,
        }}
      />
    </div>
  );
};

export default FollowCursor;