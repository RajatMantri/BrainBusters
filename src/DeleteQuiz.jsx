import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const DeleteQuiz = () => {
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

  const handleDeleteQuiz = async (quizId) => {
    try {
      await axios.delete(`http://localhost:4000/teams/${teamId}/quizzes/${quizId}`);
      setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
      console.log('Quiz deleted successfully');
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  return (
    <div>
      <h2>Quizzes created by {username}</h2>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz._id}>
            <Link to={`/quiz/${quiz._id}`}>
              <strong>Title:</strong> {quiz.title}
            </Link>
            <button onClick={() => handleDeleteQuiz(quiz._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteQuiz;
