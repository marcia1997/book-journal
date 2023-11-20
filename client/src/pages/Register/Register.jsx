// src/pages/Register.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const RegisterContainer = styled.div`
  background-color: white;
  color: black;
  padding: 20px;
  max-width: 400px;
  height:600px;
  margin: 0 auto;
`;

const Title = styled.h2`
  background: linear-gradient(45deg, #ff00cc, #3333cc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
  text-align: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const GradientButton = styled.button`
  background: linear-gradient(45deg, #ff00cc, #3333cc);
  color: white;
  padding: 12px;
  margin-top: 20px;
  border: none;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  border-radius: 4px;
`;

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here using the formData state
    console.log('Registration form submitted:', formData);
  };

  return (
    <RegisterContainer>
      <Title>Register Page</Title>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
        <StyledInput type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <StyledInput type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <GradientButton type="submit">Register</GradientButton>
      </StyledForm>

      {/* Link to the Login page */}
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </RegisterContainer>
  );
};

export default Register;
