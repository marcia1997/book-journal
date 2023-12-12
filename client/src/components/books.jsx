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

const Books = ({ apiEndpoint }) => {
  const [books, setBooks] = useState([]);

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
      }
    };

    fetchBooks();
  }, [apiEndpoint]);

  return (
    <BookGallery>
      {books.map((book) => (
        <Book key={book.id} title={book.title} imageUrl={book.imageUrl} />
      ))}
    </BookGallery>
  );
};

export default Books;
