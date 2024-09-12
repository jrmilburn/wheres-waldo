import styles from './leaderboard.module.css';
import { useState, useEffect } from 'react';

import Score from './score';

export default function Leaderboard( { token } ) {
    const [leaderBoard, setLeaderBoard] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/leaderboard', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        })
        .then(response => response.json())
        .then(data => {
            setLeaderBoard(data)
        }) 
        .catch(error => console.error('Error fetching leaderboard data:', error));
    }, []);

    return (
        <>
        <div className={styles.leaderboard}>
            <h2>Leaderboard</h2>
            {leaderBoard.map((score, index) => (
                <Score key={index} rank={index + 1} email={score.email} time={((new Date(score.endedAt).getTime())-(new Date(score.startedAt).getTime()))/1000} />
            ))}
        </div>
        </>
    );
}