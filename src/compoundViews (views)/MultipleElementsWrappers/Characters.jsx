
// Style imports
import styles from "/src/compoundViews (views)/MultipleElementsWrappers/MultipleElements.module.css";

// React imports
import React, {useEffect, useState} from "react";

//  ViewModel imports
import CharactersViewModel from '/src/viewModels/CharactersViewModel.js';

// Components imports
import CharactersGrid from '/src/simpleViews (components)/GridSubComponents/CharactersGrid.jsx'
import CharactersList from '/src/simpleViews (components)/ListSubComponents/CharactersList.jsx'
import CharactersSearchBar from '/src/simpleViews (components)/SearchBars/CharactersSearchBar.jsx'

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
        getAllCharacters,
        updateFilter,
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
        <React.Fragment>

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
                <CharactersSearchBar searchCharacter={updateFilter} dataForAutocomplete={filteredCharacters} />
            </section>

            {/* Ternary operator for abbreviated IF-ELSE --> (condition) ? expressionTrue : expressionFalse; */}
            {!favouritesLoaded ? (
                <p>Loading favourites...</p>
            ) : (
                visualizationType === "grid" ? (
                    <CharactersGrid
                        allChars={filteredCharacters}
                        userFavourites={favourites}
                        setFavourites={setFavourites}
                    />
                ) : (
                    <CharactersList
                        allChars={filteredCharacters}
                        userFavourites={favourites}
                        setFavourites={setFavourites}
                    />
                )
            )}

        </React.Fragment>
    )

}

export default Characters;
