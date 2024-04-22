import React, { useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

const JoinTeam = () => {
  const { username } = useParams();
  const [teamName, setTeamName] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:4000/joinTeam/${username}`, {
        teamName,
        code,
      });
      if (response.status === 200) {
        setMessage("Successfully joined the team!");
      } 
    } catch (error) {
        if(error.response.status==400) setMessage("Already Joined to the team");
        else {setMessage("Failed to join the team.rror");
      console.error("Error:", error);}
    }
  };

  return (
    <div>
      <h2>Join a Team</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="teamName">Team Name:</label>
          <input
            type="text"
            id="teamName"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="code">Code:</label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <button type="submit">Join</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default JoinTeam;
