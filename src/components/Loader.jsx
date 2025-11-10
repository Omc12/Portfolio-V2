import React, { useEffect, useState } from 'react';
import './css/loader.scss';
import NN from '../assets/NeuralNetworks.png';

// Only preload a minimal critical set (e.g. hero/project preview); heavy accolades assets will be prefetched later
const criticalImages = [NN];

const Loader = ({ onLoaded }) => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    let loaded = 0;
    const total = criticalImages.length;
    if (total === 0) {
      setDone(true);
      onLoaded && onLoaded();
      return;
    }
    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded === total) {
          // Slight delay keeps visual parity
          setTimeout(() => {
            setDone(true);
            onLoaded && onLoaded();
          }, 300);
        }
      };
    });
  }, [onLoaded]);

  if (done) return null;
  return <div className="loader-animated" />;
};

export default Loader;
