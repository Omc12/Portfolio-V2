import React from 'react';
import ScrollVelocitySingle from "./utils/ScrollVelocity/ScrollVelocity";

const HeroSection = () => {
  return (
    <div className="Section1">
      <div className='VelocityLong'>
        <ScrollVelocitySingle 
          text="Om Chimurkar • ML & Systems • AI Research •" 
          velocity={100} 
          className="custom-scroll-text" 
        />
      </div>
      <div className='VelocityShort'>
        <ScrollVelocitySingle 
          text="* 3rd Year B.Tech AI" 
          velocity={100} 
          className="custom-scroll-text" 
        />
      </div>
      <div className="heroTextMain">
        <h3 id="heroText">better.</h3>
      </div>
      <div className="heroNegative"></div>
      <div className="heroTextFiller">
        <p id="heroScroll">Scroll to Explore<div></div></p>
        <p id="heroFillerText">
          Architecting <span>ML Systems & LLM Inference</span> runtimes, compressing long contexts, and building high-performance deep learning kernels.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
