// React imports
import React, {useEffect, useState} from 'react';

// Router imports
import { NavLink } from 'react-router-dom';

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
    const [favourites, setFavourites] = useState([]); // Array di ID [15, 30, ...]
    const [loadingFavs, setLoadingFavs] = useState(true);

    // ViewModel data
    const {
        allCharacters,
        getAllCharacters
    } = CharactersViewModel();

    // 1. Carica tutti i personaggi (necessario per mostrare i dettagli delle card)
    useEffect(() => {
        getAllCharacters();
    }, []);


    // 2. Carica i preferiti dell'utente (GET)
    useEffect(() => {

        if (!isAuthenticated || !user?.email) {
            setLoadingFavs(false);
            return;
        }

        async function loadFavourites() {
            try {
                // getUserFavourites ritorna già l'array di numeri [15, 30] grazie al fix precedente
                const favsData = await getUserFavourites(user.email);
                setFavourites(favsData);
            } catch (error) {
                console.error("Errore caricamento preferiti:", error);
            } finally {
                setLoadingFavs(false);
            }
        }

        loadFavourites();

    }, [isAuthenticated, user]);

    // Loading-state return (Auth0)
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
                        <h2 className={styles.sectionTitle}>{user.name}'s favourites characters!</h2>

                        {loadingFavs ? (
                            <p>Caricamento preferiti...</p>
                        ) : favourites.length === 0 ? (
                            // Caso: Nessun preferito salvato
                            <div className={styles.emptyFavorites}>
                                <img src="/homer-gif.gif" alt="Homer" className={styles.homerPng} />
                                <p>
                                    You haven't saved any characters yet. <br />
                                    Run to the characters page to explore all of Springfield's most iconic characters and save your favorites!
                                </p>
                                {/* Aggiunto NavLink per rendere il bottone funzionante */}
                                <NavLink to="/characters">
                                    <button className={gridStyles.ctaCharacters}>Explore Characters</button>
                                </NavLink>
                            </div>
                        ) : allCharacters.length === 0 ? (
                            <p>Loading characters...</p>
                        ) : (
                            // Caso: Ci sono preferiti -> Mostra Griglia Filtrata
                            <CharactersGrid
                                // FILTRO FONDAMENTALE: Passiamo alla griglia SOLO i personaggi contenuti nei preferiti
                                allChars={allCharacters.filter(c =>
                                    favourites.includes(Number(c.id))
                                )}
                                userFavourites={favourites}
                                setFavourites={setFavourites} // Passiamo il setter per permettere il REMOVE
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