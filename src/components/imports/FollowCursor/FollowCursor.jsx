import { useRef, useEffect } from "react";
import { useSpring, animated, to } from "@react-spring/web";
import './FollowCursor.css';

const calcX = (y, containerCenterY, rotationFactor) => (y - containerCenterY) / rotationFactor;
const calcY = (x, containerCenterX, rotationFactor) => (x - containerCenterX) / rotationFactor;

const FollowCursor = ({
  gif,
  initialX,
  initialY,
  className = '',
  animationConfig = { mass: 5, tension: 350, friction: 40 },
  offsetX = '20vw', // Default in vw
  offsetY = '15vw', // Default in vw
  cardWidth = '18vw',
  cardHeight = '10vw',
  rotationFactor = 80,
  perspective = '300px',
  enableTilt = true,
}) => {
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);
  const hasAnimatedIn = useRef(false);
  const [{ x, y, rotateX, rotateY, scale, opacity }, api] = useSpring(() => {
    const offsetXValue = parseFloat(offsetX) || 20;
    const offsetYValue = parseFloat(offsetY) || 15;
    const pixelOffsetX = (offsetXValue / 100) * window.innerWidth;
    const pixelOffsetY = (offsetYValue / 100) * window.innerWidth;

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
      const containerCenterX = rect.left + rect.width / 2;
      const containerCenterY = rect.top + rect.height / 2;

      const px = event.clientX;
      const py = event.clientY;

      const xPos = px - containerCenterX;
      const yPos = py - containerCenterY;

      const vwValue = parseFloat(cardWidth) || 18;
      const offsetXValue = parseFloat(offsetX) || 20;
      const offsetYValue = parseFloat(offsetY) || 15;

      const calculatedWidth = (vwValue / 100) * window.innerWidth;
      const pixelOffsetX = (offsetXValue / 100) * window.innerWidth;
      const pixelOffsetY = (offsetYValue / 100) * window.innerWidth;
      const calculatedOffset = calculatedWidth / 2 + pixelOffsetX;

      api.start({
        x: xPos + calculatedOffset,
        y: yPos + pixelOffsetY,
        rotateX: enableTilt ? calcX(py, containerCenterY, rotationFactor) : 0,
        rotateY: enableTilt ? calcY(px, containerCenterX, rotationFactor) : 0,
        scale: 1.1,
        immediate: false,
      });

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        api.start({
          rotateX: 0,
          rotateY: 0,
          immediate: false,
        });
      }, 100);
    };

    if (gif && !hasAnimatedIn.current) {
      api.start({ opacity: 1, immediate: false });
      hasAnimatedIn.current = true;
    } else if (!gif && hasAnimatedIn.current) {
      api.start({ opacity: 0, immediate: false });
      hasAnimatedIn.current = false;
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
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