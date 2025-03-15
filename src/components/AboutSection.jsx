import React from 'react';
import AnimatedText from './imports/AnimatedText/AnimatedText';

const AboutSection = () => {
  return (
    <div id="about-section" className="Section2">
      <h2 id="aboutMini">About</h2>
      <div id="aboutSub">
        <p id="aboutPara">
          <AnimatedText text= 'I am currently active as a frontend developer. I specialize in UI development & styling. And above all, I love doing it.'/>
        </p>
        <p id="aboutParaMini1">
          I'm a student who thrives on exploring innovative frameworks and programming languages to continuously enhance my tech stack. Every day, I deepen my understanding of how these technologies integrate to create seamless and effective solutions.
        </p>
        <p id="aboutParaMini2">
          I'm working on a variety of projects that let me explore these new technologies in a hands-on way. Along the way, I'm also diving into machine learning and applying what I learn through real-world projects.
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
