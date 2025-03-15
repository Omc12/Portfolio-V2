import React from 'react';
import ScrollVelocitySingle from "./imports/ScrollVelocity/ScrollVelocity";

const HeroSection = () => {
  return (
    <div className="Section1">
      <div className='confi'></div>
      <div className='VelocityLong'>
        <ScrollVelocitySingle 
          text="Om Chimurkar •" 
          velocity={100} 
          className="custom-scroll-text" 
        />
      </div>
      <div className='VelocityShort'>
        <ScrollVelocitySingle 
          text="*Classified" 
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
          Not your typical code slinger: while others turn <span>coffee into code</span>, I torch every line until it bursts into the ultimate espresso shot!
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
