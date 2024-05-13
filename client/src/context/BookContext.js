// BookContext.js
import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

const BookContext = createContext();

const initialState = {
  books: [],
  error: null,
};

const ActionTypes = {
  ADD_BOOK: 'ADD_BOOK',
  SET_ERROR: 'SET_ERROR',
};

const bookReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD_BOOK:
      return {
        ...state,
        books: [...state.books, action.payload],
        error: null, // Clear error on successful action
      };
    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

const BookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);

  const addBook = async (bookData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/books', bookData);

      dispatch({
        type: ActionTypes.ADD_BOOK,
        payload: response.data,
      });
    } catch (error) {
      console.error('Error adding book:', error);
      dispatch({
        type: ActionTypes.SET_ERROR,
        payload: error.message,
      });
    }
  };

  const contextValue = {
    state,
    dispatch,
    actions: {
      addBook,
    },
  };

  return (
    <BookContext.Provider value={contextValue}>
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

