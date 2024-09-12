import styles from './root.module.css';
import { NavLink, Outlet } from 'react-router-dom';
import Characters from './characters';
import { useEffect, useState } from 'react';

export default function Root({ gameState, setGameState, handleClick, foundCharacters, characters, setFoundCharacters, timer }) {

    const NUM_CHARACTERS = 4;
    const [showPopup, setShowPopup] = useState(false);

    const handleHomeClick = () => {
        handleClick(false);
    };

    useEffect(() => {
        if(foundCharacters.length === NUM_CHARACTERS && gameState){
            setShowPopup(true);
            setGameState(false);
        }
    }, [foundCharacters, NUM_CHARACTERS, gameState]);

    return (
        <>
            {gameState ? (
                <Characters foundCharacters={foundCharacters} characters={characters} />
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

            {showPopup && (
            <>
              <div className={styles["popup-overlay"]} onClick={() => setShowPopup(false)}></div>
              <div className={styles["popup"]}>
                <p>Congratulations! You found all the characters in {timer}s!</p>
                <div className={styles["buttons"]}>
                    <NavLink to='/'><button onClick={() => {
                        setShowPopup(false);
                        handleHomeClick();
                        setFoundCharacters([]);
                    }}>Close</button></NavLink>
                    <NavLink to='/leaderboard'><button onClick={() => setShowPopup(false)}>Leaderboard</button></NavLink>
                </div>
              </div>
            </>
        )}
        </>
    );
}