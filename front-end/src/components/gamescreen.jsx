import snowlevel from '../assets/waldosnow.jpg';
import styles from './gamescreen.module.css';
import { useState } from 'react';

export default function GameScreen() {

    const [targetBox, setTargetBox] = useState(null);

    const handleClick = (e) => {

        const rect = e.target.getBoundingClientRect();
        const x = ((e.clientX - rect.left)/rect.width) *100;
        const y = ((e.clientY - rect.top)/rect.height)*100;

        console.log(x, y);

        setTargetBox({ x, y });

    };

    return (
        <>
            <div className={styles["waldo-app"]}>
              <div className={styles["image-container"]} onClick={handleClick}>
                <img
                  src={snowlevel}
                  alt="Where's Waldo"
                  className={styles["waldo-image"]}
                />
                {targetBox && (
                  <div
                    className={styles["target-box"]}
                    style={{
                      left: `${targetBox.x}%`,
                      top: `${targetBox.y}%`,
                    }}
                  />
                )}
              </div>
            </div>
        </>
    )

}