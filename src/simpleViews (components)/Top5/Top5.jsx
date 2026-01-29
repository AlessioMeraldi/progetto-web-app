import React, { useEffect, useState } from 'react';
import { getTopFiveCharacters } from '../../services/ratingsService';
import CharactersViewModel from '../../viewModels/CharactersViewModel';
import styles from './Top5.module.css';

const Top5 = () => {
    const [topRatings, setTopRatings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { allCharacters, getAllCharacters } = CharactersViewModel();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Carichiamo sia la classifica che tutti i personaggi
                const [leaderboardData] = await Promise.all([
                    getTopFiveCharacters(),
                    getAllCharacters()
                ]);
                setTopRatings(leaderboardData);
            } catch (err) {
                console.error("Failed to load leaderboard", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Funzione per trovare i dati completi del personaggio partendo dall'ID della classifica
    const getCharDetails = (id) => allCharacters.find(c => Number(c.id) === id);

    if (loading) return <div className={styles.loading}>Calculating donut obsession...</div>;

    return (
        <div className={styles.leaderboardPage}>
            <h2 className={styles.mainTitle}>Springfield's Top 5</h2>
            <p className={styles.subtitle}>Mmm... democracy! Grab your Springfield ID and vote for your favorite characters, one donut at a time.</p>

            <div className={styles.podiumContainer}>
                {topRatings.map((rating, index) => {
                    const details = getCharDetails(rating.character_id);
                    if (!details) return null;

                    return (
                        <div key={rating.character_id} className={`${styles.rankRow} ${styles[`rank${index + 1}`]}`}>
                            <div className={styles.rankNumber}>#{index + 1}</div>

                            <img
                                src={`https://cdn.thesimpsonsapi.com/200/character/${rating.character_id}.webp`}
                                alt={details.name}
                                className={styles.miniAvatar}
                            />

                            <div className={styles.charInfo}>
                                <h2 className={styles.charName}>{details.name}</h2>
                                <p className={styles.voteCount}>{rating.total_votes} citizens voted</p>
                            </div>

                            <div className={styles.donutScore}>
                                <span className={styles.scoreNumber}>{rating.avg_donuts}</span>
                                <span className={styles.donutIcon}>🍩</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Top5;