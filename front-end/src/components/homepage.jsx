import styles from './homepage.module.css';

import { NavLink } from 'react-router-dom';

export default function Homepage({ handleClick }) {

    const startGame = () => {
        handleClick(true);
    }

    return (
        <>
            <div className={styles["homepage"]}>
                <h1>Where's Waldo?</h1>
                <p>Click on Waldo to win!</p>
                <NavLink to="gamescreen"><button onClick={startGame}>Start Game</button></NavLink>
            </div>
        </>
    )

}