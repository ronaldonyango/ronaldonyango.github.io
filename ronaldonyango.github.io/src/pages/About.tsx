// src/pages/About.tsx
import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const About: React.FC = () => {
  return (
    <AboutContainer>
      <h1>About Me</h1>
      <p>
        Hi, I'm Ronald Onyango. I'm a passionate software developer with a strong
        background in web development, machine learning, and data science.
      </p>
      <h2>My Skills</h2>
      <ul>
        <li>Front-end: React, TypeScript, HTML, CSS</li>
        <li>Back-end: Node.js, Express, Python, Django</li>
        <li>Databases: MongoDB, PostgreSQL</li>
        <li>Machine Learning: TensorFlow, PyTorch, Scikit-learn</li>
        <li>Data Science: Pandas, NumPy, Matplotlib</li>
      </ul>
      <h2>Education</h2>
      <p>
        B.Sc. in Computer Science, University of Nairobi, 2020
      </p>
      <h2>Work Experience</h2>
      <p>
        Software Developer at TechCorp, 2020-present
      </p>
      <a href="/path-to-your-cv.pdf" download>Download my CV</a>
    </AboutContainer>
  );
};

export default About;