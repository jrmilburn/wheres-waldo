import snowlevel from '../assets/waldosnow.jpg';
import styles from './gamescreen.module.css';
import { useState, useEffect } from 'react';

export default function GameScreen({  setCharacters, setFoundCharacters, foundCharacters }) {

    const [targetBox, setTargetBox] = useState(null);
    const [markerPositions, setMarkerPositions] = useState([]);

      useEffect(() => {
        const headers = {
          'Content-Type': 'application/json',
        };

        fetch('http://localhost:3000/api/maps/1', {
          method: 'GET', // or 'GET', 'PUT', 'DELETE', etc.
          headers: headers,
        })
        .then(response => response.json())
        .then(data => setCharacters(data))
        .catch(error => console.log(error));
      }, []);

    useEffect(() => {
        if(targetBox){
          const headers = {
          'Content-Type': 'application/json',
        };
  
        const body = JSON.stringify({
          x: targetBox.x,
          y: targetBox.y,
        });
  
        fetch('http://localhost:3000/api/maps/1', {
          method: 'POST', // or 'GET', 'PUT', 'DELETE', etc.
          headers: headers,
          body: body
        })
        .then(response => response.json())
        .then(data => {
          if(data.character && !foundCharacters.some((foundCharacter) => foundCharacter.name === data.character.name)){
            setFoundCharacters((prevFoundCharacters) => [...prevFoundCharacters, data.character]);
            setMarkerPositions((prevMarkerPositions) => [...prevMarkerPositions, { x: targetBox.x, y: targetBox.y }]);
          }
        })
        .catch(error => console.log(error));
      }
    }, [targetBox]);

    const handleClick = (e) => {

        const rect = e.target.getBoundingClientRect();
        const x = ((e.clientX - rect.left)/rect.width) *100;
        const y = ((e.clientY - rect.top)/rect.height)*100;


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

                {markerPositions.map((markerPosition, index) => (
                  <div
                    key={index}
                    className={styles["marker"]}
                    style={{
                      left: `${markerPosition.x}%`,
                      top: `${markerPosition.y}%`,
                    }}
                  />
                ))}
              </div>
            </div>
        </>
    )

}