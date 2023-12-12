// Context.js

import React, { createContext, useReducer, useRef } from 'react';
import axios from 'axios';

// Definir el estado inicial del contexto
const initialState = {
  user: null,
  isFetching: false,
  error: null,
  dispatch: () => {},
};

// Crear el contexto
const AuthContext = createContext(initialState);

// Definir las acciones que modificarán el estado
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isFetching: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload, isFetching: false, error: null };
    case 'LOGIN_FAILURE':
      return { ...state, user: null, isFetching: false, error: 'Login failed' };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};

// Crear el componente proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const userRef = useRef();

  // Función para iniciar sesión
  const login = async (username, password) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await axios.post('/auth/login', { username, password });
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE' });
      throw err; // Rethrow the error for the component to handle
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, userRef }}>
      {children}
    </AuthContext.Provider>
  );
};

// Crear un hook para usar el contexto
export const useAuth = () => {
  return React.useContext(AuthContext);
};
