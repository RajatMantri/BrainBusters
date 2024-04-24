import React, { useState, useEffect } from "react";
import { Link,useParams } from "react-router-dom";
import axios from "axios";

const Result = () => {
  const [attemptedQuizzes, setAttemptedQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();

  useEffect(() => {
    const fetchAttemptedQuizzes = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getAttemptedQuizzes/${username}`);
        console.log("response recieved: ");
        setAttemptedQuizzes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching attempted quizzes:', error);
        setLoading(false);
      }
    };

    fetchAttemptedQuizzes();
  }, [username]);

  return (
    <div>
      <h2>Attempted Quizzes</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {attemptedQuizzes.map((quiz) => (
            <li key={quiz._id}>
              <span>{quiz.title}</span>
              <Link to={`/quiz/${quiz.quizId}/${username}/result`}>
                <button>View Result</button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Result;
