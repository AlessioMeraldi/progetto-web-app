// Style imports
import styles from "/src/simpleViews (components)/ListSubComponents/Lists.module.css";

// React imports
import React from "react";

// Routing imports
import { NavLink } from 'react-router-dom';

// Auth0 imports
import { useAuth0 } from '@auth0/auth0-react';

// Supabase imports
import { addFavourite, removeFavourite } from '../../services/favouritesService';

// Begin view
function CharactersList({allChars, userFavourites = [], setFavourites}) {

    const {user, isAuthenticated} = useAuth0();

    const toggleFavourite = async (characterId) => {

        if (!isAuthenticated || !user?.email) return;

        const userEmail = user.email;

        if (userFavourites.includes(characterId)) {
            await removeFavourite(characterId, userEmail);
            setFavourites(prev => prev.filter(id => id !== characterId));
        } else {
            await addFavourite(characterId, userEmail);
            setFavourites(prev => [...prev, characterId]);
        }
    };

    /**
     * isFavourite
     * @param passedCharacter
     * @returns {boolean}
     */
    function isFavourite (passedCharacter) {
        return userFavourites.includes(Number(passedCharacter.id));
    }

    return (

        <div className={styles.container}>

            <h2 className={styles.title}> List of the characters </h2>

            <div className={styles.list}>

                {allChars?.map((character, index) => ( // varName?.xyz only tries to access xyz if varName exists (avoids "undefined element" errors)

                    <NavLink
                        key={character.id || index}
                        to={`/character/${character.id}`}
                        className={styles.row}
                    >
                        <img
                            className={styles.avatar}
                            src={`https://cdn.thesimpsonsapi.com/200/character/${character.id}.webp`}
                            alt={character.name}
                            loading="lazy"
                        />

                        <div className={styles.info}>
                            <h3 className={styles.name}>{character.name}</h3>
                            <p className={styles.details}> {character.occupation} </p>
                            <br/>
                            <p className={styles.details}> {character.status} </p>
                        </div>

                        {/* Heart Button Logic */}
                        {isAuthenticated && (
                            <button
                                type="button"
                                className={styles.favButton} // Assicurati che questa classe esista in Lists.module.css
                                onClick={(e) => {
                                    e.preventDefault();      // block the redirect
                                    e.stopPropagation();     // block the click on the card
                                    toggleFavourite(character.id);
                                }}
                                style={{ marginRight: '15px', cursor: 'pointer', background: 'transparent', border: 'none', fontSize: '1.5rem' }}
                                // ^ Ho aggiunto un po' di stile inline di base per sicurezza, sentiti libero di spostarlo nel CSS
                            >
                                {isFavourite(character) ? "❤️" : "🤍"}
                            </button>
                        )}
                    </NavLink>
                ))}

            </div>

        </div>
    )

}

export default CharactersList;