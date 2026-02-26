import React, {useEffect, useState} from 'react';
// NavLink import for character routing
import {NavLink} from 'react-router-dom';

// Service import to fetch the Top 5 rated characters
import {getTopFiveCharacters} from '../../services/ratingsService';

// ViewModel import to access full character data
import CharactersViewModel from '../../viewModels/CharactersViewModel';

// Style imports
import styles from './Top5.module.css';

const Top5 = () => {
    // State to store the Top 5 leaderboard data
    const [topRatings, setTopRatings] = useState([]);
    const [loading, setLoading] = useState(true);
    const {allCharacters, getAllCharacters} = CharactersViewModel();

    useEffect(() => {
        // Fetch leaderboard data and full character list in parallel
        const fetchData = async () => {
            try {
                // Load leaderboard and character data
                const [leaderboardData] = await Promise.all([
                    getTopFiveCharacters(),
                    getAllCharacters()
                ]);
                // Store the Top 5 ratings data
                setTopRatings(leaderboardData);
            } catch (err) {
                console.error("Failed to load leaderboard", err);
            } finally {
                // Stop loading once the data has been processed
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Function to show character details based on the character ID from the Leaderboard
    const getCharDetails = (id) => allCharacters.find(c => Number(c.id) === id);

    // Loading fallback while data is being fetched
    if (loading) return <div className={styles.loading}>Calculating donut leadboard...</div>;

    return (
        <div className={styles.leaderboardPage}>
            <h2 className={styles.mainTitle}>Springfield's Top 5</h2>
            <p className={styles.subtitle}>Mmm... democracy! Grab your Springfield ID and vote for your favorite
                characters, one donut at a time.</p>

            {/* PODIUM / leaderboard container */}
            <div className={styles.podiumContainer}>
                {topRatings.map((rating, index) => {
                    // Retrieve character details for each leaderboard entry
                    const details = getCharDetails(rating.character_id);
                    if (!details) return null;

                    return (
                        /* Each rank row is wrapped in a NavLink to allow
                           navigation to the character detail page.
                        */
                        <NavLink
                            key={rating.character_id}
                            to={`/character/${rating.character_id}`}
                            className={`${styles.rankRow} ${styles[`rank${index + 1}`]}`}
                            style={{
                                textDecoration: 'none',
                                color: 'inherit'
                            }} // Ensures styling remains consistent beacuse this in a link
                        >
                            {/* Rank position */}
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
                        </NavLink>
                    );
                })}
            </div>
        </div>
    );
};

export default Top5;