// Style imports
import styles from "/src/simpleViews (components)/Grids.module.css";
import ownStyles from "/src/simpleViews (components)/Characters.module.css";

// React imports
import React, {useEffect} from "react";

//  ViewModel imports
import CharactersViewModel from '/src/viewModels/CharactersViewModel.js';

// Begin logic
function Characters() {

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
        <div className={styles.componentWithGrid}>

            {/* toDo: filters section */}
            <section>
                <p> I filtri andranno qui </p>
            </section>

            {/* Characters grid */}
            <section className={styles.charactersSection}>
                <h2> Ecco i personaggi </h2>

                <div className={styles.grid}>
                    {allCharacters?.map((character, index) => ( // toDo: clarify the ? with a comment
                        <div key={character.id || index} className={styles.card}>
                            <img
                                src={`https://cdn.thesimpsonsapi.com/200/character/${character.id}.webp`}
                                alt={character.name}
                                loading="lazy"
                            />
                            <h3>{character.name}</h3>
                            <p>{character.occupation}</p>
                            <p>{character.status}</p>

                        </div>
                    ))}
                </div>
            </section>

        </div>
    )

}

export default Characters;