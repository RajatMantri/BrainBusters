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
import AddQuizToTeam from './AddQuizToTeam';
import ViewTeamQuiz from "./ViewTeamQuiz"
import DeleteQuiz from "./DeleteQuiz";
import ShowTeam from './ShowQuizzes';
import JoinTeam from './JoinTeam';
import ViewStudentQuiz from "./ViewStudentQuiz";
import AttemptQuiz from "./AttemptQuiz";

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
        <Route path="/quizzes/:teamId/:username" element={<AddQuizToTeam/>} />
        <Route path="/quizzes/delete/:teamId/:username" element={<DeleteQuiz/>} />
        <Route path="/team/:teamId" element={<ViewTeamQuiz/>} />
        <Route path="/team/:username/:teamId" element={<ViewStudentQuiz/>} />
        <Route path="/studentHome/PreviousTeam/:username" element={<ShowTeam/>} />
        <Route path="/studentHome/JoinTeam/:username" element={<JoinTeam/>} />
        <Route path="/quiz/:quizId/:username/attempt" element={<AttemptQuiz/>} />

        <Route path="*" element={<div>Error</div>}/>
      </Routes>
    </div>
  );
}

export default App;
