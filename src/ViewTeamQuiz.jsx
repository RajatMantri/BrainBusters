import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ViewQuiz = () => {
  const { teamId } = useParams();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/teams/${teamId}/quizzes`);
      console.log(response.data);
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  return (
    <div>
      <h2>Quizzes</h2>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz._id}>
            <Link to={`/quiz/${quiz._id}`}>
              <strong>Title:</strong> {quiz.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewQuiz;
