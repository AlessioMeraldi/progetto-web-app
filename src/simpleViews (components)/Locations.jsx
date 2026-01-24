// Style imports
import styles from "/src/simpleViews (components)/Grids.module.css";

// React imports
import React, {useEffect} from "react";

//  ViewModel imports
import LocationsViewModel from '/src/viewModels/LocationsViewModel.js';

// Routing imports
import {NavLink} from 'react-router-dom';

// Begin logic
function Characters() {

    // instantiate the ViewModel and get only the parts we're interested in right now
    const {
        allLocations,
        getAllLocations,
    } = LocationsViewModel();

    // tell the ViewModel to update its state regarding [allCharacters]
    useEffect(() => {
        getAllLocations();
    }, []);

    return (
        <div className={styles.componentWithGrid}>

            {/* toDo: filters section */}
            <section>
                <p> I filtri andranno qui </p>
            </section>

            {/* Locations grid */}
            <section className={styles.charactersSection}>
                <h2> Ecco le locations </h2>

                <div className={styles.grid}>
                    {allLocations?.map((location, index) => ( // toDo: clarify the ?
                        <NavLink key={location.id || index} to={`/location/${location.id}`} className={styles.card}>
                            <div>
                                <img
                                    src={`https://cdn.thesimpsonsapi.com/500${location.image_path}`}
                                    alt={location.name}
                                    loading="lazy"
                                />
                                <h3>{location.name}</h3>
                                <p>{location.town}</p>
                                <p>{location.use}</p>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </section>

        </div>
    )

}

export default Characters;