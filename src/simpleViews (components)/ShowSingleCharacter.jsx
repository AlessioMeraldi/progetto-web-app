
// React imports
import {useEffect} from 'react';

// ViewModel imports
import CharactersViewModel from '/src/viewModels/CharactersViewModel.js';

// Style imports
import style from '/src/compoundViews (views)/SingleElements.module.css';

// Begin logic
function ShowSingleCharacter({charId, imgSize}) {

    // instantiate the ViewModel and get only the parts we're interested in right now
    const {
        character,
        getSingleCharacter
    } = CharactersViewModel();

    // tell the ViewModel to update its state regarding <allCharacters> when [chardId or imgSize] change (works first render too)
    useEffect(() => {
        getSingleCharacter(parseInt(charId), imgSize);
    }, [charId, imgSize]);

    return (

        <main className={style.pageContainer}>

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
            </section>
        </main>
    )

}

export default ShowSingleCharacter;