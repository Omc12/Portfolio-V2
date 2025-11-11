import React from 'react';
import AnimatedText from './utils/AnimatedText/AnimatedText';

const AboutSection = () => {
  return (
    <div id="about-section" className="Section2">
      <h2 id="aboutMini">About</h2>
      <div id="aboutSub">
        <p id="aboutPara">
          <AnimatedText text= 'I am currently working with Machine Learning and LLMs. I am learning about Transformers & Deep Learning. I am also a MERN Stack developer.'/>
        </p>
        <p id="aboutParaMini1">
          I’ve explored techniques like Linear Regression, KNNs, XGBoost, RFR, basic neural networks, data preprocessing and model evaluation, applying them in small but meaningful projects such as house price prediction, image classification, and working with classic datasets like Iris.
        </p>
        <p id="aboutParaMini2">
          I’ve been learning about deep learning and transformers by first strengthening my base in models like linear regression and basic neural networks, then exploring how attention mechanisms, sequence modeling, applying these concepts in small experiments.
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
