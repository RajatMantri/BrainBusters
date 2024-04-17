import React, { useState } from 'react';
import axios from 'axios';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    email: '',
    userType: 'student' // Default to student
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
  
    try {
      // Update the URL to match the server's route
      const response = await axios.post('http://localhost:4000/submitSignUp', formData);
      console.log(response);
      
      // Clear form data after successful submission
      setFormData({
        username: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        email: '',
        userType: 'student' // Reset to default
      });
      alert('Sign up successful!');
      window.location.href = '/';
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data === 'Username already exists') {
        alert('Username already exists. Please choose a different one.');
      } else {
        alert('Error submitting form. Please try again later.');
      }
    }
  };
  

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} pattern="[0-9]*" minLength="10" maxLength="10" required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>User Type:</label>
          <select name="userType" value={formData.userType} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
