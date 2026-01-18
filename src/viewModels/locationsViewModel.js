// imports for external components
import {useState} from 'react';

// imports for our components
import {fetchSingleLocation} from '/src/models/locationsModel.js';
import {fetchLocationsBatch} from '/src/models/locationsModel.js';

function locationsViewModel() {

    // toDo: è tutto temporaneo e da editare non poco dopo, sto usando queste funzioni solo per testare il model

    const getSingleLocation = async () => {
        const location = await fetchSingleLocation(1, 500);
        console.log(location);
        return (location);
    }

    const getLocationsBatch = async () => {
        const locations = await fetchLocationsBatch(1);
        console.log(locations);
        return (locations);
    }

    return {
        getSingleLocation,
        getLocationsBatch,
    }

}

export default locationsViewModel;