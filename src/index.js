import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import './signUp.css'
import './login.css'
import './homePage.css'
import './studentHome.css';
import './dropdown.css';
import './createQuiz.css';

import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
  <>
  <BrowserRouter>
   <App/>
   </BrowserRouter>
  </>
  ,document.getElementById('root')
);
