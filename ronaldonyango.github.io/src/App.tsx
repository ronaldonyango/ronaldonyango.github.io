// src/App.tsx
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import GlobalStyles from './styles/GlobalStyles';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.main`
  flex: 1;
`;

const App: React.FC = () => {
  return (
    <Router>
      <AppContainer>
        <GlobalStyles />
        <Header />
        <Content>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Content>
        <Footer />
      </AppContainer>
    </Router>
  );
};

export default App;