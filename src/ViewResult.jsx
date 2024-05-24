import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewResult = () => {
  const { quizId, username } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [score, setScore] = useState(0);
  const [totalScore, settotalScore] = useState(0);
  const [attempts, setAttempts] = useState([]);
  const [selectedAttempt, setSelectedAttempt] = useState(null);

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        // Fetch the quiz data for the given quizId
        const response = await axios.get(`http://localhost:4000/getResponse/${quizId}/${username}`);
        // console.log("response: "+JSON.stringify(response.data));
        setQuizData(response.data);
        calculateScore(response.data);
        // setAttempts(response.data.attempt+1);
      
        const attemptNumbers = Array.from({ length: response.data.attempt + 1 }, (_, i) => i);
        setAttempts(attemptNumbers);
      
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchAttempts();
  }, [quizId]);

  const fetchQuizData = async (attempt) => {
    try {
      const response = await axios.get(`http://localhost:4000/getResponse/${quizId}/${username}/${attempt}`);
      console.log("Attempt:", attempt);
      console.log("Response Data:", response.data);
      setQuizData(response.data);
      console.log("Quiz Data:", response.data); // Log the data being set
      calculateScore(response.data);
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

// Event handler for attempt change
const handleAttemptChange = (event) => {
  const selectedAttempt = parseInt(event.target.value);
  setSelectedAttempt(selectedAttempt);
  fetchQuizData(selectedAttempt); // Fetch quiz data for the selected attempt
};

const calculateScore = (quiz) => {
  let totalQuestions = quiz.questions.length;
  let correctAnswers = 0;
//   console.log("quiz: "+quiz)
  quiz.questions.forEach((question) => {
    // Check if selectedAnswer matches correctAnswer
    if (question.selectedAnswer == question.correctAnswer) {
      correctAnswers++;
    }
    // console.log("selectedAnswer: "+question.selectedAnswer+" correctAnswer: "+question.correctAnswer);
  });
//   console.log("calculatedScore: "+calculatedScore);
//   console.log("correctAnswers: "+correctAnswers);
  setScore(correctAnswers);
  settotalScore(totalQuestions);
};


  return (
    <div>
      <h2>Quiz Result</h2>
      <div>
        <label htmlFor="attemptSelect">Select Attempt:</label>
        <select id="attemptSelect" onChange={handleAttemptChange} value={selectedAttempt}>
          {attempts.map((attempt, index) => (
            <option key={index} value={attempt}>
              Attempt {attempt}
            </option>
          ))}
        </select>
      </div>
      <p>Score: {score}/{totalScore}</p>
      {quizData && (
        <div>
          <h3>{quizData.title}</h3>
          <ul>
            {quizData.questions.map((question, index) => (
              <li key={index}>
                <p>{question.title}</p>
                <ul>
                  {question.options.map((option, optionIndex) => (
                    <li
                      key={optionIndex}
                      style={{
                        color:
                          question.selectedAnswer === option
                            ? option === question.correctAnswer
                              ? "green"
                              : "red"
                            : null,
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ViewResult;
