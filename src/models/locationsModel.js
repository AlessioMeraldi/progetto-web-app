
/**
 *  fetchSingleLocation
 *  @Param locationId = integer number of the single location.
 *  @Param imageSize = integer number of the resolution for the image = 200 / 500 / 1280.
 *  Fetches a single specified location's JSON data from The Simpsons API (locationId) and prepares the URL to get its image of the appropriate size (imageSize)
 */
export async function fetchSingleLocation(locationId, imageSize) {

    // constants (URLs created from the function's parameters)
    const locationURL = "https://thesimpsonsapi.com/api/locations/"+locationId; // format: https://thesimpsonsapi.com/api/locations/{location_id}
    const locationImageURL = "https://cdn.thesimpsonsapi.com/"+imageSize+"/location/"+locationId+".webp"; // format: https://cdn.thesimpsonsapi.com/{image_size}/location/{location_id}.webp

    // variables (for returning data)
    let locationData = null;

    // Fetch location's data
    try {

        const fetchedLocation = await fetch(locationURL);

        if (!fetchedLocation.ok) {
            throw new Error("Could not fetch location "+locationId);
        }

        locationData = await fetchedLocation.json();

    } catch (error) {
        console.error("API error, "+error);
    }

    return { locationData, locationImageURL }; // return an object {data, url_for_the_image} (CORS blocks from downloading the image)
}

/**
 * fetchLocationsBatch
 * @Param locationsBatchId = integer number of the <20 locations batch> (Simpson's API allows to fetch maximum 20 at a time).
 * Fetches a batch of 20 of The Simpson's locations, the one with the specified charactersBatchId
 */
export async function fetchLocationsBatch(locationsBatchId) {

    // constants = URLs created from the function's parameters (batch 1 works both with /locations and /locations?page=1)
    const locationsBatchURL = "https://thesimpsonsapi.com/api/locations?page="+locationsBatchId;

    // variables (for returning data)
    let locationsBatch = null;

    // fetch character batch
    try {

        const fetchedBatch = await fetch(locationsBatchURL);

        if (!fetchedBatch.ok) {
            throw new Error("Could not fetch locations batch "+locationsBatchId);
        }

        locationsBatch = await fetchedBatch.json();

    } catch (error) {
        console.error("API error, "+error);
    }

    return (locationsBatch);
}

/**
 * fetchAllLocations (old sequential version)
 * Fetches all the 24 batches of The Simpson's locations by invoking fetchLocationsBatch() multiple times
 */
/*
export async function fetchAllLocations() {

    let allLocations = [];

    for (let i=1; i<=24; i++){
        allLocations.push( await fetchLocationsBatch(i));
    }

    return (allLocations);
}
*/

/**
 * fetchAllLocations (new parallel version)
 * Fetches all the 24 batches of The Simpson's locations by invoking fetchLocationsBatch() multiple times
 */
export async function fetchAllLocations() {

    const promises = [];

    // parallel requests
    for (let i=1; i<=24; i++){
        promises.push(fetchLocationsBatch(i));
    }

    // assemble API responses and return all the character's batches together
    try {
        const allLocationsBatches = await Promise.all(promises);
        return (allLocationsBatches);
    } catch (error) {
        console.error("API error, "+error);
    }

}