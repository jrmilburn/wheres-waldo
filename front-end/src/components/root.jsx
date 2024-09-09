import styles from './root.module.css';
import { NavLink, Outlet } from 'react-router-dom';

export default function Root() {


    return (
        <>
        
            <div className={styles["navbar"]}>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/leaderboard">Leaderboard</NavLink></li>
                </ul>
            </div>

            <div className={styles["main"]}>
                <Outlet />
            </div>

        </>
    )
}