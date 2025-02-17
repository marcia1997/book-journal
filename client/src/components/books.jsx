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

const Books = ({ apiEndpoint = 'http://localhost:5000/api/books' }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('token'); 
        console.log("Token obtenido:", token); 

        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        
        let response = await axios.get(apiEndpoint, { headers });
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
        
        if (error.response?.status === 404) {
          console.log("Intentando sin /api...");
          try {
            const response = await axios.get('http://localhost:5000/books');
            setBooks(response.data);
          } catch (err) {
            setError('No se pudieron cargar los libros. Verifica el servidor.');
          }
        } else {
          setError('Error al obtener los libros.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [apiEndpoint]);

  if (loading) return <LoadingMessage>Loading...</LoadingMessage>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <div>
      <h1>My Books</h1>
      <BookGallery>
        {books.length > 0 ? (
          books.map((book) => (
            <Book key={book._id} title={book.title} imageUrl={book.coverImage ? `data:${book.coverImage.contentType};base64,${book.coverImage.data}` : 'default.jpg'} />
          ))
        ) : (
          <p>No books found.</p>
        )}
      </BookGallery>
    </div>
  );
};

export default Books;

