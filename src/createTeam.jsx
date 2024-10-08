import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import { useParams } from "react-router-dom";

const CreateTeam = () => {
  const [teamName, setTeamName] = useState('');

  const handleTeamChange = (event) => {
    setTeamName(event.target.value);
  };

  const { username } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await axios.post('http://localhost:4000/createTeam', {teamName,username});
        console.log('Team created successfully');
        setTeamName('');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="team-component">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter team name"
          value={teamName}
          onChange={handleTeamChange}
          className="team-input"
        />

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default CreateTeam;