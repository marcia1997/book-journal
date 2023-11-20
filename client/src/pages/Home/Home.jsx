// src/pages/Home.js
import React from 'react';
import styled from 'styled-components';

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

const SubTitle = styled.h2`
  color: #3333cc;
  margin-bottom: 20px;
  font-size: 3rem;
`;

const IntroParagraph = styled.p`
  color: #3333cc;
  margin-bottom: 20px;
  font-size: 1.8rem;
  font-weight: 300;
  line-height: 1.5;
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

const Quote = styled.li`
  margin-bottom: 20px;
  background-color: #fff;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  list-style: none;
`;

const QuoteText = styled.blockquote`
  color: #3333cc;
  position: relative;
  line-height: 1.5;
  padding: 30px 56px 62px 56px;
  margin-top: 2rem;
  margin-bottom: 2rem;
  text-align: center;

  &::before {
    position: absolute;
    content: open-quote;
    display: block;
    font-size: 6.5rem;
    line-height: 0;
    left: 13px;
    top: 50px;
  }

  &::after {
    position: absolute;
    display: block;
    font-size: 6.5rem;
    right: 24px;
    bottom: 16px;
    content: close-quote;
  }
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
 
      </BookGallery>

      
      
      

      {/* Add more BookItems and Quotes as needed */}
    </HomeContainer>
  );
};

export default Home;
