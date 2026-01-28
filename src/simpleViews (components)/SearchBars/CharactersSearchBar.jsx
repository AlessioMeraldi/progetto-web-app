
// React imports
import React, {useState} from 'react';

// Style imports
import globalStyles from "/src/compoundViews (views)/MultipleElementsWrappers/MultipleElements.module.css";
import styles from "./SearchBars.module.css";

// Begin view
function CharactersSearchBar ({searchCharacter, dataForAutocomplete}) {

    // State
    const [searchedCharacter, setsSearchedCharacter] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Functions

    /**
     * handleInputChange
     * @param event = the event caused by the input field (to get its value)
     * Gets the input value and matches the characters that contain said input (case-insensitive), creating an array
     * of up to 5 recommended matches.
     */
    function handleInputChange(event) {

        const inputValue = event.target.value;
        setsSearchedCharacter(inputValue);

        // autocomplete logic
        if (inputValue.length > 0) {

            const filteredSuggestions = dataForAutocomplete?.filter(char =>
                char.name.toLowerCase().includes(inputValue.toLowerCase())
            );

            setSuggestions(filteredSuggestions.slice(0, 5)); // discard suggestions after the first 5 (list would get too long otherwise)
            setShowSuggestions(true);

        } else {
            setShowSuggestions(false);
            searchCharacter("name", ""); // if input change was to delete previous name (and gets to length 0), reset name filters
        }

    }

    /**
     * handleSearchSubmit
     * Forwards request to search for a character to the character's wrapper (that will itself forward it to the VM).
     * Disables the showing of the suggestions.
     */
    function handleSearchSubmit () {
        searchCharacter("name", searchedCharacter);
        setShowSuggestions(false);
    }

    /**
     * handleSuggestionClick
     * @param clickedSuggestion = the clicked suggestion's string, a "name".
     * Updates state for the searched character.
     * Forwards request to search for a character to the character's wrapper (that will itself forward it to the VM).
     * Disables the showing of the suggestions.
     */
    function handleSuggestionClick (clickedSuggestion) {
        setsSearchedCharacter(clickedSuggestion);
        searchCharacter("name", clickedSuggestion);
        setShowSuggestions(false);
    }

    // Return

    return (

        <React.Fragment>

            {/* input field & search button section */}
            <div>

                <input
                    type="text"
                    placeholder="Search character here"
                    value = {searchedCharacter} // set input's value to be the one of the state
                    onChange = {handleInputChange}
                    onKeyDown = {
                        (e) =>
                            e.key === "Enter" && handleSearchSubmit()
                    }
                    className={styles.searchInput}
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
                    {suggestions.map(((character, index) => (
                        <li key={character.id || index}
                            onClick={() => handleSuggestionClick(character.name)}
                            className={styles.suggestionItem}
                        >
                            {character.name}
                        </li>
                    )))}
                </ul>
            )}

        </React.Fragment>

    )

}

export default CharactersSearchBar;