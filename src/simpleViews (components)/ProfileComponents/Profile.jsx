// React imports
import React, {useEffect, useState} from 'react';

// Router imports
import { NavLink } from 'react-router-dom';

// Auth0 imports
import { useAuth0 } from '@auth0/auth0-react';

// Supabase service imports
import { getUserFavourites } from '../../services/favouritesService';

// Style imports
import styles from './Profile.module.css';
import gridStyles from "../GridSubComponents/Grids.module.css";

// Components imports
import CharactersGrid from "../GridSubComponents/CharactersGrid.jsx";

// ViewModel imports
import CharactersViewModel from "../../viewModels/CharactersViewModel.js";

// Begin view
const Profile = () => {

    // State management

    // Auth0 state
    const { user, isAuthenticated, isLoading } = useAuth0();

    // Supabase favourites state
    const [favourites, setFavourites] = useState([]);
    const [loadingFavs, setLoadingFavs] = useState(true);

    // ViewModel data and methods
    const {
        allCharacters,
        getAllCharacters
    } = CharactersViewModel();

    // Load all characters
    useEffect(() => {
        getAllCharacters();
    }, []);


    // Load user's favourite characters from Supabase
    useEffect(() => {

        // If the user is not authenticated or email is missing, stop loading and skip the request
        if (!isAuthenticated || !user?.email) {
            setLoadingFavs(false);
            return;
        }

        async function loadFavourites() {
            try {
                // Fetch favourite character IDs for the logged-in user
                const favsData = await getUserFavourites(user.email);
                setFavourites(favsData);
            } catch (error) {
                console.error("Errore caricamento preferiti:", error);
            } finally {
                // Stop loading once the request is complete
                setLoadingFavs(false);
            }
        }

        loadFavourites();

    }, [isAuthenticated, user]);

    // Loading-state return (Auth0)
    if (isLoading) {
        return (<div>Loading...</div>);
    }

    return (
        // Render the profile page only if the user is authenticated
        isAuthenticated && (
            <div className={styles.profilePage}>
                <div className={styles.profileContainer}>

                    {/* --- SPRINGFIELD PASSPORT --- */}
                    <div className={styles.passportWrapper}>

                        <div className={styles.passportHeader}>
                            <span>SPRINGFIELD IDENTIFICATION CARD</span>
                        </div>

                        <div className={styles.passportBody}>

                            {/* Left: Photo */}
                            <div className={styles.passportPhotoSection}>
                                <div className={styles.photoFrame}>
                                    <img src={user.picture} alt={user.name} className={styles.avatar} />
                                </div>
                                <span className={styles.photoLabel}>OFFICIAL PHOTO</span>
                            </div>

                            {/* Center: Data */}
                            <div className={styles.passportData}>
                                <div className={styles.dataRow}>
                                    <label>NAME</label>
                                    <div className={styles.dataValue}>{user.name}</div>
                                </div>

                                <div className={styles.dataRow}>
                                    <label>NICKNAME</label>
                                    <div className={styles.dataValue}>{user.nickname}</div>
                                </div>

                                <div className={styles.dataRow}>
                                    <label>EMAIL</label>
                                    <div className={styles.dataValueSmall}>{user.email}</div>
                                </div>

                                <div className={styles.passportGrid}>
                                    <div className={styles.dataRow}>
                                        <label>LAST ACCESS</label>
                                        <div className={styles.dataValue}>{new Date().toLocaleDateString()}</div>
                                    </div>
                                    <div className={styles.dataRow}>
                                        <label>RESIDENCY</label>
                                        <div className={styles.dataValue}>Evergreen Terrace</div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Stamps & Status */}
                            <div className={styles.passportStamps}>
                                <div className={styles.statusStamp}>
                                    CITIZEN<br/>APPROVED
                                </div>
                                <div className={styles.barcode}>
                                    || ||| | ||| || || |
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* FAVOURITES SECTION */}
                    <section className={styles.favoritesSection}>
                        <h2 className={styles.sectionTitle}>{user.name}'s favourites characters!</h2>

                        {loadingFavs ? (
                            <p>Caricamento preferiti...</p>
                        ) : favourites.length === 0 ? (
                            // Case: no favourites
                            <div className={styles.emptyFavorites}>
                                <img src="/homer-gif.gif" alt="Homer" className={styles.homerPng} />
                                <p>
                                    You haven't saved any characters yet. <br />
                                    Run to the characters page to explore all of Springfield's most iconic characters and save your favorites!
                                </p>
                                {/* NavLink for the button */}
                                <NavLink to="/characters">
                                    <button className={gridStyles.ctaCharacters}>Explore Characters</button>
                                </NavLink>
                            </div>
                        ) : allCharacters.length === 0 ? (
                            <p>Loading characters...</p>
                        ) : (
                            // Case: yes favourites
                            <CharactersGrid
                                // Filter for passing to the grid only the favourites characters
                                allChars={allCharacters.filter(c =>
                                    favourites.includes(Number(c.id))
                                )}
                                userFavourites={favourites}
                                setFavourites={setFavourites}
                            />
                        )}

                    </section>

                </div>
            </div>
        )
    );
};

export default Profile;