import React from 'react';
import AnimatedText from './utils/AnimatedText/AnimatedText';

const AboutSection = () => {
  return (
    <div id="about-section" className="Section2">
      <h2 id="aboutMini">About</h2>
      <div id="aboutSub">
        <p id="aboutPara">
          <AnimatedText text= 'AI researcher focused on large language model inference, transformer memory systems, and efficient long-context serving.'/>
        </p>
        <p id="aboutParaMini1">
          My recent work includes DKV (Anchor + Low-Rank Differential KV-Cache Compression), a training-free open-source framework combining exact anchors, rank-32 joint K|V truncated SVD deltas, and multi-signal exact residual tokens to achieve 1.44×–2.25× memory reduction across 4k–64k contexts without needle-recall collapse (submitted to IEEE TETCI).
        </p>
        <p id="aboutParaMini2">
          Beyond DKV, my research spans deterministic AGI benchmarking without judge models, empirical retrieval ablations for stock-news RAG systems, and custom GPU/ML inference kernels (CUDA, Triton, MLX)—turning first-principles AI systems research into reproducible, open-source runtimes.
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
