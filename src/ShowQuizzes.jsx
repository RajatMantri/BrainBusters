import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const PreviousQuizStudent = () => {
  const { username } = useParams();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/student/${username}/quizzes`);
        console.log("Response data:", response.data); // Log the response data
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, [username]); // Dependency array added to re-fetch teams when username changes

  return (
    <div>
      <h2>Teams associated with {username}</h2>
      <ul>
        {teams.map((team) => (
          <li key={team._id}>
            <h3>{team.teamName}</h3>
            <Link to={`/team/${username}/${team._id}`}>
              <button>View Quiz</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PreviousQuizStudent;
