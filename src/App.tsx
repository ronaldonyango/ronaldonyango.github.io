import React from 'react';
import Header from './components/Header';
import Projects from './components/Projects';
import Blog from './components/Blog';
import About from './components/About';
import Contact from './components/Contact';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Projects />
      <Blog />
      <About />
      <Contact />
    </div>
  );
};

export default App;
