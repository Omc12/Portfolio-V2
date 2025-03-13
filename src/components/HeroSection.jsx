import React from 'react';

const HeroSection = () => {
  return (
    <div className="Section1">
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
