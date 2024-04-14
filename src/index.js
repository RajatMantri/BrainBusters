import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import NavBar from './NavBar';
import HomePage from './HomePage';
import StudentHome from './StudentHome';
import './index.css';

ReactDOM.render(<>
 <StudentHome 
    type='student'
    username='prakhar123'
    recentQuizzes={[1,2,3,4]}
  />
  </>,
  document.getElementById('root')
);
