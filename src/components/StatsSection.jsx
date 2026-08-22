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
      'CUDA / TRITON',
      'HUGGING FACE',
      'LLM INFERENCE OPTIMIZATION',
      'KV-CACHE COMPRESSION',
      'LOW-RANK SVD',
      'RAG SYSTEMS',
      'MODEL EVALUATION',
      'NSIGHT SYSTEMS',
      'NSIGHT COMPUTE',
      'QUANTIZATION',
      'PYTHON',
      'FASTAPI',
      'LINUX',
      'GIT',
      'VECTOR DBS'
    ]
  },
  { 
    text: 'competitive programming', 
    images: [
      '400+ questions solved', 
      'leetcode rating: 1750+',
      'IIT Roorkee SnapSyntax 1st Place',
      'gpa: 8.0 / 10.0',
      'B.Tech in Artificial Intelligence'
    ]
  },
  { 
    text: 'Machine Learning & Systems', 
    images: [
      '3 PUBLISHED PREPRINTS',
      '1 PAPER UNDER REVIEW (IEEE TETCI)',
      'DKV COMPRESSION FRAMEWORK',
      'RANK-32 SVD FACTORIZATION',
      'KV-CACHE COMPRESSION',
      'CUDA / TRITON / MLX',
      'LLM INFERENCE OPTIMIZATION',
      'DETERMINISTIC AGI BENCHMARKING',
      'RAG RETRIEVAL ABLATION',
      'MODEL EVALUATION',
      'QUANTIZATION'
    ]
  },
];

const StatsSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const statsSubRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = (e) => {
    if (statsSubRef.current) {
      const rect = statsSubRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const maskSizePx = isHovered ? Math.max(window.innerWidth * 0.18, 220) : 0;
  const maskX = mousePos.x - maskSizePx / 2;
  const maskY = mousePos.y - maskSizePx / 2;

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
          <div 
            className="DescriptiveStatsSub" 
            ref={statsSubRef}
            onMouseMove={handleMouseMove}
            style={{ position: 'relative' }}
          >
            {/* Masked Paragraph (Extended by 200px in all 4 directions to prevent circle clipping at top/edges) */}
            <motion.div
              className="mask"
              animate={{
                WebkitMaskPosition: `${maskX + 200}px ${maskY + 200}px`,
                maskPosition: `${maskX + 200}px ${maskY + 200}px`,
                WebkitMaskSize: `${maskSizePx}px ${maskSizePx}px`,
                maskSize: `${maskSizePx}px ${maskSizePx}px`,
              }}
              transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
              style={{
                maskImage: "url('/mask.svg')",
                WebkitMaskImage: "url('/mask.svg')",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                background: "#7FFF00",
                position: "absolute",
                top: "-200px",
                left: "-200px",
                width: "calc(100% + 400px)",
                height: "calc(100% + 400px)",
                zIndex: 10001,
                pointerEvents: "none",
              }}
            >
              <div style={{ position: "absolute", top: "200px", left: "200px", width: "100%", height: "100%" }}>
                <p
                  id="dsPara"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  style={{ pointerEvents: "auto" }}
                >
                  Author of <span>
                    <CountUp from={0} to={3} separator="," direction="up" duration={1} className="count-up-text" />
                  </span> published preprints & 1 paper under review in IEEE TETCI. Architected DKV framework for scalable long-context inference, engineered <span>
                    <CountUp from={0} to={4} separator="," direction="up" duration={1} className="count-up-text" />
                  </span> custom attention backends (CUDA, Triton, MLX), maintaining 8.0 GPA as a B.Tech AI student.
                </p>
              </div>
            </motion.div>
            {/* Original Paragraph */}
            <p id="dsPara">
              B.Tech AI student focused on LLM Inference Optimization, KV-Cache Compression, and RAG Systems.
              Published <span>
                <CountUp from={0} to={3} separator="," direction="up" duration={1} className="count-up-text" />
              </span> preprints & 1 paper under review in IEEE TETCI, engineered <span>
                <CountUp from={0} to={4} separator="," direction="up" duration={1} className="count-up-text" />
              </span> custom attention kernel backends (CUDA, Triton, MLX), maintaining 8.0 GPA.
            </p>
            <FallingText
              text={`PyTorch HuggingFace Transformers CUDA Triton MLX Nsight-Systems Nsight-Compute FastAPI Python Linux Git VectorDBs Quantization Low-Rank-SVD KV-Cache RAG Model-Evaluation`}
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
