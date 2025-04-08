import React, { useEffect, useState } from 'react';
import './css/loader.scss';

// Image assets to preload
import NN from '../assets/NeuralNetworks.png';
import ankushGif from '../assets/officeMeme.gif';
import dhruvGif from '../assets/mergeMeme.gif';
import harshitGif from '../assets/drakeMeme.gif';
import yugGif from '../assets/spongebobMeme.gif';
import aarushGif from '../assets/jacksparrowMeme.gif';
import sHarshitGif from '../assets/rickMeme.gif';
import riteshGif from '../assets/shrekMeme.gif';
import kushagraGif from '../assets/gotMeme.gif';
import rohanGif from '../assets/baldMeme.gif';
import yunusGif from '../assets/rockyMeme.gif';
import chethanGif from '../assets/zombieMeme.gif';

const imageSources = [
  NN,
  ankushGif,
  dhruvGif,
  harshitGif,
  yugGif,
  aarushGif,
  sHarshitGif,
  riteshGif,
  kushagraGif,
  rohanGif,
  yunusGif,
  chethanGif,
];

const Loader = ({ onLoaded }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let loadedCount = 0;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === imageSources.length) {
        setTimeout(() => {
          setLoading(false);
          if (onLoaded) onLoaded();
        }, 500); // optional slight delay
      }
    };

    imageSources.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = checkAllLoaded;
    });
  }, [onLoaded]);

  if (!loading) return null;

  return <div className="loader-animated" />;
};

export default Loader;
