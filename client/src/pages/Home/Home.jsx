// src/pages/Home.js
import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';


// Define styled components using the provided styles
const HomeContainer = styled.div`
  background: url('https://example.com/path/to/home/image.jpg') center/cover no-repeat fixed;
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


const BookGallery = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const BookItem = styled.li`
  margin-bottom: 20px;
  list-style: none;
  width: calc(33.33% - 10px);
`;

const BookImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Button = styled.button`
  display: inline-block;
  color: #BF4F74;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #BF4F74;
  border-radius: 3px;
  display: block;
`;




const Home = () => {
  return (
    <HomeContainer>
      <Title>My Bookshelf</Title>
  

      <BookGallery>
        <BookItem className="books book--1">
          <BookImage src="https://images-na.ssl-images-amazon.com/images/I/51t180QSN1L._SX324_BO1,204,203,200_.jpg" alt="Close to the machine" />
        </BookItem>
        <BookItem className="books book--2">
          <BookImage src="https://images-na.ssl-images-amazon.com/images/I/41QRdFWy02L._SX324_BO1,204,203,200_.jpg" alt="21 lessons for the 21th century" />
        </BookItem>
        <BookItem className="books book--3">
          <BookImage src="https://images-na.ssl-images-amazon.com/images/I/51ya6G0fWUL._SX324_BO1,204,203,200_.jpg" alt="Natives Akala" />
        </BookItem>
        <BookItem className="books book--1">
          <BookImage src="https://images-na.ssl-images-amazon.com/images/I/51t180QSN1L._SX324_BO1,204,203,200_.jpg" alt="Close to the machine" />
        </BookItem>
        <BookItem className="books book--2">
          <BookImage src="https://images-na.ssl-images-amazon.com/images/I/41QRdFWy02L._SX324_BO1,204,203,200_.jpg" alt="21 lessons for the 21th century"/>
        </BookItem>
        <BookItem className="books book--3">
          <BookImage src="https://images-na.ssl-images-amazon.com/images/I/51ya6G0fWUL._SX324_BO1,204,203,200_.jpg" alt="Natives Akala" />
        </BookItem>
               <BookItem className="books book--1">
          <BookImage src="https://images-na.ssl-images-amazon.com/images/I/51t180QSN1L._SX324_BO1,204,203,200_.jpg" alt="Close to the machine" />
        </BookItem>
        <BookItem className="books book--2">
          <BookImage src="https://images-na.ssl-images-amazon.com/images/I/41QRdFWy02L._SX324_BO1,204,203,200_.jpg" alt="21 lessons for the 21th century"/>
        </BookItem>
        <BookItem className="books book--3">
          <BookImage src="https://images-na.ssl-images-amazon.com/images/I/51ya6G0fWUL._SX324_BO1,204,203,200_.jpg" alt="Natives Akala" />
        </BookItem>

       <Link style={{textDecoration: 'none'}} to='/book'>
          <Button className="button" >
           Add book
          </Button>
        </Link>

      </BookGallery>

    </HomeContainer>
  );
};

export default Home;
