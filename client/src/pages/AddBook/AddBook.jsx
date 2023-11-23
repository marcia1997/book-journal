import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

const BookPageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const TitleInput = styled.input`
  font-size: 1.5rem;
  margin-bottom: 10px;
  margin-top: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  background: linear-gradient(45deg, #ff00cc, #3333cc);
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 20px;
`;

const CoverImageInput = styled.input`
  display:flex;
  margin-bottom: 10px;
`;


const Rectangle = styled.div`
  display: inline-block;
  border: 2px solid #333;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 20px;
`;



const feelings = [
  { emoji: '😊', name: 'Happy' },
  { emoji: '😢', name: 'Sad' },
  { emoji: '😍', name: 'Excited' },
  { emoji: '😕', name: 'Confused' },
];

const StarRatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Star = styled.span`
  font-size: 1.5rem;
  color: #ffd700;
  margin-right: 5px;
`;

const StarInput = styled.input`
  font-size: 1.5rem;
  margin-right: 5px;
`;

const ReviewTextArea = styled.textarea`
  width: 100%;
  height: 100px;
  resize: vertical;
  margin-bottom: 20px;
`;

const SubmitButton = styled.button`
  background: linear-gradient(45deg, #ff00cc, #3333cc);
  color: #fff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 4px;
`;
const BookImage = styled.img`
  max-width: 150px;
  max-height: 150px;
  border-radius: 2%;
`;

const DateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const DateLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DatePickerStyled = styled(DatePicker)`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 5px;
`;

const BookPage = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedFeeling, setSelectedFeeling] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');


  const statuses = [
    'Wish',
    'Currently Reading',
    'Stop it',
    'Read',
  ];
  


  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value, 10));
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleFeelingChange = (event) => {
    setSelectedFeeling(event.target.value);
  };


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  

  const handleInputSubmit = () => {
    setBookTitle(inputValue);
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };
  const handleSubmit = () => {
    // Implement your submission logic here
    console.log('Book title:',bookTitle);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    console.log('Rating:', rating);
    console.log('Review:', review);
    console.log('Cover Image File:', coverImage);
  };

  return (
    <BookPageContainer>
     {bookTitle ? (
        <SectionTitle>{bookTitle}</SectionTitle>
      ) : (
        <>
          <TitleInput
            type="text"
            placeholder="Enter book title..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <button onClick={handleInputSubmit}>Submit</button>
          
          <CoverImageInput
            type="file"
            accept="image/*"
            onChange={handleCoverImageChange}
          />
          {coverImage && <BookImage src={URL.createObjectURL(coverImage)} alt="Selected Cover" />} 
        </>
      )}
      <Rectangle>
            <label>Book Status:</label>
            <select value={selectedStatus} onChange={handleStatusChange}>
              <option value="" disabled>Select status...</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </Rectangle>
      <DateContainer>
        <DateLabel>
          <div>Start Date:</div>
          <DatePickerContainer>
            <DatePickerStyled selected={startDate} onChange={(date) => setStartDate(date)} />
          </DatePickerContainer>
        </DateLabel>

        <DateLabel>
          <div>End Date:</div>
          <DatePickerContainer>
            <DatePickerStyled selected={endDate} onChange={(date) => setEndDate(date)} />
          </DatePickerContainer>
        </DateLabel>
      </DateContainer>
      <Rectangle>
            <label>How do you feel?</label>
            <select value={selectedFeeling} onChange={handleFeelingChange}>
              <option value="" disabled>Select feeling...</option>
              {feelings.map((feeling) => (
                <option key={feeling.name} value={feeling.name}>
                  {feeling.emoji} {feeling.name}
                </option>
              ))}
            </select>
          </Rectangle>
      <StarRatingContainer>
        <div>Rating:</div>
        {[1, 2, 3, 4, 5].map((star) => (
          <label key={star}>
            <Star>&#9733;</Star>
            <StarInput
              type="radio"
              name="rating"
              value={star}
              checked={rating === star}
              onChange={handleRatingChange}
            />
          </label>
        ))}
      </StarRatingContainer>

      <ReviewTextArea
        placeholder="Write your review..."
        value={review}
        onChange={handleReviewChange}
      />

      <SubmitButton onClick={handleSubmit}>Submit Review</SubmitButton>
    </BookPageContainer>
  );
};


export default BookPage;