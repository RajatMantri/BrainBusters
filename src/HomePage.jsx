import React from "react";
import DarkButton from './DarkButton';
import Footer from "./Footer";
import NavBar from "./NavBar";
import './navBar.css';

const HomePage = (props) => {
    return (
        <>
            <NavBar 
                type={props.type}
            />

            <div className="jumbotron">
                <h1>Welcome to our Quizzing Website</h1>
                <p>Engage, Learn, and Have Fun!</p>
            </div>

            <div className="features">
                <div className="feature">
                    <img src="https://via.placeholder.com/200" alt="Feature Image 1" />
                    <div className="feature-content">
                        <h3 className="feature-title">Interactive Quizzes</h3>
                        <p className="feature-description">Engage users with interactive quizzes that test their knowledge.</p>
                    </div>
                </div>
                <div className="feature">
                    <img src="https://via.placeholder.com/200" alt="Feature Image 2" />
                    <div className="feature-content">
                        <h3 className="feature-title">Customizable Themes</h3>
                        <p className="feature-description">Choose from a variety of themes to customize the appearance of quizzes.</p>
                    </div>
                </div>
                <div className="feature">
                    <img src="https://via.placeholder.com/500" alt="Feature Image 3" />
                    <div className="feature-content">
                        <h3 className="feature-title">Leaderboards</h3>
                        <p className="feature-description">Track users' performance and display top scores on leaderboards.</p>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default HomePage;
