// Style imports
import styles from "./Home.module.css";
import gridStyles from "./GridSubComponents/Grids.module.css";

// React imports
import React, {useEffect, useState} from "react";

// ViewModel imports
import characterViewModel from "/src/viewModels/CharactersViewModel";

// Routing imports
import {NavLink} from "react-router-dom";

// Auth0 imports
import {useAuth0} from "@auth0/auth0-react";

// Begin logic
export default function Home() {

    const {getCharacterBatch, getAllCharacters} = characterViewModel();

    const [characters, setCharacters] = useState([]);
    const [birthdayCharacter, setBirthdayCharacter] = useState(null);

    const {loginWithRedirect} = useAuth0();
    const {isAuthenticated, user} = useAuth0();

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
                        <img src="/logo-the-simpson2.svg" alt="Simpson Logo" className={styles.logo}/>
                    </div>
                    <p className={styles.subtitle}>
                        <b>Welcome to Springfield! Explore the secrets, trivia, and iconic history of the world’s favorite yellow family.</b>
                        <br/>Your ultimate guide to all things Simpsons starts here.
                    </p>
                    <NavLink className={styles.cta} to="/characters"> Explore characters </NavLink>
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
                                <p className={gridStyles.occupation}>Occupation: <span>{char.occupation}</span></p>
                                <p>" <span className={gridStyles.citation}>{char.phrases[1]}</span> "</p>

                            </div>
                        </NavLink>
                    ))}
                </div>

                <p className={gridStyles.sectionSubtitle}>
                    This is just a small preview of Springfield's residents.
                    You can find the full list on our dedicated page.
                </p>

                {/* Ctas */}
                <div className={styles.buttonsHome}>

                    <NavLink className={gridStyles.ctaCharacters} to="/characters"> View all the characters </NavLink>
                    <NavLink className={gridStyles.ctaLocations} to="/locations"> View all the locations </NavLink>

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

            {/* SEZIONE INVITO LOGIN: toDo: update style */}
            {!isAuthenticated && (<section className={styles.authStrip}>
                <h2>Want to become a citizen of Springfield?</h2>
                <p>
                    Some content is reserved for registered citizens. <br/>
                    Log in to save your favorite characters and don't miss out on
                    the city's best-kept secrets. <br/>
                    Become a citizen now!
                </p>
                <button className={gridStyles.ctaCharacters} onClick={() => loginWithRedirect()}>
                    Log in
                </button>
            </section>)
            }

            {isAuthenticated && (<section className={styles.authStrip}>
                <h2>Welcome to Springfield, {user.name}!</h2>
                <p className={gridStyles.lastParagraphHome}> Visit your profile to check your favourite saved characters and places, having logged in also
                    grants you access to visualizing the locations. </p>
                <div className={styles.buttonsHome}>
                    <NavLink className={gridStyles.ctaCharacters} to="/profile"> go to your profile </NavLink>
                </div>
            </section>)
            }

        </div>
    );
}
