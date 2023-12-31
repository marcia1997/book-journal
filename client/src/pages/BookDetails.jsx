
import React from 'react';
import styled from 'styled-components';

const DetailsContainer = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 20px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
`;

const CoverImage = styled.img`
  max-width: 100%;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const DetailItem = styled.p`
  margin-bottom: 8px;
  color: #666;
`;

const BookDetails = ({ title, coverImage, startDate, endDate, status, feeling, rating, review }) => {
  return (
    <DetailsContainer>
      <Title>{title}</Title>
      {coverImage && <CoverImage src={URL.createObjectURL(coverImage)} alt="Book Cover" />}
      <DetailItem>Start Date: {startDate.toDateString()}</DetailItem>
      <DetailItem>End Date: {endDate.toDateString()}</DetailItem>
      <DetailItem>Status: {status}</DetailItem>
      {feeling && <DetailItem>Feeling: {feeling}</DetailItem>}
      {rating && <DetailItem>Rating: {rating}/5</DetailItem>}
      {review && <DetailItem>Review: {review}</DetailItem>}
    </DetailsContainer>
  );
};

export default BookDetails;
