
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext.js";
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import AddBook from './pages/AddBook/AddBook.jsx';
import Books from './components/books.jsx';

const App = () => {
  return (
    
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/book" element={<AddBook />} />
          <Route path="/books" element={<Books />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};
export default App;
