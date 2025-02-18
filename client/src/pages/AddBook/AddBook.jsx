import React, { useState } from 'react';
import Axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { useBookContext, ActionTypes } from '../../context/BookContext'; 


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
  const [coverImage, setCoverImage] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedFeeling, setSelectedFeeling] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [error, setError] = useState('');

  const { dispatch } = useBookContext(); // ✅ Obtiene el contexto correctamente

  const statuses = ['Wish', 'Currently Reading', 'Stop it', 'Read'];

  const handleSubmit = async () => {
    setError(''); // Reset error before validation

    if (!bookTitle || !selectedStatus || !selectedFeeling || !startDate || !endDate || !coverImage) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', bookTitle);
      formData.append('status', selectedStatus);
      formData.append('feeling', selectedFeeling);
      formData.append('startDate', startDate.toISOString());
      formData.append('endDate', endDate.toISOString());
      formData.append('rating', rating);
      formData.append('review', review);
      formData.append('coverImage', coverImage);

      const response = await Axios.post('http://localhost:5000/books', formData, {
        withCredentials: true,
      });

      console.log('Server response:', response.data);

      dispatch({
        type: 'ADD_BOOK', 
        payload: response.data,
      });

    } catch (error) {
      console.error('Error submitting book:', error);
      setError('Failed to submit the book. Try again.');
    }
  };

  return (
    <BookPageContainer>
      {bookTitle && <SectionTitle>{bookTitle}</SectionTitle>}
      <TitleInput
        type="text"
        placeholder="Enter book title..."
        value={bookTitle}
        onChange={(e) => setBookTitle(e.target.value)}
      />

      <CoverImageInput
        type="file"
        accept="image/*"
        onChange={(e) => setCoverImage(e.target.files[0])}
      />
      
      {coverImage && (
        <BookImage
          src={URL.createObjectURL(coverImage)}
          alt="Selected Cover"
        />
      )}

      <Rectangle>
        <label>Book Status:</label>
        <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
          <option value="" disabled>Select status...</option>
          {statuses.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </Rectangle>

      <DateContainer>
        <DateLabel>
          <div>Start Date:</div>
          <DatePickerContainer>
            <DatePickerStyled selected={startDate} onChange={setStartDate} />
          </DatePickerContainer>
        </DateLabel>

        <DateLabel>
          <div>End Date:</div>
          <DatePickerContainer>
            <DatePickerStyled selected={endDate} onChange={setEndDate} />
          </DatePickerContainer>
        </DateLabel>
      </DateContainer>

      <Rectangle>
        <label>How do you feel?</label>
        <select value={selectedFeeling} onChange={(e) => setSelectedFeeling(e.target.value)}>
          <option value="" disabled>Select feeling...</option>
          {feelings.map((feeling) => (
            <option key={feeling.name} value={feeling.name}>
              {feeling.emoji} {feeling.name}
            </option>
          ))}
        </select>
      </Rectangle>

      <SubmitButton onClick={handleSubmit}>Submit Review</SubmitButton>

      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
    </BookPageContainer>
  );
};

export default BookPage;
