import React, { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import StatsSection from './StatsSection';
import ProjectsSection from './ProjectsSection';
import AccoladesSection from './AccoladesSection';
import ScrollProgress from './ScrollProgress'; // Import the new component
import './css/main.scss';
import CustomCursor from './CustomCursor';
import RevealLinks from './ContactSection';
import KnowMore from './KnowMore';
import AnimatedMenuHeader from './imports/TheButton/AnimatedMenu';
import Loader from './Loader';

// Import asset files from ProjectsSection and AccoladesSection
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

// List all asset sources in an array
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

const Main = () => {
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const totalImages = imageSources.length;

    imageSources.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setAssetsLoaded(true);
        }
      };
      // If an image fails to load, count it as loaded to avoid a hang-up.
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setAssetsLoaded(true);
        }
      };
    });
  }, []);

  if (!assetsLoaded) {
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  }

  return (
    <div className="main">
      <Loader />
      <AnimatedMenuHeader />
      <CustomCursor />
      <ScrollProgress />
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <ProjectsSection />
      <AccoladesSection />
      <RevealLinks />
      <KnowMore />
    </div>
  );
};

export default Main;
