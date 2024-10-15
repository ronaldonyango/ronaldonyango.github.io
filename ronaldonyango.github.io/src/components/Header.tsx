// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #333;
  color: white;
  padding: 1rem;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavList = styled.ul`
  list-style-type: none;
  display: flex;
  gap: 1rem;
`;

const NavItem = styled.li`
  a {
    color: white;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Nav>
        <h1>Ronald Onyango</h1>
        <NavList>
          <NavItem><Link to="/">Home</Link></NavItem>
          <NavItem><Link to="/projects">Projects</Link></NavItem>
          <NavItem><Link to="/blog">Blog</Link></NavItem>
          <NavItem><Link to="/about">About</Link></NavItem>
          <NavItem><Link to="/contact">Contact</Link></NavItem>
        </NavList>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;