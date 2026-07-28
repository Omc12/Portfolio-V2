import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import FlowingMenu from './utils/FlowingMenu/FlowingMenu';
import FallingText from './utils/FallingText/FallingText';
import CountUp from './utils/Counter/Counter';
import useMousePosition from './utils/Mask/useMousePosition';
import CircularText from './utils/CircularText/CircularText';
  


gsap.registerPlugin(ScrollTrigger);

const demoItems = [
  { 
    text: 'tech stack', 
    images: [
      'PYTORCH', 
      'CUDA',
      'TRITON',
      'MLX',
      'GGML',
      'PYTHON',
      'C++',
      'FASTAPI',
      'GIT',
      'VECTOR DBS'
    ]
  },
  { 
    text: 'competitive programming', 
    images: [
      '350+ questions solved', 
      'leetcode rating: 1750+',
      'gpa: 8.1 / 10.0',
      '3rd year B.Tech AI'
    ]
  },
  { 
    text: 'Machine Learning & Systems', 
    images: [
      'SVD FACTORIZATION',
      'KV-CACHE COMPRESSION',
      'CUSTOM ATTENTION KERNELS',
      'LLM INFERENCE',
      'RAG ARCHITECTURES',
      'QUANTIZATION',
      'BENCHMARK DESIGN',
      'NUMPY',
      'PANDAS',
      'PYTORCH'
    ]
  },
];

const StatsSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 17 : 0; // Size in vw units
  const offsetX = window.innerWidth < 1024 ? 5 : 0;    // No horizontal offset
  const offsetY = window.innerWidth < 1024 ? -13 : -25;
  // Moves mask circle upward (in vh units)

  // Convert mouse position to viewport units with offsets
  const maskX = (x / window.innerWidth * 100) - (size / 2) + offsetX;
  const maskY = (y / window.innerHeight * 100) - (size / 2) + offsetY;
  const maskSize = size;

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    // Create a matchMedia instance to handle responsive behavior
    const mm = gsap.matchMedia();

    // On larger screens: set up the horizontal scroll animation
    mm.add("(min-width: 1025px)", () => {
      // Set a wide width so that we have extra horizontal space
      content.style.width = "200vw";
      // Reset any display properties (if set by tablet styles)
      content.style.display = "";
      const contentWidth = content.offsetWidth;
      let currentDirection = 1;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: "top top",
          end: () => `+=${contentWidth}`,
          scrub: 1,
          anticipatePin: 1,
          snap: {
            snapTo: (progress) => {
              return currentDirection > 0 
                ? progress < 0.23 ? 0 : 1 
                : progress < 0.93 ? 0 : 1;
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
            if (self.progress > 0.2 && self.progress < 0.93) {
              document.body.style.overflow = 'hidden';
            } else {
              document.body.style.overflow = '';
            }
          },
        }
      });

      timeline.to(content, {
        x: () => -(contentWidth - window.innerWidth),
        ease: "none"
      });
    });

    // On tablet and smaller screens: stack sections vertically
    mm.add("(max-width: 1024px)", () => {
      // Reset width and remove horizontal layout
      content.style.width = "100%";
      // Set display to block (or you could use flex-direction: column in your CSS)
      content.style.display = "block";

      // Optionally, if your horizontal layout was using inline-block or flex for children,
      // make sure they stack vertically:
      Array.from(content.children).forEach(child => {
        child.style.width = "100%";
        // You can also add margin or padding here if needed to separate the sections
      });
    });

    // Cleanup on component unmount
    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="Section3" ref={sectionRef}>
      <h2 id="statsHead">stats</h2>
      <div className='touchText'>
        <CircularText
          text="TOUCH•TOUCH•TOUCH•"
          onHover="speedUp"
          spinDuration={20}
          className="custom-class"
        />
      </div>
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
                WebkitMaskPosition: `${maskX}vw ${maskY}vh`,
                WebkitMaskSize: `${maskSize}vw`,
              }}
              transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
              style={{
                maskImage: "url('/mask.svg')", // Updated path
                WebkitMaskImage: "url('/mask.svg')", // Add Webkit prefix for consistency
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                background: "#7FFF00",
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
                Author of <span>
                  <CountUp from={0} to={2} separator="," direction="up" duration={1} className="count-up-text" />
                </span> published research papers & technical reports. Built <span>
                  <CountUp from={0} to={10} separator="," direction="up" duration={1} className="count-up-text" />
                </span>+ ML & LLM projects, solved <span>
                  <CountUp from={0} to={350} separator="," direction="up" duration={1} className="count-up-text" />
                </span>+ LeetCode problems (Rating 1750+), maintaining 8.1 GPA as a 3rd-year B.Tech AI student.
              </p>
            </motion.div>
            {/* Original Paragraph */}
            <p id="dsPara">
              3rd-year B.Tech AI student focused on LLM Inference Optimization, KV-Cache Compression, and RAG Systems.
              Published <span>
                <CountUp from={0} to={2} separator="," direction="up" duration={1} className="count-up-text" />
              </span> research papers, engineered <span>
                <CountUp from={0} to={4} separator="," direction="up" duration={1} className="count-up-text" />
              </span> custom attention kernel backends (CUDA, Triton, MLX, GGML), and solved <span>
                <CountUp from={0} to={350} separator="," direction="up" duration={1} className="count-up-text" />
              </span>+ LeetCode problems.
            </p>
            <FallingText
              text={`PyTorch CUDA Triton MLX GGML SVD LLM-Inference Quantization RAG FastAPI Python C++ VectorDBs LeetCode1750+ NumPy Pandas Sklearn`}
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
