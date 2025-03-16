import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import NN from '../assets/NeuralNetworks.png';

const ProjectsSection = () => {
  const containerRef = useRef(null);
  const [zIndex, setZIndex] = useState(0);

  const updateZIndex = () => {
    const els = containerRef.current.querySelectorAll('.draggable');
    let maxZ = -Infinity;
    els.forEach(el => {
      const z = parseInt(window.getComputedStyle(el).getPropertyValue("z-index"));
      if (!isNaN(z) && z > maxZ) {
        maxZ = z;
      }
    });
    setZIndex(maxZ + 1);
  };

  return (
    <div className="Section4" id='projects-section'>
      <h2 id="projectsHead">Projects</h2>
      <div className="draggableContainer" ref={containerRef}>
        <h2 id="projectsPunchy">That's it?</h2>
        {/* Image wrapper */}
        <motion.div
          className="wrapper draggable"
          drag
          dragConstraints={containerRef}
          dragElastic={0.65}
          onMouseDown={updateZIndex}
          initial={{ rotate: -16 }}
          animate={{ rotate: -16 }}
          whileDrag={{ rotate: -16 }}
          style={{
            position: "absolute",
            top: "0%",
            left: "45%",
            zIndex,
          }}
        >
          <div className="wrapperImg">
            <img src={NN} className="wrapperImgStyle" alt="NotML" />
          </div>
          <p className="wrapperText">NotML</p>
        </motion.div>
        {/* Image wrapper */}
        <motion.div
          className="wrapper draggable"
          drag
          dragConstraints={containerRef}
          dragElastic={0.65}
          onMouseDown={updateZIndex}
          initial={{ rotate: 15 }}
          animate={{ rotate: 15 }}
          whileDrag={{ rotate: 15 }}
          style={{
            position: "absolute",
            top: "20%",
            left: "35%",
            zIndex,
          }}
        >
          <div className="wrapperImg">
            <img src={NN} className="wrapperImgStyle" alt="Machine Learning" />
          </div>
          <p className="wrapperText">Machine learning</p>
        </motion.div>
        {/* #1F51FF text wrapper for Notepad */}
        <motion.div
          className="text-wrapper draggable wrapper"
          drag
          dragConstraints={containerRef}
          dragElastic={0.65}
          onMouseDown={updateZIndex}
          initial={{ rotate: -26 }}
          animate={{ rotate: -26 }}
          whileDrag={{ rotate: -26 }}
          style={{
            position: "absolute",
            top: "25%",
            left: "50%",
            zIndex,
          }}
        >
          <h2 className="text-wrapper-head">Notepad</h2>
          <p className="text-wrapper-p">
            It's a notepad with AI integrated in it at a base level
          </p>
        </motion.div>
        {/* #1F51FF text wrapper for LLMs */}
        <motion.div
          className="text-wrapper draggable wrapper"
          drag
          dragConstraints={containerRef}
          dragElastic={0.65}
          onMouseDown={updateZIndex}
          initial={{ rotate: 6 }}
          animate={{ rotate: 6 }}
          whileDrag={{ rotate: 6 }}
          style={{
            position: "absolute",
            top: "10%",
            left: "30%",
            zIndex,
          }}
        >
          <h2 className="text-wrapper-head">LLMs</h2>
          <p className="text-wrapper-p">
            Creating Large Language Models while learning pytorch
          </p>
        </motion.div>
        {/* Image wrapper */}
        <motion.div
          className="wrapper draggable"
          drag
          dragConstraints={containerRef}
          dragElastic={0.65}
          onMouseDown={updateZIndex}
          initial={{ rotate: -6 }}
          animate={{ rotate: -6 }}
          whileDrag={{ rotate: -6 }}
          style={{
            position: "absolute",
            top: "10%",
            left: "55%",
            zIndex,
          }}
        >
          <div className="wrapperImg">
            <img src={NN} className="wrapperImgStyle" alt="Audio based ML" />
          </div>
          <p className="wrapperText">Audio based ML</p>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsSection;
