// src/pages/Blog.tsx
import React from 'react';
import styled from 'styled-components';

const BlogContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const BlogPost = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

interface Post {
  title: string;
  date: string;
  excerpt: string;
  link: string;
}

const posts: Post[] = [
  {
    title: "Getting Started with React and TypeScript",
    date: "2024-03-15",
    excerpt: "Learn how to set up a new project with React and TypeScript using Vite.",
    link: "/blog/react-typescript-setup"
  },
  // Add more blog posts here
];

const Blog: React.FC = () => {
  return (
    <BlogContainer>
      <h1>My Blog</h1>
      {posts.map((post, index) => (
        <BlogPost key={index}>
          <h2>{post.title}</h2>
          <p>{post.date}</p>
          <p>{post.excerpt}</p>
          <a href={post.link}>Read More</a>
        </BlogPost>
      ))}
    </BlogContainer>
  );
};

export default Blog;