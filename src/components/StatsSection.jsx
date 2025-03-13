import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FlowingMenu from './imports/FlowingMenu/FlowingMenu';
import FallingText from './imports/FallingText/FallingText';
import CountUp from './imports/Counter/Counter';

gsap.registerPlugin(ScrollTrigger);

const demoItems = [
  { 
    text: 'tech stack', 
    images: [
      'HTML', 
      'CSS',
      'JAVASCRIPT',
      'REACT',
      'TAILWIND',
      'REACT 3 FIBER',
      'BOOTSTRAP',
      'THREE JS',
      'PYTHON',
      'MATLAB',
      'NUMPY',
      'GIT'
    ]
  },
  { 
    text: 'competitive programming', 
    images: [
      '150+ questions solved', 
      'leetcode rating: 1530',
      'active for 50+ days',
      'Acceptance rate: 75+%'
    ]
  },
  { 
    text: 'Creativity Stack', 
    images: [
      'Figma', 
      'Photoshop',
      'After Effects',
      'Premiere Pro',
      'Davinci Resolve',
      'Pen and Paper',
      'Blender'
    ]
  },
];

const StatsSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

useEffect(() => {
  const section = sectionRef.current;
  const content = contentRef.current;

  if (section && content) {
    // Set content width for horizontal scrolling.
    content.style.width = "200vw";
    const contentWidth = content.offsetWidth;
    
    // Track current scroll direction (1 for forward/down, -1 for backward/up)
    let currentDirection = 1;
    
    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        start: "top top",
        end: () => `+=${contentWidth}`,
        scrub: 1,
        anticipatePin: 1,
        snap: {
          // Use the currentDirection variable to set different thresholds.
          snapTo: (progress) => {
            if (currentDirection > 0) {
              return progress < 0.23 ? 0 : 1;
            } else {
              return progress < 0.93 ? 0 : 1;
            }
          },
          duration: 0.1,
          delay: 0,
          ease: "power2.out",
          inertia: false,
        },
        onEnter: () => {
          const cursorBg = document.querySelector('.custom-cursor-bg');
          if (cursorBg) cursorBg.classList.add('elastic');
        },
        onLeave: () => {
          document.body.style.overflow = '';
          const cursorBg = document.querySelector('.custom-cursor-bg');
          if (cursorBg) cursorBg.classList.remove('elastic');
        },
        onEnterBack: () => {
          const cursorBg = document.querySelector('.custom-cursor-bg');
          if (cursorBg) cursorBg.classList.add('elastic');
        },
        onLeaveBack: () => {
          document.body.style.overflow = '';
          const cursorBg = document.querySelector('.custom-cursor-bg');
          if (cursorBg) cursorBg.classList.remove('elastic');
        },
        onUpdate: (self) => {
          currentDirection = self.direction;
          if (self.progress > 0.3 && self.progress < 0.9) {
            document.body.style.overflow = 'hidden';
          } else {
            document.body.style.overflow = '';
          }
        },
      }
    }).to(content, {
      x: () => -(contentWidth - window.innerWidth),
      ease: "none"
    });
  }

  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, []);

  return (
    <div className="Section3" ref={sectionRef}>
      <h2 id="statsHead">stats</h2>
      <div className="horizontalContent" ref={contentRef}>
        <div className="flowingContainer">
          <FlowingMenu items={demoItems} />
        </div>
        <div className="DescriptiveStats">
          <div className="DescriptiveStatsSub">
            <p id="dsPara">
              Right now, I'm exploring fresh frameworks such as GSAP and Framer Motion.
              To date, I've resolved over <span>
                <CountUp from={0} to={200} separator="," direction="up" duration={1} className="count-up-text" />
              </span> bugs, produced <span>
                <CountUp from={0} to={100000} separator="," direction="up" duration={1} className="count-up-text" />
              </span>+ lines of code, and finished more than <span>
                <CountUp from={0} to={25} separator="," direction="up" duration={1} className="count-up-text" />
              </span> projects.
            </p>
            <FallingText
              text={`UI/UX DESIGN Web Development GSAP Framer Motion r3f 3js react tailwind pytorch bootstrap github leetcode`}
              highlightWords={[]}
              highlightClass="highlighted"
              trigger="hover"
              backgroundColor="transparent"
              wireframes={false}
              gravity={0.56}
              fontSize="2rem"
              mouseConstraintStiffness={0.9}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
