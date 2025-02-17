import React, { createContext, useReducer, useContext, useEffect } from 'react';
import axios from 'axios';

const BookContext = createContext();

const initialState = {
  books: [],
  loading: true,
  error: null,
};

const ActionTypes = {
  SET_BOOKS: 'SET_BOOKS',
  ADD_BOOK: 'ADD_BOOK',
  REMOVE_BOOK: 'REMOVE_BOOK',
  SET_ERROR: 'SET_ERROR',
};

const bookReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_BOOKS:
      return { ...state, books: action.payload, loading: false, error: null };
    case ActionTypes.ADD_BOOK:
      return { ...state, books: [...state.books, action.payload], error: null };
    case ActionTypes.REMOVE_BOOK:
      return { ...state, books: state.books.filter(book => book._id !== action.payload), error: null };
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const BookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books');
        dispatch({ type: ActionTypes.SET_BOOKS, payload: response.data });
      } catch (error) {
        dispatch({ type: ActionTypes.SET_ERROR, payload: 'Error fetching books' });
      }
    };

    fetchBooks();
  }, []);

  const addBook = async (bookData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/books', bookData);
      dispatch({ type: ActionTypes.ADD_BOOK, payload: response.data });
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: 'Error adding book' });
    }
  };

  const removeBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${bookId}`);
      dispatch({ type: ActionTypes.REMOVE_BOOK, payload: bookId });
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: 'Error deleting book' });
    }
  };

  return (
    <BookContext.Provider value={{ ...state, addBook, removeBook }}>
      {children}
    </BookContext.Provider>
  );
};

const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBookContext must be used within a BookProvider');
  }
  return context;
};

export { BookProvider, useBookContext, ActionTypes };

