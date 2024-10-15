import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="container mx-auto my-8">
      <h2 className="text-3xl font-bold mb-4">Contact</h2>
      <a href="/cv.pdf" download className="bg-blue-500 text-white p-2 rounded">Download CV</a>
    </section>
  );
};

export default Contact;
