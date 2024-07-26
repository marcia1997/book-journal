import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          throw new Error(`Failed to fetch books, status: ${response.status}`);
        }

        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error.message);
        setFetchError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [apiEndpoint]);

  const staticBooks = [
    { id: 1, title: 'Local Book 1', imageUrl: 'https://example.com/localbook1.jpg' },
    { id: 2, title: 'Local Book 2', imageUrl: 'https://example.com/localbook2.jpg' },
  ];

  const displayBooks = fetchError || loading ? staticBooks : books;

  return (
    <>
      {loading && <LoadingMessage>Loading...</LoadingMessage>}
      {fetchError && <ErrorMessage>Error fetching books. Please try again later.</ErrorMessage>}
      <BookGallery>
        {displayBooks.map((book) => (
          book && <Book key={book.id} title={book.title} imageUrl={book.imageUrl} />
        ))}
      </BookGallery>
    </>
  );
};

export default Books;
