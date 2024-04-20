// ViewQuiz.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewQuiz = ({}) => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/quiz/${quizId}`);
      setQuiz(response.data);
    } catch (error) {
      console.error('Error fetching quiz:', error);
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{quiz.title}</h2>
      <h3>Questions:</h3>
      <ol>
        {quiz.questions.map((question) => (
          <li key={question._id}>
            <h4>{question.title}</h4>
            <p>Type: {question.type}</p>
            {question.type === 'multipleChoice' && (
              <ul>
                {question.options.map((option) => (
                  <li key={option}>{option}</li>
                ))}
                <p>Correct Answer: {question.options[question.correctAnswer]}</p>
                {console.log(question.options)}
               
              </ul>
            )}
            {question.type === 'trueFalse' && (
              <p>Correct Answer: {question.correctAnswer === 0 ? 'True' : 'False'}</p>
            )}
            {question.type === 'paragraph' && (
              <p>Correct Answer: {question.correctAnswer}</p>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ViewQuiz;
