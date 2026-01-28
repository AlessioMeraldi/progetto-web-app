
// React imports
import React, {useEffect, useState} from 'react';

// Auth0 imports
import { useAuth0 } from '@auth0/auth0-react';

// Supabase imports
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

    // State

    // Auth0 state
    const { user, isAuthenticated, isLoading } = useAuth0();

    // Supabase state
    const [favourites, setFavourites] = useState([]);
    const [loadingFavs, setLoadingFavs] = useState(true);

    // Local variables
    const { filteredCharacters } = CharactersViewModel();

    // const favouriteIds = favourites.map(fav => fav.character_id);


    // Begin logic

    useEffect(() => {

        if (!isAuthenticated || !user?.email) {
            return;
        }

        // toDo: check if this should be defined here
        async function loadFavourites() {

            try {

                const favsData = await getUserFavourites(user.email); // get Supabase data
                const onlyIds = favsData.map(row => row.character_id); // map only the IDs
                setFavourites(onlyIds);

            } catch {

                console.error("Errore caricamento preferiti");

            } finally {

                setLoadingFavs(false);

            }

        }

        loadFavourites();

    }, [isAuthenticated, user]);

    // Loading-state return
    if (isLoading) {
        return (<div>Loading...</div>);
    }

    // Loaded-state return
    return (
        isAuthenticated && (
            <div className={styles.profilePage}>
                <div className={styles.profileContainer}>

                    {/* SEZIONE HEADER PROFILO */}
                    <section className={styles.heroSection}>
                        <div className={styles.avatarWrapper}>
                            <img src={user.picture} alt={user.name} className={styles.avatar} />
                        </div>
                        <div>
                            <h1 className={styles.userName}>{user.name}</h1>
                            <p>{user.email}</p>
                            <div className={styles.badgeContainer}>
                                <span className={styles.badge}>Simpson Fan #1</span>
                                <span className={styles.badge}>Duff Lover</span>
                            </div>
                        </div>
                    </section>

                    {/* SEZIONE PREFERITI */}
                    <section className={styles.favoritesSection}>
                        <h2 className={styles.sectionTitle}>I miei personaggi preferiti</h2>

                        {loadingFavs ? (
                            <p>Caricamento preferiti...</p>
                        ) : favourites.length === 0 ? (
                            <div className={styles.emptyFavorites}>
                                <img src="/homer-gif.gif" alt="Homer" className={styles.homerPng} />
                                <p>
                                    Non hai ancora salvato nessun personaggio. <br />
                                    Corri ad esplorare tutti i personaggi più iconici di Springfield e salva i tuoi preferiti!
                                </p>
                                <button className={gridStyles.ctaCharacters}>Esplora Personaggi</button>
                            </div>
                        ) : (
                            <CharactersGrid
                                allChars={filteredCharacters.filter(c => favourites.includes(c.id))}
                                userFavourites={favourites}
                                setFavourites={setFavourites}
                            />
                        )}

                    </section>

                    {/* DETTAGLI ACCOUNT */}
                    <section className={styles.detailsSection}>
                        <h2 className={styles.sectionTitle}>Dati Springfield ID</h2>
                        <ul className={styles.detailsList}>
                            <li><strong>Nickname:</strong> {user.nickname}</li>
                            <li><strong>Ultimo Accesso:</strong> {new Date().toLocaleDateString()}</li>
                            <li><strong>Status:</strong> Cittadino Modello</li>
                        </ul>
                    </section>

                </div>
            </div>
        )
    );
};

export default Profile;