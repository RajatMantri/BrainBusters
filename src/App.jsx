import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from './Login';
import SignUp from './SignUp';
import HomePage from './HomePage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage type='home'/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
