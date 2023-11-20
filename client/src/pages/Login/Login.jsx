// src/pages/Login.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LoginContainer = styled.div`
  background:white;
  color: black;
  padding: 20px;
  max-width: 400px;
  height: 800px;
  margin: 0 auto;
`;

const Title = styled.h2`
  background: linear-gradient(45deg, #ff00cc, #3333cc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
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

const Login = () => {
  return (
    <LoginContainer>
      <Title>Login Page</Title>
      <StyledForm>
        <StyledInput type="text" name="username" placeholder="Username" />
        <StyledInput type="password" name="password" placeholder="Password" />
        <GradientButton type="submit">Login</GradientButton>
      </StyledForm>

      {/* Link to the Register page */}
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </LoginContainer>
  );
};

export default Login;
