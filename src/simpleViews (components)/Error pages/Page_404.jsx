
// Style imports
import styles from '/src/simpleViews (components)/Error pages/Page_404.module.css';

// React imports
import React, {useEffect} from 'react';

// Routing imports
import {NavLink} from 'react-router-dom';

function Page_404() {

    // Scroll back to top (in case redirect is cast from far down another page)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <React.Fragment>
            <main className={styles.Page_404}>

                <section className={styles.errorSection}>
                    <h1>Page not found!</h1>
                </section>

                <img className={styles.centerImg}
                     src="/src/assets/Images/Page_404_Doh.webp"
                     alt="Homer saying 'Doh!' because the page is not available."
                />

                <section className={styles.errorSection}>
                    <NavLink className={styles.cta} to="/home"> Go back to homepage </NavLink>
                </section>

            </main>
        </React.Fragment>
    )

}

export default Page_404;
