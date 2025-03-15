import React from 'react';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import StatsSection from './StatsSection';
import ProjectsSection from './ProjectsSection';
import AccoladesSection from './AccoladesSection';
import ScrollProgress from './ScrollProgress'; // Import the new component
import './css/initial.css';
import CustomCursor from './CustomCursor';
import RevealLinks from './ContactSection';
import KnowMore from './KnowMore';
import AnimatedMenuHeader from './imports/TheButton/AnimatedMenu';

const Main = () => {
  return (
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
  );
};

export default Main;