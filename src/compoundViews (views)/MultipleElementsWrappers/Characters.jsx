
// Style imports
import styles from "/src/compoundViews (views)/MultipleElementsWrappers/MultipleElements.module.css";

// React imports
import React, {useEffect, useState} from "react";

//  ViewModel imports
import CharactersViewModel from '/src/viewModels/CharactersViewModel.js';

// Components imports
import CharactersGrid from '/src/simpleViews (components)/GridSubComponents/CharactersGrid.jsx'
import CharactersList from '/src/simpleViews (components)/ListSubComponents/CharactersList.jsx'
import SearchBar from '/src/simpleViews (components)/SearchBar/SearchBar.jsx'

// Auth0 imports
import { useAuth0 } from '@auth0/auth0-react';

// Supabase imports
import { getUserFavourites } from '../../services/favouritesService';

// Begin logic
function Characters() {

    // State (grid or list visualization)
    const [visualizationType, setVisualizationType] = React.useState('list');

    // State for radio buttons (to show the default filters)
    const [genderRadio, setGenderRadio] = React.useState('All');
    const [statusRadio, setStatusRadio] = React.useState('All');

    // State for favourites
    const { user, isAuthenticated } = useAuth0();
    const [favourites, setFavourites] = useState([]); // will contain an array of IDs = [id1, id2, id3, ...]
    const [favouritesLoaded, setFavouritesLoaded] = useState(false);

    // instantiate the ViewModel and get only the parts we're interested in right now
    const {
        filteredCharacters,
        displayedCharacters,
        pageNumber,
        getAllCharacters,
        updateFilter,
        setPageNumber,
    } = CharactersViewModel();

    // tell the ViewModel to update its state regarding [allCharacters]
    useEffect(() => {
        getAllCharacters();
    }, []);

    // Load user's favourites effect
    useEffect(() => {

        if (!isAuthenticated || !user?.email) {
            setFavouritesLoaded(true);
            return;
        }

        async function loadFavourites() {
            try {
                const favsData = await getUserFavourites(user.email);
                setFavourites(favsData);
            } catch (error) {
                console.error("Errore caricamento preferiti in Characters:", error);
            } finally {
                setFavouritesLoaded(true);
            }
        }

        loadFavourites();

    }, [isAuthenticated, user]);

    return (
        <section className={styles.topContainer}>

            {/* Choose display type message & buttons */}
            <section className={styles.container}>
                <h3>CHOOSE VISUALIZATION TYPE</h3>
                <div className={styles.buttonsContainer}>
                    {/* v set style to be .cta regardless, if grid is currently being shown, set it to also be .selected*/}
                    <button className={`${styles.cta} ${visualizationType === "grid" ? styles.selected : ""}`}
                            onClick={() => {setVisualizationType("grid")}}
                    >
                        grid
                    </button>
                    <button
                        className={`${styles.cta} ${visualizationType === "list" ? styles.selected : ""}`}
                        onClick={() => {setVisualizationType("list")}}
                    >
                        list
                    </button>
                </div>
            </section>

            {/* Filters section */}
            <section className={`${styles.container} ${styles.filtersSection}`}>

                {/* Gender radio buttons */}
                <div className={styles.filterGroup}>

                    <h3>Gender</h3>

                    <input type="radio" id="allGenders" name="gender" value="allGenders"
                            onChange={() => {updateFilter("gender", "All"); setGenderRadio("All");}}
                            // ^ To show the default filters, the status was needed, that's why we are invoking both updateFilter(...) [VM state] and setGenderRadio(...) [local state]
                            checked={genderRadio === 'All'}
                    />
                    <label htmlFor="allGenders">All</label>

                    <input type="radio" id="male" name="gender" value="male"
                           onChange={() => {updateFilter("gender","Male"); setGenderRadio("Male");}}
                           checked={genderRadio === 'Male'}
                    />
                    <label htmlFor="male">Male</label>

                    <input type="radio" id="female" name="gender" value="female"
                           onChange={() => {updateFilter("gender","Female"); setGenderRadio("Female");}}
                           checked={genderRadio === 'Female'}
                    />
                    <label htmlFor="female">Female</label>

                    <input type="radio" id="other" name="gender" value="other"
                           onChange={() => {updateFilter("gender","Other"); setGenderRadio("Other");}}
                           checked={genderRadio === 'Other'}
                    />
                    <label htmlFor="other">Other</label>
                    <br/>

                </div>

                {/* Status (alive or deceased) radio buttons */}
                <div className={styles.filterGroup}>

                    <h3>Status</h3>

                    <input type="radio" id="allStatus" name="status" value="allStatus"
                           onChange={() => {updateFilter("status","All"); setStatusRadio("All");}}
                           checked={statusRadio === 'All'}
                    />
                    <label htmlFor="allStatus">Both alive and deceased</label>

                    <input type="radio" id="alive" name="status" value="alive"
                           onChange={() => {updateFilter("status","Alive"); setStatusRadio("Alive");}}
                           checked={statusRadio === 'Alive'}
                    />
                    <label htmlFor="alive">Alive</label>

                    <input type="radio" id="deceased" name="status" value="deceased"
                           onChange={() => {updateFilter("status","Deceased"); setStatusRadio("Deceased");}}
                           checked={statusRadio === 'Deceased'}
                    />
                    <label htmlFor="deceased">Deceased</label>
                    <br/>

                </div>

            </section>

            {/* Searchbar section */}
            <section className={styles.container}>
                <SearchBar searchElement={updateFilter} dataForAutocomplete={filteredCharacters} />
            </section>

            {/* Main content */}
            {!favouritesLoaded ? (
                <p className={styles.centeredText}>
                    Loading favourites...
                </p>
            ) : (
                /* Ternary operator for abbreviated IF-ELSE --> (condition) ? expressionTrue : expressionFalse; */
                visualizationType === "grid" ? (
                    <CharactersGrid
                        allChars={displayedCharacters}
                        userFavourites={favourites}
                        setFavourites={setFavourites}
                    />
                ) : (
                    <CharactersList
                        allChars={displayedCharacters}
                        userFavourites={favourites}
                        setFavourites={setFavourites}
                    />
                )
            )}

            {/*No characters displayed notification*/}
            {
                (displayedCharacters.length === 0)
                &&
                <section className={styles.noElementsContainer}>
                    <p>No characters match the filters or the search</p>
                </section>
            }

            {/* switch between first-half and last-half of characters */}
            <section className={styles.container}>

                {/* Button 1 showcases the first 600 filtered characters (will be less if there aren't enough) */}
                <button
                    className={`${styles.cta} ${pageNumber === 0 ? styles.selected : ""}`}
                    onClick={() => {
                        setPageNumber(0);
                        window.scrollTo(0, 0); // Scroll to top
                    }}
                    disabled={pageNumber === 0}
                >
                    First page
                </button>

                {/* Button 2 showcases the last 600 filtered characters (will be less or empty if there aren't enough */}
                {
                    (filteredCharacters.length > 600)
                    &&
                    <button
                        className={`${styles.cta} ${pageNumber === 1 ? styles.selected : ""}`}
                        onClick={() => {
                            setPageNumber(1);
                            window.scrollTo(0, 0); // Scroll to top
                        }}
                        disabled={pageNumber === 1}
                    >
                        Second page
                    </button>
                }

            </section>

        </section>
    )

}

export default Characters;
