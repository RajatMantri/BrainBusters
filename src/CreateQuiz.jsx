import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';
import './createQuiz.css';

const Quiz = () => {
  const [quizTitle, setQuizTitle] = useState("My Quiz");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const username = useParams();
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: "Default Question",
      type: "multipleChoice",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: null
    }
  ]);

  const handleQuizTitleChange = (e) => {
    setQuizTitle(e.target.value);
  };

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
  };

  const handleQuestionTitleChange = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].title = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleQuestionTypeChange = (index, e) => {
    const type = e.target.value;
    let updatedOptions = [];
  
    if (type === 'multipleChoice') {
      updatedOptions = ["Option 1", "Option 2", "Option 3", "Option 4"];
    }
  
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = type;
    updatedQuestions[index].options = type === 'multipleChoice' ? updatedOptions : [];
    
    // Set correctAnswer for True/False questions
    if (type === 'trueFalse') {
      updatedQuestions[index].correctAnswer = 0; // Default to 0 (true)
    } else if (type === 'paragraph') {
      updatedQuestions[index].correctAnswer = ''; // Clear correctAnswer for paragraph questions
    }
  
    setQuestions(updatedQuestions);
  };

const handleOptionChange = (questionIndex, optionIndex, e) => {
  const updatedQuestions = [...questions];
  if (updatedQuestions[questionIndex].type === 'paragraph') {
    updatedQuestions[questionIndex].correctAnswer = e.target.value;
  } else {
    updatedQuestions[questionIndex].options[optionIndex] = e.target.value;
  }
  setQuestions(updatedQuestions);
};

  const handleCorrectAnswerChange = (questionIndex, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctAnswer = index;
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      title: "New Question",
      type: "multipleChoice",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: null
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (questionIndex) => {
    const updatedQuestions = questions.filter((_, index) => index !== questionIndex);
    setQuestions(updatedQuestions.length === 0 ? [{ id: 1, title: "Default Question", type: "multipleChoice", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correctAnswer: null }] : updatedQuestions);
  };

  const handleSubmitQuiz = () => {
    const quizData = {
      username: username,
      title: quizTitle,
      questions: questions
    };
    
    axios.post('http://localhost:4000/submitQuiz', quizData)
      .then(response => {
        // Handle successful submission
        console.log('Quiz submitted successfully:');
      })
      .catch(error => {
        // Handle error
        console.error('Error:', error);
      });
  };

  return (
    <div className="quiz-container">
      <h2 className={`quiz-title ${isEditingTitle ? 'editing' : ''}`} onClick={handleTitleClick}>
        {isEditingTitle ? (
          <input
            type="text"
            value={quizTitle}
            onChange={handleQuizTitleChange}
            onBlur={handleTitleBlur}
            autoFocus
          />
        ) : (
          quizTitle
        )}
      </h2>

      {questions.map((question, index) => (
        <div key={question.id} className="question-container">
          <input
            type="text"
            value={question.title}
            onChange={(e) => handleQuestionTitleChange(index, e)}
            className="question-input"
          />
          <select
            value={question.type}
            onChange={(e) => handleQuestionTypeChange(index, e)}
            className="select-type"
          >
            <option value="multipleChoice">MCQs</option>
            <option value="trueFalse">True/False</option>
            <option value="paragraph">Paragraph</option>
          </select>

          {question.type === 'multipleChoice' && (
  <div>
    {question.options.map((option, optionIndex) => (
      <div key={optionIndex} className="option-container">
        <input
          type="radio"
          name={`correctAnswer${index}`}
          checked={question.correctAnswer === optionIndex}
          onChange={() => handleCorrectAnswerChange(index, optionIndex)}
          className="option-radio"
        />
        <input
          type="text"
          value={option}
          onChange={(e) => handleOptionChange(index, optionIndex, e)}
          className="option-input"
        />
      </div>
    ))}
  </div>
)}

{question.type === 'trueFalse' && (
  <div>
    <div className="option-container">
      <input
        type="radio"
        name={`trueFalseOption${index}`}
        value="True"
        checked={question.correctAnswer === 0}
        onChange={() => handleCorrectAnswerChange(index, 0)}
        className="option-radio"
      />
      <label className="correct-answer-label">True</label>
    </div>
    <div className="option-container">
      <input
        type="radio"
        name={`trueFalseOption${index}`}
        value="False"
        checked={question.correctAnswer === 1}
        onChange={() => handleCorrectAnswerChange(index, 1)}
        className="option-radio"
      />
      <label className="correct-answer-label">False</label>
    </div>
  </div>
)}

          {question.type === 'paragraph' && (
            <div className="option-container">
              <input
                type="text"
                placeholder="Type your answer here..."
                onChange={(e) => handleOptionChange(index, 0, e)}
                className="option-input"
              />
            </div>
          )}

          <div className="button-container">
            <button onClick={() => handleDeleteQuestion(index)} className="delete-button">Delete Question</button>
          </div>
        </div>
      ))}
      
      <div className="button-container">
        <button onClick={handleAddQuestion} className="add-button">Add Question</button>
      </div>

      <div className="button-container">
       <Link to={`/adminHome/${username.username}`}><button onClick={handleSubmitQuiz} className="submit-button">Submit Quiz</button></Link>
      </div>
    </div>
  );
};

export default Quiz;
