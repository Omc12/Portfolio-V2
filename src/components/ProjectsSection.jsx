import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import NN from '../assets/NeuralNetworks.png';
import NML from '../assets/notml.png';
import AML from '../assets/audioml.png';
import NNAvif from '../assets/images/NeuralNetworks.avif';
import NMLAvif from '../assets/images/notml.avif';
import AMLAvif from '../assets/images/audioml.avif';
import ABS1 from '../assets/images/abstract1.avif'
import ABS2 from '../assets/images/abstract2.avif'
import ABS3 from '../assets/images/abstract3.avif'
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
    imageClassifier: "https://github.com/Omc12/Image_Classifier-Dogs_vs_Cats-",
    aqiPred: "https://github.com/Omc12/AQI_Pred_Model",
    agrosage: "https://github.com/Omc12/agrosage-ai-assistant",
    shortUrl: "https://github.com/Omc12/shortUrl",
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
          onTap={() => window.open(LINKS.imageClassifier, "_blank")}
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
          <p className="wrapperText">Image Classifier</p>
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
            Working with llms and integrating them in my projects.
          </p>
        </motion.div>
        {/* Audio based ML card */}
        <motion.div
          className="wrapper draggable"
          drag
          dragConstraints={containerRef}
          dragElastic={0.65}
          onMouseDown={updateZIndex}
          onTap={() => window.open(LINKS.aqiPred, "_blank")}
          initial={{ rotate: -6 }}
          animate={{ rotate: -6 }}
          whileDrag={{ rotate: -6 }}
          style={{
            position: "absolute",
            top: "25%",
            left: "50%",
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
          <p className="wrapperText">AQI Predictor</p>
        </motion.div>
        {/* AgroSage card */}
        <motion.div
          className="wrapper draggable"
          drag
          dragConstraints={containerRef}
          dragElastic={0.65}
          onMouseDown={updateZIndex}
          onTap={() => window.open(LINKS.agrosage, "_blank")}
          initial={{ rotate: -34 }}
          animate={{ rotate: -34 }}
          whileDrag={{ rotate: -34 }}
          style={{
            position: "absolute",
            top: "30%",
            left: "20%",
            zIndex,
          }}
        >
          <div className="wrapperImg">
            <OptimizedPicture
              src={ABS3}
              alt="Abstract image"
              className="wrapperImgStyle"
              loading="lazy"
              sources={[{srcSet: ABS3, type: 'image/avif'}]}
            />
          </div>
          <p className="wrapperText">Agrosage AI Assistant</p>
        </motion.div>
        {/* ShortUrl card */}
        <motion.div
          className="wrapper draggable"
          drag
          dragConstraints={containerRef}
          dragElastic={0.65}
          onMouseDown={updateZIndex}
          onTap={() => window.open(LINKS.shortUrl, "_blank")}
          initial={{ rotate: -24 }}
          animate={{ rotate: -24 }}
          whileDrag={{ rotate: -24 }}
          style={{
            position: "absolute",
            top: "50%",
            left: "60%",
            zIndex,
          }}
        >
          <div className="wrapperImg">
            <OptimizedPicture
              src={ABS1}
              alt="Abstract image"
              className="wrapperImgStyle"
              loading="lazy"
              sources={[{srcSet: ABS1, type: 'image/avif'}]}
            />
          </div>
          <p className="wrapperText">ShortURL</p>
        </motion.div>
      </div>
      <p id="dragText">Drag the cards</p>
    </div>
  );
};

export default ProjectsSection;
