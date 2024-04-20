const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
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

const teamSchema = new mongoose.Schema({
  teamName: String,
  Code: String,
  Students: [{ type: String }], // Array of student usernames
  Owner: String // Owner's username of the quiz
});

const quizSchema = new mongoose.Schema({
  title: String,
  questions: [{
    id: Number,
    title: String,
    type: { type: String, enum: ['multipleChoice', 'trueFalse', 'paragraph'] },
    options: { type: [String], default: [] },
    correctAnswer: { type: mongoose.Schema.Types.Mixed, default: null }
  }]
});

const Quiz = mongoose.model('Quiz', quizSchema);
const Team = mongoose.model('Team', teamSchema);
const FormDataModel = mongoose.model('FormData', formDataSchema);

app.use(bodyParser.json());
app.use(cors()); // Use CORS middleware to allow cross-origin requests

// Handle form submission
app.post('/submitSignUp', async (req, res) => {
  try {
    const formData = req.body;
    
    // Check if the username already exists
    const existingUser = await FormDataModel.findOne({ username: formData.username });
    if (existingUser) {
      return res.status(400).send('Username already exists');
    }
    
    // If the username is unique, save the new user data
    const newFormData = new FormDataModel(formData);
    await newFormData.save();
    res.status(200).send('Data saved successfully');
  } catch (error) {
    res.status(500).send('Error saving data');
  }
});


app.post('/submitLogin', async (req, res) => {
  const loginData = req.body;
  try {
    const user = await FormDataModel.findOne(loginData);
    if(user){
      res.json(user);
    }
    else res.status(401).send("Unauthorized");
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal server error');
  }
});

app.post('/createTeam', async (req, res) => {
  try {
    const code = generateRandomCode(6); // Function to generate a random code
    const team = new Team({teamName: req.body.teamName,Code:code, Students: [], Owner:req.body.username }); // Pass ownerUsername as owner
    await team.save();
    res.status(201).json({ message: 'Team created successfully', team });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create team', error });
  }
});

function generateRandomCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

app.post('/submitQuiz', async (req, res) => {
  try {
    const { title, questions } = req.body;
    const newQuiz = new Quiz({ title, questions });
    await newQuiz.save();
    res.status(201).json({ message: 'Quiz submitted successfully'});
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit quiz', error });
  }

});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
