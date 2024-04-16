import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import NavBar from './NavBar';
import HomePage from './HomePage';
import StudentHome from './StudentHome';
import './navBar.css';
import Login from './Login';
import './login.css';
import SignUp from './SignUp';

import {BrowserRouter,Routes,Route} from "react-router-dom";

ReactDOM.render(
  <>
  <BrowserRouter>
   <App />
   </BrowserRouter>
  </>
  ,
  document.getElementById('root')
);
