// imports from React
import {useEffect, useState} from 'react';

// imports from Model
import {fetchSingleLocation, fetchLocationsBatch, fetchAllLocations} from '/src/models/locationsModel.js';

// imports of utility functions (shared with other ViewModels)
import filterByName from './Common functions/filterByName.js';

// Begin logic
function LocationsViewModel() {

    // State
    const [location, setLocation] = useState(null);
    const [locationsBatch, setLocationsBatch] = useState([]);
    const [allLocations, setAllLocations] = useState([]);

    const [filteredLocations, setfilteredLocations] = useState([]);

    // Filters state
    const [filters, setFilters] = useState({
        city: "allCities", // "allCities", "Springfield", "otherCity"
        use: "allUses", // "allUses", "residential", "otherUse"
        name: ""        // "" = *, "user-input-name"
    });

    // Functions that interact with the model

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

    // Functions to apply the filters

    /**
     *  filterByCity
     *  @Param listToFilter = array of characters to filter by gender
     *  @Param requestedCity = "allCities", "Springfield", "otherCity"
     *  Text
     */
    function filterByCity (listToFilter, requestedCity) {

        if (requestedCity === "allCities") {
            return (listToFilter);
        }

        let filteredList = [];

        if (requestedCity === "Springfield") {
            for (let i = 0; i < listToFilter.length; i++) {
                if (listToFilter[i].town === "Springfield") {
                    filteredList.push(listToFilter[i]);
                }
            }
        } else {
            for (let i = 0; i < listToFilter.length; i++) {
                if (listToFilter[i].town !== "Springfield") {
                    filteredList.push(listToFilter[i]);
                }
            }
        }

        console.log(filteredList);
        // doesn't update state itself, the useEffect will do it (itself) by using this function's return
        return (filteredList);

    }

    /**
     * filterByUse
     * @param listToFilter = array of characters to be filtered by status
     * @param requestedUse = "allUses", "residential", "otherUse"
     * Text
     */
    function filterByUse (listToFilter, requestedUse) {

        if (requestedUse === "allUses") {
            return (listToFilter);
        }

        let filteredList = [];

        if (requestedUse === "residential") {
            for (let i = 0; i < listToFilter.length; i++) {
                if (listToFilter[i].use === "Residential") {
                    filteredList.push(listToFilter[i]);
                }
            }
        } else {
            for (let i = 0; i < listToFilter.length; i++) {
                if (listToFilter[i].use !== "Residential") {
                    filteredList.push(listToFilter[i]);
                }
            }
        }

        console.log(filteredList);
        // doesn't update state itself, the useEffect will do it (itself) by using this function's return
        return (filteredList);

    }

    /**
     * filterByName
     * @param listToFilter = array of location to be filtered by name.
     * @param requestedName = the name to search for, if it's empty "" it means any name, otherwise it tries to match the "string".
     * Filters the provided locations list and returns one with only the locations with the specified name, or part of it.
     */
    // filterByName is defined in a separate file, filterByName.js, as it is in common with the CharactersViewModel.

    // Function to update the filters (status)

    /**
     * updateFilters
     * @param filterType = "gender", "status", "name"
     * @param newValue = new value of the filter to modify, depending on which one it is ("All"/"Male"/"Female"/"Other" for Gender, ...)
     * Updates the filters state, setting the specific specified filter (first parameter) with the passed value (second parameter)
     */
    function updateFilter (filterType, newValue) {

        setFilters(prevFilters => ({
            ...prevFilters,
            [filterType]: newValue
        }));

    }

    // Effect to actually filter

    /**
     * This effect triggers whenever the state of 'allCharacters' or 'filters' changes, thus:
     * --> It will trigger upon fetching all the characters the first time
     * --> It will trigger whenever a filter is modified
     * The effect itself chains the calling of a series of filtering functions to update the 'charactersToShow'
     * state with the filtered list (on the first trigger, it won't filter anything at all)
     */
    useEffect(() => {

        let locationsToShow = allLocations.slice();

        locationsToShow = filterByCity(locationsToShow, filters.city);
        locationsToShow = filterByUse(locationsToShow, filters.use);
        locationsToShow = filterByName(locationsToShow, filters.name);

        setfilteredLocations(locationsToShow);

    }, [allLocations, filters]);

    // Return

    return {
        location,
        locationsBatch,
        allLocations,
        filteredLocations,
        getSingleLocation,
        getLocationsBatch,
        getAllLocations,
        updateFilter,
    }

}

export default LocationsViewModel;