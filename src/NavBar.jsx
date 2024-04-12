import React from "react";
import DarkButton from './DarkButton';
import Footer from "./Footer";
const NavBar = () => {
    return (
        <>
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">FAQs</a></li>
                </ul>
                <div className="auth-buttons">
                    <DarkButton />
                    <button>Sign Up</button>
                    <button>Sign In</button>
                </div>
            </nav>

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

export default NavBar;
