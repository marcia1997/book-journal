import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Adjust the path if needed
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
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/book" element={<AddBook />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetails />} /> 
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
