// src/pages/Home.tsx
import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <h1>Welcome to My Portfolio</h1>
      <p>
        Hi, I'm Ronald Onyango. I'm a passionate developer with expertise in
        web development, machine learning, and data science.
      </p>
      <p>
        Explore my projects, read my blog posts, or get in touch to discuss
        potential collaborations.
      </p>
    </HomeContainer>
  );
};

export default Home;