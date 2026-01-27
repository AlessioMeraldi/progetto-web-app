import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styles from './Profile.module.css';
import gridStyles from "../GridSubComponents/Grids.module.css";

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) return <div>Caricamento...</div>;

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

                    {/* SEZIONE PREFERITI todo: integrare supabase */}
                    <section className={styles.favoritesSection}>
                        <h2 className={styles.sectionTitle}>I miei personaggi preferiti</h2>
                        <div className={styles.emptyFavorites}>
                            <img src="/homer-gif.gif" alt="Homer" className={styles.homerPng} />
                            <p>Non hai ancora salvato nessun personaggio. <br /> Corri ad esplorare tutti i personaggi più
                                iconici di Spriengfield e salva i tuoi preferiti!</p>
                            <button className={gridStyles.ctaCharacters}>Esplora Personaggi</button>
                        </div>
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