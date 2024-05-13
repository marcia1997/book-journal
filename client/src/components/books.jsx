import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Book from './singleBook';

const BookGallery = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const LoadingMessage = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 1.2rem;
  color: #ff0000;
`;

const Books = ({ apiEndpoint }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${apiEndpoint}/api/books`);
        if (!response.ok) {
          throw new Error('Failed to fetch books');
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
    // Add more local books as needed
  ];

  const displayBooks = fetchError || loading ? staticBooks : books;

  return (
    <>
      {loading && <LoadingMessage>Loading...</LoadingMessage>}
      {fetchError && <ErrorMessage>Error fetching books</ErrorMessage>}
      <BookGallery>
        {displayBooks.map((book) => (
          book && <Book key={book.id} title={book.title} imageUrl={book.imageUrl} />
        ))}
      </BookGallery>
    </>
  );
};

export default Books;
