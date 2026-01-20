import React, { useEffect, useState } from "react";
import characterViewModel from "/src/viewModels/charactersViewModel";
import styles from "./Home.module.css";

export default function Home() {
    const { getCharacterBatch } = characterViewModel();

    const [characters, setCharacters] = useState([]);
    const [birthdayCharacter, setBirthdayCharacter] = useState(null);

    useEffect(() => {
        async function loadCharacters() {
            const data = await getCharacterBatch();

            if (!data || !data.results) return;

            // Prendiamo solo i primi 6
            const firstSix = data.results.slice(0, 6);
            setCharacters(firstSix);

            // Controllo compleanni
            /*
            const today = new Date();
            const todayDay = String(today.getDate()).padStart(2, "0");
            const todayMonth = String(today.getMonth() + 1).padStart(2, "0");
            */

            // PROVA COMPLEANNO HOMER: 12 MAGGIO
            const todayDay = "12";
            const todayMonth = "05";

            const birthday = data.results.find((char) => {
                if (!char.birthdate) return false;

                const [, month, day] = char.birthdate.split("-");

                return day === todayDay && month === todayMonth;
            });

            setBirthdayCharacter(birthday || null);
        }

        loadCharacters();
    }, []);

    return (
        <div className={styles.home}>
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
            <section className={styles.charactersSection}>
                <h2>The simpson family</h2>
                {/* <h2>Personaggi</h2>*/}

                <div className={styles.grid}>
                    {characters.map((char) => (
                        <div key={char.id} className={styles.card}>
                            <img
                                src={`https://cdn.thesimpsonsapi.com/500/character/${char.id}.webp`}
                                alt={char.name}
                            />
                            <h3>{char.name}</h3>
                            <p>{char.occupation}</p>
                            <p>{char.status}</p>

                        </div>
                    ))}
                </div>

                <p className={styles.sectionSubtitle}>
                    Questa è solo una piccola anteprima degli abitanti di Springfield.
                    Puoi trovare la lista completa nella nostra pagina dedicata.
                </p>
                <div className={styles.buttonsHome}>
                    <button className={styles.ctaCharacters}>Visualizza tutti i personaggi</button>
                    <button className={styles.ctaLocations}>Visualizza tutte le location</button>
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
                            <button className={styles.ctaCharacters}>Vedi dettagli</button>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
