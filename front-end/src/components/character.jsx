import styles from './character.module.css';

export default function Character({ image, name, found }) {

    return (
        <div className={`${styles.character} ${found ? styles.found : ''}`} >
            <img src={image} alt="character"/>
            <h3 className={styles['character-name']}>{name}</h3>
        </div>
    );
}