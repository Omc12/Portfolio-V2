import React from 'react';
import AnimatedText from './utils/AnimatedText/AnimatedText';

const AboutSection = () => {
  return (
    <div id="about-section" className="Section2">
      <h2 id="aboutMini">About</h2>
      <div id="aboutSub">
        <p id="aboutPara">
          <AnimatedText text= '3rd-year Artificial Intelligence undergraduate specializing in Machine Learning Systems & LLM Inference Optimization.'/>
        </p>
        <p id="aboutParaMini1">
          My research and engineering focus on training-free KV-cache compression (DKV), custom attention kernels (CUDA, Triton, MLX, GGML), and low-rank SVD factorizations to push long-context transformer inference past hardware memory boundaries.
        </p>
        <p id="aboutParaMini2">
          Beyond systems optimization, I conduct empirical research on enterprise RAG architectures—evaluating hybrid BM25+Vector retrieval and MMR re-ranking strategies—and build high-performance Python, C++, and PyTorch/CUDA machine learning pipelines.
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
