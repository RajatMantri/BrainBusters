import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from './Login';
import SignUp from './SignUp';
import HomePage from './HomePage';
import StudentHome from "./StudentHome"
import AdminHome from './AdminHome';
import CreateQuiz from './CreateQuiz';
import CreateTeam from "./createTeam";
import AdminQuizList from './AdminQuizList';
import ViewQuizAdmin from "./ViewQuizAdmin";
import AdminTeamList from './AdminTeamList';
import PreviousQuizStudent from "./PreviousQuizStudent";
import JoinTeam from './JoinTeam';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage type='home'/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/studentHome/:username" element={<StudentHome type='student' />} />
        <Route path="/adminHome/:username" element={<AdminHome type='admin' />} />
        <Route path="/adminHome/createQuiz/:username" element={<CreateQuiz/>} />
        <Route path="/adminHome/createTeam/:username" element={<CreateTeam/>} />
        <Route path="/adminHome/previousQuiz/:username" element={<AdminQuizList/>} />
        <Route path="/adminHome/previousTeam/:username" element={<AdminTeamList/>} />
        <Route path="/quiz/:quizId" element={<ViewQuizAdmin/>} />
        <Route path="/studentHome/JoinTeam/:username" element={<JoinTeam />} />
        <Route path="/studentHome/PreviousTeam/:username" element={<PreviousQuizStudent />} />
        <Route path="*" element={<div>Error</div>}/>
      </Routes>
    </div>
  );
}

export default App;
