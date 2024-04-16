import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

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
      // console.log('Response:', response.data); // Log the entire response for debugging
      // console.log('formData: ',formData.username+' formData: ',formData.password);
      if (response.data && response.data.username===formData.username&&response.data.password===formData.password) {
        alert('Login successful!');
      }
      else{
        alert('User does not exist');
      }
    } catch (error) {
      console.error('Errors:', error.message); // Log network errors or other exceptions
    }
  };

  return (
    <div className="container">
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
