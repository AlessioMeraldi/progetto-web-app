// React imports
import React, {useEffect} from 'react';

// ViewModel imports
import LocationsViewModel from '/src/viewModels/LocationsViewModel.js';

// Style imports
import style from '/src/compoundViews (views)/SingleElementWrappers/SingleElements.module.css';

// Image imports
import placeholderImage from '/src/assets/Images/Locations_loading_silhouette.svg';

// Begin logic
function ShowSingleLocation({locId, imgSize}) {

    // instantiate the ViewModel and get only the parts we're interested in right now
    const {
        location,
        isLoading,
        getSingleLocation
    } = LocationsViewModel();

    // tell the ViewModel to update its state regarding <allCharacters> when [chardId or imgSize] change (works first render too)
    useEffect(() => {
        getSingleLocation(parseInt(locId), imgSize);
    }, [locId, imgSize]);

    // Returns

    if (isLoading) {
        return (

            <React.Fragment>
                {/* Character's card */}
                <section className={style.card}>

                    {/* Section heading + image */}
                    <header className={style.header}>
                        {location?.locationImageURL && (
                            <div className={style.imageContainer} id={style.singleLocation}>
                                <img
                                    src={placeholderImage}
                                    alt="loading..."
                                    className={style.characterImg}
                                    loading="eager"
                                />
                            </div>
                        )}
                        <h1>Loading...</h1>
                    </header>

                    {/* Anagraphic data section */}
                    <section className={style.section}>
                        <h2>General information</h2>
                        <ul className={style.dataList}>
                            <li><strong>Town:</strong> Loading...</li>
                            <li><strong>Use:</strong> Loading...</li>
                        </ul>
                    </section>

                    {/* Description section */}
                    <section className={style.section}>
                        <h2>Description</h2>
                        <p>Loading...</p>
                    </section>

                    {/* when switching location, no placeholder is displayed for first appearances */}
                    {/* they are unnecessary as when the location is switched the page is scrolled back to top */}

                </section>
            </React.Fragment>

        )
    }

    return (
        <React.Fragment>
            {/* Character's card */}
            <section className={style.card}>

                {/* Section heading + image */}
                <header className={style.header}>
                    {location?.locationImageURL && (
                        <div className={style.imageContainer} id={style.singleLocation}>
                            <img
                                src={location.locationImageURL}
                                alt={location?.locationData?.name}
                                className={style.characterImg}
                                loading="eager"
                            />
                        </div>
                    )}
                    <h1>{location?.locationData?.name}</h1>
                </header>

                {/* Anagraphic data section */}
                <section className={style.section}>
                    <h2>General information</h2>
                    <ul className={style.dataList}>
                        <li>
                            <strong>Town:</strong> {location?.locationData?.town ? location?.locationData?.town : "Unknown"}
                        </li>
                        <li>
                            <strong>Use:</strong> {location?.locationData?.use ? location?.locationData?.use : "Unknown"}
                        </li>
                    </ul>
                </section>

                {/* Description section */}
                <section className={style.section}>
                    <h2>Description</h2>
                    <p>{location?.locationData?.description}</p>
                </section>

                {/* First appearances */}
                <section className={style.section}>

                    {/* conditional rendering with notation: (condition && <element to render>) */}
                    {location?.locationData?.first_appearance_ep && ( /* pseudocode: IF (first_appearance_ep.EXISTS == TRUE && <element to render>) */
                        <React.Fragment>
                            <h2>First appearance</h2>
                            <div className={style.appearanceBox}>
                                <h3>First TV episode</h3>
                                <p><strong>Date: </strong>{location.locationData.first_appearance_ep.airdate}</p>
                                <p><strong>Info: </strong>{location.locationData.first_appearance_ep.description}</p>
                            </div>
                        </React.Fragment>
                    )}

                    {/* same type of conditional rendering in case location was introduced in a short (sh) rather than an episode (ep) */}
                    {location?.locationData?.first_appearance_sh && (
                        <div className={style.appearanceBox}>
                            <h3>First short</h3>
                            <p><strong>Date: </strong>{location.locationData.first_appearance_sh.airdate}</p>
                            <p><strong>Info: </strong>{location.locationData.first_appearance_sh.description}</p>
                        </div>
                    )}
                </section>

            </section>
        </React.Fragment>
    )

}

export default ShowSingleLocation;