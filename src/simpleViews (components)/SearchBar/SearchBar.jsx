
// React imports
import React, {useState} from 'react';

// Style imports
import globalStyles from "/src/compoundViews (views)/MultipleElementsWrappers/MultipleElements.module.css";
import styles from "./SearchBar.module.css";

// Begin view
function SearchBar ({searchElement, dataForAutocomplete}) {

    // State
    const [searchedElement, setsSearchedElement] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Functions

    /**
     * handleInputChange
     * @param event = the event caused by the input field (to get its value)
     * Gets the input value and matches the element (character or location) that contain said input (case-insensitive)
     * creating an array of up to 5 recommended matches.
     */
    function handleInputChange(event) {

        const inputValue = event.target.value;
        setsSearchedElement(inputValue);

        // autocomplete logic
        if (inputValue.length > 0) {

            const filteredSuggestions = dataForAutocomplete?.filter(char =>
                char.name.toLowerCase().includes(inputValue.toLowerCase())
            );

            setSuggestions(filteredSuggestions.slice(0, 5)); // discard suggestions after the first 5 (list would get too long otherwise)
            setShowSuggestions(true);

        } else {
            setShowSuggestions(false);
            searchElement("name", ""); // if input change was to delete previous name (and gets to length 0), reset name filters
        }

    }

    /**
     * handleSearchSubmit
     * Forwards request to search for an element to the character or location wrapper.
     * The wrapper itself (characters.jsx or locations.jsx) will then call the respective VM to handle the request.
     * After this, it disables the showing of the suggestions.
     */
    function handleSearchSubmit () {
        searchElement("name", searchedElement);
        setShowSuggestions(false);
    }

    /**
     * handleSuggestionClick
     * @param clickedSuggestion = the clicked suggestion's string, a "name".
     * Updates state for the searched element.
     * Forwards request to search for a element to the character or location's wrapper.
     * The wrapper itself (characters.jsx or locations.jsx) will then call the respective VM to handle the request.
     * After this, it disables the showing of the suggestions.
     */
    function handleSuggestionClick (clickedSuggestion) {
        setsSearchedElement(clickedSuggestion);
        searchElement("name", clickedSuggestion);
        setShowSuggestions(false);
    }

    /**
     * handleKeyDown
     * @param event = the event passed from the input field
     * Handles keyboard navigation (Enter to submit, Tab to autocomplete).
     */
    function handleKeyDown (event) {

        // if enter is pressed, search for the specified character
        if (event.key === "Enter") {
            handleSearchSubmit()
        }

        // if tab is pressed, autocomplete to first match and search for specified character
        if (event.key === "Tab") {

            if (showSuggestions && suggestions.length > 0) {

                event.preventDefault(); // "Tab" would send it to the next HTML element by default
                const firstMatch = suggestions[0].name;
                handleSuggestionClick(firstMatch);

            }

        }

    }

    // Return

    return (

        <React.Fragment>

            {/* input field & search button section */}
            <div>

                    <input
                        type="text"
                        placeholder="Search character here"
                        value = {searchedElement} // set input's value to be the one of the state
                        onChange = {handleInputChange}
                        onKeyDown = {handleKeyDown} // = to: onKeyDown={(event) => handleKeyDown(event)}
                        className = {styles.searchInput}
                    />

                <button
                    className = {globalStyles.cta}
                    onClick = {handleSearchSubmit}
                >
                    Find
                </button>

            </div>

            {/* autocomplete section */}
            { showSuggestions && suggestions.length > 0 && (
                <ul className={styles.suggestionsList}>
                    {suggestions.map(((element, index) => (
                        <li key={element.id || index}
                            onClick={() => handleSuggestionClick(element.name)}
                            className={styles.suggestionItem}
                        >
                            {element.name}
                        </li>
                    )))}
                </ul>
            )}

        </React.Fragment>

    )

}

export default SearchBar;
