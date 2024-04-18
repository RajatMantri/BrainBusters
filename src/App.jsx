import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from './Login';
import SignUp from './SignUp';
import HomePage from './HomePage';
import StudentHome from "./StudentHome"
import AdminHome from './AdminHome';
import CreateQuiz from './CreateQuiz';
import './studentHome.css';
import './dropdown.css';
import './createQuiz.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage type='home'/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/studentHome/:username" element={<StudentHome type='student' />} />
        <Route path="/adminHome/:username" element={<AdminHome type='admin' />} />
        <Route path="/adminHome/:username/createQuiz" element={<CreateQuiz/>} />
      </Routes>
    </div>
  );
}

export default App;
