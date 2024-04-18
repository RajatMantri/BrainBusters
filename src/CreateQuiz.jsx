import React, { useState } from 'react';
import './createQuiz.css';

const Quiz = () => {
  const [quizTitle, setQuizTitle] = useState("My Quiz");
  const [isEditingTitle, setIsEditingTitle] = useState(false);

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
    } else if (type === 'trueFalse') {
      updatedOptions = ["True", "False"];
    }
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = type;
    updatedQuestions[index].options = updatedOptions;
    updatedQuestions[index].correctAnswer = null;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = e.target.value;
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
    if (updatedQuestions.length === 1) {
      // If only the default question remains, replace with the default question
      const defaultQuestion = {
        id: 1,
        title: "Default Question",
        type: "multipleChoice",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        correctAnswer: null
      };
      setQuestions([defaultQuestion]);
    } else {
      setQuestions(updatedQuestions);
    }
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
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="option-container">
                  <input
                    type="radio"
                    name={`trueFalseOption${index}`}
                    value={option}
                    checked={question.correctAnswer === optionIndex}
                    onChange={() => handleCorrectAnswerChange(index, optionIndex)}
                    className="option-radio"
                  />
                  <label className="correct-answer-label">{option}</label>
                </div>
              ))}
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
    </div>
  );
};

export default Quiz;
