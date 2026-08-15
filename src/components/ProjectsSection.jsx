import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import NML from '../assets/notml.png';
import AML from '../assets/audioml.png';
import NMLAvif from '../assets/images/notml.avif';
import AMLAvif from '../assets/images/audioml.avif';
import ABS1 from '../assets/images/abstract1.avif';
import ABS2 from '../assets/images/abstract2.avif';
import ABS3 from '../assets/images/abstract3.avif';
import OptimizedPicture from './utils/OptimizedPicture.jsx';

const ProjectsSection = () => {
  const LINKS = {
    dkv: "https://github.com/Omc12/Differential-KV",
    notML: "https://notml.in",
    aqiPred: "https://github.com/Omc12/AQI_Pred_Model",
    signalist: "https://github.com/Omc12/Signalist",
    ragAblation: "https://github.com/Omc12/RAG-Evaluation---Ablation-Study",
    stockNews: "https://github.com/Omc12/RAG-stock-news",
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
        {/* Signalist card */}
        <motion.div
          className="wrapper draggable"
          drag
          dragConstraints={containerRef}
          dragElastic={0.65}
          onMouseDown={updateZIndex}
          onTap={() => window.open(LINKS.signalist, "_blank")}
          initial={{ rotate: 14 }}
          animate={{ rotate: 14 }}
          whileDrag={{ rotate: 14 }}
          style={{
            position: "absolute",
            top: "10%",
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
          <p className="wrapperText">Signalist</p>
        </motion.div>
        {/* DKV Research card */}
        <motion.div
          className="wrapper draggable"
          drag
          dragConstraints={containerRef}
          dragElastic={0.65}
          onMouseDown={updateZIndex}
          onTap={() => window.open(LINKS.dkv, "_blank")}
          initial={{ rotate: -8 }}
          animate={{ rotate: -8 }}
          whileDrag={{ rotate: -8 }}
          style={{
            position: "absolute",
            top: "15%",
            left: "36%",
            zIndex,
          }}
        >
          <div className="wrapperImg">
            <OptimizedPicture
              src={ABS2}
              alt="DKV KV-Cache Compression"
              className="wrapperImgStyle"
              loading="lazy"
              sources={[{srcSet: ABS2, type: 'image/avif'}]}
            />
          </div>
          <p className="wrapperText">DKV (KV-Cache SVD)</p>
        </motion.div>
        {/* NotML card */}
        <motion.div
          className="wrapper draggable"
          drag
          dragConstraints={containerRef}
          dragElastic={0.65}
          onMouseDown={updateZIndex}
          onTap={() => window.open(LINKS.notML, "_blank")}
          initial={{ rotate: -14 }}
          animate={{ rotate: -14 }}
          whileDrag={{ rotate: -14 }}
          style={{
            position: "absolute",
            top: "10%",
            left: "54%",
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
        {/* LLMs & Systems text card */}
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
            top: "32%",
            left: "15%",
            zIndex,
          }}
        >
          <h2 className="text-wrapper-head">ML Systems</h2>
          <p className="text-wrapper-p">
            Custom CUDA, Triton & MLX kernels for fast, memory-efficient LLM inference.
          </p>
        </motion.div>
        {/* KV-Cache Compression text card */}
        <motion.div
          className="text-wrapper draggable wrapper"
          drag
          dragConstraints={containerRef}
          dragElastic={0.65}
          onMouseDown={updateZIndex}
          initial={{ rotate: -18 }}
          animate={{ rotate: -18 }}
          whileDrag={{ rotate: -18 }}
          style={{
            position: "absolute",
            top: "34%",
            left: "34%",
            zIndex,
          }}
        >
          <h2 className="text-wrapper-head">DKV</h2>
          <p className="text-wrapper-p">
            Differential KV-cache compression for scalable long-context inference (Submitted to IEEE TETCI).
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
            top: "30%",
            left: "56%",
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
        {/* RAG text card */}
        <motion.div
          className="text-wrapper draggable wrapper"
          drag
          dragConstraints={containerRef}
          dragElastic={0.65}
          onMouseDown={updateZIndex}
          initial={{ rotate: -10 }}
          animate={{ rotate: -10 }}
          whileDrag={{ rotate: -10 }}
          style={{
            position: "absolute",
            top: "54%",
            left: "22%",
            zIndex,
          }}
        >
          <h2 className="text-wrapper-head">RAG</h2>
          <p className="text-wrapper-p">
            using rag with ensembles to get better results
          </p>
        </motion.div>
        {/* Stock News card */}
        <motion.div
          className="wrapper draggable"
          drag
          dragConstraints={containerRef}
          dragElastic={0.65}
          onMouseDown={updateZIndex}
          onTap={() => window.open(LINKS.stockNews, "_blank")}
          initial={{ rotate: 12 }}
          animate={{ rotate: 12 }}
          whileDrag={{ rotate: 12 }}
          style={{
            position: "absolute",
            top: "52%",
            left: "40%",
            zIndex,
          }}
        >
          <div className="wrapperImg">
            <OptimizedPicture
              src={ABS2}
              alt="Abstract image"
              className="wrapperImgStyle"
              loading="lazy"
              sources={[{srcSet: ABS2, type: 'image/avif'}]}
            />
          </div>
          <p className="wrapperText">Stock News(RAG)</p>
        </motion.div>
        {/* RAG Ablation card */}
        <motion.div
          className="wrapper draggable"
          drag
          dragConstraints={containerRef}
          dragElastic={0.65}
          onMouseDown={updateZIndex}
          onTap={() => window.open(LINKS.ragAblation, "_blank")}
          initial={{ rotate: -22 }}
          animate={{ rotate: -22 }}
          whileDrag={{ rotate: -22 }}
          style={{
            position: "absolute",
            top: "50%",
            left: "58%",
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
          <p className="wrapperText">RAG Ablation Study</p>
        </motion.div>
      </div>
      <div className="projectsFooter">
        <p id="dragText">Drag the cards</p>
        <div className="cardLegend">
          <div className="legendItem">
            <span className="legendBox clickableBox"></span>
            <span className="legendText">Clickable</span>
          </div>
          <div className="legendItem">
            <span className="legendBox unclickableBox"></span>
            <span className="legendText">Unclickable</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
