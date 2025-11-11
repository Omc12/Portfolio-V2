import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import NN from '../assets/NeuralNetworks.png';
import NML from '../assets/notml.png';
import AML from '../assets/audioml.png';
import NNAvif from '../assets/images/NeuralNetworks.avif';
import NMLAvif from '../assets/images/notml.avif';
import AMLAvif from '../assets/images/audioml.avif';
// Future optimized variants (to be added after conversion)
// import NNAvif from '../assets/NeuralNetworks.avif';
// import NNWebp from '../assets/NeuralNetworks.webp';
// import NMLAvif from '../assets/notml.avif';
// import NMLWebp from '../assets/notml.webp';
// import AMLAvif from '../assets/audioml.avif';
// import AMLWebp from '../assets/audioml.webp';
import OptimizedPicture from './utils/OptimizedPicture.jsx';

const ProjectsSection = () => {
  const LINKS = {
    notML: "https://notml.in",
    machineLearning: "https://github.com/Not-ML/ML-3",
    audioML: "https://github.com/Not-ML/audio-ml",
  };

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
    <div className="Section4" id="projects-section">
      <h2 id="projectsHead">Projects</h2>
      <div className="draggableContainer" ref={containerRef}>
        <h2 id="projectsPunchy">That's it?</h2>
        {/* NotML card */}
        <motion.div
          className="wrapper draggable"
          drag
          dragConstraints={containerRef}
          dragElastic={0.65}
          onMouseDown={updateZIndex}
          onTap={() => window.open(LINKS.notML, "_blank")}
          initial={{ rotate: -16 }}
          animate={{ rotate: -16 }}
          whileDrag={{ rotate: -16 }}
          style={{
            position: "absolute",
            top: "10%",
            left: "45%",
            zIndex,
          }}
        >
          <div className="wrapperImg">
            <OptimizedPicture
              src={NML}
              alt="NotML"
              className="wrapperImgStyle"
              loading="lazy"
              sources={[{srcSet: NMLAvif, type: 'image/avif'}]}
            />
          </div>
          <p className="wrapperText">NotML</p>
        </motion.div>
        {/* Machine Learning card */}
        <motion.div
          className="wrapper draggable"
          drag
          dragConstraints={containerRef}
          dragElastic={0.65}
          onMouseDown={updateZIndex}
          onTap={() => window.open(LINKS.machineLearning, "_blank")}
          initial={{ rotate: 15 }}
          animate={{ rotate: 15 }}
          whileDrag={{ rotate: 15 }}
          style={{
            position: "absolute",
            top: "30%",
            left: "35%",
            zIndex,
          }}
        >
          <div className="wrapperImg">
            <OptimizedPicture
              src={NN}
              alt="Machine Learning"
              className="wrapperImgStyle"
              loading="lazy"
              sources={[{srcSet: NNAvif, type: 'image/avif'}]}
            />
          </div>
          <p className="wrapperText">Machine learning</p>
        </motion.div>
        {/* Notepad text card */}
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
            top: "35%",
            left: "50%",
            zIndex,
          }}
        >
          <h2 className="text-wrapper-head">Notepad</h2>
          <p className="text-wrapper-p">
            It's a notepad with AI integrated in it at a base level
          </p>
        </motion.div>
        {/* LLMs text card */}
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
            top: "20%",
            left: "30%",
            zIndex,
          }}
        >
          <h2 className="text-wrapper-head">LLMs</h2>
          <p className="text-wrapper-p">
            Creating Large Language Models while learning pytorch
          </p>
        </motion.div>
        {/* Audio based ML card */}
        <motion.div
          className="wrapper draggable"
          drag
          dragConstraints={containerRef}
          dragElastic={0.65}
          onMouseDown={updateZIndex}
          onTap={() => window.open(LINKS.audioML, "_blank")}
          initial={{ rotate: -6 }}
          animate={{ rotate: -6 }}
          whileDrag={{ rotate: -6 }}
          style={{
            position: "absolute",
            top: "20%",
            left: "55%",
            zIndex,
          }}
        >
          <div className="wrapperImg">
            <OptimizedPicture
              src={AML}
              alt="Audio based ML"
              className="wrapperImgStyle"
              loading="lazy"
              sources={[{srcSet: AMLAvif, type: 'image/avif'}]}
            />
          </div>
          <p className="wrapperText">Audio based ML</p>
        </motion.div>
      </div>
      <p id="dragText">Drag the cards</p>
    </div>
  );
};

export default ProjectsSection;
