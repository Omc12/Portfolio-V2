import React, { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import StatsSection from './StatsSection';
import ProjectsSection from './ProjectsSection';
import AccoladesSection from './AccoladesSection';
import ScrollProgress from './ScrollProgress';
import './css/main.scss';
import CustomCursor from './CustomCursor';
import RevealLinks from './ContactSection';
import KnowMore from './KnowMore';
import AnimatedMenuHeader from './utils/TheButton/AnimatedMenu';
import Loader from './Loader';

// Lazy accolades GIF prefetch (keeping original assets, converting to video will be separate step)
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

const accoladesHeavy = [
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
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!showContent) return;
    const startPrefetch = () => {
      accoladesHeavy.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };
    if ('requestIdleCallback' in window) {
      // @ts-ignore
      requestIdleCallback(startPrefetch, { timeout: 2000 });
    } else {
      setTimeout(startPrefetch, 500);
    }
  }, [showContent]);

  return (
    <>
  {!showContent && <Loader onLoaded={() => setShowContent(true)} />}
  {showContent && (
        <div className="main">
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
      )}
    </>
  );
};

export default Main;
