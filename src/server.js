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
  Owner: String, // Owner's username of the quiz
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }] // Array of quiz IDs associated with the team
});

const quizSchema = new mongoose.Schema({
  username: String,
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
   const username = req.body.username.username;
   const questions = req.body.questions;
   const title = req.body.title;

    // console.log(req.body);
    const newQuiz = new Quiz({ username, title, questions });
    await newQuiz.save();
    res.status(201).json({ message: 'Quiz submitted successfully'});
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit quiz', error });
  }
});

app.get('/quizzes/:username', async (req, res) => {
  const { username } = req.params;
  // console.log(username);
  try {
    // Find quizzes by username
    const quizzes = await Quiz.find({ 'username': username });
    // console.log(quizzes);
    if (!quizzes) {
      return res.status(404).json({ message: 'No quizzes found for the specified username' });
    }

    res.status(200).json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// server.js

app.delete('/quizzes/:quizId', async (req, res) => {
  const { quizId } = req.params;
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
    if (!deletedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error('Error deleting quiz:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Define routes
app.get('/quiz/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/teams/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const teams = await Team.find({ Owner: username });
    res.json(teams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/teams/:teamId', async (req, res) => {
  const { teamId } = req.params;
  try {
    await Team.findByIdAndDelete(teamId);
    res.json({ message: 'Team deleted successfully' });
  } catch (error) {
    console.error('Error deleting team:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/:teamId/quizzes/:quizId', async (req, res) => {
  const { teamId, quizId } = req.params;
  try {
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    // Check if the quiz is already added to the team
    if (team.quizzes.includes(quizId)) {
      return res.json({ message: 'Quiz already added to the team' });
    }
    // Add the quiz ID to the team's quizzes array
    team.quizzes.push(quizId);
    await team.save();

    res.json({ message: 'Quiz added to team successfully' });
  } catch (error) {
    console.error('Error adding quiz to team:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/teams/:teamId/quizzes', async (req, res) => {
  const { teamId } = req.params;
  try {
    const team = await Team.findById(teamId).populate('quizzes');
    if (!team) {
      return res.json({ message: 'Team not found' });
    }
    res.status(200).json(team.quizzes);
  } catch (error) {
    console.error('Error fetching quizzes for team:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/teams/:teamId/quizzes/:quizId', async (req, res) => {
  const { teamId, quizId } = req.params;
  try {
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Check if the quiz is associated with the team
    if (!team.quizzes.includes(quizId)) {
      return res.status(404).json({ message: 'Quiz not found in the team' });
    }

    // Remove the quiz ID from the team's quizzes array
    team.quizzes = team.quizzes.filter(q => q.toString() !== quizId);
    await team.save();

    res.status(200).json({ message: 'Quiz deleted from team successfully' });
  } catch (error) {
    console.error('Error deleting quiz from team:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post("/joinTeam/:username", async (req, res) => {
  const { teamName, code } = req.body;
  const { username } = req.params;

  try {
    // Check if team exists with given name and code
    const team = await Team.findOne({ teamName: teamName,Code: code });

    if (!team) {
      return res.status(404).json({ message: "Team not found." });
    }

    // Check if the username already exists in the team
    if (team.Students.includes(username)) {
      return res.status(400).json({ message: "Already joined the team." });
    }
     
    console.log("team: "+team);
    // Logic to add the student's username to the team
    team.Students.push(username);
    await team.save();

    res.status(200).json({ message: "Successfully joined the team." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to join the team." });
  }
});


app.get("/student/:username/quizzes", async (req, res) => {
  const { username } = req.params;

  try {
    const teams = await Team.find({ Students: username });

    console.log("quizzes: "+teams);

    res.status(200).json(teams);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ message: "Failed to fetch quizzes." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
