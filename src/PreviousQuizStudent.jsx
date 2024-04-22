import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PreviousQuizStudent = () => {
  const { username } = useParams();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/student/${username}/quizzes`);
        console.log("Response data:", response.data); // Log the response data
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, [username]); // Dependency array added to re-fetch quizzes when username changes

  return (
    <div>
      <h2>Quizzes associated with {username}</h2>
      <ul>
        {quizzes.map((team) => (
          <li key={team._id}>
            <h3>{team.teamName}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PreviousQuizStudent;
