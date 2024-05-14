import React, { useState } from 'react';
import Axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { useBookContext, ActionTypes } from '../../context/BookContext'; // Adjust the path if needed

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
  margin-bottom: 10px;
  display: flex;
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
  margin-top: 20px;
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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedFeeling, setSelectedFeeling] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [error, setError] = useState('');

  const statuses = ['Wish', 'Currently Reading', 'Stop it', 'Read'];
  const { dispatch, actions } = useBookContext(); // Obtain the context dispatcher

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
    setBookTitle(e.target.value);
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSubmit = async () => {
    console.log('Book title submitted:', bookTitle);

    // Reset error if validation passes
    setError('');

    try {
      // Ensure all required fields are provided
      if (!bookTitle || !selectedStatus || !selectedFeeling || !startDate || !endDate || !coverImage) {
        setError('Please fill in all required fields.');
        return;
      }

      const formData = new FormData();
      formData.append('title', bookTitle);
      formData.append('status', selectedStatus);
      formData.append('feeling', selectedFeeling);
      formData.append('startDate', startDate.toISOString());
      formData.append('endDate', endDate.toISOString());
      formData.append('rating', rating);
      formData.append('review', review);
      formData.append('coverImage', coverImage);

      const response = await Axios.post('http://localhost:5000/api/books', formData, {
        withCredentials: true,
      });

      console.log('Server response:', response.data);

      // MongoDB integration - save the book to MongoDB
      const newBook = {
        title: response.data.title,
        startDate: response.data.startDate,
        endDate: response.data.endDate,
        rating: response.data.rating,
        review: response.data.review,
        coverImage: response.data.coverImage,
      };

      // Utilize the dispatcher to add the book to the global state
      dispatch({
        type: ActionTypes.ADD_BOOK,
        payload: newBook,
      });

    } catch (error) {
      console.error('Error in handleSubmit:', error);
      // Handle errors as before
      dispatch({
        type: ActionTypes.SET_ERROR,
        payload: error.message,
      });
    }
  };

  return (
    <BookPageContainer>
      {bookTitle && <SectionTitle>{bookTitle}</SectionTitle>}
      <TitleInput
        type="text"
        placeholder="Enter book title..."
        value={bookTitle}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Submit</button>

      <CoverImageInput
        type="file"
        accept="image/*"
        onChange={handleCoverImageChange}
      />
      {coverImage && (
        <BookImage
          src={URL.createObjectURL(coverImage)}
          alt="Selected Cover"
        />
      )}

      <Rectangle>
        <label>Book Status:</label>
        <select value={selectedStatus} onChange={handleStatusChange}>
          <option value="" disabled>
            Select status...
          </option>
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
            <DatePickerStyled
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </DatePickerContainer>
        </DateLabel>

        <DateLabel>
          <div>End Date:</div>
          <DatePickerContainer>
            <DatePickerStyled
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
          </DatePickerContainer>
        </DateLabel>
      </DateContainer>

      <Rectangle>
        <label>How do you feel?</label>
        <select value={selectedFeeling} onChange={handleFeelingChange}>
          <option value="" disabled>
            Select feeling...
          </option>
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

      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
    </BookPageContainer>
  );
};

export default BookPage;
