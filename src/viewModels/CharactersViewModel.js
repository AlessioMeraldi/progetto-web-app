// imports from React
import {useEffect, useState} from 'react';

// imports from Model
import {fetchSingleCharacter, fetchCharactersBatch, fetchAllCharacters} from '/src/models/charactersModel.js';

// imports of utility functions (shared with other ViewModels)
import filterByName from './Common functions/filterByName.js';

// Begin logic
function CharacterViewModel() {

    // Content state
    const [character, setCharacter] = useState(null);
    const [charactersBatch, setCharactersBatch] = useState([]);
    const [allCharacters, setAllCharacters] = useState([]);

    // Loading State
    const [isLoading, setIsLoading] = useState(false);

    // Filters state
    const [filteredCharacters, setFilteredCharacters] = useState([]);
    const [filters, setFilters] = useState({
        gender: "All",  // "All", "Male", "Female", "Other"
        status: "All",  // "All", "Alive", "Deceased"
        name: ""        // "" = *, "user-input-name"
    });

    // Pagination state
    const [pageNumber, setPageNumber] = useState(0);
    const [displayedCharacters, setDisplayedCharacters] = useState([]);

    // Functions that interact with the model

    /**
     * getSingleCharacter
     * @Param charId = integer number of the single character.
     * @Param imgSize = integer number of the resolution for the image = 200 / 500 / 1280.
     * Fetches through the Model the specified character, and returns an object {characterData, "url-for-the-image"}
     * @returns {Promise<{characterData: null, characterImageURL: string}>}
     */
    const getSingleCharacter = async (charId, imgSize) => {

        setIsLoading(true);

        try {

            const theCharacter = await fetchSingleCharacter(charId, imgSize);
            // The format of theCharacter is { object = "character data from JSON", string = "link-to-portrait-image-of-right-size" }

            console.log(theCharacter);
            setCharacter(theCharacter);
            return (theCharacter);

        } catch (err){

            console.log("ViewModel caught the Model's error when trying to fetch the data of a character: "+err);

        } finally  {

            setIsLoading(false);

        }

    }

    /**
     * getCharactersBatch
     * @Param batchId = integer number of the <20 characters batch> (Simpson's API allows to fetch maximum 20 at a time).
     * Fetches through the Model a single characters batch in The Simpson's API, the one with the specified batchId
     * @returns {Promise<null>}
     */
    const getCharacterBatch = async (batchId) => {

        const characterBatch = await fetchCharactersBatch(batchId);
        // The format of characterBatch is {various header info, results = [ character 1, character 2, character 3, ... ]}

        console.log(characterBatch.results);
        setCharactersBatch(characterBatch);
        return (characterBatch);

    }

    /**
     * getAllCharacters
     * Fetches through the Model all the 60 <characters batches> in The Simpson's API and returns them (the characters) in a flattened array
     * @returns {Promise<(number | AuthenticationExtensionsPRFValues)[]>}
     */
    const getAllCharacters = async () => {

        const allBatches = await fetchAllCharacters(); // fetch all characters Batches
        // The format of allBatches is [ { headerBatch1, results = [array of characters 1] }, {headerBatch2, results = [array of characters 2] }, ... ]

        let localAllCharacters = allBatches.flatMap(batch => batch.results); // discard headers, chain and flatten arrays of characters
        // The format of localAllCharacters is [ character1, character2, character3, ... character20 (last of batch 1), character21 (first of batch 2), ... ]

        console.log(localAllCharacters);
        setAllCharacters(localAllCharacters);
        // setFilteredCharacters(localAllCharacters); // by default, no filter is applied
        return (localAllCharacters);

    }

    // Functions to apply the filters

    /**
     *  filterByGender
     *  @Param listToFilter = array of characters to filter by gender
     *  @Param requestedGender = gender to filter the characters by, it can be = "All", "Male", "Female", "Other"
     *  Filters the provided characters list and returns one with only the characters of the specified gender
     */
    function filterByGender (listToFilter, requestedGender) {

        if (requestedGender === "All") {
            return (listToFilter);
        }

        let filteredList = [];

        if (requestedGender === "Male" || requestedGender === "Female") {
            for (let i = 0; i < listToFilter.length; i++) {
                if (listToFilter[i].gender === requestedGender) {
                    filteredList.push(listToFilter[i]);
                }
            }
        }

        if (requestedGender === "Other") {
            for (let i = 0; i < listToFilter.length; i++) {
                if (listToFilter[i].gender !== "Male" && listToFilter[i].gender !== "Female") {
                    filteredList.push(listToFilter[i]);
                }
            }
        }

        console.log(filteredList);
        // doesn't update state itself, the useEffect will do it (itself) by using this function's return
        return (filteredList);

    }

    /**
     * filterByStatus
     * @param listToFilter = array of characters to be filtered by status.
     * @param requestedStatus = living status to filter the characters by, it can be "All", "Alive", "Deceased".
     * Filters the provided characters list and returns one with only the characters of the specified status.
     */
    function filterByStatus (listToFilter, requestedStatus) {

        if (requestedStatus === "All") {
            return (listToFilter);
        }

        let filteredList = [];

        if (requestedStatus === "Alive") {
            for (let i = 0; i < listToFilter.length; i++) {
                if (listToFilter[i].status === "Alive") {
                    filteredList.push(listToFilter[i]);
                }
            }
        } else {
            for (let i = 0; i < listToFilter.length; i++) {
                if (listToFilter[i].status === "Deceased") {
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
     * @param listToFilter = array of characters to be filtered by name.
     * @param requestedName = the name to search for, if it's empty "" it means any name, otherwise it tries to match the "string".
     * Filters the provided characters list and returns one with only the characters with the specified name, or part of it
     */
    // filterByName is defined in a separate file, filterByName.js, as it is in common with the LocationsViewModel.

    // Function to update the filters (status)

    /**
     * updateFilters
     * @param filterType = "gender", "status", "name"
     * @param newValue = new value of the filter to modify, depending on which one it is ("All"/"Male"/"Female"/"Other" for Gender, ...)
     * Updates the filters state, setting the specified filter (first parameter) with the passed value (second parameter)
     */
    function updateFilter (filterType, newValue) {

        setFilters(prevFilters => ({
            ...prevFilters,
            [filterType]: newValue
        }));

        // Spread operator: object => ( {...object, field: newValue})
        // will only update the specified 'field' with the 'newValue' and leave the other fields unchanged
        // (as if it made otherField = object.otherField for each of them)
        // Avoids putting too many if (filter is 'x') then setFilters( {x: newValue, assign same previous value to all other filters} )

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

        let charactersToShow = allCharacters.slice();

        charactersToShow = filterByGender(charactersToShow, filters.gender);
        charactersToShow = filterByStatus(charactersToShow, filters.status);
        charactersToShow = filterByName(charactersToShow, filters.name);

        setFilteredCharacters(charactersToShow);
        setPageNumber(0); // filters typically make all characters fit in the first page (page 0)

    }, [allCharacters, filters]);

    // Effect to handle pagination changes
    /**
     * This effect triggers whenever the state of 'pageNumber' or 'filteredCharacters' changes, thus:
     * --> It will trigger upon fetching all the characters the first time (because it is set by previous useEffect)
     * --> It will trigger whenever the user changes the page to show
     * --> It will trigger whenever the user changes the filters
     * This effect will set the "displayedCharacters" state to be either an array of the first 600 characters
     * (if pageNumber is 0) or the last (almost) 600 characters (if page isNumber is 1) of the already filtered characters.
     * Note that it works on the already filtered characters, meaning it could be empty if filters are too strict and
     * page is set to 1 - this is why the previous effect resets the page number to be 0 by default.
     */
    useEffect ( () => {

        if (!filteredCharacters) return;

        if (pageNumber === 0) {
            setDisplayedCharacters(filteredCharacters.slice(0,600));
        } else  {
            setDisplayedCharacters(filteredCharacters.slice(600, filteredCharacters.length));
        }

    }, [pageNumber, filteredCharacters]);

    // Return

    return {
        character,
        charactersBatch,
        allCharacters,
        filteredCharacters,
        isLoading,
        pageNumber,
        displayedCharacters,
        getSingleCharacter,
        getCharacterBatch,
        getAllCharacters,
        updateFilter,
        setPageNumber,
        setDisplayedCharacters,
    }

}

export default CharacterViewModel;