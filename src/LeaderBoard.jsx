import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const LeaderBoard = () => {
  const { quizId } = useParams(); // Get quizId from URL parameters
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
          console.log("quizId: "+quizId);
        const response = await axios.get(`http://localhost:4000/leaderboard/${quizId}`);
        setLeaderboardData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching leaderboard data');
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, [quizId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((response, index) => (
            <tr key={response._id}>
              <td>{index + 1}</td>
              <td>{response.username}</td>
              <td>{response.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;
