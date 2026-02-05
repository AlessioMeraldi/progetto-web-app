// Style imports
import styles from "/src/simpleViews (components)/GridSubComponents/Grids.module.css";

// React imports
import React from "react";

// Routing imports
import {NavLink} from 'react-router-dom';

// Begin view
function LocationsGrid({allLocs}) {

    return (

        <React.Fragment>

            <section className={styles.charactersSection}>
                <h2> Grid of the locations </h2>

                <div className={styles.grid}>
                    {allLocs?.map((location, index) => (
                        <NavLink key={location.id || index}
                                 to={`/location/${location.id}`}
                                 className={styles.card}
                                 style={{ textDecoration: 'none', color: 'inherit' }}
                        >
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

        </React.Fragment>
    )
}

export default LocationsGrid;
