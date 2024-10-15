// src/pages/Projects.tsx
import React from 'react';
import styled from 'styled-components';

const ProjectsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const ProjectCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link: string;
}

const projects: Project[] = [
  {
    title: "Portfolio Website",
    description: "A personal portfolio website built with React and TypeScript.",
    technologies: ["React", "TypeScript", "Styled Components"],
    link: "https://github.com/ronaldonyango/ronaldonyango.github.io"
  },
  // Add more projects here
];

const Projects: React.FC = () => {
  return (
    <ProjectsContainer>
      <h1>My Projects</h1>
      {projects.map((project, index) => (
        <ProjectCard key={index}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <p>Technologies: {project.technologies.join(', ')}</p>
          <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
        </ProjectCard>
      ))}
    </ProjectsContainer>
  );
};

export default Projects;