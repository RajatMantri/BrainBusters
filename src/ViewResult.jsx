import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewResult = () => {
  const { quizId, username } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [score, setScore] = useState(0);
  const [totalScore, settotalScore] = useState(0);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        // Fetch the quiz data for the given quizId
        const response = await axios.get(`http://localhost:4000/getResponse/${quizId}/${username}`);
        // console.log("response: "+JSON.stringify(response.data));
        setQuizData(response.data);
        calculateScore(response.data);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchQuizData();
  }, [quizId]);

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
