
// Style imports
import styles from "/src/simpleViews (components)/GridSubComponents/Grids.module.css";

// React imports
import React from "react";

// Routing imports
import {NavLink} from 'react-router-dom';

// Auth0 imports
import { useAuth0 } from '@auth0/auth0-react';

// Supabase imports
import { addFavourite, removeFavourite } from '../../services/favouritesService';

// Being view
function CharactersGrid({allChars, userFavourites = [], setFavourites}) {

    const { user, isAuthenticated } = useAuth0();

    const toggleFavourite = async (characterId) => {

        if (!isAuthenticated) return;

        if (userFavourites.includes(characterId)) {
            await removeFavourite(characterId, user.email);
            setFavourites(prev => prev.filter(id => id !== characterId));
        } else {
            await addFavourite(characterId, user.email);
            setFavourites(prev => [...prev, characterId]);
        }
    };

    /**
     * isFavourite
     * @param passedCharacter
     * @returns {boolean}
     */
    function isFavourite (passedCharacter) {
        return (userFavourites.includes(passedCharacter.id))
    }

    return (

        <div className={styles.componentWithGrid}>

            {/* Characters grid */}
            <section className={styles.charactersSection}>

                <h2> Grid of the characters </h2>

                <div className={styles.grid}>

                    {allChars?.map((character, index) => (// varName?.xyz only tries to access xyz if varName exists (avoids "undefined element" errors)

                        <React.Fragment key={character.id || index}>
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
                                {isAuthenticated && (
                                    <button
                                        className={styles.favButton}
                                        onClick={() => toggleFavourite(character.id)}
                                    >
                                        {isFavourite(character) ? "❤️" : "🤍"}
                                    </button>
                                    )
                                }
                        </React.Fragment>

                    ))}

                </div>

            </section>

        </div>
    )

}

export default CharactersGrid;