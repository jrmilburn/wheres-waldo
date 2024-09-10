import styles from './root.module.css';
import { NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';
import Characters from './characters';

export default function Root({ gameState, handleClick }) {
    const [foundCharacters, setFoundCharacters] = useState([]);

    const handleHomeClick = () => {
        handleClick(false);
    };

    const handleCharacterFound = (character) => {
        setFoundCharacters((prevFoundCharacters) => [...prevFoundCharacters, character]);
    };

    return (
        <>
            {gameState ? (
                <Characters foundCharacters={foundCharacters} onCharacterFound={handleCharacterFound} />
            ) : (
                <div className={styles["navbar"]}>
                    <ul>
                        <li><NavLink to="/" onClick={handleHomeClick}>Home</NavLink></li>
                        <li><NavLink to="/leaderboard">Leaderboard</NavLink></li>
                    </ul>
                </div>
            )}

            <div className={styles["main"]}>
                <Outlet />
            </div>
        </>
    );
}