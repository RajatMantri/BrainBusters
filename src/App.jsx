import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from './Login';
import SignUp from './SignUp';
import HomePage from './HomePage';
import StudentHome from "./StudentHome"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage type='home'/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/studentHome" element={<StudentHome type='student'/>} />
      </Routes>
    </div>
  );
}

export default App;
