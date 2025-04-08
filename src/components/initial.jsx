import React, { useState } from 'react';
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
import AnimatedMenuHeader from './imports/TheButton/AnimatedMenu';
import Loader from './Loader';

const Main = () => {
  const [showContent, setShowContent] = useState(false);

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
