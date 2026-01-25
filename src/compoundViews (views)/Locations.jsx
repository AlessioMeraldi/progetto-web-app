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

    // State for radio buttons (to show the default filters)
    const [cityRadio, setCityRadio] = React.useState('allCities');
    const [useRadio, setUseRadio] = React.useState('allUses');

    // instantiate the ViewModel and get only the parts we're interested in right now
    const {
        filteredLocations,
        getAllLocations,
        updateFilter
    } = LocationsViewModel();

    // tell the ViewModel to update its state regarding [allCharacters]
    useEffect(() => {
        getAllLocations();
    }, []);

    return (
        <React.Fragment>

            {/* Filters section */}
            <section className={`${styles.container} ${styles.filtersSection}`}>

                {/* City radio buttons */}
                <div className={styles.filterGroup}>

                    <h3>City</h3>

                    <input type="radio" id="allCities" name="cities" value="allCities"
                           onChange={() => {updateFilter("city", "allCities"); setCityRadio("allCities");}}
                        // ^ To show the default filters, the status was needed, that's why we are invoking both updateFilter(...) [VM state] and setGenderRadio(...) [local state]
                           checked={cityRadio === 'allCities'}
                    />
                    <label htmlFor="allCities">All</label>

                    <input type="radio" id="Springfield" name="cities" value="Springfield"
                           onChange={() => {updateFilter("city","Springfield"); setCityRadio("Springfield");}}
                           checked={cityRadio === 'Springfield'}
                    />
                    <label htmlFor="Springfield">Springfield (only)</label>

                    <input type="radio" id="otherCity" name="cities" value="otherCity"
                           onChange={() => {updateFilter("city","otherCity"); setCityRadio("otherCity");}}
                           checked={cityRadio === 'otherCity'}
                    />
                    <label htmlFor="otherCity">Other cities</label>
                    <br/>

                </div>

                {/* Use radio buttons */}
                <div className={styles.filterGroup}>

                    <h3>Use</h3>

                    <input type="radio" id="allUses" name="use" value="allUses"
                           onChange={() => {updateFilter("use","allUses"); setUseRadio("allUses");}}
                           checked={useRadio === 'allUses'}
                    />
                    <label htmlFor="allUses">All uses</label>

                    <input type="radio" id="residential" name="use" value="residential"
                           onChange={() => {updateFilter("use","residential"); setUseRadio("residential");}}
                           checked={useRadio === 'residential'}
                    />
                    <label htmlFor="residential">Residential use</label>

                    <input type="radio" id="otherUse" name="use" value="otherUse"
                           onChange={() => {updateFilter("use","otherUse"); setUseRadio("otherUse");}}
                           checked={useRadio === 'otherUse'}
                    />
                    <label htmlFor="otherUse">Non-Residential use</label>
                    <br/>

                </div>

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
            { (visualizationType === "grid") ? <LocationsGrid allLocs={filteredLocations}/> : <LocationsList allLocs={filteredLocations}/> }

        </React.Fragment>
    )

}

export default Locations;
