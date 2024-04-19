import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import './createTeam.css'; // Import your CSS file for styling

const CreateTeam = () => {
  const [teamName, setTeamName] = useState('');
  const [ownerUsername, setUsername] = useState('');

  const handleTeamChange = (event) => {
    setTeamName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await axios.post('http://localhost:4000/createTeam', {teamName,ownerUsername});
        console.log('Team created successfully');
        setTeamName('');
        setUsername('');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="team-component">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Your Username"
          value={ownerUsername}
          onChange={handleUsernameChange}
          className="team-input"
        />
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