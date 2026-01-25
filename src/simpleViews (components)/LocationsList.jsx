
// Style imports
import styles from "/src/simpleViews (components)/Lists.module.css";

// React imports
import React from "react";

// Routing imports
import { NavLink } from 'react-router-dom';

// Begin view
function LocationsList ({allLocs}){

    return (

        <div className={styles.container}>

            <h2 className={styles.title}> List of the locations </h2>

            <div className={styles.list}>

                {allLocs?.map((location, index) => ( // varName?.xyz only tries to access xyz if varName exists (avoids "undefined element" errors)

                    <NavLink
                        key={location.id || index}
                        to={`/character/${location.id}`}
                        className={styles.row}
                    >
                        <img
                            className={styles.avatar}
                            src={`https://cdn.thesimpsonsapi.com/200${location.image_path}`}
                            alt={location.name}
                            loading="lazy"
                        />

                        <div className={styles.info}>
                            <h3 className={styles.name}>{location.name}</h3>
                            <p className={styles.details}>{location.town}</p>
                            <p className={styles.details}>{location.use}</p>
                        </div>

                    </NavLink>
                ))}

            </div>

        </div>

    )

}

export default LocationsList;
