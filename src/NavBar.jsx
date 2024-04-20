import React, { useState } from "react";
import DarkButton from './DarkButton';
import { Link } from "react-router-dom";

const NavBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleCreateMenu = () => {
        setIsCreateMenuOpen(!isCreateMenuOpen);
    };
    
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
                    {props.type === 'home' && (
                        <>
                        <Link to='/signup'><button>Sign-Up</button></Link>
                        <Link to="/login"><button>Login</button></Link>
                        </>
                    )}

                    {props.type === 'student' && (
                        <div className="dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown} onTouchStart={toggleDropdown}>
                            <button className="dropbtn">{props.username}</button>
                            {isOpen && (
                                <div className="dropdown-content">
                                    <a href="#">My Profile</a>
                                    <a href="#">Log Out</a>
                                </div>
                            )}
                        </div>
                    )}

                    {props.type === 'admin' && (
                        <Link to={`/adminHome/previousQuiz/${props.username}`} className="link-button"><button>Previous Quiz</button></Link>
                    )}
                    
                    {props.type === 'admin' && (
                        <div className="dropdown" onMouseEnter={toggleCreateMenu} onMouseLeave={toggleCreateMenu} onTouchStart={toggleCreateMenu}>
                            <button className="dropbtn">+</button>
                            {isCreateMenuOpen && (
                                <div className="dropdown-content">
                                    <Link to={`/adminHome/createQuiz/${props.username}`} >Quiz</Link>
                                    <Link to={`/adminHome/createTeam/${props.username}`} >Team</Link>
                                </div>
                            )}
                        </div>
                    )}

                    {props.type === 'admin' && (
                        <div className="dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown} onTouchStart={toggleDropdown}>
                            <button className="dropbtn">{props.username}</button>
                            {isOpen && (
                                <div className="dropdown-content">
                                    <a href="#">My Profile</a>
                                    <a href="#">Log Out</a>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </nav>
           
        </>
    );
};

export default NavBar;
