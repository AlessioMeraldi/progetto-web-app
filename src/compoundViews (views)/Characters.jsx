
// Style imports
import styles from "/src/compoundViews (views)/MultipleElements.module.css";

// React imports
import React, {useEffect} from "react";

//  ViewModel imports
import CharactersViewModel from '/src/viewModels/CharactersViewModel.js';

// Components imports
import CharactersGrid from '/src/simpleViews (components)/CharactersGrid.jsx'
import CharactersList from '/src/simpleViews (components)/CharactersList.jsx'

// Begin logic
function Characters() {

    // State (grid or list visualization)
    const [visualizationType, setVisualizationType] = React.useState('list');

    // instantiate the ViewModel and get only the parts we're interested in right now
    const {
        allCharacters,
        getAllCharacters,
    } = CharactersViewModel();

    // tell the ViewModel to update its state regarding [allCharacters]
    useEffect(() => {
        getAllCharacters();
    }, []);

    return (
        <React.Fragment>

            {/* toDo: filters section */}
            <section>
                <p> I filtri andranno qui </p>
            </section>

            {/* Choose display type message & buttons */}
            <section className={styles.container}>
                <h3>CHOOSE VISUALIZATION TYPE</h3>
                <div className={styles.buttonsContainer}>
                    <button className={styles.cta} onClick={() => {setVisualizationType("grid")}}> grid </button>
                    <button className={styles.cta} onClick={() => {setVisualizationType("list")}}> list </button>
                </div>
            </section>

            {/* Ternary operator for abbreviated IF-ELSE --> (condition) ? expressionTrue : expressionFalse; */}
            { (visualizationType === "grid") ? <CharactersGrid allChars={allCharacters}/> : <CharactersList allChars={allCharacters}/> }

        </React.Fragment>
    )

}

export default Characters;