import React from 'react';
import styled from 'styled-components';

const BookItem = styled.li`
  margin-bottom: 20px;
  list-style: none;
  width: calc(33.33% - 10px);
`;

const BookImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px; /* Add border-radius for rounded corners */
`;

const BookTitle = styled.h3`
  margin-top: 10px;
  font-size: 1.2rem;
  color: #333;
`;

const BookAuthor = styled.p`
  font-size: 1rem;
  color: #555;
`;

const Book = ({ book }) => {
  if (!book || !book.title || !book.author || !book.imageUrl) {
    return null; // or render a placeholder, error message, etc.
  }

  const { title, author, imageUrl } = book;

  return (
    <BookItem>
      <BookImage src={imageUrl} alt={title} />
      <BookTitle>{title}</BookTitle>
      <BookAuthor>{author}</BookAuthor>
    </BookItem>
  );
};

export default Book;
