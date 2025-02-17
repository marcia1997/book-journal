import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Contexto de autenticación
import { BookProvider } from './context/BookContext'; // Contexto de libros
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import AddBook from './pages/AddBook/AddBook';
import Books from './components/books.jsx'; 
import BookDetails from './pages/BookDetails.jsx';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <BookProvider> 
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/book" element={<AddBook />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<BookDetails />} /> 
          </Routes>
        </BookProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;

