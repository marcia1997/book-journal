import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';

const LoginContainer = styled.div`
  background-color: white;
  color: black;
  padding: 20px;
  max-width: 400px;
  height: 400px;
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

const LoginLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 10px;
  text-decoration: none;
  color: #3333cc;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorText = styled.span`
  color: red;
  margin-top: 10px;
`;

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });

      if (res.data) {
        navigate("/home"); 
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data); // Set specific error message from the server
      } else {
        setError("Something went wrong!"); // Default error message
      }
      console.error(err);
    }
  };

  return (
    <LoginContainer>
      <Title>Login Page</Title>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <StyledInput
          type="password"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <GradientButton type="submit">
          Login
        </GradientButton>
      </StyledForm>
      <LoginLink to="/register">Register</LoginLink>
      {error && <ErrorText>Something went wrong!</ErrorText>}
    </LoginContainer>
  );
};

export default Login;
