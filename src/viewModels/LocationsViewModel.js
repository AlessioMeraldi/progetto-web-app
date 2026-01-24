// imports from React
import {useState} from 'react';

// imports from Model
import {fetchSingleLocation, fetchLocationsBatch, fetchAllLocations} from '/src/models/locationsModel.js';

// Begin logic
function LocationsViewModel() {

    // State
    const [location, setLocation] = useState(null);
    const [locationsBatch, setLocationsBatch] = useState([]);
    const [allLocations, setAllLocations] = useState([]);

    // Functions

    /**
     * getSingleLocation
     * @Param locId = integer number of the single location.
     * @Param imgSize = integer number of the resolution for the image = 200 / 500 / 1280.
     * Fetches through the Model the specified location, and returns an object {locationData, "url-for-the-image"}
     * @returns {Promise<{characterData: null, characterImageURL: string}>}
     */
    const getSingleLocation = async (locId, imgSize) => {

        const theLocation = await fetchSingleLocation(locId, imgSize);
        // The format of theLocation is { object = "location data from JSON", string = "link-to-portrait-image-of-right-size" }

        console.log(theLocation);
        setLocation(theLocation);
        return (theLocation);

    }

    /**
     * getLocationsBatch
     * @Param batchId = integer number of the <20 locations batch> (Simpson's API allows to fetch maximum 20 at a time).
     * Fetches through the Model a single locations batch in The Simpson's API, the one with the specified batchId
     * @returns {Promise<null>}
     */
    const getLocationsBatch = async (batchId) => {

        const locationsBatch = await fetchLocationsBatch(batchId);
        // The format of locationsBatch is {various header info, results = [ location 1, location 2, location 3, ... ]}

        console.log(locationsBatch.results);
        setLocationsBatch(locationsBatch);
        return (locationsBatch);

    }

    /**
     * getAllLocations
     * toDo: see if I can make it parallel (to be done at a later date)
     * Fetches through the Model all the 24 <locations batches> in The Simpson's API and returns them (the locations) in a flattened array
     * @returns {Promise<(number | AuthenticationExtensionsPRFValues)[]>}
     */
    const getAllLocations = async () => {

        const allBatches = await fetchAllLocations(); // fetch all locations Batches
        // The format of allBatches is [ { headerBatch1, results = [array of locations 1] }, {headerBatch2, results = [array of locations 2] }, ... ]

        let localAllLocations = allBatches.flatMap(batch => batch.results); // discard headers, chain and flatten arrays of locations
        // The format of localAllLocations is [ location1, location2, location3, ... location20 (last of batch 1), location21 (first of batch 2), ... ]

        console.log(localAllLocations);
        setAllLocations(localAllLocations);
        return (localAllLocations);

    }

    return {
        location,
        locationsBatch,
        allLocations,
        getSingleLocation,
        getLocationsBatch,
        getAllLocations,
    }

}

export default LocationsViewModel;