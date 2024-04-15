const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS middleware

const PORT = 4000;
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/signupFormDB');

// Define a schema for your data
const formDataSchema = new mongoose.Schema({
  username: String,
  password: String,
  confirmPassword: String,
  phoneNumber: String,
  email: String,
  userType: String
});

const FormDataModel = mongoose.model('FormData', formDataSchema);

app.use(bodyParser.json());
app.use(cors()); // Use CORS middleware to allow cross-origin requests

// Handle form submission
app.post('/submitSignUp', async (req, res) => {
  try {
    const formData = req.body;
    const newFormData = new FormDataModel(formData);
    await newFormData.save();
    res.status(200).send('Data saved successfully');
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send('Error saving data');
  }
});

app.post('/submitLogin', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await FormDataModel.findOne({username,password});
    //console.log("user username: "+user.username);
    res.json(user);
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal server error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
