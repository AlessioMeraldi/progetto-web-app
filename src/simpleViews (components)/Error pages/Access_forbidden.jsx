
// Style imports
import styles from '/src/simpleViews (components)/Error pages/Page_404.module.css';
import gridStyles from '/src/simpleViews (components)/GridSubComponents/Grids.module.css';
import authStyles from '/src/simpleViews (components)/Home.module.css';

// React imports
import React, {useEffect} from 'react';

// Routing imports
import {NavLink} from 'react-router-dom';

function Access_forbidden() {

    // Scroll back to top (in case redirect is cast from far down another page)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <React.Fragment>
            <main className={styles.Page_404}>

                <section className={styles.errorSection}>
                    <h1>
                        Access forbidden!
                    </h1>
                    <h2>
                        You can't explore Springfield and see the locations without its passport,
                        login to get it!
                    </h2>
                </section>

                <img className={styles.centerGif}
                     src="/src/assets/Page_access_forbidden_Homer.gif"
                     alt="Homer retreats into a bush because he can't access the page"
                />

                {/* Quick send to login */}
                <section className={authStyles.authStrip}>
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

                {/* Return to homepage */}
                <section className={styles.errorSection}>
                    <NavLink className={styles.cta} to="/">Return to the homepage</NavLink>
                </section>

            </main>
        </React.Fragment>
    )

}

export default Access_forbidden;