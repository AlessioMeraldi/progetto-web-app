// Style imports
import styles from "/src/simpleViews (components)/ListSubComponents/Lists.module.css";

// React imports
import React from "react";

// Routing imports
import { NavLink } from 'react-router-dom';

// Begin view
function CharactersList({allChars}) {

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

                    </NavLink>
                ))}

            </div>

        </div>
    )

}

export default CharactersList;
