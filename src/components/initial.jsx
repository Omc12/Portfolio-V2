import React, { useState, useEffect, lazy, Suspense } from 'react';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
const StatsSection = lazy(() => import('./StatsSection'));
const ProjectsSection = lazy(() => import('./ProjectsSection'));
const AccoladesSection = lazy(() => import('./AccoladesSection'));
const KnowMore = lazy(() => import('./KnowMore'));
import ScrollProgress from './ScrollProgress';
import './css/main.scss';
import CustomCursor from './CustomCursor';
import RevealLinks from './ContactSection';
import AnimatedMenuHeader from './utils/TheButton/AnimatedMenu';
import Loader from './Loader';

// Prefetch optimized WebM videos for accolades (no visual change)
import officeWebm from '../assets/videos/officeMeme.webm';
import mergeWebm from '../assets/videos/mergeMeme.webm';
import drakeWebm from '../assets/videos/drakeMeme.webm';
import spongebobWebm from '../assets/videos/spongebobMeme.webm';
import jacksparrowWebm from '../assets/videos/jacksparrowMeme.webm';
import rickWebm from '../assets/videos/rickMeme.webm';
import shrekWebm from '../assets/videos/shrekMeme.webm';
import gotWebm from '../assets/videos/gotMeme.webm';
import baldWebm from '../assets/videos/baldMeme.webm';
import rockyWebm from '../assets/videos/rockyMeme.webm';
import zombieWebm from '../assets/videos/zombieMeme.webm';

const accoladesHeavy = [
  officeWebm,
  mergeWebm,
  drakeWebm,
  spongebobWebm,
  jacksparrowWebm,
  rickWebm,
  shrekWebm,
  gotWebm,
  baldWebm,
  rockyWebm,
  zombieWebm,
];

const Main = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!showContent) return;
    const startPrefetch = () => {
      accoladesHeavy.forEach(src => {
        const v = document.createElement('video');
        v.preload = 'auto';
        v.src = src;
        // Attempt to buffer then release element
        v.load?.();
        setTimeout(() => { try { v.src = ''; } catch {} }, 5000);
      });
    };
    if ('requestIdleCallback' in window) {
      // @ts-ignore
      requestIdleCallback(startPrefetch, { timeout: 2000 });
    } else {
      setTimeout(startPrefetch, 500);
    }
  }, [showContent]);

  // Idle prefetch for split chunks to avoid any choppiness
  useEffect(() => {
    const preload = () => {
      import('./StatsSection');
      import('./ProjectsSection');
      import('./AccoladesSection');
      import('./KnowMore');
    };
    if ('requestIdleCallback' in window) {
      // @ts-ignore
      requestIdleCallback(preload, { timeout: 2000 });
    } else {
      setTimeout(preload, 800);
    }
  }, []);

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
          <Suspense fallback={null}>
            <StatsSection />
          </Suspense>
          <Suspense fallback={null}>
            <ProjectsSection />
          </Suspense>
          <Suspense fallback={null}>
            <AccoladesSection />
          </Suspense>
          <RevealLinks />
          <Suspense fallback={null}>
            <KnowMore />
          </Suspense>
        </div>
      )}
    </>
  );
};

export default Main;
