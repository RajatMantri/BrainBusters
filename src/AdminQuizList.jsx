// QuizList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const QuizList = () => {
  const { username } = useParams();
  const [quizzes, setQuizzes] = useState([]);

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

  const handleDeleteQuiz = async (quizId) => {
    try {
      await axios.delete(`http://localhost:4000/quizzes/${quizId}`);
      setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
      console.log('Quiz deleted successfully');
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  return (
    <div>
      <h2>Quizzes associated with {username}</h2>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz._id}>
            {quiz.title}
            <button style={{ backgroundColor: 'red' }} onClick={() => handleDeleteQuiz(quiz._id)}>Delete</button>
            <Link to={`/quiz/${quiz._id}`}><button>View Quiz</button></Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
