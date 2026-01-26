// Style imports
import styles from "./Home.module.css";
import gridStyles from "./Grids.module.css";

// React imports
import React, { useEffect, useState } from "react";

// ViewModel imports
import characterViewModel from "/src/viewModels/CharactersViewModel";

// Routing imports
import { NavLink } from "react-router-dom";

// Begin logic
export default function Home() {
    const { getCharacterBatch, getAllCharacters } = characterViewModel();

    const [characters, setCharacters] = useState([]);
    const [birthdayCharacter, setBirthdayCharacter] = useState(null);

    useEffect(() => {
        async function loadCharacters() {
            const data = await getCharacterBatch(1);
            if (data && data.results) {
                setCharacters(data.results.slice(0, 6));
            }

            // Controllo compleanni
            const allChars = await getAllCharacters();
            /*
            const today = new Date();
            const todayDay = String(today.getDate()).padStart(2, "0");
            const todayMonth = String(today.getMonth() + 1).padStart(2, "0");
            */

            // PROVA COMPLEANNO PERSONAGGIO
            const todayDay = "25";
            const todayMonth = "02";

            const birthday = allChars.find((char) => {
                if (!char.birthdate) return false;

                const [, month, day] = char.birthdate.split("-");

                return day === todayDay && month === todayMonth;
            });

            setBirthdayCharacter(birthday || null);
        }

        loadCharacters();
    }, []);

    return (
        <div className={gridStyles.componentWithGrid}>
            {/* HERO */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <div>
                        <img src="/logo-the-simpson2.svg" alt="Simpson Logo" className={styles.logo} />
                    </div>
                    <p className={styles.subtitle}>
                        Benvenuti a Spriengfield. Venite a scoprire tutte le curiosità sulla famiglia più gialla del cinema.
                    </p>
                    <button className={styles.cta}>Esplora i personaggi</button>
                </div>
            </section>

            {/* PERSONAGGI */}
            <section className={gridStyles.charactersSection}>
                <h2>The simpson family</h2>
                {/* <h2>Personaggi</h2>*/}

                <div className={gridStyles.grid}>
                    {characters.map((char) => (
                        <NavLink key={char.id} to={`/character/${char.id}`} className={gridStyles.card}>
                            <div>
                                <img
                                    src={`https://cdn.thesimpsonsapi.com/500/character/${char.id}.webp`}
                                    alt={char.name}
                                />
                                <h3>{char.name}</h3>
                                <p className={gridStyles.occupation}>Occupazione: <span>{char.occupation}</span></p>
                                <p>" <span className={gridStyles.citation}>{char.phrases[1]}</span> "</p>

                            </div>
                        </NavLink>
                    ))}
                </div>

                <p className={gridStyles.sectionSubtitle}>
                    Questa è solo una piccola anteprima degli abitanti di Springfield.
                    Puoi trovare la lista completa nella nostra pagina dedicata.
                </p>
                <div className={styles.buttonsHome}>
                    <button className={gridStyles.ctaCharacters}>Visualizza tutti i personaggi</button>
                    <button className={gridStyles.ctaLocations}>Visualizza tutte le location</button>
                </div>
            </section>

            {/* SEZIONE COMPLEANNO - Layout "Featured" */}
            {birthdayCharacter && (
                <section className={styles.birthdayHighlight}>
                    <div className={styles.birthdayCard}>
                        <div className={styles.birthdayImage}>
                            <img
                                src={`https://cdn.thesimpsonsapi.com/500/character/${birthdayCharacter.id}.webp`}
                                alt={birthdayCharacter.name}
                            />
                        </div>
                        <div className={styles.birthdayInfo}>
                            <h2>Oggi è il compleanno di <span>{birthdayCharacter.name}</span>!</h2>
                            <p>Festeggia con il cittadino più festeggiato di oggi a Springfield.</p>
                            <button className={gridStyles.ctaCharacters}>Vedi dettagli</button>
                        </div>
                    </div>
                </section>
            )}

            {/* SEZIONE INVITO LOGIN: toDo -> quando implementermo l'autenticazione bisogna verificare se l'utente è loggato */}
            <section className={styles.authStrip}>
                <h2>Want to become a citizen of Springfield?</h2>
                <p>
                    Some content is reserved for registered citizens. <br />
                    Log in to save your favorite characters and don't miss out on
                    the city's best-kept secrets. <br />
                    Become a citizen now!
                </p>
                <button className={gridStyles.ctaCharacters}>
                    Log In
                </button>
                <button className={gridStyles.ctaCharacters}>
                    Sign Up
                </button>
            </section>

        </div>
    );
}
