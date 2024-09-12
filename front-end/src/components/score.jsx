import styles from './leaderboard.module.css';

export default function Score({ rank, email, time }) {
    return (
        <div className={styles.score}>
            <span>{rank}</span>
            <span>{email}</span>
            <span>{time}s</span>
        </div>
    );
}