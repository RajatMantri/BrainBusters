import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AttemptQuiz = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [responses, setResponses] = useState({});

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

  const handleAnswerSelection = (questionId, selectedOption) => {
    setQuiz(prevQuiz => {
      const updatedQuestions = prevQuiz.questions.map(question => {
        if (question._id === questionId) {
          return { ...question, selectedAnswer: selectedOption };
        }
        return question;
      });
      return { ...prevQuiz, questions: updatedQuestions };
    });
    // console.log('Quiz submitted successfully!: '+);
  };

  const handleSubmit = async () => {
    try {
      // Assuming you have a backend endpoint to handle quiz submissions
      console.log('Quiz submitted successfully!: '+JSON.stringify(quiz));
      await axios.post(`http://localhost:4000/SaveResponse`, JSON.stringify(quiz));
      // Optionally, you can redirect the user or show a success message
    } catch (error) {
      console.error('Error submitting quiz:', error);
      // Handle error, show an error message, etc.
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
                {question.options.map((option, index) => (
                  <li key={option}>
                    <input
                      type="radio"
                      name={`question-${question._id}`}
                      value={index}
                      onChange={(e) => handleAnswerSelection(question._id, e.target.value)}
                    />
                    {option}
                  </li>
                ))}
              </ul>
            )}
            {question.type === 'trueFalse' && (
              <div>
                <input
                  type="radio"
                  name={`question-${question._id}`}
                  value="true"
                  onChange={(e) => handleAnswerSelection(question._id, e.target.value)}
                />
                True
                <input
                  type="radio"
                  name={`question-${question._id}`}
                  value="false"
                  onChange={(e) => handleAnswerSelection(question._id, e.target.value)}
                />
                False
              </div>
            )}
            {question.type === 'paragraph' && (
              <textarea
                rows="4"
                cols="50"
                placeholder="Type your answer here..."
                onChange={(e) => handleAnswerSelection(question._id, e.target.value)}
              ></textarea>
            )}
          </li>
        ))}
      </ol>
      <button onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
};

export default AttemptQuiz;
