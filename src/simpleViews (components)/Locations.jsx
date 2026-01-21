// Style imports
import styles from "/src/simpleViews (components)/Locations.module.css"

// React imports
import {useEffect} from "react";

//  ViewModel imports
import LocationsViewModel from '/src/viewModels/LocationsViewModel.js'

// Begin logic
function Characters () {

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
        <div>

            {/* toDo: filters section */}
            <section>
                <p> I filtri andranno qui </p>
            </section>

            {/* Locations grid */}
            <main>
                {allLocations?.map((location, index) => ( // toDo: clarify the ?
                    <div key={location.id || index}> {/* attempt to use location's ID and fallback to index if something goes wrong */}
                        <p> {location?.name} </p> {/* toDo: clarify the ?*/}
                    </div>
                ))}
            </main>

        </div>
    )

}

export default Characters;