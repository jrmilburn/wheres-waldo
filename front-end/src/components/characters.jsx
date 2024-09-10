import waldo from '../assets/waldo.jpg';
import waldo2 from '../assets/waldo2.jpg';
import waldo3 from '../assets/waldo3.jpg';
import wizard from '../assets/wizard.jpg';

import styles from './characters.module.css';

import Character from './character';

export default function Characters({ foundCharacters, onCharacterFound }) {

    const characters = [
        { image: waldo, name: 'Waldo', found: false },
        { image: waldo2, name: 'Wena', found: false },
        { image: waldo3, name: 'Weirdo', found: true },
        { image: wizard, name: 'Wizard', found: false },
    ];

    const handleCharacterClick = (character) => { 
        if (!foundCharacters.includes(character.name)) {
            onCharacterFound(character.name);
        }
    }

    return (

        <div className={styles["characters"]}>

            {characters.map((character) => (
                <Character 
                    key={character.name} 
                    image={character.image} 
                    name={character.name} 
                    found={foundCharacters.includes(character.name)}
                    onClick= {() => handleCharacterClick(character)}
                     />
            ))}

        </div>

    )

}