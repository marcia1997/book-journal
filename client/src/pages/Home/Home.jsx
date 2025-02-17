import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Books from '../../components/books';

const HomeContainer = styled.div`
  color: #333;
  padding: 20px;
  border-radius: 8px;
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 1rem;
  font-weight: 300;
`;

const Title = styled.h1`
  background: linear-gradient(45deg, #ff00cc, #3333cc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 700;
  font-size: 3.75rem;
`;

const Button = styled.button`
  display: inline-block;
  color: #bf4f74;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #bf4f74;
  border-radius: 3px;
  display: block;
`;

const Home = () => {
  return (
    <HomeContainer>
      <Title>My Bookshelf</Title>
      <Books apiEndpoint="http://localhost:5000/api/books" />
      <Link style={{ textDecoration: 'none' }} to='/book'>
        <Button>Add book</Button>
      </Link>
    </HomeContainer>
  );
};

export default Home;

