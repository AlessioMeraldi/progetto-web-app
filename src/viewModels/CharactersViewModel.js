// imports from React
import {useState} from 'react';

// imports from Model
import {fetchSingleCharacter, fetchCharactersBatch, fetchAllCharacters} from '/src/models/charactersModel.js';

// Begin logic
function CharacterViewModel() {

    // State
    const [character, setCharacter] = useState(null);
    const [charactersBatch, setCharactersBatch] = useState([]);
    const [allCharacters, setAllCharacters] = useState([]);

    // Functions

    /**
     * getSingleCharacter
     * @Param charId = integer number of the single character.
     * @Param imgSize = integer number of the resolution for the image = 200 / 500 / 1280.
     * Fetches through the Model the specified character, and returns an object {characterData, "url-for-the-image"}
     * @returns {Promise<{characterData: null, characterImageURL: string}>}
     */
    const getSingleCharacter = async (charId, imgSize) => {

        const theCharacter = await fetchSingleCharacter(charId, imgSize);
        // The format of theCharacter is { object = "character data from JSON", string = "link-to-portrait-image-of-right-size" }

        console.log(theCharacter);
        setCharacter(theCharacter);
        return (theCharacter);

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
     * toDo: see if I can make it parallel (to be done at a later date)
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
        return (localAllCharacters);

    }

    // Return

    return {
        character,
        charactersBatch,
        allCharacters,
        getSingleCharacter,
        getCharacterBatch,
        getAllCharacters,
    }

}

export default CharacterViewModel;