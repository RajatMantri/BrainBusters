// AddQuizToTeam.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddQuizToTeam = () => {
  const [quizzes, setQuizzes] = useState([]);
  const { teamId,username } = useParams();
  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
        const response = await axios.get(`http://localhost:4000/quizzes/${username}`);
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const handleAddQuizToTeam = async (quizId) => {
    try {
      const response = await axios.put(`http://localhost:4000/${teamId}/quizzes/${quizId}`);
      console.log(response.data.message);
    } catch (error) {
      console.error('Error adding quiz to team:', error);
    }
  };
  
  return (
    <div>
      <h2>Add Quiz to Team</h2>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz._id}>
            {quiz.title}
            <button onClick={() => handleAddQuizToTeam(quiz._id)}>Add to Team</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddQuizToTeam;
