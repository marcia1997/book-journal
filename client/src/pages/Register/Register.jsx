import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const RegisterContainer = styled.div`
  background-color: white;
  color: black;
  padding: 20px;
  max-width: 400px;
  height: 600px;
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

const RegisterLink = styled(Link)`
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

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    try {
      const res = await axios.post("http://localhost:5000/auth/register", formData);
      if (res.data) {
        navigate("/login");
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <RegisterContainer>
      <Title>Register</Title>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          placeholder="Enter your username..."
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <StyledInput
          type="text"
          placeholder="Enter your email..."
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <StyledInput
          type="password"
          placeholder="Enter your password..."
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <GradientButton type="submit">Register</GradientButton>
      </StyledForm>
      <RegisterLink to="/login">Login</RegisterLink>
      {error && <ErrorText>Something went wrong!</ErrorText>}
    </RegisterContainer>
  );
};

export default Register;
