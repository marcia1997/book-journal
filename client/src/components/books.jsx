import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const LoadingMessage = styled.div`
  font-size: 1.5rem;
  color: #333;
  text-align: center;
  margin: 20px 0;
`;

const ErrorMessage = styled.div`
  font-size: 1.5rem;
  color: red;
  text-align: center;
  margin: 20px 0;
`;

const BookGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const BookContainer = styled.div`
  width: 150px;
  text-align: center;
`;

const BookImage = styled.img`
  max-width: 100%;
  border-radius: 4px;
`;

const Book = ({ title, imageUrl }) => (
  <BookContainer>
    <BookImage src={imageUrl} alt={title} />
    <h3>{title}</h3>
  </BookContainer>
);

const Books = ({ apiEndpoint = 'http://localhost:5000/books' }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored in local storage
        const response = await axios.get(apiEndpoint, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.status === 404) {
          throw new Error('Books not found');
        }
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, [apiEndpoint]);

  if (loading) return <LoadingMessage>Loading...</LoadingMessage>;
  if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

  return (
    <div>
      <h1>My Books</h1>
      <BookGallery>
        {books.map((book) => (
          <Book key={book._id} title={book.title} imageUrl={book.imageUrl || 'default.jpg'} />
        ))}
      </BookGallery>
    </div>
  );
};

export default Books;
