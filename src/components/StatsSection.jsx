import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import FlowingMenu from './imports/FlowingMenu/FlowingMenu';
import FallingText from './imports/FallingText/FallingText';
import CountUp from './imports/Counter/Counter';
import useMousePosition from './imports/Mask/useMousePosition'; // Adjust path as needed

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
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 17 : 0; // Size in vw units
  const offsetX = 0;    // No horizontal offset
  const offsetY = -25;  // Moves mask circle upward (in vh units)

  // Convert mouse position to viewport units with offsets
  const maskX = (x / window.innerWidth * 100) - (size / 2) + offsetX;
  const maskY = (y / window.innerHeight * 100) - (size / 2) + offsetY;
  const maskSize = size;

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (section && content) {
      content.style.width = "200vw";
      const contentWidth = content.offsetWidth;
      
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
            snapTo: (progress) => {
              if (currentDirection > 0) {
                return progress < 0.13 ? 0 : 1;
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
            {/* Masked Paragraph */}
            <motion.div
              className="mask"
              animate={{
                WebkitMaskPosition: `${maskX}vw ${maskY}vh`, // Using vh for y-axis to move upward
                WebkitMaskSize: `${maskSize}vw`,
              }}
              transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
              style={{
                maskImage: "url('./src/assets/mask.svg')", // Ensure mask.svg is in public folder
                maskRepeat: "no-repeat",
                background: "#adff2f",
                position: "absolute",
                color: "black",
                width: "100%",
                height: "100%",
                zIndex: 10001,
              }}
            >
              <p
                id="dsPara"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                I've been coding for over <span>
                  <CountUp from={0} to={5} separator="," direction="up" duration={1} className="count-up-text" />
                </span>+ years. Last year, I made more than <span>
                  <CountUp from={0} to={350} separator="," direction="up" duration={1} className="count-up-text" />
                </span> commits, contributed to <span>
                  <CountUp from={0} to={5} separator="," direction="up" duration={1} className="count-up-text" />
                </span>+ repositories, boosted my efficiency by <span>
                  <CountUp from={0} to={32} separator="," direction="up" duration={1} className="count-up-text" />
                </span>% and took part in <span>
                  <CountUp from={0} to={5} separator="," direction="up" duration={1} className="count-up-text" />
                </span>+ hackathons.
              </p>
            </motion.div>
            {/* Original Paragraph */}
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