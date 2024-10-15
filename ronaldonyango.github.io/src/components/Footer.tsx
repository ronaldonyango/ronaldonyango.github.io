// src/components/Footer.tsx
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #333;
  color: white;
  padding: 1rem;
  text-align: center;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <p>&copy; {new Date().getFullYear()} Ronald Onyango. All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;