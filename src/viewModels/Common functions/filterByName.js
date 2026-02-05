
/**
 * filterByName
 * @param listToFilter = array of the elements to filter, either the characters or the locations
 * @param requestedName = the name to match of the specific character / location
 * @returns {*}
 * Filters the provided list and returns a copy with only the elements that match the specified name
 * Used in both CharactersViewModel and LocationsViewModel to search an array's element whose name has been put
 * in the searchBar
 */
function filterByName(listToFilter, requestedName) {

    if (!requestedName || requestedName.trim() === "") {
        return listToFilter;
    }

    const lowerCaseName = requestedName.toLowerCase();

    return (
        listToFilter.filter ( element =>
            element.name.toLowerCase().includes(lowerCaseName) // name search for element is case-insensitive
        )
    );

}

export default filterByName;