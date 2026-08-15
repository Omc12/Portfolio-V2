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
          My recent work includes DKV (Differential KV Cache Compression for Scalable Long-Context Inference), an open-source framework reducing KV-cache memory through differential representations and shared low-rank reconstruction while maintaining generation quality. Submitted to IEEE Transactions on Emerging Topics in Computational Intelligence (TETCI).
        </p>
        <p id="aboutParaMini2">
          Beyond DKV, I explore efficient transformer architectures, AI evaluation, model serving, and systems optimization—turning first-principles ideas into reproducible tools, open-source implementations, and production-ready AI systems.
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
