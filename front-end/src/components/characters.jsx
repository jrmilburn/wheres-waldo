import waldo from '../assets/waldo.jpg';
import waldo2 from '../assets/waldo2.jpg';
import waldo3 from '../assets/waldo3.jpg';
import wizard from '../assets/wizard.jpg';

import styles from './characters.module.css';

import Character from './character';
import { useState } from 'react';

export default function Characters({ foundCharacters, characters }) {

    return (

        <div className={styles["characters"]}>

            {characters.map((character) => (
                <Character 
                    key={character.name} 
                    image={character.imageUrl} 
                    name={character.name} 
                    found={foundCharacters.some((foundCharacter) => foundCharacter.name === character.name)}
                     />
            ))}

        </div>

    )

}