import React from 'react';
import { gsap } from 'gsap';
import './FlowingMenu.css';

function FlowingMenu({ items = [] }) {
  return (
    <div className="menu-wrap">
      <nav className="menu">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({ text, images }) {
  const itemRef = React.useRef(null);
  const marqueeRef = React.useRef(null);
  const marqueeInnerRef = React.useRef(null);

  // Compute a content array from the images array.
  // Each entry is an object with type 'image' or 'text' based on its value.
  const [marqueeContent, setMarqueeContent] = React.useState([]);

  React.useEffect(() => {
    const updateMarqueeContent = () => {
      if (itemRef.current) {
        const containerWidth = itemRef.current.getBoundingClientRect().width;
        const elementWidth = 200; // fixed width for each element (should match CSS)
        // Build base content from the images array.
        // If an entry starts with 'http', treat it as an image; otherwise, as text.
        const baseContent = images.map(item =>
          item.startsWith('http')
            ? { type: 'image', value: item }
            : { type: 'text', value: item }
        );
        // Calculate needed items based on container width, but ensure it's at least all items
        const numNeeded = Math.max(Math.ceil(containerWidth / elementWidth), baseContent.length);
        const newContent = [];
        for (let i = 0; i < numNeeded; i++) {
          newContent.push(baseContent[i % baseContent.length]);
        }
        setMarqueeContent(newContent);
      }
    };
    

    updateMarqueeContent();
    window.addEventListener('resize', updateMarqueeContent);
    return () => window.removeEventListener('resize', updateMarqueeContent);
  }, [images]);

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const distMetric = (x, y, x2, y2) => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  const handleMouseEnter = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap.timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const handleMouseLeave = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap.timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  // Duplicate the computed content so that the marquee spans 200% of the container.
  const repeatedMarqueeContent = [...marqueeContent, ...marqueeContent].map((item, idx) => {
    if (item.type === 'image') {
      return (
        <div
          key={idx}
          className="marquee__img"
          style={{ backgroundImage: `url(${item.value})` }}
        />
      );
    } else if (item.type === 'text') {
      return (
        <span key={idx} className="marquee__text">
          {item.value}
        </span>
      );
    }
    return null;
  });

  return (
    <div className="menu__item" ref={itemRef}>
      <div
        className="menu__item-link"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </div>
      <div className="marquee" ref={marqueeRef}>
        <div className="marquee__inner-wrap" ref={marqueeInnerRef}>
          <div className="marquee__inner" aria-hidden="true">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowingMenu;
