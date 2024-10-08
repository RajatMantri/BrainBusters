import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/submitLogin', formData);
      
      if (response.status === 200) {
        const user = response.data;
        const userType = user.userType;
        
        // Navigate based on user type using useNavigate
        if (userType === 'student') {
          navigate(`/studentHome/${formData.username}`);
        } else {
          navigate(`/adminHome/${formData.username}`);
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.response && error.response.status === 401 && error.response.data === 'Unauthorized') {
        alert('User does not exist');
      } else {
        alert('Error submitting form. Please try again later.');
      }
    }
  };

  return (
    <div className="LogInContainer">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
