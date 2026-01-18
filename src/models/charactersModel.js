// toDo: ricordarsi che il model deve poter fetchare immagini a 2 diverse risoluzioni (small per card, large per detail)


/**
 *  fetchSingleCharater
 *  @Param characterId = integer number of the single character.
 *  @Param imageSize = integer number of the resolution for the image = 200 / 500 / 1280.
 *  Fetches a single specified character's JSON from The Simpsons API (characterId) and prepares the URL to get their image of the appropriate size (imageSize)
 */
export async function fetchSingleCharacter(characterId, imageSize) {

    // constants (URLs created from the function's parameters)
    const characterURL = "https://thesimpsonsapi.com/api/characters/"+characterId; // format: https://thesimpsonsapi.com/api/characters/{character_name}
    const characterImageURL = "https://cdn.thesimpsonsapi.com/"+imageSize+"/character/"+characterId+".webp"; // format https://cdn.thesimpsonsapi.com/{size}{image_path}

    // variables (for returning data)
    let characterData = null;

    // Fetch character's data
    try {

        const fetchedCharacter = await fetch(characterURL);

        if (!fetchedCharacter.ok) {
            throw new Error("Could not fetch character "+characterId);
        }

        characterData = await fetchedCharacter.json();

    } catch (error) {
        console.error("API error, "+error);
    }

    return { characterData, characterImageURL }; // return an object {data, url_for_the_image} (CORS blocks from downloading the image)
}

/**
 * fetchCharacters
 * @Param charactersBatchId = integer number of the <20 characters batch> (Simpson's API allows to fetch maximum 20 at a time).
 * Fetches a batch of 20 Simpson's characters, the one with the specified charactersBatchId
 */
export async function fetchCharactersBatch(charactersBatchId) {

    // constants = URLs created from the function's parameters (batch 1 works both with /characters and /characters?page=1)
    const charactersBatchURL = "https://thesimpsonsapi.com/api/characters?page="+charactersBatchId;

    // variables (for returning data)
    let charactersBatch = null;

    // fetch character batch
    try {

        const fetchedBatch = await fetch(charactersBatchURL);

        if (!fetchedBatch.ok) {
            throw new Error("Could not fetch characters batch "+charactersBatchId);
        }

        charactersBatch = await fetchedBatch.json();

    } catch (error) {
        console.error("API error, "+error);
    }

    return (charactersBatch);
}