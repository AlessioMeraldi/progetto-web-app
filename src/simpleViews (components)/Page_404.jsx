
// Style imports
import styles from '/src/simpleViews (components)/Page_404.module.css';

// React imports
import React from 'react';

// Routing imports
import {NavLink} from 'react-router-dom';

function Page_404() {

    return (
        <React.Fragment>
            <main className={styles.Page_404}>

                <section className={styles.errorSection}>
                    <h1>Pagina non trovata!</h1>
                </section>

                <img className={styles.centerImg}
                     src="/src/assets/Page_404_Doh.webp"
                     alt="Homer che dice 'Doh!' perché la pagina non è disponibile"
                />

                <section className={styles.errorSection}>
                    <NavLink className={styles.cta} to="/"> Ritorna alla homepage </NavLink>
                </section>

            </main>
        </React.Fragment>
    )

}

export default Page_404;