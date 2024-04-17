import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import './signUp.css'
import './login.css'
import './homePage.css'
// import './navBar.css';
// import './login.css';


import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
  <>
  <BrowserRouter>
   <App/>
   </BrowserRouter>
  </>
  ,document.getElementById('root')
);
