// imports for external components
import {useState} from 'react';

// imports for our components
import {fetchSingleCharacter} from '/src/models/charactersModel.js';
import {fetchCharactersBatch} from '/src/models/charactersModel.js';

function characterViewModel() {

    // toDo: è tutto temporaneo e da editare non poco dopo, sto usando queste funzioni solo per testare il model

    const getSingleCharacter = async () => {
        const character = await fetchSingleCharacter(1, 500);
        console.log(character);
        return (character);
    }

    const getCharacterBatch = async () => {
        const characters = await fetchCharactersBatch(1);
        console.log(characters);
        return (characters);
    }

    return {
        getSingleCharacter,
        getCharacterBatch,
    }

}

export default characterViewModel;