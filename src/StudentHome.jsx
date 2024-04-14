import React from "react";
import NavBar from "./NavBar";
import './navBar.css';
import Footer from "./Footer";
import './studentHome.css';

const StudentHome = (props)=>{
    // Mock data for recent quizzes (replace this with actual data)
    const recentQuizzes = [
        { name: "Quiz 1", score: 80 },
        { name: "Quiz 2", score: 75 },
        { name: "Quiz 3", score: 90 }
    ];

    return (
        <>
            <NavBar 
                type={props.type}
                username={props.username}
            />

            <div className="jumbotron">
                <h1><u>Welcome {props.username}!</u></h1>
            </div>
         
            <div className="recent-quizzes ">
                {recentQuizzes.map((quiz, index) => (
                    <div key={index} className="quiz-details container">
                    <img src="https://via.placeholder.com/250" alt="Feature Image 2" />
                        <h3>{quiz.name}</h3>
                        <p>Score: {quiz.score}</p>
                        <p>Time: </p>
                        <p>Rank: </p>
                        <p>Accuracy: </p>
                        
                        <button>Retake Quiz</button>
                        <br />
                        <button>See Results</button>
                    </div>
                ))}
            </div>

            <Footer />
        </>
    );
}

export default StudentHome;
