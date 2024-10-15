import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Portfolio</h1>
        <div>
          <a href="#projects" className="mr-4">Projects</a>
          <a href="#blog" className="mr-4">Blog</a>
          <a href="#about" className="mr-4">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
