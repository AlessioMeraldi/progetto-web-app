// React imports
import React, {useEffect, useState} from 'react';

// ViewModel imports
import CharactersViewModel from '/src/viewModels/CharactersViewModel.js';

// Style imports
import style from '/src/compoundViews (views)/SingleElementWrappers/SingleElements.module.css';

// Auth0 imports
import {useAuth0} from '@auth0/auth0-react';

// Image imports
import placeholderImage from '/src/assets/Images/Character_loading_silhouette.svg';

// Begin logic
function ShowSingleCharacter({charId, imgSize}) {

    // Auth0 state
    const {user, isAuthenticated} = useAuth0();

    // Instantiate the ViewModel and get the necessary states and functions
    const {
        character,
        isLoading,
        getSingleCharacter,
        userDonuts,       // state managed by the VM (the actual rating from the DB)
        avgStats,         // state managed by the VM (average and count)
        loadRatingData,   // VM function to fetch initial rating data
        updateRating      // VM function to save a new rating
    } = CharactersViewModel();

    /** * LOCAL STATE FOR REACTIVE BEHAVIOR
     * This state captures the user's intent to rate before it is sent to the server.
     */
    const [pendingRating, setPendingRating] = useState(null);

    // Tell the ViewModel to update its state when [charId or imgSize] change (works first render too)
    useEffect(() => {
        const id = parseInt(charId);
        getSingleCharacter(id, imgSize);

        // Fetch rating statistics and user specific rating through the ViewModel
        loadRatingData(id, user?.email, isAuthenticated);
    }, [charId, imgSize, user?.email, isAuthenticated]);

    /**
     * REACTIVE EFFECT
     * Instead of calling the service directly on click, this effect "watches"
     * pendingRating and triggers the VM call only when the local state changes.
     */
    useEffect(() => {
        if (pendingRating === null) return;

        const syncWithViewModel = async () => {
            // Trigger the ViewModel logic
            await updateRating(parseInt(charId), user.email, pendingRating);

            // Clear the pending state once the VM has processed the update
            setPendingRating(null);
        };

        syncWithViewModel();
    }, [pendingRating, charId, user?.email]);

    /**
     * handleDonutClick
     * this handler ONLY changes a local state.
     * It does not perform any API calls directly.
     */
    const handleDonutClick = (ratingValue) => {
        // Only update if the rating is actually different from the current one
        if (ratingValue !== userDonuts) {
            setPendingRating(ratingValue);
        }
    };

    // Returns

    if (isLoading) {
        return (
            <React.Fragment>
                {/* Character's card (Loading State) */}
                <section className={style.card}>

                    {/* Section heading + image */}
                    <header className={style.header}>
                        <div className={style.imageContainer}>
                            <img
                                src={placeholderImage}
                                alt="loading..."
                                className={style.characterImg}
                                loading="eager"
                            />
                        </div>
                        <h1>Loading...</h1>

                        {/* Display Average Rating from VM */}
                        <div className={style.avgRating}>
                            <span><strong>🍩 {avgStats.average} / 5</strong></span>
                            <small> ({avgStats.count} votes)</small>
                        </div>
                    </header>

                    {/* Anagraphic data section */}
                    <section className={style.section}>
                        <h2>General information</h2>
                        <ul className={style.dataList}>
                            <li><strong>Age:</strong> Loading...</li>
                            <li><strong>Gender:</strong> Loading...</li>
                            <li><strong>Status:</strong> Loading...</li>
                            <li><strong>Occupation:</strong> Loading...</li>
                        </ul>
                    </section>

                    {/* Description section */}
                    <section className={style.section}>
                        <h2>Description</h2>
                        <p>Loading...</p>
                    </section>

                    {/* when switching character, no placeholder is displayed for first appearances or citations */}
                    {/* they are unnecessary as when the character is switched the page is scrolled back to top */}

                </section>
            </React.Fragment>
        )
    } else {

        // Character loaded return
        return (
            <React.Fragment>
                {/* Character's card */}
                <section className={style.card}>

                    {/* Section heading + image */}
                    <header className={style.header}>
                        {character?.characterImageURL && (
                            <div className={style.imageContainer}>
                                <img
                                    src={character.characterImageURL}
                                    alt={character?.characterData?.name}
                                    className={style.characterImg}
                                    loading="eager"
                                />
                            </div>
                        )}
                        <h1>{character?.characterData?.name}</h1>

                        {/* Display Average Rating from VM */}
                        <div className={style.avgRating}>
                            <span><strong>🍩 {avgStats.average} / 5</strong></span>
                            <small> ({avgStats.count} votes)</small>
                        </div>
                    </header>

                    {/* Anagraphic data section */}
                    <section className={style.section}>
                        <h2>General information</h2>
                        <ul className={style.dataList}>
                            <li>
                                <strong>Age: {character?.characterData?.age ? character?.characterData?.age : "Unknown"}</strong>
                            </li>
                            <li>
                                <strong>Gender:</strong> {character?.characterData?.gender ? character?.characterData?.gender : "Unknown/Other"}
                            </li>
                            <li>
                                <strong>Status:</strong> {character?.characterData?.status ? character?.characterData?.status : "Unknown"}
                            </li>
                            <li>
                                <strong>Occupation:</strong> {character?.characterData?.occupation ? character?.characterData?.occupation : "Unknown"}
                            </li>
                        </ul>
                    </section>

                    {/* Description section */}
                    <section className={style.section}>
                        <h2>Description</h2>
                        <p>{character?.characterData?.description}</p>
                    </section>

                    {/* First appearances */}
                    <section className={style.section}>
                        <h2>First appearance</h2>

                        {/* conditional rendering with notation: (condition && <element to render>) */}
                        {character?.characterData?.first_appearance_ep && ( /* pseudocode: IF (first_appearance_ep.EXISTS == TRUE && <element to render>) */
                            <div className={style.appearanceBox}>
                                <h3>First TV episode</h3>
                                <p><strong>Date: </strong>{character.characterData.first_appearance_ep.airdate}</p>
                                <p><strong>Info: </strong>{character.characterData.first_appearance_ep.description}</p>
                            </div>
                        )}

                        {/* same type of conditional rendering in case character was introduced in a short (sh) rather than an episode (ep) */}
                        {character?.characterData?.first_appearance_sh && (
                            <div className={style.appearanceBox}>
                                <h3>First short</h3>
                                <p><strong>Date: </strong>{character.characterData.first_appearance_sh.airdate}</p>
                                <p><strong>Info: </strong>{character.characterData.first_appearance_sh.description}</p>
                            </div>
                        )}
                    </section>

                    {/* Famous lines/quotes */}
                    {character?.characterData?.phrases && character.characterData.phrases.length > 0 && ( /* returned data could be an empty array [] */
                        <section className={style.section}>
                            <h2>Famous lines</h2>
                            <ul className={style.quotesList}>
                                {/* map the array to a list of <li> items */}
                                {character.characterData.phrases.map((phrase, index) => (
                                    <li key={index}>"{phrase}"</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* --- DONUT RATING SYSTEM --- */}
                    {isAuthenticated && (
                        <section className={style.ratingSection}>
                            <h2>Rate this character</h2>
                            <div className={style.donutContainer}>
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <span
                                        key={num}
                                        className={`${style.donut} ${(pendingRating ?? userDonuts) >= num ? style.activeDonut : ''}`}
                                        onClick={() => handleDonutClick(num)}
                                        style={{
                                            cursor: 'pointer',
                                            fontSize: '2rem',
                                            filter: (pendingRating ?? userDonuts) >= num ? 'none' : 'grayscale(100%) brightness(1.5)'
                                        }}
                                    >
                                        🍩
                                    </span>
                                ))}
                            </div>
                            {/* Feedback: Show "Saving..." during the Effect processing, otherwise show the current rating */}
                            {(pendingRating || userDonuts > 0) && (
                                <p className={style.ratingFeedback}>
                                    {pendingRating ? "Saving your donuts..." : `Your rating: ${userDonuts} donuts!`}
                                </p>
                            )}
                        </section>
                    )}
                </section>
            </React.Fragment>
        )
    }
}

export default ShowSingleCharacter;