import React, { useState, useEffect } from 'react';
import AccoladesSection from './AccoladesSection';
import FollowCursor from './imports/FollowCursor/FollowCursor';

// Map each accolade text to its corresponding GIF URL
const gifMapping = {
  "Ankush": "https://media.giphy.com/media/abc123/giphy.gif",
  "Dhruv": "https://media.giphy.com/media/def456/giphy.gif",
  "harshit": "https://media.giphy.com/media/ghi789/giphy.gif",
  "Yug": "https://media.giphy.com/media/jkl012/giphy.gif",
  "aarush": "https://media.giphy.com/media/mno345/giphy.gif",
  "s.Harshit": "https://media.giphy.com/media/pqr678/giphy.gif",
  "Ritesh": "https://media.giphy.com/media/stu901/giphy.gif",
  "Kushagra": "https://media.giphy.com/media/vwx234/giphy.gif",
  "rohan": "https://media.giphy.com/media/yza567/giphy.gif",
  "Yunus": "https://media.giphy.com/media/bcd890/giphy.gif",
  "Chethan": "https://media.giphy.com/media/efg123/giphy.gif",
};

const AccoladesWithGifs = () => {
  const [currentGif, setCurrentGif] = useState(null);

  useEffect(() => {
    // Use the ID from your unmodified AccoladesSection container
    const container = document.getElementById('AccoladesContainer');
    if (!container) return;

    // When mouse hovers over a <p> element, update the GIF
    const handleMouseOver = (e) => {
      if (e.target.tagName.toLowerCase() === 'p') {
        const text = e.target.textContent.trim();
        if (gifMapping[text]) {
          setCurrentGif(gifMapping[text]);
        }
      }
    };

    // When mouse leaves the <p> element, clear the GIF
    const handleMouseOut = (e) => {
      if (e.target.tagName.toLowerCase() === 'p') {
        setCurrentGif(null);
      }
    };

    container.addEventListener('mouseover', handleMouseOver);
    container.addEventListener('mouseout', handleMouseOut);

    return () => {
      container.removeEventListener('mouseover', handleMouseOver);
      container.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <AccoladesSection />
      {/* Render FollowCursor only when there is a GIF to show */}
      {currentGif && <FollowCursor gif={currentGif} />}
    </>
  );
};

export default AccoladesWithGifs;
