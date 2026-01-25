// Style imports
import styles from "/src/compoundViews (views)/MultipleElements.module.css";

// React imports
import React, {useEffect} from "react";

//  ViewModel imports
import LocationsViewModel from '/src/viewModels/LocationsViewModel.js';

// Components imports
import LocationsGrid from "../simpleViews (components)/LocationsGrid.jsx";
import LocationsList from "../simpleViews (components)/LocationsList.jsx";

// Begin logic
function Locations() {

    // State (grid or list visualization)
    const [visualizationType, setVisualizationType] = React.useState('list');

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
            { (visualizationType === "grid") ? <LocationsGrid allLocs={allLocations}/> : <LocationsList allLocs={allLocations}/> }

        </React.Fragment>
    )

}

export default Locations;
