// AccoladesSection.js
import React, { useState, useRef } from 'react';
import FollowCursor from './imports/FollowCursor/FollowCursor';

// Import local GIFs
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

const gifMap = {
  'ankush': ankushGif,
  'dhruv': dhruvGif,
  'harshit': harshitGif,
  'yug': yugGif,
  'aarush': aarushGif,
  's.harshit': sHarshitGif,
  'ritesh': riteshGif,
  'kushagra': kushagraGif,
  'rohan': rohanGif,
  'yunus': yunusGif,
  'chethan': chethanGif,
};

const accoladesData = [
  { id: 'ac1', name: 'Ankush' },
  { id: 'ac2', name: 'Dhruv' },
  { id: 'ac3', name: 'harshit' },
  { id: 'ac4', name: 'Yug' },
  { id: 'ac5', name: 'aarush' },
  { id: 'ac6', name: 's.Harshit' },
  { id: 'ac7', name: 'Ritesh' },
  { id: 'ac8', name: 'Kushagra' },
  { id: 'ac9', name: 'rohan' },
  { id: 'ac10', name: 'Yunus' },
  { id: 'ac11', name: 'Chethan' },
];

const AccoladesSection = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const containerRef = useRef(null);

  return (
    <div className="Section5">
      <h2 id="AccoladesHead">Accolades</h2>
      <div id="AccoladesContainer" ref={containerRef}>
        {accoladesData.map((accolade) => (
          <p
            key={accolade.id}
            id={accolade.id}
            onMouseEnter={(e) => {
              const rect = e.target.getBoundingClientRect();
              setHoveredItem({
                name: accolade.name.toLowerCase(),
                initialX: rect.left + rect.width / 2,
                initialY: rect.top + rect.height / 2,
              });
            }}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {accolade.name}
          </p>
        ))}
        <FollowCursor
          gif={hoveredItem ? gifMap[hoveredItem.name] : null}
          initialX={hoveredItem ? hoveredItem.initialX : 0}
          initialY={hoveredItem ? hoveredItem.initialY : 0}
          offsetX="33vw"
          offsetY="18vw"
          cardWidth="18vw"
          cardHeight="10vw"
          rotationFactor={80}
          enableTilt={true}
          animationConfig={{ mass: 5, tension: 350, friction: 40 }}
          className="follow-cursor-gif"
        />
      </div>
    </div>
  );
};

export default AccoladesSection;