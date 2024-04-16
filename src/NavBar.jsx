// NavBar.jsx
import React, { useState } from "react";
import DarkButton from './DarkButton';
import Login from './Login';
import { Link } from "react-router-dom";
 // Import useHistory from react-router-dom
import './navBar.css';

const NavBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
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
                </div>
            </nav>
           
        </>
    );
};

export default NavBar;
