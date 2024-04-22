// QuizList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const TeamList = () => {
  const { username } = useParams();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/teams/${username}`);
      //console.log(response.data);
      setTeams(response.data);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  const handleDeleteTeam = async (teamId) => {
    try {
      await axios.delete(`http://localhost:4000/teams/${teamId}`);
      setTeams(teams.filter((team) => team._id !== teamId));
      console.log('Team deleted successfully');
    } catch (error) {
      console.error('Error deleting team:', error);
    }
  };

  return (
    <div>
      <h2>Teams associated with {username}</h2>
      <ul>
        {teams.map((team) => (
          <li key={team._id}>
            <strong>Team Name:</strong> {team.teamName}<br />
            <strong>Team Code:</strong> {team.Code}<br /> 
             <strong>Owner:</strong> {team.Owner}<br />
             <strong>Students:</strong> {team.Students.join(', ')}<br />
            <button style={{ backgroundColor: 'red' }} onClick={() => handleDeleteTeam(team._id)}>Delete Team</button>
            {/* Optionally, you can add a link to view team details */ }
             <Link to={`/team/${team._id}`}><button>View Quiz</button></Link>
             <Link to={`/quizzes/${team._id}/${username}`}><button>Add Quiz</button></Link>
             <Link to={`/quizzes/delete/${team._id}/${username}`}><button style={{ backgroundColor: 'red' }}>Delete Quiz</button></Link>
             
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamList;
