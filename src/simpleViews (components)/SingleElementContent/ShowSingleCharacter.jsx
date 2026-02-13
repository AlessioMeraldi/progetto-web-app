
// React imports
import React, {useEffect, useState} from 'react';

// ViewModel imports
import CharactersViewModel from '/src/viewModels/CharactersViewModel.js';

// Style imports
import style from '/src/compoundViews (views)/SingleElementWrappers/SingleElements.module.css';

// Auth0 imports
import { useAuth0 } from '@auth0/auth0-react';

// Service imports
import { getCharacterRatingStats, getUserRating, saveRating } from '../../services/ratingsService';

// Image imports
import placeholderImage from '/src/assets/Images/Character_loading_silhouette.svg';

// Begin logic
function ShowSingleCharacter({charId, imgSize}) {

    // Auth0 state
    const { user, isAuthenticated } = useAuth0();

    // Local state for ratings
    const [userDonuts, setUserDonuts] = useState(0); // rating given by the logged user
    const [avgStats, setAvgStats] = useState({ average: 0, count: 0 });

    // instantiate the ViewModel and get only the parts we're interested in right now
    const {
        character,
        isLoading,
        getSingleCharacter
    } = CharactersViewModel();

    // tell the ViewModel to update its state regarding <allCharacters> when [chardId or imgSize] change (works first render too)
    useEffect(() => {
        const id = parseInt(charId);
        getSingleCharacter(id, imgSize);
        loadRatingData(id);
    }, [charId, imgSize]);

    // Fetch rating statistics and user specific rating
    const loadRatingData = async (id) => {
        try {
            const stats = await getCharacterRatingStats(id);
            setAvgStats(stats);

            if (isAuthenticated && user?.email) {
                const rating = await getUserRating(id, user.email);
                setUserDonuts(rating);
            }
        } catch (error) {
            console.error("Error loading ratings:", error);
        }
    };

    const handleRating = async (ratingValue) => {
        // it doesn't change anything if the rating is the same
        if (ratingValue === userDonuts) return;

        try {
            const updatedRating = await saveRating(
                parseInt(charId),
                user.email,
                ratingValue
            );

            // update the user rating
            setUserDonuts(updatedRating.donuts);

            // load stats (media + count)
            const stats = await getCharacterRatingStats(parseInt(charId));
            setAvgStats(stats);

        } catch (error) {
            console.error("Error updating rating:", error);
        }
    };

    // Returns

    if (isLoading) {
        return (
            <React.Fragment>
                {/* Character's card */}
                <section className={style.card}>

                    {/* Section heading + image */}
                    <header className={style.header}>
                        {character?.characterImageURL && (
                            <div className={style.imageContainer}>
                                <img
                                    src={placeholderImage}
                                    alt="loading..."
                                    className={style.characterImg}
                                    loading="eager"
                                />
                            </div>
                        )}
                        <h1>Loading...</h1>

                        {/* Display Average Rating */}
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

        // character loaded return
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
                                    alt="{character?.characterData?.name}"
                                    className={style.characterImg}
                                    loading="eager"
                                />
                            </div>
                        )}
                        <h1>{character?.characterData?.name}</h1>

                        {/* Display Average Rating */}
                        <div className={style.avgRating}>
                            <span><strong>🍩 {avgStats.average} / 5</strong></span>
                            <small> ({avgStats.count} votes)</small>
                        </div>
                    </header>

                    {/* Anagraphic data section */}
                    <section className={style.section}>
                        <h2>General information</h2>
                        <ul className={style.dataList}>
                            <li><strong>Age:</strong> {character?.characterData?.age}</li>
                            <li><strong>Gender:</strong> {character?.characterData?.gender}</li>
                            <li><strong>Status:</strong> {character?.characterData?.status}</li>
                            <li><strong>Occupation:</strong> {character?.characterData?.occupation}</li>
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
                                        className={`${style.donut} ${userDonuts >= num ? style.activeDonut : ''}`}
                                        onClick={() => handleRating(num)}
                                        style={{
                                            cursor: 'pointer',
                                            fontSize: '2rem',
                                            filter: userDonuts >= num ? 'none' : 'grayscale(100%) brightness(1.5)'
                                        }}
                                    >
                                    🍩
                                </span>
                                ))}
                            </div>
                            {userDonuts > 0 && <p className={style.ratingFeedback}>You gave {userDonuts} donuts!</p>}
                        </section>
                    )}
                </section>
            </React.Fragment>
        )
    }

}

export default ShowSingleCharacter;