
// Style imports
import styles from "/src/simpleViews (components)/GridSubComponents/Grids.module.css";

// React imports
import React from "react";

// Routing imports
import {NavLink} from 'react-router-dom';

// Being view
function CharactersGrid({allChars}) {

    return (

        <div className={styles.componentWithGrid}>

            {/* Characters grid */}
            <section className={styles.charactersSection}>

                <h2> Grid of the characters </h2>

                <div className={styles.grid}>

                    {allChars?.map((character, index) => ( // varName?.xyz only tries to access xyz if varName exists (avoids "undefined element" errors)

                        <NavLink key={character.id || index} to={`/character/${character.id}`} className={styles.card}>
                            <div>
                                <img
                                    src={`https://cdn.thesimpsonsapi.com/200/character/${character.id}.webp`}
                                    alt={character.name}
                                    loading="lazy"
                                />
                                <h3>{character.name}</h3>
                                <p>{character.occupation}</p>
                                <p>{character.status}</p>
                            </div>
                        </NavLink>
                    ))}

                </div>

            </section>

        </div>
    )

}

export default CharactersGrid;