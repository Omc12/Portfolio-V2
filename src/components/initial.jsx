import React from 'react';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import StatsSection from './StatsSection';
import ProjectsSection from './ProjectsSection';
import AccoladesSection from './AccoladesSection';
import ScrollProgress from './ScrollProgress'; // Import the new component
import './css/initial.css';
import CustomCursor from './CustomCursor';

const Main = () => {
  return (
    <div className="main">
      <CustomCursor />
      <ScrollProgress />
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <ProjectsSection />
      <AccoladesSection />
    </div>
  );
};

export default Main;